# Project Requirements: The Taste-Evolving Concierge

**Product Name**: The Taste-Evolving Concierge  
**Tagline**: Autonomous Lifestyle AI Agent with Persistent Hybrid Graph-Vector Cultural Memory  
**Target Event**: Qloo Agentic Hackathon: "Agents, but with taste"  
**Developer**: Solo Participant (Rajat / @rajat552)  
**Target Audience**: Discerning consumers, cultural enthusiasts, and travelers seeking personalized multi-domain recommendations that adapt over time.

---

## 1. Problem Statement

Most AI recommendation engines and chatbots suffer from **cognitive amnesia**:
- They treat every user prompt in an isolated silo.
- They lack a longitudinal understanding of how a person's tastes evolve across cultural domains (e.g., music, literature, cinema, cuisine, and travel).
- They cannot connect disparate cultural signals (e.g., enjoying an indie film in January with reading hard sci-fi in March) into a unified aesthetic signature.
- Standard recommender systems produce generic, popularity-biased suggestions instead of nuanced, culturally coherent experiences.

---

## 2. Core Solution & Value Proposition

**The Taste-Evolving Concierge** provides an agentic lifestyle companion that overcomes AI amnesia through a **hybrid graph-vector memory layer**:
1. **Persistent Multi-Domain Knowledge Graph**:
   - Maintains nodes representing entities, aesthetic vibes, cultural domains, and time periods.
   - Tracks how preferences shift, deepen, and branch across time (e.g., Winter 2026 &rarr; Spring 2026).
2. **Qloo Cultural Intelligence Integration**:
   - Leverages the Qloo API to bridge cross-category correlations (e.g. users who love French New Wave cinema & shoegaze music have high affinity for natural wine bars and brutalist architecture).
3. **Proactive Multi-City Concierge**:
   - Generates contextual itineraries and localized recommendations when a user travels to any destination, anchored in their lifelong taste profile.
4. **Interactive Memory Inspection**:
   - Users and judges can visually inspect the taste graph, verify memory recall, and observe how new interactions expand their aesthetic map.

---

## 3. Product Scope & Functional Modules

### Module 1: The Memory Graph Engine (Backend)
- In-memory & JSON-persisted directed graph structure with nodes (`Entity`, `Domain`, `Vibe`, `Timestamp`) and edges (`AFFINITY`, `EVOLVED_FROM`, `QLOO_CORRELATION`).
- Memory retrieval pipeline: given a context or query, retrieves top relevant graph paths + vector similarity matches from Qdrant/Gemini.

### Module 2: The Agentic Orchestrator (Backend)
- Powered by Google Gemini and Qloo API v2.
- Handles natural language reasoning, memory synthesis, cross-domain query formulation, and structured JSON generation.
- Graceful offline fallback mode: pre-packaged rich cultural dataset and mock graph so the application functions flawlessly for demonstrations even without live external credentials.

### Module 3: Frontend Experience (React + Tailwind)
- **Interactive Knowledge Graph & Timeline**: Visual representation of taste nodes over time, filtering by domain (Music, Film, Books, Places, Fashion).
- **Concierge Conversation Interface**: Chat UI that highlights memory retrieval badges and Qloo reasoning citations in real time.
- **City Itinerary Synthesizer**: Input a destination city and receive tailored experiences across morning, afternoon, and night based on cross-domain affinities.
- **Cross-Domain Discovery Matrix**: Blend distinct inputs (e.g. Cinema + Literature) into surprising lifestyle matches.
- **Serendipity & Anti-Recommendations**: Explore contrary and counter-intuitive recommendations to expand the user's horizon.

---

## 4. Technical Constraints & Security
- Zero secrets committed to git.
- Full support for `.env` configuration.
- Responsive, accessible, state-of-the-art UI adhering to modern design principles.
- Production build validation before delivery.
