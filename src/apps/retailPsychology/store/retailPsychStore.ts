import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RetailMood = 'calm' | 'anxious' | 'fomo'

export interface JournalEntry {
  id: string
  date: string
  followedPlan: boolean
  deviationReasons: string[]
  note: string
  tomorrowRule: string
}

export interface DisciplineRule {
  id: string
  text: string
  done: boolean
}

function todayLocal(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function yesterdayLocal(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

interface RetailPsychState {
  todayMood: RetailMood | null
  lastMoodDate: string | null
  streak: number
  journals: JournalEntry[]
  rules: DisciplineRule[]

  setTodayMood: (mood: RetailMood) => void
  addJournal: (entry: Omit<JournalEntry, 'id' | 'date'>) => void
  addRule: (text: string) => void
  removeRule: (id: string) => void
  toggleRule: (id: string) => void
}

const MAX_RULES = 8

export const useRetailPsychStore = create<RetailPsychState>()(
  persist(
    (set, get) => ({
      todayMood: null,
      lastMoodDate: null,
      streak: 0,
      journals: [],
      rules: [],

      setTodayMood: (mood) => {
        const t = todayLocal()
        const { lastMoodDate, streak } = get()
        if (lastMoodDate === t) {
          set({ todayMood: mood })
          return
        }
        let nextStreak = 1
        if (lastMoodDate === yesterdayLocal()) {
          nextStreak = streak + 1
        }
        set({
          todayMood: mood,
          lastMoodDate: t,
          streak: nextStreak,
        })
      },

      addJournal: (entry) => {
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `j-${Date.now()}`
        set((s) => ({
          journals: [
            {
              ...entry,
              id,
              date: todayLocal(),
            },
            ...s.journals,
          ].slice(0, 60),
        }))
      },

      addRule: (text) => {
        const trimmed = text.trim()
        if (!trimmed) return
        if (get().rules.length >= MAX_RULES) return
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `r-${Date.now()}`
        set((s) => ({
          rules: [...s.rules, { id, text: trimmed, done: false }],
        }))
      },

      removeRule: (id) =>
        set((s) => ({ rules: s.rules.filter((r) => r.id !== id) })),

      toggleRule: (id) =>
        set((s) => ({
          rules: s.rules.map((r) =>
            r.id === id ? { ...r, done: !r.done } : r
          ),
        })),
    }),
    {
      name: 'ace-retail-psych',
      partialize: (s) => ({
        todayMood: s.todayMood,
        lastMoodDate: s.lastMoodDate,
        streak: s.streak,
        journals: s.journals,
        rules: s.rules,
      }),
    }
  )
)
