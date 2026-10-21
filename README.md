<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0b1220,100:1e3a5f&height=180&section=header&text=Akshay%20Kumar%20Korepu&fontColor=e6edf3&fontSize=44&fontAlignY=36&desc=AI%20Engineer%20%C2%B7%20Product%20Builder&descAlignY=58&descSize=16" alt="Akshay Kumar Korepu — AI Engineer · Product Builder" width="100%" />
</p>

<p align="center">
  <a href="https://akshaykumarkorepu.vercel.app">
    <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=500&size=18&duration=3000&pause=1200&color=6CA3E0&center=true&vCenter=true&width=560&lines=Building+AI+systems+that+turn+ideas+into+useful+products.;RAG+%C2%B7+LLMs+%C2%B7+Agentic+AI+%C2%B7+Generative+AI;Mathematics+%26+Computing+%40+NIT+Warangal" alt="Building AI systems that turn ideas into useful products." />
  </a>
</p>

<p align="center">
  <a href="https://akshaykumarkorepu.vercel.app"><img src="https://img.shields.io/badge/Portfolio-akshaykumarkorepu.vercel.app-6CA3E0?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0b1220" alt="Live portfolio" /></a>
  <a href="https://www.linkedin.com/in/akshaykumarkorepu/"><img src="https://img.shields.io/badge/LinkedIn-akshaykumarkorepu-0A66C2?style=for-the-badge&labelColor=0b1220" alt="LinkedIn" /></a>
  <a href="https://github.com/akshaykumarkorepu"><img src="https://img.shields.io/badge/GitHub-akshaykumarkorepu-e6edf3?style=for-the-badge&logo=github&logoColor=white&labelColor=0b1220" alt="GitHub" /></a>
</p>

---

## About me

I'm a **Mathematics & Computing** student at **NIT Warangal**, working at the intersection of software engineering, machine learning, and AI systems.

I like understanding how things work underneath the abstraction layer: taking an idea from a rough concept, designing the architecture, building the system, and **measuring whether it actually works**.

- **Focus:** AI engineering, Generative AI, LLM applications, RAG, and agentic AI
- **Exploring:** Forward Deployed Engineering — working close to real users, prototyping fast, and deploying AI that holds up outside the lab
- **Building:** practical AI-powered products, from document intelligence to clinic automation

---

## Featured projects

### BOLVEDA — Grounded Document Q&A with RAG

<img src="public/images/projects/bolveda.png" alt="BOLVEDA answering a question about an uploaded PDF, with page-level citations" width="100%" />

A retrieval-augmented generation system for contextual PDF question answering. Each upload gets its own isolated vector store; answers are retrieved with MMR search and streamed from Llama 3.3 70B, grounded in the document — or it says the answer isn't there.

- **27/30 (90%)** on a 30-question benchmark · **10/10** factual · **10/10** out-of-scope refusals
- Session-isolated ChromaDB stores, local MiniLM embeddings, separate reproducible evaluation pipeline

`Python` `LangChain` `ChromaDB` `HuggingFace` `Groq` `Llama 3.3 70B` `Streamlit` `SQLite`

