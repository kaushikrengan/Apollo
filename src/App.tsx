import React, { useState } from 'react';
import { Sparkles, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';
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
    title: 'Lean Production Systems',
    description: 'Value stream modeling, continuous Kaizen cycles, bottleneck mitigation, and advanced cycle time tracking.',
    createdAt: 'June 10, 2026'
  },
  {
    id: 'comp-2',
    title: 'Zero Defect Quality Management',
    description: 'Statistical Process Control implementation, IATF 16949 audit calibration, and FMEA risk validations.',
    createdAt: 'June 12, 2026'
  }
];

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'cycle-time-opt',
    competencyId: 'comp-1',
    title: 'Cycle Time Optimization',
    category: 'Core Manufacturing',
    description: 'Time and motion studies, line balancing heuristics, layout modifications, and capacity planning.'
  },
  {
    id: 'ai-eval',
    competencyId: 'comp-1',
    title: 'Value Stream Mapping',
    category: 'Process Engineering',
    description: 'Flow mapping, non-value add identification, lead time reduction, and 5S deployments.'
  },
  {
    id: 'threat-mod',
    competencyId: 'comp-2',
    title: 'FMEA Risk Modeling',
    category: 'Quality Assurance',
    description: 'Failure mode taxonomy, risk priority number calculation, and mitigation planning protocols.'
  },
  {
    id: 'devsecops-pipeline',
    competencyId: 'comp-2',
    title: 'SPC Automation Gates',
    category: 'Quality Assurance',
    description: 'Inline sensor limit configs, automated Out-Of-Control action plans, and tolerance calibration.'
  }
];

const INITIAL_ASSOCIATES: AssociateProfile[] = [
  {
    id: 'emp-adore',
    name: 'Adore Patel',
    role: 'Senior Quality Automation Engineer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'Behind',
    assignments: [
      { skillId: 'cycle-time-opt', currentScore: 54, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 68, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 72, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 41, targetScore: 80 }
    ]
  },
  {
    id: 'emp-marcus',
    name: 'Marcus Chen',
    role: 'Lead Production Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'On Track',
    assignments: [
      { skillId: 'cycle-time-opt', currentScore: 71, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 82, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 65, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 78, targetScore: 80 }
    ]
  },
  {
    id: 'emp-liam',
    name: 'Liam Novak',
    role: 'Plant Operations Supervisor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'On Track',
    assignments: [
      { skillId: 'cycle-time-opt', currentScore: 45, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 55, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 50, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 68, targetScore: 80 }
    ]
  },
  {
    id: 'emp-zoe',
    name: 'Zoe Brooks',
    role: 'Junior Process Control Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    status: 'Behind',
    assignments: [
      { skillId: 'cycle-time-opt', currentScore: 48, targetScore: 85 },
      { skillId: 'ai-eval', currentScore: 58, targetScore: 80 },
      { skillId: 'threat-mod', currentScore: 30, targetScore: 80 },
      { skillId: 'devsecops-pipeline', currentScore: 45, targetScore: 80 }
    ]
  }
];

