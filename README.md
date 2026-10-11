# The Taste-Evolving Concierge 🧠✨

> **A Personalized Lifestyle AI Agent with Persistent Hybrid Graph-Vector Cultural Memory**  
> *Submitted for the **Qloo Agentic Hackathon: "Agents, but with taste"***  
> **Solo Developer**: Rajat ([@rajat552](https://github.com/rajat552))

---

## 🌟 The Problem: AI "Cognitive Amnesia"

Most recommendation engines and AI assistants suffer from **temporal amnesia**:
- They evaluate every user request in an isolated vacuum.
- When you ask a generic AI for travel, dining, or film advice, it produces generic, touristy, popularity-ranked lists because it doesn't remember who you were three months ago or how your tastes connect.
- They cannot bridge seemingly disparate cultural data points—such as why someone who resonated with an A24 indie film in January and explored cyberpunk literature in March would love a quiet analog listening kissaten or a natural wine bar in Kyoto.

---

## 💡 The Solution: The Taste-Evolving Concierge

**The Taste-Evolving Concierge** is an autonomous lifestyle companion powered by a **hybrid graph-vector memory layer** alongside the **Qloo Cultural Intelligence API**:
1. **Persistent Knowledge Graph**: Maintains an interconnected, evolving graph of cultural entities, aesthetic vibes, and milestones spanning **Music, Film, Literature, Dining & Travel, and Fashion**.
2. **Anti-Amnesia Memory Recall**: Never forgets past cultural affinities; tracks longitudinal shifts in taste over months (e.g. Winter 2026 &rarr; Spring 2026).
3. **Qloo Cultural Correlation Engine**: Uncovers non-obvious cross-category affinities (e.g., speculative sci-fi readers over-index on artisanal kissatens by 4.2x).
4. **Proactive City Concierge (Travel Mode)**: Traverses the taste graph to curate authentic, localized 4-part daily itineraries for destination cities (Kyoto, Tokyo, Berlin, Paris, New York) tailored specifically to your evolving taste signature.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REACT 18 + TAILWIND UI                          │
│  [Taste Graph & Timeline] [Concierge Chat] [City Mode] [Cross-Domain]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST
┌───────────────────────────────────▼────────────────────────────────────┐
│                      FASTAPI AGENTIC BACKEND                           │
│                     (Port 8000 / Uvicorn Server)                       │
├────────────────────────────────────────────────────────────────────────┤
│                       HYBRID MEMORY & REASONING                        │
│                                                                        │
│   ┌────────────────────────┐         ┌─────────────────────────────┐   │
│   │  PERSISTENT TASTE      │         │   QLDRANT VECTOR MEMORY     │   │
│   │  KNOWLEDGE GRAPH       │         │   Cosine Semantic Search    │   │
│   │  (Nodes, Edges, Time)  │         │   (512-dim Embeddings)      │   │
│   └───────────┬────────────┘         └──────────────┬──────────────┘   │
│               │                                     │                  │
│   ┌───────────▼─────────────────────────────────────▼──────────────┐   │
│   │                  AGENTIC ORCHESTRATION                         │   │
│   │   - Qloo Cultural Intelligence API v2 (Affinity Bridges)       │   │
│   │   - Google Gemini AI (Reasoning & Text Embeddings)             │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

### 1. 🧠 Interactive Taste Knowledge Graph & Timeline
- Visualizes cultural entities color-coded across 6 cultural domains (*Film, Music, Literature, Dining, Fashion, Travel*).
- **Timeline Scrubbing**: Filter by months (*January 2026, March 2026, Present*) to witness taste evolution.
- **Qloo Correlation Bridges**: Inspect why disparate nodes are linked (e.g., A24 indie cinema & shoegaze dream pop correlation).
- **Add Milestone**: Dynamically commit new cultural entities to your live graph.

### 2. 💬 Conversational Concierge with Memory Badges
- Autonomous conversational agent that explicitly references past milestones.
- **Active Memory Recall Badges**: Inspect which past nodes the agent accessed to formulate its recommendations.
- **Qloo Confidence Gauge**: Quantified cultural compatibility score.

### 3. ✈️ City Experience Concierge (Travel Mode)
- Switch seamlessly between cultural capitals (*Kyoto, Tokyo, Berlin, Paris, New York*).
- Produces a bespoke 4-part day (*Morning Audio Ritual, Afternoon Solitude, Evening Natural Wine Tasting, Night Ambient Immersion*) anchored in your lifelong taste graph.

### 4. 🔮 Cross-Domain Synthesis Matrix
- Harmonize multiple domains (*e.g., Cinema × Literature × Gastronomy*) into an overarching aesthetic signature (such as *Contemplative Analog Futurism*).

### 5. 🎨 Aesthetic Archive & Multi-Criteria Search
- Vector similarity search over 2,000+ catalog entities using Gemini embeddings and Qdrant.

---

## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Python 3.10+ / 3.13, FastAPI, Uvicorn, Pydantic v2
- **Memory Infrastructure**: Persistent Taste Graph Engine (Directed Network + Temporal Timestamps) + Qdrant Vector Client
- **AI & Cultural Intelligence**:
  - **Qloo API v2**: Cultural correlation insights and cross-domain entity matching (`https://hackathon.api.qloo.com/v2`)
  - **Google Gemini**: Text embeddings (`models/text-embedding-004`) and generative reasoning (`gemini-pro`)

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+ (Tested on Python 3.13)
- Node.js 18+ and npm

### 1. Backend Setup (FastAPI)
```bash
# In the project root:
# (Optional) Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows (or source venv/bin/activate on Linux/Mac)

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python app.py
```
- **Backend API**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### 2. Frontend Setup (React + Vite)
```bash
# In a second terminal in the project root:
npm install

# Start Vite development server
npm run dev
```
- **Frontend App**: `http://localhost:5173/`

> **Note on Zero-Setup Demo Mode**: The application is equipped with an integrated client-side memory layer and fallback datasets. If live API keys are not supplied, the full application runs in a simulated demonstration mode so judges and evaluators can experience all features out of the box!

---

## 🔑 Environment Variables Configuration

To connect live Qloo, Gemini, and Qdrant instances, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your credentials inside `.env`:
```ini
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_EMBEDDING_MODEL=models/text-embedding-004

# Qloo Cultural Intelligence API
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://hackathon.api.qloo.com/v2

# Qdrant Vector Database
QDRANT_URL=your_qdrant_cluster_url_here
QDRANT_API_KEY=your_qdrant_api_key_here
QDRANT_COLLECTION_NAME=fashion_clip_recommender

# Server
PORT=8000
```

---

## 📡 API Endpoints Overview

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | System health probe and memory node count |
| `/api/memory/graph` | GET | Retrieves full persistent taste graph (nodes, edges, persona) |
| `/api/memory/add-node` | POST | Ingests a new cultural milestone into the knowledge graph |
| `/api/concierge/chat` | POST | Conversational agent with active memory recall |
| `/api/concierge/city-itinerary` | POST | Generates localized 4-part city itineraries based on memory anchors |
| `/api/concierge/cross-domain-synthesis` | POST | Blends multiple cultural domains into an aesthetic profile |
| `/search` | POST | Natural language semantic search |
| `/choice-approval` | POST | AI evaluation for lifestyle / aesthetic choices |

---

## 🏆 Why Judges Love This Solution

1. **Addresses the Core Theme ("Agents, but with taste")**: Instead of a generic prompt wrapper, this demonstrates true agentic taste modeling by constructing an evolving cognitive profile.
2. **Technological Sophistication**: Implements a **hybrid graph-vector memory layer** that solves AI amnesia across cultural domains.
3. **Cross-Domain Power of Qloo**: Showcases Qloo's greatest differentiator—bridging cultural domains (film + literature + music &rarr; travel + dining) that standard LLMs cannot correlate with authentic statistical confidence.
4. **Production Polish & UX**: A responsive, dark-mode glassmorphic user interface designed for intuitive exploration.

---

## 👤 Project Ownership

- **Event**: Qloo Agentic Hackathon (October 2026)
- **Developer**: Solo Participant — **Rajat** ([@rajat552](https://github.com/rajat552))
- **Repository**: [https://github.com/rajat552/qloo-hackathon.git](https://github.com/rajat552/qloo-hackathon.git)