[Repository](https://github.com/akshaykumarkorepu/BOLVEDA-AI)

---

### PlacementIQ — Interview Intelligence Platform

<img src="public/images/projects/placementiq.png" alt="PlacementIQ search interface with example placement questions" width="100%" />

Turns unstructured campus interview experiences into structured, searchable interview intelligence. A LangGraph extraction pipeline pulls companies, rounds, topics, and questions out of raw write-ups, with confidence scoring that flags uncertain extractions for review.

- **100+** interview experiences processed · **30+** companies mapped
- Agentic extraction-and-verification workflow behind a natural-language search interface

`Python` `FastAPI` `LangChain` `LangGraph` `SQLite` `React` `TypeScript`

[Live demo](https://placementiq-three.vercel.app/) · [Repository](https://github.com/akshaykumarkorepu/PlacementIQ)

---

### LOKAI — Local AI for Sensitive Work

<img src="public/images/projects/lokai.png" alt="LOKAI home screen with indexed documents, local backend status, and analysis actions" width="100%" />

An on-premise AI platform for confidential industrial documents, built by **Team JAVAST** (*Six Minds. One Build.*) for Smart India Hackathon 2026. Documents, models, and processing never leave the organisation's machine.

- **Agentic analysis:** a planner breaks each request into steps; an executor runs retrieval, document-reading, and calculator tools
- **Built-in verification:** evidence, calculation, and consistency checks mark every result *verified* or *needs review*
- **Generated approval notes** as Word documents, plus a local audit trail of every model call and agent step
- **My role:** built the local RAG pipeline — embeddings, ingestion, pgvector storage, retrieval, and grounded generation

`Python` `FastAPI` `PostgreSQL` `pgvector` `Ollama` `Qwen3` `React` `Vite`

[Repository](https://github.com/SatwikaGanji06/TEAM-JAVAST)

---

### SAHVA — AI Voice Receptionist for Clinics &nbsp;<img src="https://img.shields.io/badge/status-in%20development-6CA3E0?style=flat-square&labelColor=0b1220" alt="In development" />

<img src="public/images/projects/sahva.png" alt="SAHVA clinic dashboard (demo mode, sample data) with appointments, calls, and items needing a person" width="100%" />

An AI receptionist for small clinics, built for Telugu and English callers. PostgreSQL decides what's free and what gets booked, so the AI can only confirm a slot the clinic's diary accepts. **I'm the founder.**

- **Implemented:** live slot availability, guarded booking with no double-booking, and a staff dashboard for appointments, patients, call records, analytics, and an *Action Required* queue
- **In development:** the telephony channel for live calls
- Multi-tenant isolation with row-level security, covered by PostgreSQL test suites

`TypeScript` `Next.js` `Express` `Supabase` `PostgreSQL` `Claude API` `Tailwind CSS`

<sub>Screenshot shows the dashboard in demo mode with sample data.</sub>

---

## Tech stack

**Languages**

<img src="https://img.shields.io/badge/Python-0b1220?style=flat-square&logo=python&logoColor=6CA3E0" alt="Python" /> <img src="https://img.shields.io/badge/TypeScript-0b1220?style=flat-square&logo=typescript&logoColor=6CA3E0" alt="TypeScript" /> <img src="https://img.shields.io/badge/C++-0b1220?style=flat-square&logo=cplusplus&logoColor=6CA3E0" alt="C++" /> <img src="https://img.shields.io/badge/SQL-0b1220?style=flat-square&logo=postgresql&logoColor=6CA3E0" alt="SQL" /> <img src="https://img.shields.io/badge/Java-0b1220?style=flat-square&logo=openjdk&logoColor=6CA3E0" alt="Java" /> <img src="https://img.shields.io/badge/R-0b1220?style=flat-square&logo=r&logoColor=6CA3E0" alt="R" />

**AI & ML**

<img src="https://img.shields.io/badge/LangChain-0b1220?style=flat-square&logo=langchain&logoColor=6CA3E0" alt="LangChain" /> <img src="https://img.shields.io/badge/LangGraph-0b1220?style=flat-square&logo=langgraph&logoColor=6CA3E0" alt="LangGraph" /> <img src="https://img.shields.io/badge/Hugging_Face-0b1220?style=flat-square&logo=huggingface&logoColor=6CA3E0" alt="Hugging Face" /> <img src="https://img.shields.io/badge/Ollama-0b1220?style=flat-square&logo=ollama&logoColor=6CA3E0" alt="Ollama" /> <img src="https://img.shields.io/badge/ChromaDB-0b1220?style=flat-square&logoColor=6CA3E0" alt="ChromaDB" /> <img src="https://img.shields.io/badge/pgvector-0b1220?style=flat-square&logoColor=6CA3E0" alt="pgvector" />

**Engineering**

<img src="https://img.shields.io/badge/Next.js-0b1220?style=flat-square&logo=nextdotjs&logoColor=6CA3E0" alt="Next.js" /> <img src="https://img.shields.io/badge/React-0b1220?style=flat-square&logo=react&logoColor=6CA3E0" alt="React" /> <img src="https://img.shields.io/badge/FastAPI-0b1220?style=flat-square&logo=fastapi&logoColor=6CA3E0" alt="FastAPI" /> <img src="https://img.shields.io/badge/PostgreSQL-0b1220?style=flat-square&logo=postgresql&logoColor=6CA3E0" alt="PostgreSQL" /> <img src="https://img.shields.io/badge/Supabase-0b1220?style=flat-square&logo=supabase&logoColor=6CA3E0" alt="Supabase" /> <img src="https://img.shields.io/badge/SQLite-0b1220?style=flat-square&logo=sqlite&logoColor=6CA3E0" alt="SQLite" />

**Tools**

<img src="https://img.shields.io/badge/Git-0b1220?style=flat-square&logo=git&logoColor=6CA3E0" alt="Git" /> <img src="https://img.shields.io/badge/GitHub-0b1220?style=flat-square&logo=github&logoColor=6CA3E0" alt="GitHub" /> <img src="https://img.shields.io/badge/Streamlit-0b1220?style=flat-square&logo=streamlit&logoColor=6CA3E0" alt="Streamlit" /> <img src="https://img.shields.io/badge/n8n-0b1220?style=flat-square&logo=n8n&logoColor=6CA3E0" alt="n8n" /> <img src="https://img.shields.io/badge/Claude_Code-0b1220?style=flat-square&logo=claude&logoColor=6CA3E0" alt="Claude Code" />

---

## Achievements

**Awards**
- 🏆 **Winner — Smart India Hackathon 2025**, Internal Round, NIT Warangal
- 🏅 **IMO & ISO Olympiad medals**, earned during school

**Programs & selections**
- 🚀 **Selected — [Dorm2VC](https://dorm2vc.io/) Cohort 1**, the inaugural cohort, as a founder
- 🎓 **Shortlisted — ML Summer School 2026**, second round

**Milestones**
- 💻 **300+ coding problems solved** across LeetCode and GeeksforGeeks

<sub>More — leadership roles, athletics, and workshops — on the <a href="https://akshaykumarkorepu.vercel.app">live portfolio</a>.</sub>

---

## About this repository

The source for my personal portfolio, live at **[akshaykumarkorepu.vercel.app](https://akshaykumarkorepu.vercel.app)**.

<img src="https://img.shields.io/badge/Next.js_16-0b1220?style=flat-square&logo=nextdotjs&logoColor=6CA3E0" alt="Next.js 16" /> <img src="https://img.shields.io/badge/React_19-0b1220?style=flat-square&logo=react&logoColor=6CA3E0" alt="React 19" /> <img src="https://img.shields.io/badge/TypeScript-0b1220?style=flat-square&logo=typescript&logoColor=6CA3E0" alt="TypeScript" /> <img src="https://img.shields.io/badge/Tailwind_CSS_4-0b1220?style=flat-square&logo=tailwindcss&logoColor=6CA3E0" alt="Tailwind CSS 4" /> <img src="https://img.shields.io/badge/Framer_Motion-0b1220?style=flat-square&logo=framer&logoColor=6CA3E0" alt="Framer Motion" /> <img src="https://img.shields.io/badge/Vercel-0b1220?style=flat-square&logo=vercel&logoColor=6CA3E0" alt="Vercel" />

- Dark, blue-accented design with Framer Motion animations that respect `prefers-reduced-motion`
- Responsive from 320px phones to wide desktops, with a dedicated mobile menu and 44px touch targets
- Statically prerendered; no environment variables or external services required

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

**Updating content:** all text — projects, experience, skills, achievements, and contact links — lives in [`src/data/index.ts`](src/data/index.ts). Project screenshots are in [`public/images/projects/`](public/images/projects/).

---

<p align="center">
  <a href="https://akshaykumarkorepu.vercel.app"><b>Portfolio</b></a> &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/akshaykumarkorepu/"><b>LinkedIn</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/akshaykumarkorepu"><b>GitHub</b></a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3a5f,100:0b1220&height=90&section=footer" alt="" width="100%" />
</p>
