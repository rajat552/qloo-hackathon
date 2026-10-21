# The Taste-Evolving Concierge 🧠✨

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Qloo Taste AI](https://img.shields.io/badge/Cultural%20AI-Qloo%20v2%20API-FF4081?style=for-the-badge)](https://qloo.com/)
[![Render](https://img.shields.io/badge/Render-Live%20Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://tastehub-api.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **An Autonomous Lifestyle AI Agent with Persistent Hybrid Graph-Vector Cultural Memory & Live Qloo Taste Intelligence™**  
> **Production API**: [https://tastehub-api.onrender.com](https://tastehub-api.onrender.com) • **Interactive OpenAPI Documentation**: [https://tastehub-api.onrender.com/docs](https://tastehub-api.onrender.com/docs)

---

## 🌟 Executive Summary & Problem Statement

Modern generative AI recommendation systems suffer from **cognitive amnesia and taste degradation**:

1. **Session Amnesia**: Every session starts from zero. Standard assistants cannot track the longitudinal evolution of what cultural touchstones an individual connected with last week or three months ago.
2. **Mainstream Cliché Convergence**: When queried for dining, reading, or travel recommendations, standard LLMs default to top-10 commercial crowd-pleasers because they lack empirical cultural correlation intelligence.
3. **Cross-Category Blind Spots**: Traditional AI cannot statistically evaluate *why* an affinity for an understated A24 indie film (*Past Lives*) and speculative sci-fi (*Neuromancer*) correlates with analog vinyl kissaten coffee lounges and low-intervention natural wine bars.

### 💡 The Solution: The Taste-Evolving Concierge

**The Taste-Evolving Concierge** transforms AI from an ephemeral chatbot into an autonomous cultural partner with **lifelong memory** and **quantified taste**:

- **Persistent Directed Taste Knowledge Graph**: Chronologically records user cultural milestones across 6 domains: **Cinema, Music, Literature, Dining, Travel, and Fashion**.
- **Autonomous Multi-Step Agentic Pipeline**: Decomposes user goals, traverses historical graph memory, invokes live Qloo correlation tools (`/v2/insights`, `/v2/search`), and synthesizes aesthetic harmony with a transparent 4-step execution trace.
- **Live Cultural Intelligence Integration**: Directly connects to Qloo's Taste AI™ API (`https://hackathon.api.qloo.com`) to query empirical cross-category affinity over-indexing (e.g., 3.9x–4.4x above baseline) and localized venue recommendations.
- **City Experience Concierge**: Traverses graph memory to synthesize bespoke 4-part day blueprints (Morning, Afternoon, Evening, Night) for design capitals (*Kyoto, London, Tokyo, Paris, Berlin, New York*) using real Qloo places.
- **Taste Validator & Serendipity Engine**: Validates prospective lifestyle choices against the user's graph and provides deliberate, high-quality counterpoints to break algorithmic filter bubbles.
- **Closed Agentic Feedback Loop**: Every recommendation card features an immediate `+ Add to Graph` action that instantly incorporates the discovery into the user's active taste graph.

---

## 📸 Visual Product Showcase

### 1. Persistent Taste Knowledge Graph & Dynamic Persona Archetype
Chronologically maps cultural touchstones across time, automatically computing the user's active archetype signature (*"Contemplative Urbanite & Speculative Aesthete"*) with cross-domain cohesion scoring.

![Persistent Taste Knowledge Graph](docs/screenshots/01_taste_graph.png)

---

### 2. City Experience Concierge (Localized Lifestyle Blueprint)
Cross-references multi-domain graph memory with local cultural venues to synthesize an immersive 4-part day itinerary (Morning Audio Ritual, Afternoon Atelier, Evening Natural Wine Bar, Night Ambient Lounge) with verified place details.

![City Experience Concierge](docs/screenshots/02_city_mode.png)

---

### 3. Conversational Concierge with 4-Step Agentic Reasoning Trace
Exposes the agent's internal multi-step execution pipeline: Goal Decomposition $\rightarrow$ Memory Graph Traversal $\rightarrow$ Live Qloo Tool Invocation $\rightarrow$ Aesthetic Harmony Synthesis.

![Conversational Concierge with Reasoning Trace](docs/screenshots/03_concierge_agent.png)

---

### 4. Taste Validator & Cultural Resonance Engine
Validates prospective lifestyle choices against the active taste graph using live entity resolution and Qloo affinity metrics, generating nuanced cultural critique and compatibility rationale.

![Taste Validator Result](docs/screenshots/04_taste_validator.png)

---

### 5. Smart Aesthetic Archive & Discovery Search
Enables natural language querying across personal style archives and verified Qloo entities, dynamically displaying the user's chromatic and occasion signature alongside verified matches.

![Smart Aesthetic Archive Search](docs/screenshots/05_smart_search.png)

---

## 🏗️ System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                REACT 18 + TYPESCRIPT FRONTEND                          │
│   [Taste Graph View]  [Concierge Agent]  [City Mode]  [Cross-Domain]  [Taste Validator]│
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTP / REST (JSON)
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                             FASTAPI AGENTIC BACKEND (:8000)                            │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                     AUTONOMOUS AGENT ORCHESTRATOR                              │   │
│   │                                                                                │   │
│   │   [Step 1] Goal Decomposition & Intent Extraction (Domains, Entities, Cities)  │   │
│   │       │                                                                        │   │
│   │   [Step 2] Persistent Taste Graph Memory Traversal (Longitudinal Milestones)   │   │
│   │       │                                                                        │   │
│   │   [Step 3] Tool Invocation: Qloo Taste AI API Client                           │   │
│   │       │    - GET /v2/insights (signal.interests.entities, filter.type)         │   │
│   │       │    - GET /v2/search (live entity autocomplete & cover images)          │   │
│   │       │                                                                        │   │
│   │   [Step 4] Aesthetic Harmony Synthesis (Cross-Category Affinity Scoring)       │   │
│   └───────────────────────────────────────┬────────────────────────────────────────┘   │
│                                           │                                            │
│   ┌───────────────────────────────────────▼────────────────────────────────────────┐   │
│   │                       PERSISTENT HYBRID MEMORY LAYER                           │   │
│   │   - Directed Taste Knowledge Graph (Nodes, Edges, Temporal Milestones)         │   │
│   │   - Qdrant Vector Client (Semantic Text Embeddings & Fallback Archive)         │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTPS (X-Api-Key)
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                    QLOO CULTURAL INTELLIGENCE API (v2 Production)                      │
│                           https://hackathon.api.qloo.com                               │
│              Movies • Music Artists • Books • Cultural Places • Brands                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Live Qloo Cultural Intelligence Integration

The platform connects to Qloo's Taste AI™ API to ground every recommendation in empirical data:

### 1. Live Entity Resolution (`GET /v2/search`)
- Resolves raw input strings into canonical cultural entities with unique IDs, categories, and cover imagery.
- Normalizes entities across cinema, musical artists, literature, dining places, and lifestyle brands.

### 2. Cross-Domain Cultural Affinity Insights (`GET /v2/insights`)
- Uses active memory milestone IDs as affinity seeds (e.g., *Past Lives* `9a62b37e...`, *Slowdive* `203a956d...`).
- Queries affinity over-indexing against target domains via standard category URNs:
  - Cinema: `urn:entity:movie`
  - Music: `urn:entity:artist`
  - Literature: `urn:entity:book`
  - Dining & Places: `urn:entity:place`
  - Fashion & Design: `urn:entity:brand`
- Supports localized destination filtering via `filter.location.query`.

### 3. Real-Time Latency Probe (`/api/qloo/status`)
- Continuously pings the Qloo server to measure response latency (typically 80ms–140ms).
- Live connectivity status is monitored and displayed in the frontend navigation bar.

---

## 📡 API Endpoints Reference

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | Health check, active credentials status, and live Qloo latency probe |
| `/api/qloo/status` | `GET` | Real-time Qloo server ping, latency (ms), and connection status |
| `/api/qloo/search` | `GET` | Direct cultural entity search via live Qloo API (`query`, `limit`) |
| `/api/qloo/insights` | `GET` | Live cross-domain correlation query (entities + category URN) |
| `/api/memory/graph` | `GET` | Full directed taste graph (nodes, edges, persona archetype) |
| `/api/memory/add-node` | `POST` | Ingests a new milestone into graph with live Qloo resolution |
| `/api/concierge/chat` | `POST` | Autonomous agentic conversational reasoning with 4-step trace |
| `/api/concierge/city-itinerary` | `POST` | Synthesizes localized 4-part day blueprints worldwide |
| `/api/concierge/cross-domain-synthesis` | `POST` | Blends multiple domains into cohesive aesthetic profiles |
| `/search` | `POST` | Natural language semantic search across aesthetic archive & Qloo entities |
| `/choice-approval` | `POST` | AI taste validation using live Qloo entity resolution and graph scoring |
| `/anti-recommendations` | `POST` | Serendipity Engine: high-uniqueness aesthetic counterpoints |

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### Step 1: Clone Repository & Configure Environment
```bash
git clone https://github.com/rajat552/qloo-hackathon.git
cd qloo-hackathon
cp .env.example .env
```

Edit `.env` to insert your credentials:
```ini
# Qloo Cultural Intelligence API
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://hackathon.api.qloo.com

# Frontend API Target (Set to your live Render URL or local port)
VITE_API_URL=https://tastehub-api.onrender.com
PORT=8000
```

### Step 2: Start Backend (FastAPI)
```bash
pip install -r requirements.txt
python app.py
```
- Local Server: `http://127.0.0.1:8000`
- Interactive OpenAPI / Swagger Docs: `http://127.0.0.1:8000/docs`

### Step 3: Start Frontend (React + Vite)
In a second terminal:
```bash
npm install
npm run dev
```
- Local Application: `http://localhost:5173`

---

## 🚀 Cloud Deployment

### Backend Deployment (Render / Railway)
- **Render**: Pre-configured via `render.yaml`.
- **Railway**: Pre-configured via `Procfile` (`web: uvicorn app:app --host 0.0.0.0 --port $PORT`).
- **Environment Variables**:
  - `QLOO_API_KEY`: `<your_qloo_key>`
  - `QLOO_BASE_URL`: `https://hackathon.api.qloo.com`
  - `PYTHON_VERSION`: `3.10.12`

### Frontend Deployment (Vercel)
- **Framework Preset**: `Vite` (pre-configured via `vercel.json`)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://tastehub-api.onrender.com`

---

## 🔒 Security & Privacy

- All API keys and secrets are loaded securely from environment variables and excluded from version control via `.gitignore`.
- Production bundles contain zero hardcoded credentials or API keys.
- Robust offline fallbacks ensure the application functions smoothly under any network condition.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
