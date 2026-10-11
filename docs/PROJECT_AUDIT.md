# Project Audit & Technical Discovery

**Project Name**: Qloo Hackathon Base &rarr; The Taste-Evolving Concierge  
**Auditor**: Senior Software Engineer & Technical Lead  
**Participant**: Solo Developer (Rajat / @rajat552)  
**Date**: October 2026  
**Repository**: [rajat552/qloo-hackathon](https://github.com/rajat552/qloo-hackathon.git)

---

## 1. Project Overview

The current repository serves as a base application for the **Qloo Agentic Hackathon** ("Agents, but with taste"). Originally structured as a fashion-only recommendation prototype ("Fashion AI"), the application combines:
- **FastAPI** backend for recommendation handling and vector retrieval.
- **Qdrant** vector database for similarity matching across item embeddings.
- **Google Gemini AI** for natural language understanding and embedding generation (`models/text-embedding-004`).
- **Qloo API** for cultural intelligence and affinity insights.
- **Vite + React + TypeScript + Tailwind CSS** frontend delivering a single-page interactive interface.

### Architectural Pivot Objective: "The Taste-Evolving Concierge"
The application is being architected away from a static single-category fashion recommender into **The Taste-Evolving Concierge**: a multi-domain lifestyle AI agent equipped with a **hybrid graph-vector memory layer**. It overcomes AI "amnesia" by tracking a user's taste trajectory over time across **Music, Film, Literature, Dining, Travel, and Fashion**, synthesizing cross-category recommendations (e.g., connecting January's indie film tastes and March's sci-fi novel interests to proactive travel itineraries in new cities).

---

## 2. Technology Stack

| Layer | Technologies | Version / Details |
|---|---|---|
| **Frontend Framework** | React + TypeScript + Vite | React `18.3.1`, Vite `5.4.8`, TypeScript `5.5.3` |
| **Styling** | Tailwind CSS + PostCSS | Tailwind `3.4.1`, PostCSS `8.4.35` |
| **Icons** | Lucide React | `^0.344.0` |
| **Backend Framework** | Python FastAPI + Uvicorn | FastAPI `>=0.104.0`, Uvicorn `>=0.24.0`, Python 3.13 |
| **Data Validation** | Pydantic v2 | Pydantic `>=2.5.0` |
| **Vector Database** | Qdrant Client | `qdrant-client>=1.7.0` (collection: `fashion_clip_recommender`) |
| **Generative & Embedding AI** | Google Generative AI | `google-generativeai>=0.8.0` (`gemini-pro`, `text-embedding-004`) |
| **Cultural Intelligence API** | Qloo API v2 | Hackathon Endpoint (`https://hackathon.api.qloo.com/v2`) |
| **Static Assets** | Local filesystem | `data/image/` (~2,000+ catalog images) mounted at `/images` |

---

## 3. Directory and File Structure

```
qloo-hackathon/
├── data/
│   └── image/                 # Static catalog images (2,000+ files, ~257MB)
├── docs/                      # Engineering audits and architectural blueprints
│   ├── PROJECT_AUDIT.md       # (This file)
│   └── TEAM_AND_BRANDING_AUDIT.md
├── src/                       # React frontend source
│   ├── components/
│   │   ├── Features/          # Feature tab views (SmartSearch, ChoiceApproval, CulturalFusion, etc.)
│   │   ├── Layout/            # Header, Navigation, Footer
│   │   └── UI/                # Reusable Cards, Spinners, Error messages
│   ├── services/
│   │   └── api.ts             # API client with health checks & offline demo fallbacks
│   ├── types.ts               # Core TypeScript interfaces & API payload schemas
│   ├── App.tsx                # Main view router and backend status badge
│   ├── index.css              # Tailwind directives
│   └── main.tsx               # React DOM entry point
├── app.py                     # FastAPI server (627 lines) with endpoints and clients
├── eslint.config.js           # ESLint v9 configuration
├── index.html                 # HTML entry template
├── package.json               # Node.js dependencies and scripts
├── requirements.txt           # Python backend dependencies
├── tailwind.config.js         # Tailwind configuration
├── test_connection.js         # Backend health and connectivity test script
├── tsconfig.json              # TypeScript root configuration
├── tsconfig.app.json          # Vite frontend TypeScript configuration
├── tsconfig.node.json         # Node build tooling configuration
├── UPDATE_SUMMARY.md          # Upstream changelog notes
└── README.md                  # Project documentation (to be rewritten)
```

---

## 4. Key Application Workflows

1. **System Health Check Workflow**:
   - Frontend periodically polls `GET /health`.
   - Backend evaluates connectivity to Qdrant, Gemini, and Qloo API endpoints and returns service status.
2. **Search & Preference Extraction Workflow**:
   - User inputs natural language query (and optional style preference).
   - Gemini embeds query vector &rarr; Qdrant vector search retrieves closest semantic matches &rarr; payload mapped to items &rarr; rendered on frontend.
3. **Cross-Cultural Synthesis Workflow**:
   - User chooses 2–5 cultural origins.
   - Gemini blends stylistic aesthetics into a synthesized prompt &rarr; retrieves relevant items.
4. **Style Approval Workflow ("Should I Wear This?")**:
   - User submits candidate clothing description.
   - LLM evaluates affinity against personal taste profile and returns score and reasoning.

---

## 5. Implementation Status of Existing Features

| Feature | Current State | Reusability for Taste Concierge |
|---|---|---|
| **Smart Search** | Working (Vector retrieval + LLM profile) | High: Foundation for multi-domain semantic search |
| **Get Inspired** | Stubbed Qloo place suggestions | High: Adapt into proactive lifestyle / travel guide |
| **Cultural Fusion** | Working LLM prompt synthesis | High: Adapt to cross-cultural lifestyle blending |
| **Anti-Recommendations** | Working opposite aesthetic search | High: Crucial for serendipitous & niche discovery |
| **Fashion Twin** | Mock user taste matching | High: Expand to multi-domain cultural affinity twins |
| **Choice Approval** | Working LLM style evaluation | High: Adapt into general Lifestyle Agent decision engine |
| **Image Serving** | FastAPI StaticFiles mounted at `/images` | Reusable for visual item presentation |

---

## 6. Technical Debt & Deficiencies Identified

1. **Monolithic Backend**: `app.py` contains all routes, client initializations, prompt logic, and model definitions in a single 627-line file.
2. **Missing Memory Layer**: The current app treats every query in isolation. There is **zero persistent memory**; user history is not tracked or chained across sessions.
3. **Domain Limitation**: Hardcoded solely around fashion items, missing Qloo's key strengths in music, literature, dining, and travel.
4. **Hardcoded Credentials Placeholder**: `app.py` contains empty string placeholders instead of reading from `os.getenv` or a `.env` file.
5. **No Graph Infrastructure**: A knowledge graph memory layer (nodes: user, taste, domain, entities, temporal timestamps) is completely absent.

---

## 7. Strategic Recommendations

1. **Introduce a Hybrid Graph-Vector Memory Architecture**:
   - Add a lightweight graph structure (in-memory / NetworkX or SQLite Graph table) connecting user preference nodes over time (e.g. `User` &rarr; `LIKED` &rarr; `Entity(indie_film, timestamp="2026-01")` &rarr; `BRIDGED_BY_QLOO` &rarr; `Entity(niche_venue, city="Kyoto")`).
2. **Modularize Backend Architecture**:
   - Refactor `app.py` into clean modular packages: `api/routes/`, `core/config.py`, `memory/taste_graph.py`, `services/qloo_service.py`, `services/gemini_service.py`.
3. **Transform the Frontend UI**:
   - Add a **Taste Evolution Graph / Timeline** visualizer showing how the user's cultural tastes have evolved over time.
   - Expand beyond fashion tabs to comprehensive **Lifestyle Concierge tabs** (Timeline & Taste Graph, Concierge Chat & Recommendations, Multi-Domain Explorer, City Trip Mode).
4. **Environment & Security Hardening**:
   - Introduce `.env.example` and load all API credentials via `python-dotenv`.
