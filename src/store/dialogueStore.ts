import { create } from 'zustand'
import { DialogueLine } from '../types'

interface DialogueStore {
  // 对话历史
  history: DialogueLine[]
  // 当前对话行
  currentLine: DialogueLine | null
  // 是否正在打字
  isTyping: boolean
  // 是否显示完整文本（跳过打字效果）
  showFullText: boolean
  // 对话框是否可见
  isVisible: boolean

  // Actions
  setCurrentLine: (line: DialogueLine | null) => void
  addToHistory: (line: DialogueLine) => void
  setTyping: (isTyping: boolean) => void
  setShowFullText: (show: boolean) => void
  setVisible: (visible: boolean) => void
  clearHistory: () => void
}

export const useDialogueStore = create<DialogueStore>((set) => ({
  history: [],
  currentLine: null,
  isTyping: false,
  showFullText: false,
  isVisible: true,

  setCurrentLine: (line) => set({ currentLine: line }),

  addToHistory: (line) =>
    set((state) => ({
      history: [...state.history, line],
    })),

  setTyping: (isTyping) => set({ isTyping }),

  setShowFullText: (show) => set({ showFullText: show }),

  setVisible: (visible) => set({ isVisible: visible }),

  clearHistory: () => set({ history: [] }),
}))
