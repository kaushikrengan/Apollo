import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronLeft,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Award,
  BookMarked
} from 'lucide-react';
import { Skill, AssociateProfile, AssociateAssignment } from '../App';
import AILearningWorkspace from './AILearningWorkspace';

// Shared module types
export interface MicroModule {
  id: string;
  title: string;
  category: string;
  narrative: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface TrainingCourse {
  skillId: string;
  skillName: string;
  description: string;
  category: string;
  modules: MicroModule[];
}

const STATIC_COURSES_DATA: Record<string, TrainingCourse> = {
  'sys-think': {
    skillId: 'sys-think',
    skillName: 'Systems Thinking',
    category: 'Systems Engineering',
    description: 'Master analyzing the interactions between subsystems, electronic control units, and mechanical linkages.',
    modules: [
      {
        id: 'sys-m1',
        title: 'System Boundaries and Interactions',
        category: 'Core Theory',
        narrative: "When addressing complex automotive systems, defining the boundary is critical. We must understand how the braking system interacts with the suspension and powertrain.\n\nSystems thinking helps us predict emergent properties that single components do not exhibit alone.",
        quiz: {
          question: "Which of the following is an example of an emergent property in automotive systems?",
          options: [
            "The weight of a single brake pad.",
            "Vehicle stopping distance under wet conditions.",
            "The color of the exterior paint."
          ],
          correctIndex: 1,
          explanation: "Stopping distance depends on the interaction between tires, brakes, suspension, and vehicle weight—an emergent property."
        }
      }
    ]
  },
  'req-eng': {
    skillId: 'req-eng',
    skillName: 'Requirement Engineering',
    category: 'Systems Engineering',
    description: 'Implement rigorous documentation and traceability of stakeholder and system requirements.',
    modules: [
      {
        id: 'req-m1',
        title: 'Traceability and Elicitation',
        category: 'Core Theory',
        narrative: "Good requirements are atomic, unambiguous, and testable. Traceability ensures every stakeholder need has a matching system requirement, and every system requirement has a test case.\n\nA typical target threshold for compliance is 100% bidirectional traceability.",
        quiz: {
          question: "Which metric should a specialist deploy to confirm requirements are testable?",
          options: [
            "The length of the requirement text.",
            "The presence of a verifiable pass/fail condition.",
            "How many engineers reviewed it."
          ],
          correctIndex: 1,
          explanation: "A requirement is only testable if it has clear, objective pass/fail criteria."
        }
      }
    ]
  },
  'tol-analysis': {
    skillId: 'tol-analysis',
    skillName: 'Tolerance Analysis',
    category: 'Design for Manufacturability',
    description: 'Apply statistical variance modeling and stack-ups to ensure manufacturability.',
    modules: [
      {
        id: 'tol-m1',
        title: 'Statistical vs Worst-Case Stack-ups',
        category: 'Core Theory',
        narrative: "Geometric dimensioning and tolerancing (GD&T) defines the allowed variation. \n\n- Worst-Case: Assumes all parts are at their extreme limits.\n- Root Sum Square (RSS): Statistical approach assuming normal distribution of sizes.\n\nUsing RSS allows for looser individual tolerances while still meeting assembly requirements.",
        quiz: {
          question: "Why would an engineer choose RSS over Worst-Case tolerance analysis?",
          options: [
            "RSS guarantees zero defects in all scenarios.",
            "RSS allows for larger manufacturing tolerances, reducing cost.",
            "RSS only works for plastic components."
          ],
          correctIndex: 1,
          explanation: "RSS acknowledges that it's highly improbable for all parts to be at their extreme worst-case simultaneously, allowing cheaper, looser tolerances."
        }
      }
    ]
  },
  'cost-opt': {
    skillId: 'cost-opt',
    skillName: 'Cost Optimization',
    category: 'Design for Manufacturability',
    description: 'Embed value engineering practices to reduce manufacturing steps and lower unit costs.',
    modules: [
      {
        id: 'cost-m1',
        title: 'Value Engineering and Part Consolidation',
        category: 'Core Theory',
        narrative: "Cost optimization involves looking at the function of a part and finding the most economical way to achieve it.\n- Part Consolidation: Combining multiple parts into one molded or cast piece.\n- Standardizing Fasteners: Using the same bolt sizes across the assembly.\n\nReducing part count reduces assembly time and supply chain overhead.",
        quiz: {
          question: "What is the primary benefit of standardizing fasteners in an assembly?",
          options: [
            "Reduces the number of tools required on the assembly line.",
            "Increases the top speed of the vehicle.",
            "Improves the aerodynamic drag coefficient."
          ],
          correctIndex: 0,
          explanation: "Fewer unique fasteners means operators need fewer tools and spend less time switching between them, lowering assembly costs."
        }
      }
    ]
  },
  'v-model': {
    skillId: 'v-model',
    skillName: 'V Model Development',
    category: 'Systems Engineering',
    description: 'Learn the principles of V Model lifecycle integration from concept to validation.',
    modules: [
      {
        id: 'v-m1',
        title: 'V-Model Lifecycle',
        category: 'Core Theory',
        narrative: "The V-Model represents a software development process whose steps can be considered an extension of the waterfall model. Instead of moving down in a linear way, the process steps are bent upwards after the coding phase, to form the typical V shape.\n\nThe left side represents the decomposition of requirements, and the right side represents integration of parts and their validation.",
        quiz: {
          question: "What does the right side of the V-Model represent?",
          options: [
            "Decomposition of requirements.",
            "Integration and validation of system components.",
            "Coding and rapid prototyping."
          ],
          correctIndex: 1,
          explanation: "The right side of the V-Model focuses on integration and validation tasks, checking the built product against the design."
        }
      }
    ]
  },
  'verify-val': {
    skillId: 'verify-val',
    skillName: 'Verification and validation',
    category: 'Systems Engineering',
    description: 'Master the execution of unit tests, HIL simulations, and final validation workflows.',
    modules: [
      {
        id: 'vv-m1',
        title: 'Verification vs Validation',
        category: 'Core Theory',
        narrative: "While often used interchangeably, verification and validation mean different things in automotive systems engineering.\n\n- Verification: 'Are we building the product right?' Checks if the system meets specified requirements.\n- Validation: 'Are we building the right product?' Checks if the system meets stakeholder expectations.",
        quiz: {
          question: "Which of the following describes Validation?",
          options: [
            "Checking if the software code follows linting rules.",
            "Ensuring the final product satisfies the customer's actual needs.",
            "Verifying that a low-level software requirement was tested."
          ],
          correctIndex: 1,
          explanation: "Validation ensures that the system solves the correct problem and satisfies stakeholder intended use."
        }
      }
    ]
  },
  'mat-selection': {
    skillId: 'mat-selection',
    skillName: 'Material Selection',
    category: 'Design for Manufacturability',
    description: 'Evaluate material properties to optimize weight reduction and manufacturability.',
    modules: [
      {
        id: 'mat-m1',
        title: 'Material Trade-offs',
        category: 'Core Theory',
        narrative: "Material selection involves finding the balance between weight, cost, yield strength, and manufacturability.\n\nFor example, while carbon fiber provides an excellent strength-to-weight ratio, its processing time and cost are much higher than stamped steel or aluminum. Selecting the right material is essential for minimizing mass without sacrificing structural integrity.",
        quiz: {
          question: "Why might an engineer select aluminum over carbon fiber for a medium-volume vehicle component?",
          options: [
            "Aluminum has a higher ultimate tensile strength than carbon fiber.",
            "Aluminum represents a much lower cost and faster manufacturing cycle time.",
            "Carbon fiber rusts when exposed to salt."
          ],
          correctIndex: 1,
          explanation: "Aluminum is significantly cheaper and easier to manufacture in volume compared to carbon fiber, despite carbon fiber's better strength-to-weight characteristics."
        }
      }
    ]
  }
};

interface AssociateDashboardProps {
  onExit: () => void;
  associates: AssociateProfile[];
  setAssociates: React.Dispatch<React.SetStateAction<AssociateProfile[]>>;
  derivedSkills: Skill[];
  onAskApollo: () => void;
}

export default function AssociateDashboard({
  onExit,
  associates,
  setAssociates,
  derivedSkills,
  onAskApollo
}: AssociateDashboardProps) {
  // We look up 'Adore Patel' (the active logged-in associate perspective)
  const currentAssociateId = 'emp-adore';

  const currentAssociate = useMemo(() => {
    return associates.find(a => a.id === currentAssociateId) || associates[0];
  }, [associates]);

  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Dynamically resolve course data (supports preloaded and brand new manager-assigned skills)
  const activeCourse = useMemo(() => {
    if (!activeCourseId) return null;
    
    // Check if we have preloaded static module content
    if (STATIC_COURSES_DATA[activeCourseId]) {
      return STATIC_COURSES_DATA[activeCourseId];
    }

    // Otherwise, generate a stunning dynamic course based on the freshly derived manager skill!
    const skillObj = derivedSkills.find(s => s.id === activeCourseId);
    if (!skillObj) return null;

    return {
      skillId: skillObj.id,
      skillName: skillObj.title,
      category: skillObj.category,
      description: skillObj.description,
      modules: [
        {
          id: `module-${skillObj.id}`,
          title: `Core Principles of ${skillObj.title}`,
          category: 'Core Theory',
          narrative: `Welcome to the learning module for **${skillObj.title}** under our company program.\n\nThis training block directly addresses your assigned skill: "${skillObj.description}".\n\nTo successfully complete this module, ensure you understand: \n- **Key Fundamentals & Concepts** (understanding core workflow and setup boundaries).\n- **Practical Application Methods** (putting guidelines into practice with proper checks).\n- **Best Practices & Safety** (ensuring secure and robust execution).`,
          quiz: {
            question: `What is the primary action expected of you to master ${skillObj.title}?`,
            options: [
              "We should bypass all integration tests for a faster rollout.",
              "Implement robust security validation, perform resource-efficiency audits, and sustain target thresholds.",
              "Ignore all input parameters and randomize outputs."
            ],
            correctIndex: 1,
            explanation: `Automating quality measures, verifying input constraints, and checking performance standards guarantees secure and stable system deployments.`
          }
        }
      ]
    };
  }, [activeCourseId, derivedSkills]);

  const overallAverageScore = useMemo(() => {
    if (currentAssociate.assignments.length === 0) return 0;
    const totalSum = currentAssociate.assignments.reduce((sum, s) => sum + s.currentScore, 0);
    return Math.round(totalSum / currentAssociate.assignments.length);
  }, [currentAssociate]);

  const handleStartCourse = (skillId: string) => {
    setActiveCourseId(skillId);
  };

  const handleSkillProgress = (newScore: number) => {
    setAssociates(prev => prev.map(assoc => {
      if (assoc.id !== currentAssociateId) return assoc;
      
      return {
        ...assoc,
        assignments: assoc.assignments.map(asg => {
          if (asg.skillId === activeCourseId) {
            return { ...asg, currentScore: newScore };
          }
          return asg;
        })
      };
    }));
  };

  if (activeCourseId) {
    const activeSkillObj = derivedSkills.find(s => s.id === activeCourseId) || {
      id: activeCourseId,
      title: activeCourse ? activeCourse.skillName : 'Custom Module',
      category: activeCourse ? activeCourse.category : 'General',
      description: activeCourse ? activeCourse.description : 'Specialized track',
      competencyId: 'comp-1'
    };
    
    const activeAssignment = currentAssociate.assignments.find(a => a.skillId === activeCourseId);

    if (activeAssignment) {
      return (
        <AILearningWorkspace 
          skill={activeSkillObj}
          assignment={activeAssignment}
          onExit={() => setActiveCourseId(null)}
          onSkillProgress={handleSkillProgress}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased flex flex-col items-center">
      
      {/* Micro Professional header */}
      <header className="px-4 sm:px-6 md:px-12 py-5 sm:py-8 flex items-center justify-between w-full max-w-6xl border-b border-zinc-200/50 relative">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 shadow-xs">
             <img src={currentAssociate.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-semibold text-slate-900">Associate Space</h1>
            <span className="text-[10px] sm:text-xs text-slate-400 block font-mono">Adore Patel / Hub</span>
          </div>
        </div>

        {/* Centered Platform Brand text with premium font style */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <span className="font-display font-bold uppercase tracking-[0.25em] text-[#0a0a0c] text-sm sm:text-base leading-none">
            Apollo
          </span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6 z-10 shrink-0">
          <button
            id="ask-apollo-associate-button"
            onClick={onAskApollo}
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-slate-950 hover:bg-slate-900 active:scale-95 hover:scale-105 active:bg-slate-950 text-white rounded-full text-[10px] sm:text-xs font-semibold tracking-tight transition-all duration-200 shadow-sm hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)] shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:animate-pulse" />
            <span>Ask Apollo</span>
          </button>

          <button 
            onClick={onExit}
            className="text-[10px] sm:text-xs font-mono tracking-wider font-semibold uppercase text-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-98 transition-all duration-200 border-b border-transparent hover:border-slate-900 pb-0.5 whitespace-nowrap flex items-center gap-1"
          >
            <span className="sm:inline hidden">&larr; Switch Space</span>
            <span className="inline sm:hidden">&larr; Switch</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl px-4 sm:px-6 md:px-12 pb-24 text-left flex flex-col mt-8 sm:mt-12 animate-fade-in">
        
        {/* Simple & Aesthetic narrative greeting */}
        <div className="max-w-2xl w-full text-left mb-10 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-slate-950">
            Welcome back, Adore.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            Your current learning progress holds at <strong className="text-slate-900 font-semibold">{overallAverageScore}%</strong>. Complete the assigned modules below to update your skill targets.
          </p>
        </div>

        {/* Assigned courses catalog space */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-zinc-200/50 flex justify-between items-baseline mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Assigned Skills & Modules</h4>
            <span className="text-xs text-slate-400 font-mono">Count: {currentAssociate.assignments.length} assignments</span>
          </div>

          {currentAssociate.assignments.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-zinc-200 rounded-[2rem] text-slate-400">
              <BookMarked className="w-8 h-8 mx-auto mb-4 text-slate-300" />
              <p className="text-sm font-medium">All assigned skills completed. Awaiting next assignment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentAssociate.assignments.map(asg => {
                // Find matching skill specification
                const skillDetails = derivedSkills.find(s => s.id === asg.skillId) || {
                  title: 'Custom Integration Module',
                  category: 'Operational Logic',
                  description: 'Specialized enterprise course structured for organizational compliance.'
                };
                const isSecured = asg.currentScore >= asg.targetScore;

                return (
                  <div 
                    key={asg.skillId}
                    onClick={() => handleStartCourse(asg.skillId)}
                    className="group bg-white p-8 rounded-[2.25rem] border border-zinc-200/80 hover:border-slate-950 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:scale-[1.03] active:scale-98 transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-pointer relative"
                  >
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xl font-display font-medium text-slate-955 leading-snug group-hover:text-indigo-650 transition-colors pr-4">
                          {skillDetails.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                          {skillDetails.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 mt-10 border-t border-zinc-100 space-y-3.5">
                      <div className="flex justify-between items-baseline text-xs font-mono">
                        <span className="text-slate-450 group-hover:text-slate-950 transition-colors">Completion score</span>
                        <strong className="text-slate-900">{asg.currentScore}% of {asg.targetScore}% min</strong>
                      </div>

                      <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ease-out ${isSecured ? 'bg-emerald-500' : 'bg-slate-950 group-hover:bg-indigo-600'}`}
                          style={{ width: `${Math.min((asg.currentScore / asg.targetScore) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="absolute top-8 right-8 text-zinc-300 group-hover:text-slate-950 transition-all duration-300 transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                      <ArrowUpRight className="w-5 h-5 shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