const TOP_RIGHT_CONTOURS = (() => {
  const paths = [];
  const centerX = 950;
  const centerY = 50;
  const lineCount = 22;
  
  for (let i = 0; i < lineCount; i++) {
    const baseRadius = 150 + i * 38;
    const points = [];
    const stepCount = 50;
    for (let j = 0; j <= stepCount; j++) {
      const t = j / stepCount; 
      const theta = Math.PI * 0.42 + (t * Math.PI * 0.75); // sweep angle
      
      const noise = (
        Math.sin(theta * 3.1) * 60 + 
        Math.cos(theta * 6.2) * 20 + 
        Math.sin(theta * 1.5) * 40
      ) * (0.8 + i * 0.02);
      
      const r = baseRadius + noise;
      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);
      points.push(`${j === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    paths.push(points.join(' '));
  }
  return paths;
})();

const BOTTOM_LEFT_CONTOURS = (() => {
  const paths = [];
  const centerX = 50;
  const centerY = 950;
  const lineCount = 22;
  
  for (let i = 0; i < lineCount; i++) {
    const baseRadius = 180 + i * 38;
    const points = [];
    const stepCount = 50;
    for (let j = 0; j <= stepCount; j++) {
      const t = j / stepCount; 
      const theta = -Math.PI * 0.58 + (t * Math.PI * 0.78); // sweep angle
      
      const noise = (
        Math.sin(theta * 3.2) * 55 + 
        Math.cos(theta * 6.5) * 18 + 
        Math.sin(theta * 1.8) * 35
      ) * (0.8 + i * 0.025);
      
      const r = baseRadius + noise;
      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);
      points.push(`${j === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    paths.push(points.join(' '));
  }
  return paths;
})();

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
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center items-center p-6 text-slate-900 font-sans antialiased text-center relative overflow-hidden">
      {/* Topographic Background Pattern (Mimics the attached contour schema) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-40 sm:opacity-60">
        <svg 
          className="w-full h-full min-w-[1000px] min-h-[1000px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="xMidYMid slice"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Right Contour Group with delicate motion */}
          <motion.g
            animate={{ 
              x: [0, 8, -4, 0], 
              y: [0, -10, 6, 0] 
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {TOP_RIGHT_CONTOURS.map((pathStr, idx) => (
              <motion.path 
                key={`tr-${idx}`}
                d={pathStr}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth={1.1 + (idx * 0.02)}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 2.2 + idx * 0.08, 
                  ease: "easeOut",
                  delay: idx * 0.035 
                }}
              />
            ))}
          </motion.g>

          {/* Bottom-Left Contour Group with delicate motion */}
          <motion.g
            animate={{ 
              x: [0, -6, 12, 0], 
              y: [0, 8, -12, 0] 
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {BOTTOM_LEFT_CONTOURS.map((pathStr, idx) => (
              <motion.path 
                key={`bl-${idx}`}
                d={pathStr}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth={1.1 + (idx * 0.02)}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 2.2 + idx * 0.08, 
                  ease: "easeOut",
                  delay: idx * 0.035 
                }}
              />
            ))}
          </motion.g>
        </svg>
      </div>

      {/* Floating Demo Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -4, 0]
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:border-slate-700 transition-all cursor-default z-20"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-100 uppercase">
          Demo Sandbox
        </span>
      </motion.div>

      {/* Main Login Screen Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center w-full max-w-2xl">
        {/* Animated Logo wrapper targeted by the CSS Selector */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -6, 0]
          }}
          whileHover={{ scale: 1.1, rotate: 12 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white mb-8 shadow-md cursor-pointer"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-[0.25em] text-slate-950 mb-4">
          Apollo
        </h1>
        <p className="text-lg text-slate-500 mb-12 max-w-sm">
          Select whether you are an Associate or a Manager to view and manage skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left">
          <motion.button 
            onClick={() => setSelectedRole('Associate')}
            whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start p-8 bg-white border border-zinc-200/80 rounded-[2rem] hover:border-slate-950 transition-colors duration-300 group cursor-pointer w-full text-left"
          >
            <div className="p-3 bg-slate-50 border border-zinc-100 rounded-2xl mb-6 group-hover:bg-slate-950 group-hover:border-slate-950 transition-colors duration-300">
              <Users className="w-6 h-6 text-slate-550 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform transition-transform" />
            </div>
            <strong className="text-xl font-medium text-slate-900 mb-2 group-hover:text-slate-955 transition-colors">Associate Space</strong>
            <span className="text-sm text-slate-500 leading-relaxed">View your assigned skills, complete learning modules, and track your progress.</span>
          </motion.button>

          <motion.button 
            onClick={() => setSelectedRole('Manager')}
            whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start p-8 bg-white border border-zinc-200/80 rounded-[2rem] hover:border-slate-950 transition-colors duration-300 group cursor-pointer w-full text-left"
          >
            <div className="p-3 bg-slate-50 border border-zinc-100 rounded-2xl mb-6 group-hover:bg-slate-950 group-hover:border-slate-950 transition-colors duration-300">
              <Award className="w-6 h-6 text-slate-550 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform transition-transform" />
            </div>
            <strong className="text-xl font-medium text-slate-900 mb-2 group-hover:text-slate-955 transition-colors">Manager Space</strong>
            <span className="text-sm text-slate-500 leading-relaxed">Define competencies, generate skills with AI, and track team learning progress.</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
