# Refactoring & Implementation Plan: The Taste-Evolving Concierge

**Project**: The Taste-Evolving Concierge  
**Lead Engineer**: Rajat (@rajat552)  
**Strategy**: Incremental, non-destructive refactoring preserving existing backend stability while introducing the graph-vector memory layer and multi-domain concierge frontend.

---

## 1. File-by-File Classification & Refactoring Actions

| File / Directory | Current Purpose | Classification | Identified Problem / Gap | Proposed Action | Risk & Mitigation |
|---|---|---|---|---|---|
| `app.py` | Monolithic FastAPI backend | **REFACTOR** | Single-category (fashion only), hardcoded keys, no memory layer | Enhance with Taste Graph endpoints, memory query routes, multi-domain Qloo integration, and `.env` loading. Keep existing routes backward-compatible. | Low: Keep legacy fashion routes intact while adding concierge routes. |
| `src/types.ts` | Frontend type definitions | **UPDATE** | Currently limited to fashion-specific schemas | Add schemas for `TasteNode`, `TasteEdge`, `TasteGraphData`, `ConciergeMessage`, `CityItinerary`, and `CulturalDomain`. | None: Additive only. |
| `src/services/api.ts` | Frontend API client | **UPDATE** | Connects only to fashion endpoints | Add API methods for graph inspection, memory addition, concierge chat, and city itineraries with rich demo fallback data. | None: Preserves existing fallback mechanism. |
| `src/components/Layout/Header.tsx` | App navigation header | **REFACTOR** | Fashion AI branding & single-category nav | Upgrade to *The Taste-Evolving Concierge* with icons for Graph Memory, Concierge Chat, City Mode, Cross-Domain, and Fashion. | Low: Visual and navigation update. |
| `src/components/Features/SmartSearch.tsx` | Fashion-only search | **KEEP** | Specialized in clothing catalog | Retain as the dedicated "Fashion & Aesthetic Explorer" module within the concierge. | None: Working feature. |
| `src/components/Features/TasteGraphView.tsx` | (New component) | **ADD** | No visual graph memory view exists | Build interactive SVG/HTML visualizer of the user's evolving taste graph across time and domains. | High value for hackathon judging criteria. |
| `src/components/Features/ConciergeChat.tsx` | (New component) | **ADD** | No conversational agent with memory exists | Build an interactive agent interface with real-time memory retrieval badges and Qloo reasoning citations. | Core demonstration of agentic capabilities. |
| `src/components/Features/CityItinerary.tsx` | (New component) | **ADD** | No travel/city concierge exists | Build localized recommendation engine (Tokyo, Paris, NYC, Berlin, etc.) matching taste graph. | Demonstrates cross-domain utility. |
| `src/components/Features/CulturalFusion.tsx` | Blends cultural fashion styles | **REFACTOR** | Only applies to clothing | Expand to multi-domain cultural matrix (Music + Film + Literature + Cuisine). | Low: Enhances existing UI. |
| `src/components/Features/ChoiceApproval.tsx` | Outfit evaluator | **KEEP** | Validates style choices | Retain as the "Taste Oracle" quick evaluator. | None: Preserves working code. |
| `src/App.tsx` | Main application shell | **UPDATE** | Renders fashion-centric sections | Integrate new multi-domain tabs and concierge header. | Low: Thoroughly tested with Vite. |
| `index.html` | Entry HTML document | **UPDATE** | Old project title | Update title to *The Taste-Evolving Concierge* and modern meta tags. | None. |
| `package.json` | Project configuration | **UPDATE** | Generic starter name | Update project name and description to *taste-evolving-concierge*. | None. |
| `.env.example` | Configuration template | **ADD** | Missing in repo | Create clear template documenting Qloo, Gemini, and Qdrant credentials. | None. |
| `README.md` | Project documentation | **UPDATE** | Documents old single-category fashion project | Rewrite completely to reflect *The Taste-Evolving Concierge*, architecture, and hackathon criteria. | High value for submission. |

---

## 2. Implementation Execution Phases

### Phase A: Architecture & Specification (Completed)
- [x] Project discovery and codebase audit (`docs/PROJECT_AUDIT.md`).
- [x] Ownership and branding audit (`docs/TEAM_AND_BRANDING_AUDIT.md`).
- [x] Product requirements specification (`docs/PROJECT_REQUIREMENTS.md`).
- [x] File-by-file refactoring plan (`docs/REFACTORING_PLAN.md`).
- [x] Integration and environment inventory (`docs/INTEGRATIONS_AND_ENV.md`).

### Phase B: Memory Layer & Backend Modernization
- [ ] Add `.env.example` and integrate safe environment variable loading in `app.py`.
- [ ] Implement `TasteGraph` memory module in Python:
  - Directed graph of user preferences with temporal timestamps (e.g. "January: Indie Cinema", "March: Sci-Fi Literature").
  - Semantic cross-domain bridging using Qloo cultural affinity patterns.
- [ ] Add new FastAPI endpoints:
  - `GET /api/memory/graph` &rarr; Retrieves full user taste graph (nodes and edges).
  - `POST /api/memory/add-node` &rarr; Ingests new cultural taste milestones over time.
  - `POST /api/concierge/chat` &rarr; Agentic chat reasoning using active graph recall.
  - `POST /api/concierge/city-itinerary` &rarr; Multi-domain localized travel guide (dining, culture, nightlife, literature).

### Phase C: Multi-Domain Frontend Transformation
- [ ] Update [types.ts](file:///c:/Users/LENOVO/OneDrive/Desktop/qloo%20hackathon/src/types.ts) with Graph, Concierge, and Itinerary interfaces.
- [ ] Update [api.ts](file:///c:/Users/LENOVO/OneDrive/Desktop/qloo%20hackathon/src/services/api.ts) with concierge methods and rich interactive demo dataset.
- [ ] Create `TasteGraphView.tsx`: Interactive graph and timeline visualizer showing memory evolution over time.
- [ ] Create `ConciergeChat.tsx`: Conversational AI agent with memory recall indicators.
- [ ] Create `CityItinerary.tsx`: Cross-domain destination concierge.
- [ ] Update `Header.tsx` and `App.tsx` with modern branding, sleek aesthetics, and new navigation tabs.

### Phase D: Testing, Documentation & Final Polish
- [ ] Test frontend build (`npm run build`).
- [ ] Verify both backend and frontend running seamlessly.
- [ ] Rewrite [README.md](file:///c:/Users/LENOVO/OneDrive/Desktop/qloo%20hackathon/README.md) to showcase the solution, architecture, and instructions.
- [ ] Commit changes cleanly to git.
