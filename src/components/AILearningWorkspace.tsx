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
    if (skill.id === 'sys-think') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Mastering Systems Thinking`,
          content: `Welcome! Let's examine how subsystems integrate and affect overall vehicle behavior. We'll increase your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Boundaries and Interactions`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `System Coupling Simulator`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Which of the following is an example of an emergent property in automotive systems?`,
          options: [
            { id: '1', text: 'The weight of a single brake pad in isolation.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'Vehicle stopping distance under changing weather and load conditions.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'The painted color of the rear bumper component.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Draft a systems engineering objective.',
          content: 'To prevent unwanted emergent behavior, we must...',
          availableWords: [
            { id: 'w1', word: 'analyze' },
            { id: 'w2', word: 'subsystem' },
            { id: 'w3', word: 'interactions' },
            { id: 'w4', word: 'across' },
            { id: 'w5', word: 'boundaries' },
            { id: 'w6', word: 'ignore' },
            { id: 'w7', word: 'paint' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair systems engineering concepts.',
          pairs: [
            { leftId: 'l1', leftText: 'Emergent Property', rightId: 'r1', rightText: 'Behavior seen only at system level' },
            { leftId: 'l2', leftText: 'Subsystem', rightId: 'r2', rightText: 'A self-contained component group' },
            { leftId: 'l3', leftText: 'Boundary', rightId: 'r3', rightText: 'Defines what is in vs out of scope' },
            { leftId: 'l4', leftText: 'Interface', rightId: 'r4', rightText: 'Connection point between modules' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'req-eng') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Robust Requirement Engineering`,
          content: `Welcome back Adore! Let's practice bidirectional traceability and testable requirement authoring. Let's elevate your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Traceability and Elicitation`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Requirements Traceability Evaluator`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Which metric should a specialist deploy to confirm requirements are testable?`,
          options: [
            { id: '1', text: 'The length and vocabulary complexity of the core requirement text.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'The presence of an objective, verifiable pass/fail condition.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'The total number of stakeholders who signed off on the document.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Draft requirement strategy.',
          content: 'To prevent scope creep and untracked changes, we...',
          availableWords: [
            { id: 'w1', word: 'maintain' },
            { id: 'w2', word: 'strict' },
            { id: 'w3', word: 'bidirectional' },
            { id: 'w4', word: 'traceability' },
            { id: 'w5', word: 'matrices' },
            { id: 'w6', word: 'ignore' },
            { id: 'w7', word: 'verbal' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair the requirement criteria.',
          pairs: [
            { leftId: 'l1', leftText: 'Atomic', rightId: 'r1', rightText: 'Expresses only one specific need' },
            { leftId: 'l2', leftText: 'Traceable', rightId: 'r2', rightText: 'Maps upstream and downstream' },
            { leftId: 'l3', leftText: 'Unambiguous', rightId: 'r3', rightText: 'Clear to all engineers' },
            { leftId: 'l4', leftText: 'Verifiable', rightId: 'r4', rightText: 'Includes pass/fail conditions' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'tol-analysis') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Mastering Tolerance Analysis`,
          content: `Welcome back Adore! Let's explore GD&T and statistical variance stack-ups. Elevate your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: RSS vs Worst-Case Stack-ups`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Tolerance Variance Simulator`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Why would an engineer choose RSS (Root Sum Square) over Worst-Case tolerance analysis?`,
          options: [
            { id: '1', text: 'RSS guarantees absolute zero defect rates in all physical component scenarios.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'RSS acknowledges manufacturing probabilities, allowing larger tolerances and reduced part cost.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'RSS relies entirely on maximum material condition constraints.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Construct a statistical tolerance strategy.',
          content: 'To lower part costs while ensuring reliable assembly fit, we...',
          availableWords: [
            { id: 'w1', word: 'calculate' },
            { id: 'w2', word: 'variations' },
            { id: 'w3', word: 'using' },
            { id: 'w4', word: 'statistical' },
            { id: 'w5', word: 'distribution' },
            { id: 'w6', word: 'ignoring' },
            { id: 'w7', word: 'limits' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair Tolerance dimensions.',
          pairs: [
            { leftId: 'l1', leftText: 'GD&T', rightId: 'r1', rightText: 'Geometric dimensioning framework' },
            { leftId: 'l2', leftText: 'RSS', rightId: 'r2', rightText: 'Statistical probability model' },
            { leftId: 'l3', leftText: 'Worst-Case', rightId: 'r3', rightText: 'Extreme boundary stacking' },
            { leftId: 'l4', leftText: 'Clearance', rightId: 'r4', rightText: 'Gap between mating parts' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'cost-opt') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Value Engineering & Cost Optimization`,
          content: `Let's inspect part consolidation routines and standardized value mapping. Boost your DFM mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Consolidation & Standardization`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Evaluate Component Value Streams`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `What is the primary benefit of standardizing fasteners in a complex vehicle chassis assembly?`,
          options: [
            { id: '1', text: 'It radically reduces structural yield strength of the main chassis.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'It reduces tooling changeover time and simplifies the supply chain overhead.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'It improves aerodynamic drag coefficients automatically.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Design an optimization protocol.',
          content: 'To lower total manufacturing unit costs systematically, we...',
          availableWords: [
            { id: 'w1', word: 'consolidate' },
            { id: 'w2', word: 'parts' },
            { id: 'w3', word: 'and' },
            { id: 'w4', word: 'standardize' },
            { id: 'w5', word: 'fasteners' },
            { id: 'w6', word: 'complicate' },
            { id: 'w7', word: 'geometry' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair Cost Optimization tools.',
          pairs: [
            { leftId: 'l1', leftText: 'Value Engineering', rightId: 'r1', rightText: 'Function vs Cost ratio' },
            { leftId: 'l2', leftText: 'Consolidation', rightId: 'r2', rightText: 'Combining separate pieces' },
            { leftId: 'l3', leftText: 'Standardization', rightId: 'r3', rightText: 'Reusing common parts' },
            { leftId: 'l4', leftText: 'Overhead', rightId: 'r4', rightText: 'Indirect manufacturing costs' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'v-model') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `V-Model Lifecycle Design`,
          content: `Let's explore the V-Model left-side requirements downward flow and right-side validation upward flow. We'll increase your mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Left vs Right Side`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Integration Simulation Framework`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `What does the right side of the V-Model predominantly represent?`,
          options: [
            { id: '1', text: 'Decomposition of abstract requirements.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'Integration of hardware/software and their subsequent validation.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'Financial budgeting and parts procurement.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Draft a lifecycle process statement.',
          content: 'To successfully complete an automotive V-Model, we...',
          availableWords: [
            { id: 'w1', word: 'integrate' },
            { id: 'w2', word: 'components' },
            { id: 'w3', word: 'and' },
            { id: 'w4', word: 'validate' },
            { id: 'w5', word: 'behavior' },
            { id: 'w6', word: 'ignore' },
            { id: 'w7', word: 'marketing' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair V-Model stages.',
          pairs: [
            { leftId: 'l1', leftText: 'System Design', rightId: 'r1', rightText: 'System Testing' },
            { leftId: 'l2', leftText: 'Architecture Design', rightId: 'r2', rightText: 'Integration Testing' },
            { leftId: 'l3', leftText: 'Detailed Design', rightId: 'r3', rightText: 'Unit Testing' },
            { leftId: 'l4', leftText: 'Requirements Analysis', rightId: 'r4', rightText: 'Acceptance Testing' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'verify-val') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Verification and Validation`,
          content: `Let's distinguish between building the system right against building the right system. Boost your validation mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Verification vs Validation`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Hardware-in-the-Loop Simulator`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Which statement accurately describes Validation?`,
          options: [
            { id: '1', text: 'Checking if source lines of code conform to formatting standards.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '2', text: 'Ensuring the implemented product satisfies the actual customer needs.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '3', text: 'Automating unit test compilation pipelines.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Design a validation checkpoint.',
          content: 'To prove a component operates safely in reality, we...',
          availableWords: [
            { id: 'w1', word: 'perform' },
            { id: 'w2', word: 'hardware' },
            { id: 'w3', word: 'in' },
            { id: 'w4', word: 'the' },
            { id: 'w5', word: 'loop' },
            { id: 'w6', word: 'skip' },
            { id: 'w7', word: 'testing' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair V&V environments.',
          pairs: [
            { leftId: 'l1', leftText: 'MIL', rightId: 'r1', rightText: 'Model-in-the-Loop' },
            { leftId: 'l2', leftText: 'SIL', rightId: 'r2', rightText: 'Software-in-the-Loop' },
            { leftId: 'l3', leftText: 'HIL', rightId: 'r3', rightText: 'Hardware-in-the-Loop' },
            { leftId: 'l4', leftText: 'VIL', rightId: 'r4', rightText: 'Vehicle-in-the-Loop' }
          ],
          leftOrder: ['l2', 'l4', 'l1', 'l3'],
          rightOrder: ['r3', 'r1', 'r4', 'r2']
        }
      ];
    } else if (skill.id === 'mat-selection') {
      return [
        {
          id: 'step-1',
          type: 'intro',
          title: `Material Selection Trade-offs`,
          content: `Let's optimize structural integrity while lowering weight and evaluating costs. Elevate your DFM mastery from ${assignment.currentScore}%.`,
        },
        {
          id: 'step-concept-1',
          type: 'concept',
          title: `Foundations: Finding the Balance`,
        },
        {
          id: 'step-sandbox',
          type: 'sandbox',
          title: `Cost-Weight Optimization Sandbox`,
        },
        {
          id: 'step-quiz',
          type: 'quiz',
          title: `Why might a high-volume manufacturer choose stamped aluminum over carbon fiber despite carbon fiber's strength?`,
          options: [
            { id: '1', text: 'Aluminum provides much lower cost and faster manufacturing cycles.', icon: <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500" />, isCorrect: true },
            { id: '2', text: 'Carbon fiber has zero tensile strength memory.', icon: <AlertCircle className="w-10 h-10 mb-2 text-slate-400" /> },
            { id: '3', text: 'Aluminum never yields under sheer load conditions.', icon: <Rocket className="w-10 h-10 mb-2 text-rose-500" /> },
          ]
        },
        {
          id: 'step-build',
          type: 'build',
          title: 'Design a material selection constraint.',
          content: 'To prevent excess mass while keeping costs low, we...',
          availableWords: [
            { id: 'w1', word: 'balance' },
            { id: 'w2', word: 'yield' },
            { id: 'w3', word: 'strength' },
            { id: 'w4', word: 'against' },
            { id: 'w5', word: 'density' },
            { id: 'w6', word: 'ignore' },
            { id: 'w7', word: 'color' }
          ],
          correctOrder: ['w1', 'w2', 'w3', 'w4', 'w5']
        },
        {
          id: 'step-match',
          type: 'match',
          title: 'Pair Material attributes.',
          pairs: [
            { leftId: 'l1', leftText: 'Yield Strength', rightId: 'r1', rightText: 'Deformation threshold' },
            { leftId: 'l2', leftText: 'Density', rightId: 'r2', rightText: 'Mass per unit volume' },
            { leftId: 'l3', leftText: 'Fatigue Limit', rightId: 'r3', rightText: 'Cyclic failure tolerance' },
            { leftId: 'l4', leftText: 'Brittle', rightId: 'r4', rightText: 'Breaks without stretching' }
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
                         {skill.id === 'sys-think' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                 1
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Define Boundaries</h3>
                               <p className="text-xs text-slate-450 font-mono">System Scope</p>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Determine what is inside your system and what is part of the environment. A clear boundary prevents feature creep and clarifies expected inputs/outputs.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                                 2
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Analyze Interactions</h3>
                               <p className="text-xs text-slate-450 font-mono">Interfaces</p>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Identify how sub-components communicate (mechanical load, thermal transfer, data signals). Poorly managed interfaces are the source of most system failures.
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-indigo-50/40 border border-indigo-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                               <div className="space-y-1 text-left">
                                 <h4 className="text-sm font-bold text-indigo-900 uppercase font-mono tracking-wider">Emergent Properties Map</h4>
                                 <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed">
                                   Trace desired system features back to the required interactions of individual subsystems.
                                 </p>
                               </div>
                               <span className="px-4 py-1.5 bg-indigo-950 text-white rounded-full text-[10px] uppercase font-bold font-mono tracking-wider shrink-0">
                                 Core Methodology
                               </span>
                             </div>
                           </div>
                         )}

                         {skill.id === 'req-eng' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-zinc-105 text-slate-800 border border-zinc-200 flex items-center justify-center">
                                 <Sparkles className="w-5 h-5 text-indigo-500" />
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Verifiable Statements</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 A core requirement must be objective. Words like "fast," "good," or "reliable" are ambiguous. Use quantifiable metrics with clear tolerances.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-202/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                 <Check className="w-5 h-5" />
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Bidirectional Traceability</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Every stakeholder rule maps down to a specific system blueprint, and every system blueprint maps up to a stakeholder rule. No orphaned code.
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-slate-50 border border-zinc-200 rounded-2xl p-6 font-mono text-xs text-slate-500 leading-relaxed">
                               <span className="font-bold text-slate-900 block mb-1">EVALUATION CONSTRAINTS</span>
                               Continuous automated requirement parsing ensures all logic statements carry testable boundaries before the design phase begins.
                             </div>
                           </div>
                         )}

                         {skill.id === 'tol-analysis' && (
                           <div className="space-y-6">
                             <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-left">
                               {[
                                 { title: "Worst-Case", desc: "All parts at extreme limits. Most expensive to manufacture.", css: "border-rose-100 bg-rose-50/25 text-rose-800" },
                                 { title: "RSS Stack-up", desc: "Statistical distribution. High yield, lower cost.", css: "border-emerald-100 bg-emerald-50/25 text-emerald-800" },
                                 { title: "GD&T Format", desc: "Standard geometric symbols controlling part envelope.", css: "border-indigo-100 bg-indigo-50/25 text-indigo-800" },
                                 { title: "Clearance Fit", desc: "Guaranteed space between mating parts.", css: "border-amber-100 bg-amber-50/25 text-amber-800" }
                               ].map((entry, idx) => (
                                 <div key={idx} className={`p-5 border duration-350 hover:scale-[1.01] rounded-2xl flex flex-col justify-between ${entry.css}`}>
                                   <strong className="text-xs uppercase font-mono tracking-tight">{entry.title}</strong>
                                   <p className="text-[11px] leading-snug mt-2 text-slate-00/70 font-sans">{entry.desc}</p>
                                 </div>
                               ))}
                             </div>
                             <p className="text-xs text-slate-450 leading-normal text-center bg-slate-50 border border-zinc-150 rounded-xl p-4 font-mono">
                               RSS limits ensure affordable tolerancing without sacrificing physical assembly yield.
                             </p>
                           </div>
                         )}

                         {skill.id === 'cost-opt' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                                 CON
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Part Consolidation</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Evaluating joined assemblies to see if they can be manufactured as a single die-cast or injection-molded unit, eliminating fastener costs entirely.
                               </p>
                             </div>

                             <div className="bg-white border-2 border-zinc-202/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold text-xs">
                                 STD
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Component Standardization</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Reusing the exact same bolts, clips, and brackets across the vehicle to simplify supply chain tracking and reduce assembly station complexity.
                               </p>
                             </div>

                             <div className="col-span-1 md:col-span-2 bg-emerald-50/40 border border-emerald-150 rounded-2xl p-5 flex items-center gap-4 text-emerald-850 text-sm">
                               <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                               <p className="leading-relaxed font-sans">
                                 Systematic value engineering reduces overall overhead while retaining core functional requirements.
                               </p>
                             </div>
                           </div>
                         )}

                         {skill.id === 'v-model' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg">
                                 L
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Left Side</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Decomposition of requirements: from abstract stakeholder needs down to detailed software and hardware design specifications.
                               </p>
                             </div>
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-lg">
                                 R
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Right Side</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Integration and validation: executing unit testing, system-level testing, and final vehicle acceptance testing against left-side specifications.
                               </p>
                             </div>
                           </div>
                         )}

                         {skill.id === 'verify-val' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-mono font-bold text-xs">
                                 VERIFY
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Verification</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 "Are we building the product right?" Testing individual components to ensure they meet their specified design documents and engineering rules.
                               </p>
                             </div>
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                               <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs">
                                 VALID
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">Validation</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 "Are we building the right product?" Confirming the final integrated vehicle performs as expected in real-world environments for the customer.
                               </p>
                             </div>
                           </div>
                         )}

                         {skill.id === 'mat-selection' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                             <div className="bg-white border-2 border-zinc-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                                 ALU
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">High Volume</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Stamping aluminum offers a perfect balance of decent yield strength and rapid manufacturing processing time at lower unit cost.
                               </p>
                             </div>
                             <div className="bg-white border-2 border-zinc-202/80 rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4 font-sans">
                               <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-100 flex items-center justify-center font-mono font-bold text-xs">
                                 CFRP
                               </div>
                               <h3 className="text-xl font-display font-medium text-slate-900">High Performance</h3>
                               <p className="text-sm text-slate-500 leading-relaxed">
                                 Carbon fiber provides unmatched ultimate tensile and extreme low mass, but introduces a costly, slow-curing manufacturing cycle.
                               </p>
                             </div>
                           </div>
                         )}

                         {skill.id !== 'sys-think' && skill.id !== 'req-eng' && skill.id !== 'tol-analysis' && skill.id !== 'cost-opt' && skill.id !== 'v-model' && skill.id !== 'verify-val' && skill.id !== 'mat-selection' && (
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
                         {skill.id === 'sys-think' && <RagSandbox onComplete={goNext} />}
                         {skill.id === 'req-eng' && <AiEvalSandbox onComplete={goNext} />}
                         {skill.id === 'tol-analysis' && <ThreatModSandbox onComplete={goNext} />}
                         {skill.id === 'cost-opt' && <DevSecOpsSandbox onComplete={goNext} />}
                         {skill.id === 'v-model' && <RagSandbox onComplete={goNext} />}
                         {skill.id === 'verify-val' && <DevSecOpsSandbox onComplete={goNext} />}
                         {skill.id === 'mat-selection' && <ThreatModSandbox onComplete={goNext} />}
                         
                         {!['sys-think', 'req-eng', 'tol-analysis', 'cost-opt', 'v-model', 'verify-val', 'mat-selection'].includes(skill.id) && (
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
                                 btnClasses += "border-slate-900 bg-slate-50 text-slate-950 border-b-slate-900 translate-y-[2px] scale-[0.99] shadow-xs";
                              } else {
                                 btnClasses += "border-zinc-200/80 bg-white text-slate-705 hover:bg-slate-50 hover:border-slate-900 hover:scale-[1.015] hover:shadow-md border-b-zinc-300 hover:border-b-slate-900 active:translate-y-[1px] active:scale-99";
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
                                 className="px-4 py-2 bg-white border-2 border-b-4 border-zinc-200/80 hover:border-slate-950 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:scale-[1.06] active:scale-95 active:border-b-2 active:translate-y-[2px] transition-all duration-150 cursor-pointer shadow-xs"
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
