# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A visual novel game engine inspired by *Ace Attorney* (逆转裁判), featuring dialogue systems, evidence collection, and courtroom-style interactions. Built with React + TypeScript + Vite, using Zustand for state management, Framer Motion for animations, and Tailwind CSS for styling.

## Development Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # TypeScript compile + Vite build
npm run preview  # Preview production build
npm run lint     # ESLint with TypeScript rules
```

## Architecture

### Core Engine (`src/engine/`)

**DialogueEngine** - Singleton dialogue flow manager
- `loadScene()` - Load a scene and set start dialogue
- `next()` - Advance to next dialogue (auto-crosses scene boundaries)
- `makeChoice()` - Handle branch selection
- `handleInteraction()` - Process objection/present-evidence interactions
- `registerScene()` - Register scenes for cross-scene dialogue lookup

**InteractionManager** - Wrapper for courtroom interactions
- `object()` - Trigger objection
- `presentEvidence()` - Present evidence for contradiction
- `crossExamine()` - Cross-examination

**GameEngine** - React component that orchestrates all UI rendering, handles global keyboard events (spacebar to advance), initializes game with all scenes registered.

### State Management (`src/store/`)

Three Zustand stores:

- **gameStore** - Global game state (currentSceneId, currentLineId, collectedEvidenceIds, completedScenes, flags)
- **dialogueStore** - Dialogue state (currentLine, history, typing effects)
- **evidenceStore** - Evidence system (evidences list, selector/detail open states)

### Type System (`src/types/`)

- **dialogue.ts** - CharacterId types (likang, snow, ll, poet, zhang, wang, chen, narrator), ExpressionType, DialogueLine structure, InteractionTrigger
- **scene.ts** - SceneData, GameState
- **evidence.ts** - Evidence, CourtRecord

### Component Structure (`src/components/`)

- **dialogue/** - TypewriterText, ContinuePrompt, ChoiceButtons, CharacterPortrait
- **effects/** - ScreenShake, FlashEffect, SpeedLines, ObjectionPopup
- **interaction/** - ObjectionButton, TestimonyHighlight, EvidenceSelector, CourtRecordButton
- **figma/** - Design-accurate components (CourtDialogueBox, SceneBackground, CharacterSprite, EvidenceCard, InfoPanel, etc.)
- **ui/** - GameLayout

### Game Content (`src/data/`)

- **scenes/** - Five acts: act1_commission, act2_rejection, act3_investigation, act4_turnaround, act5_verdict
- **evidences.ts** - Evidence definitions
- **characters/** - Character configurations

## Key Patterns

### Cross-Scene Dialogue Flow
Dialogues connect via `nextLineId`. The DialogueEngine searches ALL registered scenes for the next line, enabling seamless scene transitions without manual switching code.

### Interaction System
A dialogue line can have an `interactionTrigger` that specifies:
- Type (objection, present-evidence, cross-examination)
- Required evidence ID
- Success/failure dialogue line IDs

### Evidence Unlocking
Scenes define `unlockEvidence[]` - evidence IDs are added to the game store when the scene loads.

### Path Aliases
`@/*` maps to `./src/*` (configured in tsconfig.json)

### Styling
- Tailwind CSS for all styling
- Figma components use precise pixel positioning (e.g., `left-[3.5%]`, `h-[896px]`)
- Dialogue text uses `.court-dialogue-text` class (monospace font)
- Name tags use `.court-name-tag` class
