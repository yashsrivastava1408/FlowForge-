# FlowForge — HR Workflow Designer

## Project Overview

A prototype HR workflow designer built for the Tredence AI Engineering internship case study. It demonstrates a typed React Flow graph editor, schema-driven node configuration panels, MSW-backed mock APIs, graph validation with cycle detection, animated workflow simulation, and a full suite of professional UX features — all built as a modular, extensible frontend.

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React + TypeScript | 18.3 / 5.6 | UI framework with strict type safety (`strict: true` in tsconfig) |
| Vite | 5.4 | Build tool — fast HMR, preferred by the case study brief |
| `@xyflow/react` | 12.8 | Workflow canvas — custom nodes, edge management, MiniMap, Controls |
| Zustand | 5.0 | Centralized state — powers canvas, forms, simulation, and history without Redux boilerplate |
| React Hook Form + Zod | 7.53 / 3.23 | Schema-driven form renderer with compile-time validation — no switch-case anti-pattern |
| MSW | 2.6 | Mock Service Worker — intercepts real `fetch()` calls at the network layer, not static JSON files |
| Tailwind CSS | 3.4 | Utility-first styling with design tokens for spacing and color consistency |
| Framer Motion | 12.38 | Page transitions, node animations, and animated simulation glow effects |
| Vitest | 4.1 | Unit tests for graph validation logic (BFS reachability, cycle detection, orphan checks) |

## Architecture Overview

The application is separated into three layers:

**Canvas Layer** (`src/components/Canvas.tsx` + `src/nodes/*`)  
Handles React Flow interactions: drag-and-drop from sidebar, node connections, selection state, and custom edge rendering with editable labels. Each of the five node types extends a shared `BaseNode<T>` component that handles handles, status indicators, simulation glow, and conditional branching.

**Form Layer** (`src/forms/*` + `src/forms/schemas/*`)  
Uses a registry pattern (`nodeRegistry.ts`) where each node type is described by a `FieldConfig[]` array and a Zod schema. The generic `NodeFormRenderer` reads this config and renders the correct fields — adding a new node type never requires editing the form renderer. The `useNodeForm` hook enriches form fields dynamically (e.g., fetching automation actions from the mock API for dropdown options).

**API & Simulation Layer** (`src/api/*` + `src/mocks/*` + `src/hooks/useSimulation.ts`)  
MSW handlers serve `GET /api/automations` (typed action list) and `POST /api/simulate` (step-by-step execution result). The simulation hook validates the workflow graph (start/end counts, orphan detection, BFS reachability, DFS cycle detection) before calling the API, then walks through nodes sequentially to produce an animated execution trace.

## Folder Structure

```
src/
├── api/                  # API abstraction layer
│   ├── handlers.ts       # MSW request handlers
│   └── workflowApi.ts    # Typed fetch functions
├── components/           # Shared UI components
│   ├── Canvas.tsx        # React Flow wrapper with custom edges
│   ├── LabeledEdge.tsx   # Editable connection labels
│   ├── Sidebar.tsx       # Draggable node palette with search
│   ├── SimulationPanel.tsx  # Execution trace + summary card
│   ├── ValidationBadge.tsx  # 3-state live validation indicator
│   └── layout/
│       └── AppShell.tsx  # App shell with dark/light mode toggle
├── forms/                # Node configuration system
│   ├── NodeFormPanel.tsx  # Container that maps selection → form
│   ├── NodeFormRenderer.tsx  # Generic schema-driven form renderer
│   ├── nodeRegistry.ts   # Registry mapping node types → schemas
│   └── schemas/          # Per-node Zod schemas + field configs
│       ├── startSchema.ts
│       ├── taskSchema.ts
│       ├── approvalSchema.ts
│       ├── automatedStepSchema.ts
│       └── endSchema.ts
├── hooks/                # Custom React hooks
│   ├── useAutomations.ts      # Fetches automation actions
│   ├── useKeyboardShortcuts.ts # Delete, ⌘D, ⌘E
│   ├── useNodeForm.ts         # Enriches fields with API data
│   ├── useSimulation.ts       # Validation + animated execution
│   ├── useSimulation.test.ts  # Unit tests for graph validation
│   └── useWorkflowStore.ts    # Zustand selector hook
├── mocks/                # MSW mock data
│   ├── automations.ts
│   └── browser.ts
├── nodes/                # Custom React Flow node components
│   ├── BaseNode.tsx      # Shared base with glow, warnings, branching
│   ├── StartNode.tsx
│   ├── TaskNode.tsx
│   ├── ApprovalNode.tsx
│   ├── AutomatedStepNode.tsx
│   ├── EndNode.tsx
│   └── index.ts          # nodeTypes map export
├── store/
│   └── workflowStore.ts  # Zustand store (state + 15 actions)
├── types/
│   ├── api.ts            # API response types
│   └── workflow.ts       # Node data interfaces + generics
├── views/
│   ├── Dashboard.tsx     # Landing page (SpaceX-themed overview)
│   └── DesignerView.tsx  # Main workspace with all tooling
├── workflowDefaults.ts   # Initial node data + positions
└── workflowTemplates.ts  # 3 pre-built workflow templates
```

## Key Design Decisions

