import { useEffect } from 'react'

interface ScreenShakeProps {
  trigger: boolean
  intensity?: number
  duration?: number
  onComplete?: () => void
  targetRef?: React.RefObject<HTMLDivElement | null>
}

/**
 * 震屏效果 — 通过 CSS transform 直接震动目标容器
 * targetRef 指向要震动的 DOM 节点（通常是游戏屏幕容器）
 */
export const ScreenShake: React.FC<ScreenShakeProps> = ({
  trigger,
  intensity = 8,
  duration = 0.45,
  onComplete,
  targetRef,
}) => {
  useEffect(() => {
    if (!trigger || !targetRef?.current) return

    const el = targetRef.current
    const totalMs = duration * 1000
    const start = performance.now()
    let raf: number

    const shake = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / totalMs, 1)
      const decay = 1 - progress

      const dx = (Math.random() - 0.5) * 2 * intensity * decay
      const dy = (Math.random() - 0.5) * 2 * intensity * decay
      el.style.transform = `translate(${dx}px, ${dy}px)`

      if (progress < 1) {
        raf = requestAnimationFrame(shake)
      } else {
        el.style.transform = ''
        onComplete?.()
      }
    }

    raf = requestAnimationFrame(shake)

    return () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [trigger, intensity, duration, onComplete, targetRef])

  return null
}
