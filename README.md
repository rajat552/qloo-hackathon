# The Taste-Evolving Concierge 🧠✨

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Qloo Taste AI](https://img.shields.io/badge/Cultural%20AI-Qloo%20v2%20API-FF4081?style=for-the-badge)](https://qloo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **An Autonomous Lifestyle AI Agent with Persistent Hybrid Graph-Vector Cultural Memory & Live Qloo Taste Intelligence™**  
> *Submitted for the **Qloo Agentic Hackathon: "Agents, but with taste"***  
> **Solo Developer**: Rajat ([@rajat552](https://github.com/rajat552))  
> **Repository**: [https://github.com/rajat552/qloo-hackathon](https://github.com/rajat552/qloo-hackathon)

---

## 🌟 Executive Summary & Problem Statement

Current generative AI recommendation assistants suffer from **critical cognitive amnesia and taste degradation**:

1. **Session Amnesia**: Every prompt starts from zero. The AI forgets what cultural touchstones you connected with last week or three months ago.
2. **Mainstream Convergence**: When asked for travel, dining, or reading advice, standard LLMs default to top-10 TripAdvisor clichés and commercial crowd-pleasers because they lack empirical cultural correlation intelligence.
3. **Cross-Domain Blind Spots**: Large language models cannot statistically explain *why* an affinity for an understated A24 indie film (*Past Lives*) and speculative sci-fi (*Neuromancer*) statistically correlates with analog vinyl kissaten coffee lounges and low-intervention natural wine bars.

### 💡 The Solution: The Taste-Evolving Concierge

**The Taste-Evolving Concierge** transforms AI from an ephemeral chatbot into an autonomous cultural partner with **lifelong memory** and **quantified taste**:

- **Persistent Directed Taste Knowledge Graph**: Chronologically maps user cultural milestones across 6 domains: **Cinema, Music, Literature, Dining, Travel, and Fashion**.
- **Autonomous Multi-Step Agentic Pipeline**: Decomposes user goals, traverses historical graph memory, invokes live Qloo tools (`/v2/insights`, `/v2/search`), and synthesizes aesthetic harmony with a transparent 4-step execution trace.
- **Live Qloo Taste AI™ Cultural Intelligence**: Directly connects to Qloo's official Hackathon API (`https://hackathon.api.qloo.com`) to query real cross-category affinity over-indexing (e.g. 3.9x–4.4x above baseline) and localized venue recommendations.
- **City Experience Concierge (Travel Mode)**: Traverses graph memory to synthesize bespoke 4-part day blueprints (Morning, Afternoon, Evening, Night) for design capitals (*Kyoto, London, Tokyo, Paris, Berlin, New York*) using real Qloo places.
- **Taste Validator & Serendipity Engine**: Validates new prospective choices against the user's graph and provides deliberate, high-quality counterpoints to break algorithmic filter bubbles.
- **Closed Agentic Feedback Loop**: Every recommendation card features a `+ Add to Graph` action that instantly incorporates the discovery into the user's active taste graph.

---

## 🏆 Hackathon Alignment & Judging Criteria

| Criterion | Weight | How The Taste-Evolving Concierge Satisfies It |
|---|---|---|
| **Technological Implementation** | **25%** | • Live integration with official Hackathon Qloo API (`https://hackathon.api.qloo.com`) via `X-Api-Key` authentication.<br>• Dynamic endpoints: `/v2/search`, `/v2/insights` with category URNs (`urn:entity:movie`, `urn:entity:artist`, `urn:entity:book`, `urn:entity:place`, `urn:entity:brand`) and `filter.location.query`.<br>• Real-time latency probe (`/api/qloo/status`) with automatic graceful fallback.<br>• Full-stack FastAPI backend + React 18 TypeScript application with zero build errors. |
| **Taste** | **25%** | • Coherent, refined cultural sensibility across disparate domains: bridges indie auteur cinema (*Past Lives*), ambient shoegaze (*Slowdive*), hard speculative sci-fi (*Neuromancer*, *Exhalation*), analog kissaten culture, low-intervention natural wine, and minimalist Japanese tailoring.<br>• Avoids generic commercial clichés; curates nuanced, textured cultural experiences. |
| **Agentic Nature** | **25%** | • **Goal Decomposition & Intent Extraction**: Identifies target domains, entities, and destinations.<br>• **Zero Amnesia Memory Traversal**: Retrieves longitudinal milestones across months.<br>• **Autonomous Tool Invocation**: Queries live Qloo cultural correlation APIs.<br>• **Aesthetic Harmony Synthesis**: Computes affinity scores and outputs transparent 4-step execution traces.<br>• **Interactive Memory Loop**: Users can click `+ Add to Graph` on agent discoveries to immediately expand their knowledge graph. |
| **Quality of Idea & UX** | **25%** | • High-impact Neo-Brutalist pastel design system with vibrant micro-interactions.<br>• Live pulsing "Qloo Live" connectivity badge with ping latency monitor.<br>• Interactive SVG/Canvas taste graph with time-scrubbing.<br>• Serendipity Engine providing constructive aesthetic friction. |

---

## 🏗️ System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                REACT 18 + TYPESCRIPT FRONTEND                          │
│   [Taste Graph View]  [Concierge Agent]  [City Mode]  [Cross-Domain]  [Taste Validator]│
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTP / REST (Vite Proxy / JSON)
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

## 🧩 Core Application Features

### 1. Persistent Taste Knowledge Graph (`/api/memory/graph`)
- **Chronological Milestones**: Maps user tastes sequentially (e.g. January 2026: *Past Lives* & *Slowdive* $\rightarrow$ March 2026: *Neuromancer* & *Kissaten Culture*).
- **Multi-Domain Taxonomy**: Supports Cinema, Music, Literature, Dining, Travel, and Fashion with unique visual node signatures and color accents.
- **Live Autocomplete Ingestion**: Add new taste milestones via live Qloo entity search (`/api/qloo/search`) with verified entity IDs.

### 2. Conversational Concierge Agent (`/api/concierge/chat`)
- **Agent Reasoning Pipeline Accordion**:
  1. **Goal Decomposition**: Analyzes incoming query to extract target domains, entities, and cities.
  2. **Memory Traversal**: Scans historical milestones in the directed graph to maintain context.
  3. **Qloo Tool Invocation**: Calls `/v2/insights` or `/v2/search` with appropriate category URNs (`urn:entity:place`, `urn:entity:movie`, etc.).
  4. **Aesthetic Synthesis**: Computes affinity match percentages and generates a nuanced rationale.
- **Qloo Verified Cards**: Displays verified cultural discoveries with real place imagery, affinity scores, and a 1-click **+ Add to Graph** button.

### 3. City Experience Concierge (`/api/concierge/city-itinerary`)
- **Curated 4-Part Daily Blueprints**: Morning coffee ritual, Afternoon cultural atelier, Evening low-intervention dining, and Night listening bar.
- **Global Destination Support**: Pre-calibrated for Kyoto, London, Tokyo, Paris, Berlin, and New York, plus support for custom city searches.
- **Grounded Place Data**: Populated with live Qloo place intelligence and aesthetic tags.

### 4. Cross-Domain Taste Synthesis (`/api/concierge/cross-domain-synthesis`)
- Combines affinities from multiple cultural domains into a unified aesthetic persona (e.g. *Atmospheric Brutalism*, *Understated Wabi-Sabi*).
- Discovers non-obvious affinities bridging cinema to fashion, or literature to dining.

### 5. Taste Validator & Serendipity Engine (`/choice-approval`, `/anti-recommendations`)
- **Taste Validator**: Scores how well a prospective piece of culture aligns with your current taste graph.
- **Serendipity Engine (Anti-Recommendations)**: Actively counters algorithmic echo chambers by recommending deliberate, high-uniqueness aesthetic counterpoints (e.g., brutalist listening salons, noise-rock ateliers).

---

## ⚡ Quick Start Guide

### Prerequisites
- **Python 3.10+** (Tested on Python 3.10 and 3.13)
- **Node.js 18+** & **npm**

---

### Step 1: Clone Repository & Configure Environment

```bash
git clone https://github.com/rajat552/qloo-hackathon.git
cd qloo-hackathon
```

Copy the example environment configuration to `.env`:

```bash
# On Windows (PowerShell):
Copy-Item .env.example .env

# On macOS / Linux:
cp .env.example .env
```

Open `.env` and verify your keys:

```ini
# Qloo Cultural Intelligence API (Hackathon Endpoint)
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://hackathon.api.qloo.com

# Optional Generative AI & Vector Search Credentials
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_EMBEDDING_MODEL=models/text-embedding-004
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION_NAME=fashion_clip_recommender

# Server Configuration
PORT=8000
HOST=0.0.0.0
```

---

### Step 2: Launch Backend (FastAPI)

In your first terminal:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start backend server
python app.py
```

- **Backend API URL**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **Health & Latency Check**: `http://127.0.0.1:8000/health`

---

### Step 3: Launch Frontend (React + Vite)

In a **second terminal**:

```bash
# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```

- **Frontend Application URL**: `http://localhost:5173`
- **Production Build Test**: `npm run build`

---

## 📡 API Endpoints Reference

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | System health probe, active credentials check, and live Qloo latency ping |
| `/api/qloo/status` | `GET` | Real-time Qloo server ping, latency (ms), and endpoint status |
| `/api/qloo/search` | `GET` | Direct cultural entity search via live Qloo API (`query`, `type`) |
| `/api/qloo/insights` | `GET` | Live cross-domain correlation query (entities + category URN) |
| `/api/memory/graph` | `GET` | Retrieves full persistent taste graph (nodes, edges, persona) |
| `/api/memory/add-node` | `POST` | Ingests a new milestone into knowledge graph with live Qloo resolution |
| `/api/concierge/chat` | `POST` | Conversational agent with 4-step execution trace & Qloo cards |
| `/api/concierge/city-itinerary` | `POST` | Generates localized 4-part city blueprints worldwide |
| `/api/concierge/cross-domain-synthesis` | `POST` | Blends multiple domains into a cohesive aesthetic profile |
| `/search` | `POST` | Semantic search combining vector archive and live Qloo entities |
| `/choice-approval` | `POST` | AI taste validation using live Qloo entity resolution and graph scoring |
| `/anti-recommendations` | `POST` | Serendipity Engine: high-uniqueness cultural counterpoints |

---

## 🎬 3-Minute Live Demo Script & Walkthrough

Follow this verified script when presenting the live demo or recording the submission video:

### [0:00 – 0:45] The Problem & The Taste Knowledge Graph
1. Open the application at `http://localhost:5173`.
2. Notice the live **Qloo Live** pulsing indicator in the header confirming direct connection to `https://hackathon.api.qloo.com`.
3. **Show the Taste Graph**: Explain the user's journey starting in **January 2026** with *Past Lives* (Cinema) and *Slowdive* (Music), progressing to **March 2026** with *Neuromancer* (Literature) and *Kissaten Culture* (Dining).
4. Click **Add Taste Milestone**: Type `"Inception"` or `"Comme des Garcons"`. Show live Qloo autocomplete with verified entity ID and category subtype.

### [0:45 – 1:45] Conversational Concierge with Agentic Reasoning Pipeline
1. Click **Concierge Agent** in the navigation bar.
2. Click the quick prompt: `"Recommend some atmospheric music and a place to visit in London"`.
3. Highlight the **Agent Reasoning Pipeline Accordion**:
   - **Step 1**: Goal Decomposition & Intent Extraction (Domains: music, travel | Destination: London).
   - **Step 2**: Persistent Memory Graph Traversal (Recalls January & March milestones with zero amnesia).
   - **Step 3**: Qloo Tool Invocation (`GET /v2/insights filter.type=urn:entity:place location=London`).
   - **Step 4**: Aesthetic Harmony Synthesis (95% correlation confidence).
4. Point out the **Qloo Verified Cultural Discoveries Cards**: *Tate Modern*, *Borough Market*, *Covent Garden* with real photos and affinity match percentages.
5. Click **+ Add to Graph**: Watch it update immediately to **✓ In Graph**, demonstrating the closed agentic feedback loop.

### [1:45 – 2:20] City Experience Concierge (Travel Mode)
1. Switch to **City Mode**.
2. Select **Kyoto** or **London** (or search any worldwide city).
3. Walk through the 4-part day: Morning analog coffee ritual, afternoon literary/cultural atelier, evening natural wine bar, and night listening session—all grounded in Qloo place data.

### [2:20 – 3:00] Taste Validator & Serendipity Engine
1. Switch to **Taste Validator**.
2. **Taste Match Validator**: Type `"Comme des Garcons tailored coat"`. Click **Validate Taste Match via Qloo**. Show the **Qloo Verified** badge, 93% affinity score, and nuanced cultural critique.
3. **Serendipity Engine (Anti-Recommendations)**: Switch to the **Serendipity** tab. Explain how it combats algorithmic echo chambers by recommending deliberate, high-quality counterpoints (e.g. brutalist listening salons, wabi-sabi natural wine cellars).
4. Click **+ Add Counterpoint** to demonstrate taste evolution.

---

## 🔒 Security & Privacy

- All API keys and secrets are securely managed in `.env` and excluded from version control via `.gitignore`.
- No sensitive user credentials or private tokens are hardcoded or exposed in client bundles.
- Graceful offline fallbacks guarantee that network fluctuations never crash the user experience.

---

## 👤 Project & Author Information

- **Event**: Qloo Agentic Hackathon: *"Agents, but with taste"*
- **Developer**: **Rajat** ([@rajat552](https://github.com/rajat552))
- **Repository**: [https://github.com/rajat552/qloo-hackathon](https://github.com/rajat552/qloo-hackathon)
- **License**: [MIT License](LICENSE)
