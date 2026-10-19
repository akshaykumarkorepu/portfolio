export const fullName = "Akshay Kumar Korepu";

/** Hero portrait. To replace the photo, add the new file under public/images and point this at it. */
export const portraitSrc = "/images/akshay.jpeg";

export const email = "akshaykumarkorepu@gmail.com";
const emailSubject = "Hello Akshay — Let's Connect";
/** Opens the visitor's mail app with the address and subject filled in; they still review and send. */
export const emailHref = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
/** Opens Gmail's compose window in the browser with the same address and subject. */
export const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(emailSubject)}`;

export const githubUsername = "akshaykumarkorepu";
export const githubUrl = "https://github.com/akshaykumarkorepu";
/** Shown in the navbar, Contact section, and footer. Set to null to hide LinkedIn everywhere. */
export const linkedinUrl: string | null = "https://www.linkedin.com/in/akshaykumarkorepu/";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  /** Short status label, e.g. for work still in development. */
  status?: string;
  /** My role, when the project was not a solo build. */
  role?: string;
  team?: {
    name: string;
    tagline?: string;
    members: string[];
  };
  techStack: string[];
  /** Real screenshot of the project. The caption says where it came from. */
  image: {
    src: string;
    alt: string;
    caption: string;
  };
  /** Headline numbers for the showcase. Only verified figures belong here. */
  metrics?: {
    value: string;
    label: string;
  }[];
  achievements: string[];
  architecture: {
    step: string;
    description: string;
  }[];
  links: {
    github?: string;
    demo?: string;
  };
  details: {
    problem: string;
    solution: string;
    engineeringDecisions: string[];
    results: string[];
    challenges: string[];
  };
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  /** Earlier roles in the same organization, oldest first. */
  previousRoles?: string[];
  /** Omitted when no verified dates are available. */
  duration?: string;
  description: string[];
  category: 'leadership' | 'technical' | 'community';
}

export interface Skill {
  category: string;
  items: string[];
}

export const projects: Project[] = [
  {
    id: 'bolveda',
    title: 'BOLVEDA',
    subtitle: 'Grounded Document Q&A with RAG',
    description: 'A retrieval-augmented generation system for contextual PDF question answering. Upload a document, ask questions in conversation, and get answers grounded in the passages retrieved from it.',
    fullDescription: 'LLMs cannot reliably answer questions about documents they have never seen, and stuffing a whole document into the prompt runs into context limits and cost. BOLVEDA indexes each uploaded PDF into its own vector store at runtime, retrieves the most relevant chunks with MMR search, and streams an answer from Llama 3.3 70B that is grounded in that context. A separate evaluation framework scores the pipeline on factual, inferential, and out-of-scope questions.',
    techStack: ['Python', 'LangChain', 'ChromaDB', 'HuggingFace', 'Groq', 'Llama 3.3 70B', 'Streamlit', 'SQLite'],
    image: {
      src: '/images/projects/bolveda.png',
      alt: 'BOLVEDA answering a question about an uploaded PDF, with page-level sources and citations listed under the answer',
      caption: 'App screenshot · grounded answer with citations',
    },
    metrics: [
      { value: '90%', label: 'Benchmark accuracy (27/30)' },
      { value: '100%', label: 'Factual questions (10/10)' },
      { value: '100%', label: 'Out-of-scope refusals (10/10)' },
    ],
    achievements: [
      '27/30 (90%) on a 30-question evaluation benchmark',
      '10/10 factual questions answered correctly',
      '7/10 inferential questions answered correctly',
      '10/10 out-of-scope questions correctly refused instead of answered from outside the document',
    ],
    architecture: [
      { step: 'PDF Upload', description: 'Parsed with PyPDFLoader' },
      { step: 'Chunking', description: '1000 chars, 200 overlap' },
      { step: 'Embeddings', description: 'Local all-MiniLM-L6-v2' },
      { step: 'Session Store', description: 'Isolated ChromaDB per session' },
      { step: 'MMR Retrieval', description: 'Relevant, diverse chunks' },
      { step: 'Grounded Answer', description: 'Llama 3.3 70B via Groq' },
    ],
    links: {
      github: 'https://github.com/akshaykumarkorepu/BOLVEDA-AI',
      demo: 'https://bolveda-ai.streamlit.app',
    },
    details: {
      problem: 'Answering questions about a specific document means either reading all of it or trusting an LLM that has never seen it and will guess. Pasting entire documents into a prompt is expensive and breaks down on long files.',
      solution: 'Built a text-first RAG pipeline: each PDF is chunked, embedded locally, and stored in an isolated vector store; queries retrieve context with MMR and the LLM answers only from that context, falling back to "not found in the document" when retrieval comes back empty.',
      engineeringDecisions: [
        'Gave every upload its own UUID-named ChromaDB store, deleted when the session ends, so sessions never share or leak vectors.',
        'Used MMR retrieval instead of plain top-k so repetitive documents still return diverse, relevant context.',
        'Ran embeddings locally with all-MiniLM-L6-v2 to keep indexing free of API cost.',
        'Kept the evaluation vector store and SQLite results separate from runtime data so benchmark runs are reproducible.',
      ],
      results: [
        'Scored 27/30 (90%) on the benchmark, including 10/10 on out-of-scope questions.',
        'Streaming answers through Groq with session memory across conversation turns.',
      ],
      challenges: [
        'A shared ChromaDB directory caused ReadOnlyError under concurrent sessions; solved with per-session isolated stores.',
        'Keyword-overlap scoring under-counted correct inferential answers, which points to semantic evaluation as the next step.',
      ],
    },
  },
  {
    id: 'placementiq',
    title: 'PlacementIQ',
    subtitle: 'Interview Intelligence Platform',
    description: 'An AI-powered platform that converts unstructured campus interview experiences into structured, searchable interview intelligence.',
    fullDescription: 'PlacementIQ transforms the chaotic nature of campus interview reviews into a structured knowledge base. It uses agentic workflows to extract key patterns, company-specific trends, and confidence scores from raw text experiences.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'SQLite', 'LangChain', 'LangGraph'],
    image: {
      src: '/images/projects/placementiq.png',
      alt: 'PlacementIQ search interface with a question box and example queries such as comparing Goldman Sachs and Oracle interviews',
      caption: 'Live demo · search interface',
    },
    metrics: [
      { value: '100+', label: 'Interview experiences processed' },
      { value: '30+', label: 'Companies mapped' },
    ],
    achievements: [
      'Processed 100+ interview experiences',
      'Mapped intelligence for 30+ companies',
      'Implemented a structured extraction pipeline with confidence scoring',
      'Developed an agentic workflow for data synthesis',
    ],
    architecture: [
      { step: 'Interview Experiences', description: 'Raw unstructured text data' },
      { step: 'Discovery', description: 'Identifying core entities and companies' },
      { step: 'Extraction', description: 'LLM-based extraction of key attributes' },
      { step: 'Structuring', description: 'Conversion to standardized schema' },
      { step: 'Search', description: 'Efficient querying of structured data' },
      { step: 'Intelligence', description: 'Pattern analysis and trend detection' },
    ],
    links: {
      github: 'https://github.com/akshaykumarkorepu/PlacementIQ',
      demo: 'https://placementiq-three.vercel.app/',
    },
    details: {
      problem: 'Interview experiences are often shared as long, rambling paragraphs, making it impossible to quickly find specific technical questions or company trends.',
      solution: 'Built a pipeline using LangGraph to create a multi-agent extraction system that verifies extracted data against the source text.',
      engineeringDecisions: [
        'Used FastAPI for a high-performance backend API.',
        'Implemented LangGraph to manage complex state during the extraction and verification process.',
        'Designed a confidence-scoring mechanism to flag low-certainty extractions for human review.',
      ],
      results: [
        'Successfully structured data for 30+ companies.',
        'Significantly reduced time to find company-specific interview trends.',
      ],
      challenges: [
        'Handling highly inconsistent formatting of user-submitted experiences.',
        'Ensuring extraction agents didn\'t omit critical technical details.',
      ],
    },
  },
  {
    id: 'lokai',
    title: 'LOKAI',
    subtitle: 'Local AI for Sensitive Work',
    description: 'An on-premise AI platform for confidential industrial documents. It brings RAG, agentic analysis with built-in verification, and generated approval notes to sensitive data without sending anything to external cloud AI services.',
    fullDescription: 'Built by Team JAVAST for Smart India Hackathon 2026 (PS 26117). Organizations working with confidential technical, inspection, and operational documents cannot send them to cloud AI. LOKAI keeps the whole workflow on their own machine. PDF and TXT documents are chunked and embedded with a local Qwen3 embedding model served by Ollama and indexed in PostgreSQL with pgvector. On top of that index, an agent plans each analysis, runs it step by step with retrieval, document-reading, and calculator tools, then checks the evidence, calculations, and consistency before marking the result verified or in need of review. Completed runs are saved, approval notes are generated as Word documents, and every model call and agent step is written to a local audit log. The workspace covers General Chat, Analysis, Documents, Knowledge Base, Runs, Generated Documents, Models, Sovereignty, and Audit.',
    role: 'Built the local RAG pipeline: embeddings, ingestion, pgvector storage, retrieval, and grounded generation.',
    team: {
      name: 'Team JAVAST',
      tagline: 'Six Minds. One Build.',
      members: ['Jahnavi', 'Akshay', 'Vamshi', 'Abdul', 'Sathvika', 'Tirumal'],
    },
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Ollama', 'Qwen3', 'React', 'Vite'],
    image: {
      src: '/images/projects/lokai.png',
      alt: 'LOKAI home screen: "Local AI for sensitive work", indexed document and chunk counts, a reachable local backend, and actions to start an analysis, add documents, and search knowledge',
      caption: 'App screenshot · LOKAI home',
    },
    achievements: [
      'Agentic analysis: a planner breaks each request into steps and an executor runs retrieval, document-reading, and calculator tools; every run is saved with its plan, results, and verification',
      'Built-in verification: evidence, calculation, and consistency checks mark each result "verified" or "needs review"',
      'Approval notes generated as Word documents, covering the inspection summary, abnormal readings, SOP requirement, corrective action, verification checks, and sources, and listed for download under Generated Documents',
      'Local audit trail of model selection, inference, agent steps, and verification, shown on the Audit page',
      'Local RAG over PDF and TXT with sources and similarity scores; embedding (qwen3-embedding:0.6b) and generation (qwen3:4b) both run on Ollama',
    ],
    architecture: [
      { step: 'Documents', description: 'PDF/TXT indexed in pgvector' },
      { step: 'Plan', description: 'Agent splits task into steps' },
      { step: 'Tools', description: 'RAG, reader, and calculator' },
      { step: 'Verify', description: 'Evidence, math, consistency' },
      { step: 'Approval Note', description: 'Generated Word document' },
      { step: 'Audit', description: 'Every step logged locally' },
    ],
    links: {
      github: 'https://github.com/SatwikaGanji06/TEAM-JAVAST',
    },
    details: {
      problem: 'Cloud AI requires sensitive documents to leave the organization, raising privacy, compliance, and data-residency risks. Keyword search cannot answer natural questions about long technical documents, and a single model answer is hard to trust for industrial sign-off.',
      solution: 'A sovereign AI workbench where documents, models, and processing stay on local infrastructure, with an agent that plans, uses tools, and verifies its own results, then turns them into an approval note that a person signs off, all recorded in an audit trail.',
      engineeringDecisions: [
        'Split the agent into a planner and an executor, so each analysis is an explicit, inspectable chain of steps rather than a single prompt.',
        'Added a verification layer that checks retrieved evidence, recomputes calculator results, and tests consistency across steps before a result is marked verified.',
        'Persisted runs (plan, results, verification) and generated documents in PostgreSQL, alongside document metadata, chunks, and pgvector embeddings in the same database.',
        'Enforced local-only inference in code with a network allow-list, and logged every model call and agent step to a local audit trail.',
      ],
      results: [
        'End-to-end local workflow: index documents, run a verified agentic analysis, and download an approval note.',
        'Every run reviewable later through Runs, Generated Documents, and Audit.',
      ],
      challenges: [
        'Making agent output trustworthy enough for industrial sign-off: results that fail evidence, calculation, or consistency checks are flagged "needs review" instead of passed through.',
        'Depending on local Ollama and PostgreSQL services, so failures surface as clear errors instead of the UI faking an index or an answer.',
      ],
    },
  },
  {
    id: 'sahva',
    title: 'SAHVA',
    subtitle: 'AI Voice Receptionist for Clinics',
    description: 'An AI receptionist for small clinics, built for Telugu and English callers. It checks live slot availability and books into the clinic\'s diary, with a staff dashboard for appointments, patients, calls, and anything that needs a human.',
    fullDescription: 'Small clinics in Tier 2 and 3 towns run on one front-desk phone, so calls during rush hours or after closing go unanswered. SAHVA is being built to answer those calls in Telugu and English and turn them into real bookings. Behind the voice agent is a multi-tenant clinic platform: PostgreSQL decides what is free and what gets booked, so the AI can only confirm a slot the diary accepts. Staff work from a dashboard covering appointments, patients, call records, analytics, and an Action Required queue. The phone channel is still in development; the scheduling platform and dashboard are implemented.',
    status: 'In development',
    role: 'Founder',
    techStack: ['TypeScript', 'Next.js', 'Express', 'Supabase', 'PostgreSQL', 'Claude API', 'Tailwind CSS', 'Recharts'],
    image: {
      src: '/images/projects/sahva.png',
      alt: "SAHVA clinic dashboard showing today's appointments with token numbers, call counts, and items that need a staff member",
      caption: 'Clinic dashboard · demo mode, sample data',
    },
    achievements: [
      'Slot availability computed in the database and every booking made through a guarded function, so double-booking is refused at the source',
      'Clinic dashboard for appointments, patients, call records with transcripts and summaries, analytics, settings, and role-based staff access',
      'Action Required queue for reschedules after a doctor\'s leave, AI escalations, low-confidence calls, and failed bookings',
      'Multi-tenant isolation with row-level security, covered by PostgreSQL test suites',
    ],
    architecture: [
      { step: 'Caller', description: 'Telugu or English call' },
      { step: 'Voice Agent', description: 'AI conversation (in development)' },
      { step: 'Slot Check', description: 'Live availability from diary' },
      { step: 'Booking', description: 'Guarded, no double-booking' },
      { step: 'Call Record', description: 'Transcript and summary saved' },
      { step: 'Action Required', description: 'Unresolved items go to staff' },
    ],
    links: {},
    details: {
      problem: 'A small clinic\'s single phone line misses calls when the front desk is busy or closed, and schedule changes such as a doctor\'s leave can quietly strand booked patients.',
      solution: 'An AI receptionist that asks the clinic\'s own scheduling API for free times mid-call and books through the database, backed by a dashboard where staff review calls and resolve everything the AI could not.',
      engineeringDecisions: [
        'Made PostgreSQL the authority: availability, double-booking, access rules, and audit trails live in functions, constraints, triggers, and row-level security rather than in the browser or the AI.',
        'Separated voice from scheduling so the voice layer only handles speech, while SAHVA\'s API decides every slot and booking.',
        'Routed schedule changes into an Action Required queue so a doctor\'s leave never cancels a patient without staff knowing.',
        'Gave each machine caller its own API key, rotatable without downtime.',
      ],
      results: [
        'Scheduling platform, staff dashboard, and Action Required flow implemented.',
        'Telephony integration for live calls in development.',
      ],
      challenges: [
        'Handling Telugu and English code-switching reliably on real phone calls.',
        'Keeping a person in the loop when the voice provider or API is unavailable, so a clinic\'s phone never just rings out.',
      ],
    },
  },
];

export const experiences: Experience[] = [
  {
    id: 'innovation-garage',
    organization: 'Innovation Garage Startup Facility — NIT Warangal',
    role: 'Startup Facility Additional Secretary',
    previousRoles: ['Startup Facility Executive Member'],
    duration: 'Ongoing',
    description: [
      'Active involvement in hackathons and innovation initiatives.',
      'Contributing to startup incubation and early-stage product ideation.',
    ],
    category: 'leadership',
  },
  {
    id: 'sih',
    organization: 'Smart India Hackathon',
    role: 'Point of Contact (POC) — Internal Round',
    duration: 'Two consecutive years',
    description: [
      'Served as Point of Contact for two consecutive editions of the internal round.',
      'Coordinated registrations and handled participant queries.',
      'Hosted and organized the internal event logistics.',
      'Participated as a team lead in the hackathon.',
    ],
    category: 'leadership',
  },
  {
    id: 'tedx',
    organization: 'TEDx NIT Warangal',
    role: 'Executive Team Member',
    duration: 'Ongoing / Present',
    description: [
      'Involved in the executive planning and organization of the event.',
      'Coordinated with speakers and managed event logistics.',
    ],
    category: 'community',
  },
  {
    id: 'isc',
    organization: 'International Students Club',
    role: 'Executive Member',
    duration: '2025 – 2026',
    description: [
      'Organizing cultural exchange events and integration activities.',
      'Managing outreach and coordination for international students.',
    ],
    category: 'community',
  },
  {
    id: 'cinemaking-club',
    organization: 'Cinemaking Club',
    role: 'Member',
    description: [
      'Member of the campus club for filmmaking and visual storytelling.',
      'The club brings students together around cinematography, photography, video production, and editing through creative collaboration.',
    ],
    category: 'community',
  },
  {
    id: 'college-fest',
    organization: 'NIT Warangal Technical/College Fests',
    role: 'Organizer / Coordinator',
    duration: 'Multiple Events',
    description: [
      'Managed event organization and speaker coordination.',
      'Handled PR and permissions for large-scale college events.',
      'Led outreach efforts to increase participant engagement.',
    ],
    category: 'leadership',
  },
];

export const skills: Skill[] = [
  {
    category: 'AI / ML',
    items: ['Generative AI', 'RAG', 'LLM applications', 'LangChain', 'LangGraph', 'Computer Vision', 'Machine Learning'],
  },
  {
    category: 'Programming',
    items: ['Python', 'C++', 'TypeScript', 'SQL', 'Java (OOP)', 'R'],
  },
  {
    category: 'Engineering',
    items: ['Next.js', 'FastAPI', 'SQLite', 'ChromaDB', 'REST APIs'],
  },
  {
    category: 'Tools',
    items: ['Claude Code', 'n8n', 'Streamlit', 'Git', 'GitHub'],
  },
];

export interface ExploringArea {
  title: string;
  desc: string;
  status: string;
}

/** Topic chips in the About section's "Currently exploring" card. */
export const exploringTopics = [
  'Generative AI',
  'RAG',
  'AI Agents',
  'Computer Vision',
  'Automation',
  'Forward Deployed Engineering',
];

export const exploringAreas: ExploringArea[] = [
  {
    title: 'AI Engineering',
    desc: 'Exploring production-grade AI systems and agentic workflows.',
    status: 'Exploring',
  },
  {
    title: 'AI Agents',
    desc: 'Experimenting with multi-agent architectures and orchestration.',
    status: 'Building',
  },
  {
    title: 'AI Automation',
    desc: 'Building workflows using AI + automation tools.',
    status: 'Exploring',
  },
];

/** An area I am learning about, not a role I hold. */
export const exploringFocus = {
  title: 'Forward Deployed Engineering',
  status: 'Learning',
  desc: 'Exploring where AI engineering meets customer-facing problem solving: working close to real users, prototyping quickly, and deploying AI solutions that hold up outside the lab.',
  themes: [
    'Understanding real-world problems and translating them into technical solutions',
    'Building and integrating AI systems, including LLM-powered applications and agents',
    'Rapid prototyping, experimentation, and iteration',
    'Working close to users and stakeholders to deliver practical outcomes',
  ],
};

/**
 * "Beyond the Code" — personal interests. Only what I've said about myself:
 * no favourite films, artists, teams, or destinations.
 */
export const beyondTheCode = {
  subtitle: "The things I do when I'm not building something — or the things that inspire what I build.",
  sports: {
    title: 'Sports & Staying Active',
    desc: 'Five sports and counting. Playing them keeps me moving between long hours at a screen.',
    items: ['Cricket', 'Football', 'Badminton', 'Table tennis', 'Swimming'],
  },
  gaming: {
    title: 'Gaming',
    desc: 'Tactical shooters and battle royales: quick decisions, team comms, and the occasional clutch.',
    items: ['VALORANT', 'CS:GO', 'Fortnite'],
    itemNames: ['VALORANT', 'Counter-Strike: Global Offensive', 'Fortnite'],
  },
  ai: {
    title: 'AI Tools & Experimentation',
    desc: "I'm genuinely excited to be building in this era of AI, and Claude especially. I like pushing these tools to see what they can really do: finding new capabilities, rethinking how I work, and getting from an idea to something that runs faster than ever.",
    items: [
      'Claude and AI-assisted building',
      'Exploring new AI tools and workflows',
      'Experimenting with LLMs, Generative AI, and Agentic AI',
      'Turning ideas into working prototypes in creative ways',
    ],
  },
  cinema: {
    title: 'Movies & Music',
    desc: 'Watching movies and listening to music: the best kind of downtime between builds.',
  },
  travel: {
    title: 'Travel & Exploration',
    desc: 'I love visiting new places: different cultures, different landscapes, and the experiences you collect along the way.',
  },
  photography: {
    title: 'Photography & Videography',
    desc: "A creative interest I'm actively learning and getting better at, one frame at a time.",
    items: [
      'Composition, framing, and lighting',
      'Photography and cinematic videography',
      'Experimenting with visual storytelling',
      'Capturing places, moments, and experiences',
    ],
  },
  more: [
    { title: 'Hackathons', desc: 'An idea, a deadline, and a team to build it with.' },
    { title: 'Startups & products', desc: 'Curious about how an idea becomes a real product people use.' },
    { title: 'Always learning', desc: 'Picking up new technologies and following where AI goes next.' },
    { title: 'Communities', desc: 'Student communities, startup initiatives, TEDx, and filmmaking circles.' },
    { title: 'Building together', desc: 'Most at home where people build, experiment, organise, and learn together.' },
  ],
};

/**
 * Achievements, grouped so wins, athletics, milestones, selections, and
 * participation never blur together. Wording follows what was confirmed;
 * no extra years, levels, events, or organisers.
 */
export const achievements = {
  /** `featured` items get the large card treatment. */
  recognition: [
    {
      id: 'sih-2025',
      result: 'Winner',
      title: 'Smart India Hackathon 2025',
      context: 'Internal round · NIT Warangal',
      desc: 'Won the internal round of Smart India Hackathon 2025 at NIT Warangal.',
      icon: 'trophy',
      featured: true,
    },
    {
      id: 'olympiads',
      result: 'Medals',
      title: 'IMO & ISO Olympiads',
      context: 'School',
      desc: 'Earned medals in the IMO and ISO Olympiads during school.',
      icon: 'sigma',
      featured: true,
    },
    {
      id: 'spell-bee',
      result: 'Gold',
      title: 'Spell Bee',
      context: 'School',
      desc: 'Won gold in Spell Bee during school.',
      icon: 'spellcheck',
      featured: true,
    },
    {
      id: 'cpl',
      result: 'Runner-up',
      title: 'Campus Premier League',
      context: 'Cricket',
      desc: 'Finished runner-up in the campus cricket league.',
      icon: 'medal',
      featured: false,
    },
  ],
  athletics: [
    { id: 'athletics-gold', result: 'Gold medals', title: 'Multiple athletic events', icon: 'medal' },
    { id: 'football', result: 'Winner', title: 'Football', icon: 'goal' },
    { id: 'kabaddi', result: 'Runner-up', title: 'Kabaddi', icon: 'users' },
    { id: 'relay', result: 'Silver medal', title: 'Relay running', icon: 'footprints' },
  ],
  milestones: [
    {
      id: 'coding-problems',
      value: 300,
      suffix: '+',
      title: 'Coding problems solved',
      context: 'LeetCode & GeeksforGeeks',
      desc: 'Solved 300+ coding problems across LeetCode and GeeksforGeeks.',
      icon: 'code',
    },
  ],
  selections: [
    {
      id: 'dorm2vc',
      status: 'Selected · Cohort 1',
      title: 'Dorm2VC',
      desc: 'Selected for the inaugural cohort of Dorm2VC, a programme connecting student founders with startup-building, venture capital, and founder mentorship. A way into entrepreneurship, startups, and product building.',
      url: 'https://dorm2vc.io/',
      icon: 'rocket',
    },
    {
      id: 'ml-summer-school',
      status: 'Shortlisted · Second round',
      title: 'ML Summer School 2026',
      desc: 'Shortlisted for the second round of the ML Summer School 2026 selection.',
      icon: 'graduation',
    },
  ],
  workshops: [
    {
      id: 'ai-agent-workshop',
      title: 'Hands-on AI Agent Workshop',
      desc: 'Took part in a hands-on workshop on building AI agents.',
      icon: 'bot',
    },
    {
      id: 'technical-workshops',
      title: 'Technical Workshops',
      desc: 'Took part in multiple technical workshops.',
      icon: 'wrench',
    },
  ],
};

/** Dorm2VC selection. Dates and designations from the Cohort 1 selection card. */
export const dorm2vc = {
  name: 'Dorm2VC',
  fullName: 'Dorm to Venture Capital',
  url: 'https://dorm2vc.io/',
  summary:
    'Dorm2VC is a cohort-based initiative that connects student founders and aspiring entrepreneurs with startup-building, venture capital, and founder mentorship opportunities.',
  facts: [
    { label: 'Cohort', value: '01' },
    { label: 'Role', value: 'Founder' },
    { label: 'Cohort began', value: '15 Aug 2026' },
  ],
  highlights: [
    'Selected as a member of the inaugural Cohort 1, part of its founding roster.',
    'Learning directly from mentors and founders about startup development, product thinking, and entrepreneurship.',
    'Exploring how to identify real problems, validate ideas, build MVPs, and turn technical capability into useful products.',
    'Applying these lessons to SAHVA and to building AI-powered products more broadly.',
  ],
};
