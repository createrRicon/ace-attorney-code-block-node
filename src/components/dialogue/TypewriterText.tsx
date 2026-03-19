import React, { useState, useEffect } from 'react'
import { useDialogueStore } from '../../store'

interface TypewriterTextProps {
  text: string
  speed?: number // 每个字符的延迟（ms）
}

/**
 * 打字机效果文本组件
 * 逐字显示对话文本
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
}) => {
  const { showFullText, setTyping, setShowFullText } = useDialogueStore()
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (showFullText) {
      setDisplayText(text)
      setTyping(false)
      return
    }

    setTyping(true)
    let index = 0
    let timer: number

    const typeNext = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
        timer = window.setTimeout(typeNext, speed)
      } else {
        setTyping(false)
      }
    }

    typeNext()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [text, speed, showFullText, setTyping])

  // 点击完成打字
  const handleClick = () => {
    if (!showFullText) {
      setShowFullText(true)
    }
  }

  return (
    <p
      className="text-text-primary text-lg leading-relaxed cursor-pointer"
      onClick={handleClick}
    >
      {displayText}
    </p>
  )
}
