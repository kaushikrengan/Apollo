import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldAlert, ArrowRight, ShieldCheck, Heart, Target, Check,
  Lightbulb, Zap, Rocket, Star, CheckCircle2, Shield, Flame, Trophy, Sparkles, AlertCircle
} from 'lucide-react';
import { Skill, AssociateAssignment } from '../App';
import { 
  RagSandbox, AiEvalSandbox, ThreatModSandbox, DevSecOpsSandbox 
} from './InteractiveSandboxes';

interface AILearningWorkspaceProps {
  skill: Skill;
  assignment: AssociateAssignment;
  onExit: () => void;
  onSkillProgress: (newScore: number) => void;
}

type StepType = 'intro' | 'match' | 'build' | 'quiz' | 'concept' | 'sandbox' | 'completion';

interface Option {
  id: string;
  text: string;
  icon?: React.ReactNode;
  isCorrect?: boolean;
}

interface MatchPair {
  leftId: string;
  leftText: string;
  rightId: string;
  rightText: string;
}

interface Step {
  id: string;
  type: StepType;
  title: string;
  content?: string;
  options?: Option[];
  pairs?: MatchPair[];
  leftOrder?: string[];
  rightOrder?: string[];
  availableWords?: {id: string; word: string}[];
  correctOrder?: string[];
}

