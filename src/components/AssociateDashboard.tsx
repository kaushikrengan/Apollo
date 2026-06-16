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
  'cycle-time-opt': {
    skillId: 'cycle-time-opt',
    skillName: 'Cycle Time Optimization',
    category: 'Core Manufacturing',
    description: 'Master time & motion studies, calculate tact time accurately, and balance assembly cell load metrics.',
    modules: [
      {
        id: 'rag-m1',
        title: 'Takt Time vs. Cycle Time metrics',
        category: 'Process Engineering',
        narrative: "In lean production environments, understanding the cadence of line throughput is critical.\n\nOptimizing shop floor throughput requires calculating limits:\n- **Takt Time** is the rate at which you need to complete a product to meet customer demand.\n- **Cycle Time** is the actual time it takes to complete one step of the assembly process.\n\nMatching Cycle Time to Takt Time ensures that your production line avoids overproduction while completely satisfying schedule targets.",
        quiz: {
          question: "When optimizing an assembly line, why do engineers prioritize matching Cycle Time with Takt Time?",
          options: [
            "To maximize robot operational speed regardless of shipping demand.",
            "To prevent overproduction bottlenecks while ensuring customer delivery schedules are met.",
            "To decrease the computational load on the inventory tracking sensors."
          ],
          correctIndex: 1,
          explanation: "Synchronizing these times prevents inventory build-up (overproduction) while hitting your guaranteed delivery SLAs."
        }
      }
    ]
  },
  'ai-eval': {
    skillId: 'ai-eval',
    skillName: 'Value Stream Mapping',
    category: 'Process Engineering',
    description: 'Implement rigorous process flow charting to eliminate non-value added steps.',
    modules: [
      {
        id: 'eval-m1',
        title: 'Non-Value Added Time (NVA)',
        category: 'Core Theory',
        narrative: "How do we identify waste in a complex manufacturing line? We employ Value Stream Mapping:\n\n- **Value Added (VA):** Any step the customer is willing to pay for.\n- **Non-Value Added (NVA):** Steps that add no value but may be required (e.g. inspections).\n\nA typical target threshold for lean compliance requires reducing pure NVA (waste) by 15% per fiscal quarter.",
        quiz: {
          question: "Which metric should a specialist deploy to confirm an assembly step adds value?",
          options: [
            "Wait times, since precision checks keep inventory lean.",
            "Customer willingness to pay for the transformation taking place.",
            "Material transport metrics, to ensure parts are moving."
          ],
          correctIndex: 1,
          explanation: "Value-added steps fundamentally transform the product in a way the end-customer cares about and pays for."
        }
      }
    ]
  },
  'threat-mod': {
    skillId: 'threat-mod',
    skillName: 'FMEA Risk Modeling',
    category: 'Quality Assurance',
    description: 'Apply standardized methodologies to product failures, and audit mitigation logs.',
    modules: [
      {
        id: 'threat-m1',
        title: 'RPN (Risk Priority Number)',
        category: 'Core Theory',
        narrative: "The Failure Mode and Effects Analysis (FMEA) identifies risks:\n\n- Severity: How bad is the impact?\n- Occurrence: How often does the failure happen?\n- Detection: Can we catch it before it ships?\n\nMultiplying these gives the Risk Priority Number (RPN).",
        quiz: {
          question: "An engineer adds a vision camera to automatically catch defects. Which FMEA score decreases?",
          options: [
            "Severity, because the defect is no longer dangerous.",
            "Detection score, because we are more likely to catch it.",
            "Occurrence, because the machine is fixed."
          ],
          correctIndex: 1,
          explanation: "Adding inspections or sensors improves detection, which lowers the Detection multiplier and overall RPN."
        }
      }
    ]
  },
  'devsecops-pipeline': {
    skillId: 'devsecops-pipeline',
    skillName: 'SPC Automation Gates',
    category: 'Quality Assurance',
    description: 'Embed automated statistical controls and sensor stages into production lines.',
    modules: [
      {
        id: 'devsec-m1',
        title: 'UCL and LCL (Control Limits)',
        category: 'Core Theory',
        narrative: "SPC automation monitors quality telemetry. We use two main checking layers:\n- Upper Control Limit (UCL): The highest allowed variation before the process breaks.\n- Lower Control Limit (LCL): The lowest allowed variation.\n\nAdding these auto-stopping gates inside the PLC code prevents defective parts from moving to the next workstation.",
        quiz: {
          question: "What is the primary difference between a specification limit and a control limit?",
          options: [
            "Control limits reflect actual process behavior; specification limits are customer requirements.",
            "Specification limits apply to software; control limits apply to hardware.",
            "Control limits require human audits; specification limits are strictly automated."
          ],
          correctIndex: 0,
          explanation: "Control limits are calculated from normal statistical variation of the physical machines, while specification limits are set by engineering blueprints/customers."
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