- **Schema-driven forms over switch-case**: I built `NodeFormRenderer` to accept a `FieldConfig[]` and Zod schema. Adding a 6th node type requires adding one schema file and one registry entry — zero changes to the form renderer itself.
- **Zustand over Context/Redux**: The same store powers React Flow, the form panel, validation badges, simulation state, version history, and import/export. Zustand's `useShallow` selector prevents unnecessary re-renders.
- **MSW over JSON server**: MSW intercepts real `fetch()` calls at the Service Worker level. This keeps async behavior realistic and demonstrates production-grade mocking knowledge.
- **Validation issues on node data**: I attach `validationIssues[]` directly to each node's data so the canvas can surface graph problems (amber warning dots, error bars) exactly where the user is looking.
- **BFS/DFS for graph validation**: Reachability uses BFS from the Start node; cycle detection uses DFS with grey/white/black coloring. These are standard graph algorithms that prove CS fundamentals.
- **Conditional branching**: Approval nodes have dual output handles (Approved/Rejected) to model real HR decision paths, not just linear flows.

## How to Run

```bash
git clone <repo-url>
cd hr-workflow-designer
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (typically `http://localhost:5173`).

**Verification commands:**

```bash
npm run type-check   # TypeScript strict check — 0 errors
npm run test         # Vitest unit tests for graph validation
npm run build        # Production build
```

## What I Completed

### Core Requirements (Case Study Brief)
- Five custom node types (Start, Task, Approval, Automated Step, End) with correct handle placement
- Drag-from-sidebar node creation on the canvas
- Schema-driven node configuration with React Hook Form + Zod validation
- MSW-backed `GET /api/automations` and `POST /api/simulate` endpoints
- Dynamic automation form: dropdown fetches from API, params change per action
- Graph validation: start/end counts, orphan detection, BFS reachability, DFS cycle detection
- Simulation panel with step-by-step execution trace
- Unit tests for validation logic (valid path, orphan detection, cycle detection)

### Bonus Features (Beyond Rubric)
- **Export / Import JSON** — serialize and restore entire workflows
- **3 Workflow Templates** — Employee Onboarding, Leave Approval, Document Verification (one-click load)
- **Auto Layout** — BFS-based DAG arrangement button
- **Version History** — timestamped snapshots saved before each simulation, restorable
- **Dark / Light Mode Toggle** — full theme switching across all components
- **Keyboard Shortcuts** — Delete (remove node), ⌘D (duplicate), ⌘E (export) with floating tooltip
- **Animated Simulation** — nodes glow sequentially as the simulation walks through the graph
- **Connection Labels** — click any edge to add editable labels ("Approved", "Rejected")
- **Conditional Branching** — Approval nodes have dual output handles (✓ Yes / ✕ No)
- **Validation Warnings on Nodes** — amber warning dot + error bar directly on the canvas node
- **3-State Status Indicator** — 🔴 Invalid / 🟡 Incomplete / 🟢 Ready to Run (live)
- **Node Duplicate Button** — copy any node with all its data to a nearby position
- **Live Node Count Badge** — "5 nodes · 4 edges · Valid" updates in real-time
- **Collapsible Sidebar** — toggle arrow to maximize canvas space
- **Node Search / Filter** — type in sidebar to filter node palette
- **Workflow Summary Card** — total nodes, estimated days, bottleneck step, human vs automated count
- **PWA Offline Support** — manifest.json + service worker for installability

## What I Would Add With More Time

- **Storybook** — document the 5 node components with different states (empty, filled, selected, error)
- **E2E tests** — Playwright tests for drag-drop, connect, and simulate flows
- **WebSocket simulation** — real-time progressive execution instead of batched replay
- **Persisted storage** — save workflows to localStorage or IndexedDB so they survive page refresh
- **Drag-to-reorder** — native HTML5 DnD for key-value param pairs in the Automated Step form
- **Per-branch simulation** — execute the Approved vs Rejected path independently in conditional flows

## Known Limitations

- The simulation API returns a mocked linear replay sorted by Y-position rather than computing true branch execution semantics from the graph topology.
- The automation parameter editor uses a generic key-value UI. A fully specialized form per action (e.g., email composer for `send_email`) would improve UX but was out of scope.
- Importing malformed JSON is not guarded by a full schema validation layer — a production version would validate against the `WorkflowSnapshot` Zod schema.
- The app is frontend-only and relies on MSW in development mode for mocked network behavior.
- Dark mode applies to the shell and landing page; some inner workspace components use hardcoded dark tokens.

## Assessment Criteria Mapping

| Area | Implementation |
|------|---------------|
| **React Flow proficiency** | 5 custom nodes, correct handles, custom `LabeledEdge`, conditional branching, MiniMap, Controls |
| **React architecture** | Zustand store, 6 custom hooks, clean folder separation, no prop drilling |
| **Complex form handling** | Schema-driven `NodeFormRenderer`, `FieldConfig[]` + Zod, dynamic fields from API |
| **Mock API interaction** | MSW 2.x, typed request/response, async error handling, loading states |
| **Scalability** | New node type = 3-file change. NodeFormRenderer never needs editing. |
| **Communication** | This README, architecture notes, honest limitations |
| **Delivery speed** | Core + 17 bonus features shipped and tested |
