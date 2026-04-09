# TODOS.md

This file tracks deferred work and future improvements for the Visual Novel Engine.

---

## High Priority

### Save/Load System
**What:** Implement manual save/load functionality with multiple save slots using localStorage.

**Why:** Visual novels need save functionality — players can't complete a story in one sitting. This is a core expectation for the genre.

**Pros:**
- Essential for user experience
- Allows players to explore different branches
- Standard feature for visual novels

**Cons:**
- Requires state serialization logic
- Need UI for save slot management
- localStorage has size limits (5-10MB)

**Context:** Currently, refreshing the page loses all progress. Need to serialize:
- `gameStore` state (sceneId, lineId, evidence, flags)
- `dialogueStore` history (optional, for "rewind" feature)
- Timestamp and slot metadata

**Effort:** M (human: 2-3 days / CC+gstack: ~30 min)
**Priority:** P1

---

## Medium Priority

### Sound Engine
**What:** Add BGM, SFX, and voice line support with fade transitions.

**Why:** Audio is critical for immersion in visual novels. The current game is completely silent.

**Pros:**
- Dramatically improves user experience
- BGM transitions can signal scene changes
- Voice lines add character personality

**Cons:**
- Need audio assets (music, voice recordings)
- Browser autoplay policies complicate implementation
- Audio file size affects bundle

**Context:** Design an `AudioManager` class that handles:
- BGM playback with crossfade
- SFX triggers (objection, present evidence, etc.)
- Voice line playback per character
- Volume controls (master, BGM, SFX, voice)

**Effort:** M (human: 2-3 days / CC+gstack: ~45 min)
**Priority:** P2

---

### Auto-Save
**What:** Automatically save progress on scene transitions.

**Why:** Prevents frustration from accidental browser closure or crashes.

**Pros:**
- Transparent to user
- Safety net for progress loss

**Cons:**
- Depends on Save/Load System first
- Need to handle localStorage full scenarios

**Context:** Auto-save should:
- Trigger on every scene change
- Keep 1-3 auto-save slots (rotate)
- Show "Auto-saved" toast notification

**Effort:** S (human: 1-2 hours / CC+gstack: ~15 min)
**Priority:** P2
**Depends on:** Save/Load System

---

## Low Priority

### Text Skip on Hold
**What:** Holding space bar skips typewriter effect; releasing resumes normal speed.

**Why:** Standard visual novel feature for re-reading dialogue.

**Pros:**
- Expected by VN players
- Easy to implement

**Cons:**
- Low value for first-time players

**Effort:** S (human: 1-2 hours / CC+gstack: ~15 min)
**Priority:** P3

---

### Test Coverage
**What:** Add unit, integration, and E2E tests.

**Why:** Currently has zero test coverage. This is a gap for a portfolio project.

**Pros:**
- Demonstrates testing best practices
- Catches regressions

**Cons:**
- Time-consuming for a solo project
- Game logic is relatively simple

**Context:** Start with:
- Unit tests for `DialogueEngine.next()` edge cases
- Integration tests for cross-scene flow
- Component tests for `TypewriterText`

**Effort:** L (human: 3-5 days / CC+gstack: ~2 hours)
**Priority:** P3

---

## Infrastructure / Developer Experience

### Export as npm Package
**What:** Extract the engine into a reusable npm package.

**Why:** Could be used for other visual novel projects; demonstrates library authoring skills.

**Pros:**
- Reusable across projects
- Strong portfolio signal

**Cons:**
- Requires API documentation
- Version management overhead
- May be over-engineering for current needs

**Effort:** L (human: 1-2 weeks / CC+gstack: ~3 hours)
**Priority:** P2

---

### Story Editor
**What:** Visual editor for creating dialogue without editing JSON/TS files.

**Why:** Content creators (non-developers) could write stories.

**Pros:**
- Enables collaboration with writers
- Useful portfolio project (shows full-stack skills)

**Cons:**
- Significant frontend work
- Need to design file format for export

**Effort:** XL (human: 2-3 weeks / CC+gstack: ~6 hours)
**Priority:** P3

---

## Architecture Notes

### Kept As-Is (User Decision)

The following issues were discussed but explicitly kept as-is per user preference:

1. **InteractionManager** — Thin wrapper kept as abstraction layer
2. **Dialogue History Unlimited** — No size limit; modern browser memory deemed sufficient
3. **Store-Engine Circular Calls** — Current pattern acceptable for project size
4. **Error Boundaries for User-Facing Errors** — MVP stage, acceptable to have minimal error handling

---

## Completed Items

*(Items removed from this list when completed)*

- ✅ ~~Debug Log Cleanup~~ (Accepted for current scope)
- ✅ ~~Evidence Presentation Logic~~ (Accepted for current scope)
- ✅ ~~Dialogue Log Viewer~~ (Accepted for current scope)
- ✅ ~~Error Boundaries~~ (Accepted for current scope)
- ✅ ~~Remove Duplicate Components~~ (Accepted for current scope)
- ✅ ~~Empty State UI~~ (Accepted for current scope)
