export const githubUsername = "akshaykumarkorepu";
export const githubUrl = "https://github.com/akshaykumarkorepu";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  techStack: string[];
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
  duration: string;
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
    subtitle: 'Voice-Powered RAG Assistant',
    description: 'An AI document intelligence system that lets users interact with documents using voice. Built around document ingestion, semantic retrieval, evaluation, and LLM-powered responses.',
    fullDescription: 'BOLVEDA is a comprehensive RAG (Retrieval-Augmented Generation) system designed to bridge the gap between complex document archives and natural human interaction. By integrating voice-to-text capabilities with a high-performance vector database, it allows users to query their documents hands-free with high factual precision.',
    techStack: ['Python', 'LangChain', 'ChromaDB', 'SQLite', 'Gemini / Groq', 'Whisper', 'HuggingFace', 'Streamlit'],
    achievements: [
      '85% Whisper transcription accuracy across 20 test utterances',
      '90% overall evaluation accuracy',
      '100% factual question accuracy',
      '70% inferential question accuracy',
      '100% out-of-scope detection accuracy',
    ],
    architecture: [
      { step: 'Voice', description: 'User provides voice input' },
      { step: 'Speech-to-Text', description: 'Whisper converts audio to text' },
      { step: 'Query Processing', description: 'Query refinement and embedding generation' },
      { step: 'Vector Retrieval', description: 'Semantic search via ChromaDB' },
      { step: 'LLM', description: 'Contextual response generation' },
      { step: 'Response', description: 'Final answer delivered to user' },
    ],
    links: {
      github: 'https://github.com/akshaykumarkorepu',
      demo: '#',
    },
    details: {
      problem: 'Interacting with large document sets can be tedious, and traditional text-based RAG often lacks an intuitive, hands-free interface for rapid knowledge retrieval.',
      solution: 'Implemented a voice-first RAG pipeline using Whisper for audio processing and a carefully tuned retrieval chain to ensure factual consistency.',
      engineeringDecisions: [
        'Chosen ChromaDB for its lightweight deployment and efficient similarity search.',
        'Used a multi-stage evaluation pipeline to measure factual vs inferential accuracy.',
        'Implemented a strict out-of-scope detection layer to prevent LLM hallucinations.',
      ],
      results: [
        'Achieved 100% accuracy in detecting out-of-scope queries.',
        'Maintained high factual precision (100%) through strict grounding.',
      ],
      challenges: [
        'Handling noise in voice transcriptions.',
        'Balancing retrieval speed with response latency.',
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
      github: 'https://github.com/akshaykumarkorepu',
      demo: '#',
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
];

export const experiences: Experience[] = [
  {
    id: 'innovation-garage',
    organization: 'Innovation Garage — NIT Warangal',
    role: 'Member / Contributor',
    duration: 'Ongoing',
    description: [
      'Active involvement in hackathons and innovation initiatives.',
      'Contributing to startup incubation and early-stage product ideation.',
    ],
    category: 'technical',
  },
  {
    id: 'sih',
    organization: 'Smart India Hackathon',
    role: 'Point of Contact (Internal Round)',
    duration: 'Event-based',
    description: [
      'Coordinated registrations and handled participant queries for the internal round.',
      'Hosted and organized the internal event logistics.',
      'Participated as a team lead in the hackathon.',
    ],
    category: 'leadership',
  },
  {
    id: 'tedx',
    organization: 'TEDx NIT Warangal',
    role: 'Executive Team Member',
    duration: 'Event-based',
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
    duration: 'Ongoing',
    description: [
      'Organizing cultural exchange events and integration activities.',
      'Managing outreach and coordination for international students.',
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
    items: ['Python', 'C++', 'TypeScript', 'SQL'],
  },
  {
    category: 'Engineering',
    items: ['Next.js', 'FastAPI', 'SQLite', 'ChromaDB', 'Git', 'REST APIs'],
  },
  {
    category: 'Tools',
    items: ['Claude Code', 'n8n', 'Streamlit', 'GitHub'],
  },
];