export default function AILearningWorkspace({ skill, assignment, onExit, onSkillProgress }: AILearningWorkspaceProps) {
  const steps = useMemo<Step[]>(() => {
    // Determine skill-specific steps
    if (skill.id === 'rag-systems') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Mastering RAG Architecture & Indexing`,
          content: `Welcome! Let's do a fast conceptual and hands-on session to target core RAG systems gaps. We'll increase your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Core Slicing Constraints`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Practical Trial: Vector Index Dimensioning`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Why is an overlap window utilized when optimizations are configured?`,
          options: [
            { id: '1', text: 'To double the number of vector records for high retrieval confidence.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'To ensure context and structural continuity for sentences split across arbitrary chunk borders.', icon: <Shield className="w-10 h-10 mb-2 text-indigo-500" />, isCorrect: true },
            { id: '3', text: 'To decrease the computational load on the embedding model during lookups.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Draft standard configuration strategy.',
          content: 'To handle sudden semantic cuts predictably during ingest, we should...',
          availableWords: [
            { id: 'w1', word: 'apply' },
            { id: 'w2', word: 'recursive' },
            { id: 'w3', word: 'character' },
            { id: 'w4', word: 'split' },
            { id: 'w5', word: 'overlapping' },
            { id: 'w6', word: 'bypass' },
            { id: 'w7', word: 'encryption' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair the RAG related concepts.',
          pairs: [
            { leftId: 'l1', leftText: 'Cosine Distance', rightId: 'r1', rightText: 'Similarity measurement' },
            { leftId: 'l2', leftText: 'Overlapping', rightId: 'r2', rightText: 'Preserving edge contexts' },
            { leftId: 'l3', leftText: 'Token Limit', rightId: 'r3', rightText: 'LLM capacity bounds' },
            { leftId: 'l4', leftText: 'Embedding', rightId: 'r4', rightText: 'Vector math projection' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'ai-eval') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Empirical QA Systems & Evaluations`,
          content: `Welcome back Adore! Let's examine numerical metrics checking bots' alignment to our master technical documentation. Let's elevate your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Evaluating Summarizations`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Precision vs Recall evaluation simulator`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Which metric should a specialist deploy to confirm a bot contains all facts from the manual?`,
          options: [
            { id: '1', text: 'BLEU scores, since precision blocks short sentences.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'ROUGE-L, as it optimizes recall to verify retained database knowledge.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'Entropy thresholds, to check repetition speeds.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Select valid evaluation pipelines.',
          content: 'To verify system alignment securely during check gates, we...',
          availableWords: [
            { id: 'w1', word: 'calculate' },
            { id: 'w2', word: 'empirical' },
            { id: 'w3', word: 'recall' },
            { id: 'w4', word: 'against' },
            { id: 'w5', word: 'ground-truth' },
            { id: 'w6', word: 'ignore' },
            { id: 'w7', word: 'metrics' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair the valuation criteria.',
          pairs: [
            { leftId: 'l1', leftText: 'BLEU Score', rightId: 'r1', rightText: 'Measures precision criteria' },
            { leftId: 'l2', leftText: 'ROUGE Score', rightId: 'r2', rightText: 'Focuses on retrieval recall' },
            { leftId: 'l3', leftText: 'Ground Truth', rightId: 'r3', rightText: 'Gold-standard reference' },
            { leftId: 'l4', leftText: 'Telemetry', rightId: 'r4', rightText: 'Active logs tracking index' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'threat-mod') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Threat Modeling & Architectural Audit`,
          content: `Let's deep dive into STRIDE guidelines. Let's increase your risk mitigation mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: STRIDE Vulnerabilities`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Audit threat vulnerabilities on flow routes`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `An attacker alters static Git commit histories. Under STRIDE, what is this classification?`,
          options: [
            { id: '1', text: 'Repudiation, because history tracks anonymous markers.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'Tampering, because they modify critical records without authorization.', icon: <Shield className="w-10 h-10 mb-2 text-indigo-500" />, isCorrect: true },
            { id: '3', text: 'Information disclosure, as history is viewable.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Construct target mitigation policies.',
          content: 'To isolate critical container gates against cluster breaches, we...',
          availableWords: [
            { id: 'w1', word: 'strip' },
            { id: 'w2', word: 'root' },
            { id: 'w3', word: 'permissions' },
            { id: 'w4', word: 'during' },
            { id: 'w5', word: 'compilation' },
            { id: 'w6', word: 'allow' },
            { id: 'w7', word: 'keys' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair STRIDE threat categories.',
          pairs: [
            { leftId: 'l1', leftText: 'Spoofing', rightId: 'r1', rightText: 'Impersonating identities' },
            { leftId: 'l2', leftText: 'Tampering', rightId: 'r2', rightText: 'Altering database states' },
            { leftId: 'l3', leftText: 'Repudiation', rightId: 'r3', rightText: 'Erasing audit traces' },
            { leftId: 'l4', leftText: 'Denial of Service', rightId: 'r4', rightText: 'Overloading server queues' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'devsecops-pipeline') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Continuous DevSecOps Security Gates`,
          content: `Let's inspect SAST scanners and dependency composite composition (SCA). Boost your pipeline security mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: SAST versus SCA Gates`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Evaluate code directories with SAST & SCA`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `What is the primary difference between a SAST scan and an SCA scan?`,
          options: [
            { id: '1', text: 'SAST scans written custom files; SCA scans imported libraries.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '2', text: 'SAST checks networks; SCA compiles binaries.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '3', text: 'SAST requires managers; SCA is fully manual.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Design automatic CI scanner checks.',
          content: 'To prevent CVE vulnerabilities during third-party dependency imports, we...',
          availableWords: [
            { id: 'w1', word: 'reject' },
            { id: 'w2', word: 'outdated' },
            { id: 'w3', word: 'composite' },
            { id: 'w4', word: 'dependency' },
            { id: 'w5', word: 'packages' },
            { id: 'w6', word: 'grant' },
            { id: 'w7', word: 'bypasses' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair automation gate concepts.',
          pairs: [
            { leftId: 'l1', leftText: 'SAST Scan', rightId: 'r1', rightText: 'Inspects key code strings' },
            { leftId: 'l2', leftText: 'SCA Scan', rightId: 'r2', rightText: 'Audits imported libraries' },
            { leftId: 'l3', leftText: 'CVE Record', rightId: 'r3', rightText: 'National vulnerability tag' },
            { leftId: 'l4', leftText: 'Git Actions', rightId: 'r4', rightText: 'Runs workflows automatically' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else {
      // General dynamic fallback for assigned skills
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Mastering ${skill.title}`,
          content: `Welcome to the custom learning path for ${skill.title}. Let's target key elements and level up your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-default',
          type: 'concept',
          title: `Foundations of ${skill.title}`,
        },
        {
          id: 'step-quiz-default',
          type: 'quiz',
          title: `What is the primary action required of you to master ${skill.title}?`,
          options: [
            { id: '1', text: 'Bypass standard quality parameters for quick results.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'Sustain critical compliance rates, investigate security anomalies, and track metrics.', icon: <Shield className="w-10 h-10 mb-2 text-indigo-500" />, isCorrect: true },
            { id: '3', text: 'Manual server restarts whenever code delays occur.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build-default',
          type: 'build',
          title: 'Formulate core deployment objectives.',
          content: 'To maintain compliant standards reliably under corporate programs, we must...',
          availableWords: [
            { id: 'w1', word: 'implement' },
            { id: 'w2', word: 'automated' },
            { id: 'w3', word: 'verification' },
            { id: 'w4', word: 'for' },
            { id: 'w5', word: 'deployments' },
            { id: 'w6', word: 'bypass' },
            { id: 'w7', word: 'checks' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        }
      ];
    }
  }, [skill, assignment.currentScore]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Build state
  const [builtWordIds, setBuiltWordIds] = useState<string[]>([]);
  
  // Match state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [activeRightId, setActiveRightId] = useState<string | null>(null);

  const [status, setStatus] = useState<'idle' | 'checked'>('idle');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hearts, setHearts] = useState(3);
  const [streak, setStreak] = useState(3);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentIndex];
  const isLastStep = currentIndex === steps.length - 1;

  const handleMatchClick = (side: 'left' | 'right', id: string) => {
    if (status === 'checked') return;

    if (side === 'left') {
      if (activeRightId) {
        const pair = step.pairs?.find(p => p.leftId === id);
        if (pair?.rightId === activeRightId) {
          setMatchedPairs(prev => [...prev, id]);
          setActiveRightId(null);
        } else {
          setHearts(h => Math.max(0, h - 1));
          setStreak(0);
          setActiveRightId(null);
        }
      } else {
        setActiveLeftId(id === activeLeftId ? null : id);
      }
    } else {
      if (activeLeftId) {
        const pair = step.pairs?.find(p => p.leftId === activeLeftId);
        if (pair?.rightId === id) {
          setMatchedPairs(prev => [...prev, activeLeftId]);
          setActiveLeftId(null);
        } else {
          setHearts(h => Math.max(0, h - 1));
          setStreak(0);
          setActiveLeftId(null);
        }
      } else {
        setActiveRightId(id === activeRightId ? null : id);
      }
    }
  };

  const handleCheck = () => {
    if (step.type === 'intro' || step.type === 'concept') {
      goNext();
      return;
    }

    if (status === 'idle') {
      let correct = false;

      if (step.type === 'quiz') {
        if (!selectedOption) return;
        const correctOpt = step.options?.find(o => o.isCorrect);
        correct = selectedOption === correctOpt?.id;
      } else if (step.type === 'build') {
        if (builtWordIds.length === 0) return;
        correct = builtWordIds.join(',') === step.correctOrder?.join(',');
      } else if (step.type === 'match') {
        if (matchedPairs.length !== step.pairs?.length) return;
        correct = true; 
      }

      setIsCorrect(correct);
      setStatus('checked');
      if (!correct) {
        setHearts(h => Math.max(0, h - 1));
        setStreak(0);
      } else {
        setStreak(s => s + 1);
      }
    } else {
      goNext();
    }
  };

  const goNext = () => {
    if (isLastStep) {
      setCompleted(true);
      const increment = 15;
      const nextScore = Math.min(assignment.currentScore + increment, 100);
      onSkillProgress(nextScore);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setBuiltWordIds([]);
      setMatchedPairs([]);
      setActiveLeftId(null);
      setActiveRightId(null);
      setStatus('idle');
      setIsCorrect(null);
    }
  };

  const isCheckDisabled = () => {
    if (status === 'checked') return false;
    if (step.type === 'intro' || step.type === 'concept' || step.type === 'sandbox') return false;
    if (step.type === 'quiz' && !selectedOption) return true;
    if (step.type === 'build' && builtWordIds.length === 0) return true;
    if (step.type === 'match' && matchedPairs.length !== step.pairs?.length) return true;
    return false;
  };

  return (
    <div className="bg-[#FAF9F6] min-h-[100dvh] flex flex-col font-sans text-slate-900 relative">
      {/* Top Header */}
      {!completed && (
        <header className="w-full max-w-4xl mx-auto px-4 md:px-8 py-6 flex items-center gap-4 md:gap-8">
          <button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors p-2 cursor-pointer">
            <X className="w-6 h-6 stroke-[3]" />
          </button>
          
          {/* Progress Bar */}
          <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500"
              initial={{ width: `${(currentIndex / steps.length) * 100}%` }}
              animate={{ width: `${((currentIndex + (status === 'checked' && isCorrect ? 1 : 0)) / steps.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 font-bold text-lg shrink-0">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Flame className="w-6 h-6 fill-amber-500" />
              <span>{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-500">
              <Heart className="w-6 h-6 fill-rose-500" />
              <span>{hearts}</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-12 flex flex-col items-center justify-center pb-40">
          <AnimatePresence mode="wait">
              {completed ? (
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center max-w-lg space-y-8 w-full"
                >
                   <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-4 animate-bounce">
                      <Trophy className="w-16 h-16 fill-amber-500" />
                   </div>
                   <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-950 tracking-tight">Lesson Complete!</h2>
                   <p className="text-lg text-slate-600 font-medium">You've successfully mastered new concepts in {skill.title}. Your AI model has updated your mastery score.</p>
                   
                   <div className="w-full grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col items-center">
                         <span className="uppercase text-[10px] font-semibold tracking-widest text-slate-500 mb-2">Total XP</span>
                         <span className="text-4xl font-display font-medium text-amber-600">+45</span>
                      </div>
                      <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col items-center">
                         <span className="uppercase text-[10px] font-semibold tracking-widest text-slate-500 mb-2">Mastery</span>
                         <span className="text-4xl font-display font-medium text-emerald-600">{Math.min(assignment.currentScore + 15, 100)}%</span>
                      </div>
                   </div>

                   <button 
                    onClick={onExit}
                    className="mt-8 px-12 py-3.5 rounded-2xl bg-slate-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all focus:outline-none shadow-sm cursor-pointer"
                   >
                     Continue Journey
                   </button>
                </motion.div>
              ) : (
                <motion.div
                   key={step.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="w-full flex flex-col pt-8"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-950 mb-8 tracking-tight max-w-2xl mx-auto text-center leading-tight">
                      {step.title}
                    </h2>

                    {step.content && (
                      <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-12">
                         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-950 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                           <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
                         </div>
                         <div className="bg-white border border-zinc-200/80 rounded-3xl rounded-tl-none p-6 md:p-8 text-slate-700 flex-1 relative mt-2 md:mt-0 shadow-sm text-left">
                           {/* Speech bubble pointer (desktop) */}
                           <div className="hidden md:block absolute top-8 -left-3 w-6 h-6 bg-white border-t border-l border-zinc-200/80 transform -translate-x-[50%] skew-x-12" />
                           <p className="text-lg font-normal leading-relaxed relative z-10">{step.content}</p>
                         </div>
                      </div>
                    )}

                    {step.type === 'concept' && (
                       <div className="w-full max-w-3xl mx-auto space-y-6">
                         {skill.id === 'rag-systems' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                 1
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Small Chunk Dimensions</h3>
                               <p className="text-xs text-slate-450 font-mono">100 to 300 Tokens range</p>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Partitions documentation into highly focused, isolated units. Elevates semantic search accuracy for exact lookup indices, but risks stripping adjacent context frames.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                                 2
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Large Chunk Dimensions</h3>
                               <p className="text-xs text-slate-450 font-mono">800 to 1000 Tokens range</p>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Keeps complete paragraphs and structural layout outlines fully cohesive. However, feeds excessive word-noise to LLM contexts, dragging precision weights down.
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-indigo-50/40 border border-indigo-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                               <div className="space-y-1 text-left">
                                 <h4 className="text-sm font-bold text-indigo-900 uppercase font-mono tracking-wider">The 15% Overlap Safeguard</h4>
                                 <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed">
                                   Preserves contiguous dictionary links across partition thresholds, preventing crucial context from being severed during indexing.
                                 </p>
                               </div>
                               <span className="px-4 py-1.5 bg-indigo-950 text-white rounded-full text-[10px] uppercase font-bold font-mono tracking-wider shrink-0">
                                 Recommended Strategy
                               </span>
                             </div>
                           </div>
                         )}

                         {skill.id === 'ai-eval' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-zinc-105 text-slate-800 border border-zinc-200 flex items-center justify-center">
                                 <Sparkles className="w-5 h-5 text-indigo-500" />
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">BLEU Rate (Precision)</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Audits token exact matches from predicted candidate string back to reference targets. Restricts model verbosity, preventing bot noise.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-202/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                 <Check className="w-5 h-5" />
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">ROUGE-L Score (Recall)</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Verifies how much of our ground-truth reference survived the generation. Crucial for verifying compliance thresholds (Enterprise standard: min 0.72).
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-slate-50 border border-zinc-200 rounded-2xl p-6 font-mono text-xs text-slate-500 leading-relaxed">
                               <span className="font-bold text-slate-900 block mb-1">EVALUATION CONSTRAINTS</span>
                               Continuous automated scoring replaces slow manual reviews. We check precision and recall values dynamically at compilation time.
                             </div>
                           </div>
                         )}

                         {skill.id === 'threat-mod' && (
                           <div className="space-y-6">
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                               {[
                                 { title: "S - Spoofing", desc: "Forging credential keys to hijack trusted roles.", css: "border-rose-100 bg-rose-50/25 text-rose-800" },
                                 { title: "T - Tampering", desc: "Altering configuration registries or commit directories.", css: "border-amber-100 bg-amber-50/25 text-amber-800" },
                                 { title: "R - Repudiation", desc: "Erasing administrative trace trails from ledger tables.", css: "border-emerald-100 bg-emerald-50/25 text-emerald-800" },
                                 { title: "I - Info Leak", desc: "Exposing secure credentials inside application calls.", css: "border-indigo-100 bg-indigo-50/25 text-indigo-800" },
                                 { title: "D - DoS Flood", desc: "Flooding network boundaries to cause node timeout faults.", css: "border-slate-205 bg-slate-50 text-slate-800" },
                                 { title: "E - Privilege", desc: "Acquiring elevated command root clearances illegally.", css: "border-violet-100 bg-violet-50/25 text-violet-800" }
                               ].map((entry, idx) => (
                                 <div key={idx} className={`p-5 border duration-350 hover:scale-[1.01] rounded-2xl flex flex-col justify-between ${entry.css}`}>
                                   <strong className="text-xs uppercase font-mono tracking-tight">{entry.title}</strong>
                                   <p className="text-[11px] leading-snug mt-2 text-slate-00/70 font-sans">{entry.desc}</p>
                                 </div>
                               ))}
                             </div>
                             <p className="text-xs text-slate-450 leading-normal text-center bg-slate-50 border border-zinc-150 rounded-xl p-4 font-mono">
                               STRIDE acts as our blueprint map ensuring our secure containers check gates block all vectors.
                             </p>
                           </div>
                         )}

                         {skill.id === 'devsecops-pipeline' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                                 SAST
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Static Scanner Rules</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Audits direct written files (e.g. typescript, python strings) inside repo commits. Proactively highlights credentials leak or poor routing hooks.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-202/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold text-xs">
                                 SCA
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Composition Scanner Rules</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Inspects external package dependencies. References national databases in real-time to prevent outdated libraries with CVE records.
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-emerald-50/40 border border-emerald-150 rounded-2xl p-5 flex items-center gap-4 text-emerald-850 text-sm">
                               <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                               <p className="leading-relaxed font-sans">
                                 Combining standard SAST strings scanning with systematic SCA dependency audits ensures absolute mitigation across codebases.
                               </p>
                             </div>
                           </div>
                         )}

                         {skill.id !== 'rag-systems' && skill.id !== 'ai-eval' && skill.id !== 'threat-mod' && skill.id !== 'devsecops-pipeline' && (
                           <div className="bg-white border-2 border-zinc-200/80 rounded-3xl p-8 shadow-sm text-left space-y-5">
                             <h4 className="text-lg font-bold text-slate-900">Core Principles of {skill.title}</h4>
                             <p className="text-sm text-slate-600 leading-relaxed">
                               {skill.description}
                             </p>
                             <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-xl text-xs font-mono text-slate-500">
                               <strong>Requirement:</strong> Verify input parameters, adhere to resource limits, and maintain target coverage goals.
                             </div>
                           </div>
                         )}
                       </div>
                    )}

                    {step.type === 'sandbox' && (
                       <div className="w-full">
                         {skill.id === 'rag-systems' && <RagSandbox onComplete={goNext} />}
                         {skill.id === 'ai-eval' && <AiEvalSandbox onComplete={goNext} />}
                         {skill.id === 'threat-mod' && <ThreatModSandbox onComplete={goNext} />}
                         {skill.id === 'devsecops-pipeline' && <DevSecOpsSandbox onComplete={goNext} />}
                         
                         {skill.id !== 'rag-systems' && skill.id !== 'ai-eval' && skill.id !== 'threat-mod' && skill.id !== 'devsecops-pipeline' && (
                           <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-xl mx-auto">
                              <h4 className="text-md font-bold mb-4">Fallback Playgrounds Sandbox</h4>
                              <p className="text-sm text-slate-500 mb-6">Explore compliance parameters dynamically.</p>
                              <button onClick={goNext} className="py-2.5 px-6 rounded-xl bg-slate-950 text-white font-bold text-xs uppercase tracking-wider">Confirm Audit Setup</button>
                           </div>
                         )}
                       </div>
                    )}

                    {step.type === 'quiz' && step.options && (
                       <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
                         {step.options.map(opt => {
                            const isSelected = selectedOption === opt.id;
                            const showCorrect = status === 'checked' && opt.isCorrect;
                            const showError = status === 'checked' && isSelected && !opt.isCorrect;

                            let btnClasses = "w-full p-4 md:p-6 border-2 border-b-4 rounded-2xl flex items-center gap-4 transition-all text-left focus:outline-none cursor-pointer ";
                            
                            if (status === 'idle') {
                              if (isSelected) {
                                 btnClasses += "border-slate-900 bg-slate-50 text-slate-950 border-b-slate-900 translate-y-[2px]";
                              } else {
                                 btnClasses += "border-zinc-200/80 bg-white text-slate-705 hover:bg-slate-50 border-b-zinc-300 hover:border-b-zinc-305 active:translate-y-[1px]";
                              }
                            } else {
                              if (showCorrect) {
                                 btnClasses += "border-emerald-500 bg-emerald-50 text-emerald-950 border-b-emerald-600";
                              } else if (showError) {
                                 btnClasses += "border-rose-500 bg-rose-50 text-rose-950 border-b-rose-600";
                              } else if (opt.isCorrect && !isSelected) {
                                 btnClasses += "border-emerald-200 bg-white text-emerald-700 border-b-emerald-300 opacity-60";
                              } else {
                                 btnClasses += "border-zinc-200/80 bg-white text-slate-400 border-b-zinc-200/80 opacity-50";
                              }
                            }

                            return (
                              <button
                                 key={opt.id}
                                 disabled={status === 'checked'}
                                 onClick={() => setSelectedOption(opt.id)}
                                 className={btnClasses}
                              >
                                 {opt.icon && <div className="shrink-0">{opt.icon}</div>}
                                 <span className="font-medium text-lg leading-snug">{opt.text}</span>
                              </button>
                            );
                         })}
                       </div>
                    )}

                    {step.type === 'build' && step.availableWords && (
                       <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full text-left">
                         <div className={`min-h-[80px] w-full p-4 border-2 border-b-4 rounded-2xl flex flex-wrap gap-2 items-start shadow-sm transition-colors ${
                            status === 'checked' 
                              ? (isCorrect ? 'bg-emerald-50 border-emerald-200 border-b-emerald-300' : 'bg-rose-50 border-rose-200 border-b-rose-300')
                              : 'bg-white border-zinc-200/80 border-b-zinc-300'
                         }`}>
                            {builtWordIds.map(id => {
                               const wordObj = step.availableWords!.find(w => w.id === id);
                               return (
                                 <button 
                                   key={id}
                                   disabled={status === 'checked'}
                                   type="button"
                                   onClick={() => setBuiltWordIds(prev => prev.filter(w => w !== id))}
                                   className={`px-4 py-2 border-2 border-b-4 rounded-xl font-medium transition-all cursor-pointer ${
                                     status === 'checked' 
                                      ? (isCorrect ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-rose-100 border-rose-300 text-rose-800')
                                      : 'bg-white border-zinc-250 hover:bg-slate-50 text-slate-700 active:border-b-2 active:translate-y-[2px]'
                                   }`}
                                 >
                                   {wordObj?.word}
                                 </button>
                               )
                            })}
                         </div>

                         <div className="flex flex-wrap gap-2 items-center justify-center pt-8 border-t border-zinc-100">
                            {step.availableWords.filter(w => !builtWordIds.includes(w.id)).map(wordObj => (
                               <button 
                                 key={wordObj.id}
                                 disabled={status === 'checked'}
                                 type="button"
                                 onClick={() => setBuiltWordIds(prev => [...prev, wordObj.id])}
                                 className="px-4 py-2 bg-white border-2 border-b-4 border-zinc-200/80 rounded-xl font-medium text-slate-700 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer"
                               >
                                 {wordObj.word}
                               </button>
                            ))}
                         </div>
                       </div>
                    )}

                    {step.type === 'match' && step.pairs && (
                       <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto w-full text-left">
                         <div className="flex flex-col gap-3">
                           {step.leftOrder?.map(leftId => {
                             const isMatched = matchedPairs.includes(leftId);
                             const isActive = activeLeftId === leftId;
                             const item = step.pairs!.find(p => p.leftId === leftId)!;
                             
                             let btnClasses = "w-full p-4 border-2 border-b-4 rounded-xl font-medium text-left transition-all focus:outline-none cursor-pointer ";
                             if (isMatched) {
                                btnClasses += "bg-slate-100 border-zinc-200/85 border-b-zinc-200/85 text-slate-400 opacity-50 cursor-default";
                             } else if (isActive) {
                                btnClasses += "bg-slate-900 border-slate-950 border-b-slate-950 text-white translate-y-[2px]";
                             } else {
                                btnClasses += "bg-white border-zinc-210 border-b-zinc-300 text-slate-700 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]";
                             }

                             return (
                               <button 
                                 key={leftId}
                                 disabled={isMatched || status === 'checked'}
                                 onClick={() => handleMatchClick('left', leftId)}
                                 className={btnClasses}
                               >
                                 {item.leftText}
                               </button>
                             );
                           })}
                         </div>
                         <div className="flex flex-col gap-3">
                           {step.rightOrder?.map(rightId => {
                             const pairAssoc = step.pairs!.find(p => p.rightId === rightId)!;
                             const isMatched = matchedPairs.includes(pairAssoc.leftId);
                             const isActive = activeRightId === rightId;
                             
                             let btnClasses = "w-full p-4 border-2 border-b-4 rounded-xl font-medium text-left transition-all focus:outline-none cursor-pointer ";
                             if (isMatched) {
                                btnClasses += "bg-slate-100 border-zinc-200/85 border-b-zinc-200/85 text-slate-400 opacity-50 cursor-default";
                             } else if (isActive) {
                                btnClasses += "bg-slate-900 border-slate-950 border-b-slate-950 text-white translate-y-[2px]";
                             } else {
                                btnClasses += "bg-white border-zinc-210 border-b-zinc-300 text-slate-700 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]";
                             }

                             return (
                               <button 
                                 key={rightId}
                                 disabled={isMatched || status === 'checked'}
                                 onClick={() => handleMatchClick('right', rightId)}
                                 className={btnClasses}
                               >
                                 {pairAssoc.rightText}
                               </button>
                             );
                           })}
                         </div>
                       </div>
                    )}
                 </motion.div>
              )}
          </AnimatePresence>
      </main>

      {/* Bottom Feedback / Action Bar */}
      {!completed && step.type !== 'sandbox' && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-50 pointer-events-none pb-8">
           <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-row items-center justify-between gap-4 pointer-events-auto">
              
              <div className="flex items-center gap-4 w-full md:w-auto min-h-[4rem]">
                 {status === 'checked' && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex items-center gap-4 text-left p-4 rounded-2xl border shadow-lg backdrop-blur-md ${isCorrect ? 'bg-emerald-50/95 border-emerald-200 text-slate-900' : 'bg-rose-50/95 border-rose-200 text-slate-900'}`}
                   >
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-xs border shrink-0 ${isCorrect ? 'text-emerald-500 border-emerald-100' : 'text-rose-500 border-rose-100'}`}>
                       {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5 stroke-[3]" />}
                     </div>
                     <div className="flex flex-col">
                       <span className={`text-lg font-display font-bold leading-tight ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                         {isCorrect ? 'Excellent!' : 'Not quite!'}
                       </span>
                       {!isCorrect && (
                         <span className="text-rose-700 font-medium text-xs mt-0.5 tracking-tight max-w-sm md:max-w-md block">
                           Correct answer: {step.type === 'quiz' ? (step.options?.find(o => o.isCorrect)?.text) : 'Strategy alignment mismatch.'}
                         </span>
                       )}
                     </div>
                   </motion.div>
                 )}
              </div>

              <button 
                disabled={isCheckDisabled()}
                onClick={handleCheck}
                className={`w-full md:w-auto px-10 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-98 cursor-pointer shrink-0 ${
                   status === 'checked' 
                    ? (isCorrect ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white')
                    : (!isCheckDisabled() ? 'bg-slate-950 hover:bg-slate-900 text-white' : 'bg-slate-100 text-slate-400')
                }`}
              >
                {status === 'checked' ? 'Continue' : (step.type === 'intro' || step.type === 'concept') ? 'Continue' : 'Check'}
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
