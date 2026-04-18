# HR Workflow Designer

## Project Overview

This project is a prototype HR workflow designer built for the Tredence AI Engineering internship case study. It demonstrates a typed React Flow graph editor, schema-driven node configuration, MSW-backed mock APIs, graph validation, and workflow simulation in a single modular frontend.

## Tech Stack

| Library | Purpose | Why I chose it |
| --- | --- | --- |
| React 18 + TypeScript | UI and type safety | The case study explicitly evaluates component architecture, correctness, and strict typing. |
| Vite 5 | Build tool | Minimal setup, fast HMR, and the preferred toolchain in the brief. |
| `@xyflow/react` | Workflow canvas | Provides the graph primitives, connection model, MiniMap, and Controls required for the exercise. |
| Zustand | Shared state | Keeps canvas and form state centralized without Redux boilerplate. |
| React Hook Form + Zod | Dynamic forms and validation | Supports a schema-driven `NodeFormRenderer` pattern instead of one-off forms per node type. |
| MSW 2 | Mock API layer | Intercepts real `fetch()` calls and keeps API behavior close to production. |
| Tailwind CSS | Styling | Makes it easy to keep the UI polished without scattering custom CSS files. |

## Architecture Overview

The app is split into three main layers. The canvas layer lives in `src/components/Canvas.tsx` plus `src/nodes/*` and owns React Flow interactions such as drag/drop, connect, and selection. The form layer lives in `src/forms/*` and uses a registry plus a generic `NodeFormRenderer` so each node type is described by fields and a schema instead of bespoke form components. The API and simulation layer lives in `src/api/*`, `src/mocks/*`, and `src/hooks/useSimulation.ts`, where MSW handlers, workflow validation, and simulation orchestration are isolated from rendering concerns.

## Key Design Decisions

- I used a node registry (`src/forms/nodeRegistry.ts`) so new node types are added by configuration instead of editing a switch-heavy form container.
- I kept workflow graph state in Zustand because the same data powers React Flow, the editor panel, validation badges, and import/export.
- I chose MSW over a local JSON file because the case study explicitly values realistic async behavior and typed API boundaries.
- I attached validation issues directly to node data so the canvas can surface graph problems where the user is already looking.
- I included import/export JSON because it is a low-effort, high-signal feature that shows workflow serialization thinking.

## How to Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

For a quick verification pass:

```bash
npm run type-check
npm run test
npm run build
```

## What I Completed

- Five custom node types with correct handle placement.
- Drag-from-sidebar node creation on the canvas.
- Zustand-backed graph editing and node selection.
- Schema-driven node configuration with React Hook Form + Zod.
- MSW-backed `/api/automations` and `/api/simulate` endpoints.
- Workflow validation for start/end counts, orphan nodes, reachability, and cycles.
- Simulation timeline plus JSON import/export.
- Polished single-page UI with React Flow `MiniMap` and `Controls`.

## What I Would Add With More Time

- Unit tests around validation and workflow serialization.
- Undo/redo history with a temporal Zustand middleware.
- Richer simulation behavior based on graph topology instead of a simple ordered replay.
- Better parameter editing UX for dynamic automation actions.
- Persisted storage so a workflow survives a refresh.

## Known Limitations

- The automation parameter editor currently uses a generic key/value UI, which is flexible but not fully specialized per action.
- The simulation API returns a mocked linear replay instead of computing true branch execution semantics.
- Importing malformed JSON is not guarded by a full schema validation layer yet.
- The app is frontend-only and relies on MSW in development mode for mocked network behavior.
