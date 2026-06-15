import React, { useState } from 'react';
import { Sparkles, Users, Award } from 'lucide-react';
import LeaderDashboard from './components/LeaderDashboard';
import AssociateDashboard from './components/AssociateDashboard';
import ApolloChat from './components/ApolloChat';

export interface Competency {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  competencyId: string;
  title: string;
  category: string;
  description: string;
}

export interface AssociateAssignment {
  skillId: string;
  currentScore: number;
  targetScore: number;
}

export interface AssociateProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'Exceeding' | 'On Track' | 'Behind';
  assignments: AssociateAssignment[];
}

const INITIAL_COMPETENCIES: Competency[] = [
  {
    id: 'comp-1',
    title: 'RAG Systems & Cognitive Indexing',
    description: 'Context ingestion split-overlapping models, vector distance parameters alignment, and semantic query matching.',
    createdAt: 'June 10, 2026'
  },
  {
    id: 'comp-2',
    title: 'Zero-Trust Secure Container Gates',
    description: 'STRIDE taxonomy implementation, non-root system calibration, and automatic static security compliance.',
    createdAt: 'June 12, 2026'
  }
];

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'rag-systems',
    competencyId: 'comp-1',
    title: 'RAG Architecture & Indexing',
    category: 'Core Engineering',
    description: 'Vector databases, ingestion chunk sizes, query routing, and embeddings calculation.'
  },
  {
    id: 'ai-eval',
    competencyId: 'comp-1',
    title: 'AI System Evaluation & Safety',
    category: 'AI Quality',
    description: 'Empirical response scoring, synthetic dataset logging, and safety safeguards.'
  },
  {
    id: 'threat-mod',
    competencyId: 'comp-2',
    title: 'Threat Modeling & Security',
    category: 'Cybersecurity',
    description: 'STRIDE risk methodology, architectural logs auditing, and vulnerability patches.'
  },
  {
    id: 'devsecops-pipeline',
    competencyId: 'comp-2',
    title: 'DevSecOps Automation Gates',
    category: 'Cybersecurity',
    description: 'Inline scanner configs, GitHub action hooks for Docker validations.'
  }
];

const INITIAL_ASSOCIATES: AssociateProfile[] = [
  {
    id: 'emp-adore',
    name: 'Adore Patel',
    role: 'Senior QA Automations Engineer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'Behind',
    assignments: [
      { skillId: 'rag-systems', currentScore: 54, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 68, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 72, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 41, targetScore: 80 }
    ]
  },
  {
    id: 'emp-marcus',
    name: 'Marcus Chen',
    role: 'Lead System Automation Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'On Track',
    assignments: [
      { skillId: 'rag-systems', currentScore: 71, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 82, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 65, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 78, targetScore: 80 }
    ]
  },
  {
    id: 'emp-liam',
    name: 'Liam Novak',
    role: 'Operations & DevOps Administrator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'On Track',
    assignments: [
      { skillId: 'rag-systems', currentScore: 45, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 55, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 50, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 68, targetScore: 80 }
    ]
  },
  {
    id: 'emp-zoe',
    name: 'Zoe Brooks',
    role: 'Junior Associate AI Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'Behind',
    assignments: [
      { skillId: 'rag-systems', currentScore: 48, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 58, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 30, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 45, targetScore: 80 }
    ]
  }
];

export default function App() {
  const [selectedRole, setSelectedRole] = useState<'guest' | 'Manager' | 'Associate'>('guest');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Shared application state
  const [competencies, setCompetencies] = useState<Competency[]>(INITIAL_COMPETENCIES);
  const [derivedSkills, setDerivedSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [associates, setAssociates] = useState<AssociateProfile[]>(INITIAL_ASSOCIATES);

  if (selectedRole === 'Manager') {
    return (
      <>
        <LeaderDashboard 
          onExit={() => setSelectedRole('guest')} 
          competencies={competencies}
          setCompetencies={setCompetencies}
          derivedSkills={derivedSkills}
          setDerivedSkills={setDerivedSkills}
          associates={associates}
          setAssociates={setAssociates}
          onAskApollo={() => setIsChatOpen(true)}
        />
        <ApolloChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} role="Manager" />
      </>
    );
  }

  if (selectedRole === 'Associate') {
    return (
      <>
        <AssociateDashboard 
          onExit={() => setSelectedRole('guest')}
          associates={associates}
          setAssociates={setAssociates}
          derivedSkills={derivedSkills}
          onAskApollo={() => setIsChatOpen(true)}
        />
        <ApolloChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} role="Associate" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center items-center p-6 text-slate-900 font-sans antialiased text-center">
      <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white mb-8 shadow-md">
        <Sparkles className="w-8 h-8" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-[0.25em] text-slate-950 mb-4">
        Apollo
      </h1>
      <p className="text-lg text-slate-500 mb-12 max-w-sm">
        Select whether you are an Associate or a Manager to view and manage skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left">
        <button 
          onClick={() => setSelectedRole('Associate')}
          className="flex flex-col items-start p-8 bg-white border border-zinc-200/80 rounded-[2rem] hover:border-slate-400 hover:shadow-lg transition-all group cursor-pointer"
        >
          <Users className="w-8 h-8 text-slate-400 group-hover:text-slate-900 mb-6 transition-colors" />
          <strong className="text-xl font-medium text-slate-900 mb-2">Associate Space</strong>
          <span className="text-sm text-slate-500">View your assigned skills, complete learning modules, and track your progress.</span>
        </button>

        <button 
          onClick={() => setSelectedRole('Manager')}
          className="flex flex-col items-start p-8 bg-white border border-zinc-200/80 rounded-[2rem] hover:border-slate-400 hover:shadow-lg transition-all group cursor-pointer"
        >
          <Award className="w-8 h-8 text-slate-400 group-hover:text-slate-900 mb-6 transition-colors" />
          <strong className="text-xl font-medium text-slate-900 mb-2">Manager Space</strong>
          <span className="text-sm text-slate-500">Define competencies, generate skills with AI, and track team learning progress.</span>
        </button>
      </div>
    </div>
  );
}
