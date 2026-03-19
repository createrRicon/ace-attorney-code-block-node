import { create } from 'zustand'
import { Evidence, CourtRecord } from '../types'

interface EvidenceStore extends CourtRecord {
  // 证据选择器是否打开
  isSelectorOpen: boolean
  // 证据详情是否打开
  isDetailOpen: boolean

  // Actions
  setEvidences: (evidences: Evidence[]) => void
  setSelectedEvidence: (evidenceId: string | null) => void
  toggleSelector: () => void
  openSelector: () => void
  closeSelector: () => void
  openDetail: (evidenceId: string) => void
  closeDetail: () => void
  unlockEvidence: (evidenceId: string) => void
  hasEvidence: (evidenceId: string) => boolean
}

export const useEvidenceStore = create<EvidenceStore>((set, get) => ({
  evidences: [],
  selectedEvidenceId: null,
  isSelectorOpen: false,
  isDetailOpen: false,

  setEvidences: (evidences) => set({ evidences }),

  setSelectedEvidence: (evidenceId) => set({ selectedEvidenceId: evidenceId }),

  toggleSelector: () =>
    set((state) => ({ isSelectorOpen: !state.isSelectorOpen })),

  openSelector: () => set({ isSelectorOpen: true }),

  closeSelector: () => set({ isSelectorOpen: false }),

  openDetail: (evidenceId) =>
    set({ isDetailOpen: true, selectedEvidenceId: evidenceId }),

  closeDetail: () => set({ isDetailOpen: false }),

  unlockEvidence: (evidenceId) =>
    set((state) => ({
      evidences: state.evidences.map((e) =>
        e.id === evidenceId ? { ...e, unlocked: true } : e
      ),
    })),

  hasEvidence: (evidenceId) => {
    const evidence = get().evidences.find((e) => e.id === evidenceId)
    return evidence?.unlocked ?? false
  },
}))
