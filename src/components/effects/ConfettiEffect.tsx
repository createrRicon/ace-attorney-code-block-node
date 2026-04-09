import React, { useEffect, useRef, useCallback, useState } from 'react'

interface ConfettiEffectProps {
  trigger: boolean
  duration?: number
  onComplete?: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  width: number
  height: number
  color: string
  opacity: number
  gravity: number
  wobble: number
  wobbleSpeed: number
  phase: number
}

const COLORS = [
  '#FFD700', // gold
  '#FFA500', // orange
  '#FF6347', // tomato
  '#FFE4B5', // moccasin
  '#FFFFFF', // white
  '#F0E68C', // khaki
  '#FF69B4', // hot pink
  '#87CEEB', // sky blue
]

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  const side = Math.random()
  let x: number, y: number, vx: number, vy: number

  if (side < 0.7) {
    x = Math.random() * canvasWidth
    y = -20
    vx = (Math.random() - 0.5) * 3
    vy = Math.random() * 2 + 1
  } else if (side < 0.85) {
    x = canvasWidth * 0.15
    y = canvasHeight * 0.9
    vx = Math.random() * 4 + 2
    vy = -(Math.random() * 6 + 4)
  } else {
    x = canvasWidth * 0.85
    y = canvasHeight * 0.9
    vx = -(Math.random() * 4 + 2)
    vy = -(Math.random() * 6 + 4)
  }

  return {
    x,
    y,
    vx,
    vy,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    width: Math.random() * 8 + 4,
    height: Math.random() * 6 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 1,
    gravity: 0.12 + Math.random() * 0.08,
    wobble: 0,
    wobbleSpeed: Math.random() * 0.1 + 0.03,
    phase: Math.random() * Math.PI * 2,
  }
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  trigger,
  duration = 4,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const spawnIntervalRef = useRef<number>(0)
  const [visible, setVisible] = useState(false)

  const durationRef = useRef(duration)
  const onCompleteRef = useRef(onComplete)
  durationRef.current = duration
  onCompleteRef.current = onComplete

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (canvas.width !== w) canvas.width = w
    if (canvas.height !== h) canvas.height = h
  }, [])

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    syncCanvasSize()

    const dur = durationRef.current
    const elapsed = (timestamp - startTimeRef.current) / 1000
    const spawnPhase = dur * 0.6

    if (elapsed < spawnPhase) {
      if (timestamp - spawnIntervalRef.current > 30) {
        const batch = elapsed < 0.5 ? 8 : 3
        for (let i = 0; i < batch; i++) {
          particlesRef.current.push(createParticle(canvas.width, canvas.height))
        }
        spawnIntervalRef.current = timestamp
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const fadeStart = dur * 0.7
    const globalAlpha = elapsed > fadeStart
      ? Math.max(0, 1 - (elapsed - fadeStart) / (dur - fadeStart))
      : 1

    particlesRef.current = particlesRef.current.filter(p => {
      p.vy += p.gravity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.wobble = Math.sin(p.phase + elapsed * p.wobbleSpeed * 60) * 2
      p.x += p.wobble * 0.3
      p.vx *= 0.995

      if (p.y > canvas.height + 50) return false

      ctx.save()
      ctx.globalAlpha = p.opacity * globalAlpha
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height)
      ctx.restore()

      return true
    })

    if (elapsed < dur) {
      animFrameRef.current = requestAnimationFrame(animate)
    } else {
      setVisible(false)
      onCompleteRef.current?.()
    }
  }, [syncCanvasSize])

  useEffect(() => {
    if (!trigger) {
      particlesRef.current = []
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = 0
      }
      setVisible(false)
      return
    }

    setVisible(true)

    requestAnimationFrame(() => {
      syncCanvasSize()

      const canvas = canvasRef.current
      if (!canvas) return

      particlesRef.current = []
      startTimeRef.current = performance.now()
      spawnIntervalRef.current = 0

      for (let i = 0; i < 40; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height))
      }

      animFrameRef.current = requestAnimationFrame(animate)
    })

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = 0
      }
    }
  }, [trigger, animate, syncCanvasSize])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    />
  )
}
