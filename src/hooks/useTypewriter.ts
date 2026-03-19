import { useState, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  onComplete?: () => void
}

/**
 * 打字机效果 Hook
 */
export const useTypewriter = ({ text, speed = 50, onComplete }: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const startTyping = useCallback(() => {
    setIsTyping(true)
    setIsComplete(false)
    setDisplayText('')

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setIsTyping(false)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, onComplete])

  const skipTyping = useCallback(() => {
    setDisplayText(text)
    setIsTyping(false)
    setIsComplete(true)
    onComplete?.()
  }, [text, onComplete])

  return {
    displayText,
    isTyping,
    isComplete,
    startTyping,
    skipTyping,
  }
}
