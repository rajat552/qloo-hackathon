# Integrations & Environment Configuration

**Project**: The Taste-Evolving Concierge  
**Hackathon**: Qloo Agentic Hackathon ("Agents, but with taste")  

---

## 1. Environment Variables Inventory

| Variable Name | Purpose | Required / Optional | Used By | Provider | Setup Instructions | Validation Method |
|---|---|---|---|---|---|---|
| `QLOO_API_KEY` | Authenticates requests to the Qloo API for cross-domain cultural correlations and entity insights | Required for live Qloo queries | `app.py` | Qloo API | Received from hackathon@qloo.com | Run `GET /api/qloo/status` or `GET /health` |
| `QLOO_BASE_URL` | Base endpoint URL for Qloo API | Optional (defaults to `https://hackathon.api.qloo.com`) | API client | Qloo | Set in `.env` if targeting a dedicated environment | Verify HTTP status `200` on health probe |
| `GEMINI_API_KEY` | Generates semantic embeddings and agentic natural language reasoning | Required for live LLM features | `backend/services/gemini_service.py` & `app.py` | Google AI Studio / Gemini | Generate key at [Google AI Studio](https://aistudio.google.com/) | Run test script or verify `genai.configure()` |
| `GEMINI_EMBEDDING_MODEL` | Text embedding model identifier | Optional (defaults to `models/text-embedding-004`) | Vector search | Google Gemini | Set in `.env` | Verified on startup |
| `QDRANT_URL` | Cloud or local cluster URL for vector database storage | Required for vector search | `backend/services/qdrant_service.py` & `app.py` | Qdrant Cloud or Local Docker | Deploy cluster at [Qdrant Cloud](https://cloud.qdrant.io/) or run `docker run -p 6333:6333 qdrant/qdrant` | Client ping to `/collections` |
| `QDRANT_API_KEY` | Authentication key for Qdrant Cloud | Required if using Qdrant Cloud | `backend/services/qdrant_service.py` & `app.py` | Qdrant Cloud | Copy from Qdrant Cloud dashboard | Connected during client initialization |
| `QDRANT_COLLECTION_NAME` | Vector collection name | Optional (defaults to `fashion_clip_recommender`) | Vector search | Qdrant | Pre-existing collection name | Verified via client |
| `PORT` | FastAPI server listening port | Optional (defaults to `8000`) | Uvicorn server | Local runtime | Set in `.env` | `http://127.0.0.1:8000` |

---

## 2. Safe Fallback Architecture (Zero-Setup Demo Mode)

To ensure that evaluators, judges, and developers can immediately run and review the application without blockers:
1. **Frontend Offline Graceful Degradation**:
   - The frontend API client contains rich, culturally authentic fallback datasets for all agent features (Graph Memory nodes, Timeline milestones, Concierge Chat responses, and Multi-City itineraries for Tokyo, Paris, New York, and Berlin).
2. **Backend Non-Crashing Startup**:
   - If API credentials are not yet supplied, the backend initializes into a simulated memory mode and reports degraded status on `/health` rather than exiting with `sys.exit(1)`.
3. **Strict Credential Protection**:
   - `.env` is explicitly included in `.gitignore`. Real credentials must never be committed to Git.
