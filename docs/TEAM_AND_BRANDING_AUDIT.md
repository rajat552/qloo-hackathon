# Team, Branding & Ownership Audit

**Project**: The Taste-Evolving Concierge (formerly Qloo Fashion AI)  
**Participant**: Solo Developer (Rajat / @rajat552)  
**Hackathon**: Qloo Agentic Hackathon ("Agents, but with taste")  
**Date**: October 2026  

---

## 1. Classification of Findings

### Category 1: Previous Team Identity (Inherited Artifacts)
- **Git Commit Author**: Previous author was identified in upstream Git history (`Soumya Sourav Das <...dtu.ac.in>`), which has been completely cleared during repository reset.
- **Upstream GitHub Remote**: Formerly `Celestial317/qloo-hackathon`. Already updated to `https://github.com/rajat552/qloo-hackathon.git`.
- **Action**: All team references are replaced with **Solo Developer: Rajat (@rajat552)**.

### Category 2: Previous Project Identity & Branding
- **Title in `index.html`**: `"Fashion AI Recommendation Engine Frontend"` &rarr; **To Replace with**: `"The Taste-Evolving Concierge | Qloo Agentic AI"`.
- **Title in `package.json`**: `"vite-react-typescript-starter"` &rarr; **To Replace with**: `"taste-evolving-concierge"`.
- **Title in `app.py`**: `"Qloo Fashion AI API"` &rarr; **To Replace with**: `"The Taste-Evolving Concierge API"`.
- **Header in `src/components/Layout/Header.tsx`**: `"Fashion AI - Powered by Qloo Intelligence"` &rarr; **To Replace with**: `"The Taste-Evolving Concierge - Powered by Qloo Cultural Intelligence"`.
- **README Header**: `"# Qloo Fashion AI"` &rarr; **To Replace with**: `"# The Taste-Evolving Concierge"`.

### Category 3: Reusable Technical Implementation
- **FastAPI Core**: Lifespan management, CORS middleware, Pydantic validation, and static image serving.
- **Vector Search Engine**: Qdrant embedding ingestion and cosine similarity retrieval logic.
- **Generative AI Pipeline**: Gemini embedding integration (`models/text-embedding-004`) and prompt engineering foundations.
- **Frontend Infrastructure**: React 18, Vite 5, Tailwind CSS, Lucide icons, responsive header, and modular card components.

### Category 4: External Provider Attribution (To Preserve & Credit)
- **Qloo API**: Cultural AI and taste affinity graph intelligence (`https://hackathon.api.qloo.com/v2`).
- **Google Gemini**: Text embeddings and LLM reasoning.
- **Qdrant**: Vector database for similarity retrieval.
- **Unsplash**: High-quality imagery for mock lifestyle demonstrations.

### Category 5: Environment-Specific Configuration
- **API Credentials in `app.py`**: Hardcoded empty strings for `GEMINI_API_KEY`, `QLOO_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`.
- **Target Replacement**: Standardized `.env` loading using `python-dotenv` and comprehensive `.env.example`.

### Category 6: Demo & Placeholder Data
- Hardcoded user IDs (`user_123`, `item_456`) in old documentation.
- Target Replacement: Interactive User Taste Graph with dynamic timeline points (e.g. "January: Indie Cinema Obsession", "March: Cyberpunk & Hard Sci-Fi", "Summer: Travel to Kyoto").

---

## 2. Branding & Identity Target Map

| Asset / Location | Current Value | Target Replacement | Implementation Risk |
|---|---|---|---|
| `package.json` | `vite-react-typescript-starter` | `taste-evolving-concierge` | None (Local dev only) |
| `index.html` | `Fashion AI Recommendation Engine...` | `The Taste-Evolving Concierge` | None |
| `Header.tsx` | `Fashion AI` | `Taste Concierge` / `The Taste-Evolving Concierge` | None |
| `app.py` | `Qloo Fashion AI API` | `The Taste-Evolving Concierge API` | None |
| `README.md` | Single-category fashion recommender | Multi-domain agentic lifestyle concierge | Low (Requires complete rewrite) |
| Author/Team info | Inherited upstream refs | **Solo Developer: Rajat (@rajat552)** | None |

---

## 3. Team Confirmation

- **Team Status**: Solo Participant.
- **Participant Name**: Rajat
- **GitHub**: [@rajat552](https://github.com/rajat552)
- **Role**: Full-Stack AI Engineer, System Architect & Designer.
