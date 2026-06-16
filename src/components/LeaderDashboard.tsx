import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Sparkles, 
  Check, 
  Trash2, 
  ChevronRight,
  ChevronDown, 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  FileText, 
  X,
  Target
} from 'lucide-react';
import { Competency, Skill, AssociateProfile } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LeaderDashboardProps {
  onExit: () => void;
  competencies: Competency[];
  setCompetencies: React.Dispatch<React.SetStateAction<Competency[]>>;
  derivedSkills: Skill[];
  setDerivedSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  associates: AssociateProfile[];
  setAssociates: React.Dispatch<React.SetStateAction<AssociateProfile[]>>;
  onAskApollo: () => void;
}

export default function LeaderDashboard({
  onExit,
  competencies,
  setCompetencies,
  derivedSkills,
  setDerivedSkills,
  associates,
  setAssociates,
  onAskApollo
}: LeaderDashboardProps) {
  // Tabs: 'strategy' | 'progress' | 'matrix'
  const [activeTab, setActiveTab ] = useState<'strategy' | 'progress' | 'matrix'>('strategy');

  const [expandedAssociates, setExpandedAssociates] = useState<Record<string, boolean>>({});
  const toggleExpandedAssociate = (id: string) => {
    setExpandedAssociates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [expandedMatrixCompetencies, setExpandedMatrixCompetencies] = useState<Record<string, boolean>>({});
  const toggleExpandedMatrixCompetency = (category: string) => {
    setExpandedMatrixCompetencies(prev => ({ ...prev, [category]: !prev[category] }));
  };
  
  // Custom states for the creation and AI derivation flow
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // AI derivation step: 'idle' | 'analyzing' | 'display-derived' | 'deployed'
  const [derivationStep, setDerivationStep] = useState<'idle' | 'analyzing' | 'display-derived' | 'deployed'>('idle');
  const [loadingText, setLoadingText] = useState('');
  const [tempDerivedSkills, setTempDerivedSkills] = useState<{ title: string; category: string; description: string }[]>([]);

  // Function to simulate clean AI-derivation phases
  const triggerAIDerivation = (title: string, desc: string) => {
    setDerivationStep('analyzing');
    
    // Simulate steps of generative planning
    const steps = [
      'Analyzing focus description...',
      'Mapping learning goals...',
      'Structuring interactive learning modules...',
    ];

    let currentStep = 0;
    setLoadingText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingText(steps[currentStep]);
      } else {
        clearInterval(interval);
        
        // Formulate smart, highly aesthetic skills dynamically:
        const cleanTitle = title.trim();
        const baseSkills = [
          {
            title: `${cleanTitle} Fundamentals`,
            category: 'Core Concepts',
            description: `Learn the essential building blocks, standard configuration styles, and performance basics.`
          },
          {
            title: `${cleanTitle} Application & Best Practices`,
            category: 'Practical Skills',
            description: `Understand safety boundaries, standard validation methodologies, and common pitfalls to avoid.`
          }
        ];
        
        setTempDerivedSkills(baseSkills);
        setDerivationStep('display-derived');
      }
    }, 1200);
  };

  const handleStartCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    triggerAIDerivation(newTitle, newDesc);
  };

  // Confirm final deployment: creates Competency, creates Derived Skills, and assigns to check-marked Associates
  const handleDeploySkillsAndCompetency = () => {
    const parentId = `comp-${Date.now()}`;
    
    // 1. Create the Competency
    const freshCompetency: Competency = {
      id: parentId,
      title: newTitle,
      description: newDesc,
      createdAt: 'Today'
    };

    // 2. Create the Skills
    const freshSkills: Skill[] = tempDerivedSkills.map((ts, idx) => ({
      id: `${parentId}-skill-${idx}-${Date.now()}`,
      competencyId: parentId,
      title: ts.title,
      category: ts.category,
      description: ts.description
    }));

    // 3. Deploy to all Associates
    setAssociates(prev => prev.map(assoc => {
      // Assign both derived skills to the employee with initial score
      const updatedAssignments = [...assoc.assignments];
      freshSkills.forEach(fs => {
        if (!updatedAssignments.some(a => a.skillId === fs.id)) {
          updatedAssignments.push({
            skillId: fs.id,
            currentScore: 40 + Math.floor(Math.random() * 20), // Initial capability calibration
            targetScore: 85
          });
        }
      });
      return { ...assoc, assignments: updatedAssignments };
    }));

    // Update global collection
    setCompetencies(prev => [freshCompetency, ...prev]);
    setDerivedSkills(prev => [...prev, ...freshSkills]);

    // Transition state
    setDerivationStep('deployed');
    setTimeout(() => {
      // Reset back to strategy workspace
      setIsCreating(false);
      setDerivationStep('idle');
      setNewTitle('');
      setNewDesc('');
      setTempDerivedSkills([]);
    }, 2000);
  };

  const handleDeleteCompetency = (id: string) => {
    setCompetencies(prev => prev.filter(c => c.id !== id));
    // Scrub associated skills
    setDerivedSkills(prev => prev.filter(s => s.competencyId !== id));
  };

  // High level reporting metrics
  const totalAssignedSkillEntries = associates.reduce((sum, a) => sum + a.assignments.length, 0);
  const averageGlobalScore = Math.round(
    associates.reduce((sum, a) => {
      if (a.assignments.length === 0) return sum + 70; // baseline default
      const avg = a.assignments.reduce((s, asg) => s + asg.currentScore, 0) / a.assignments.length;
      return sum + avg;
    }, 0) / associates.length
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased flex flex-col items-center">
      
      {/* Refined minimalistic header */}
      <header className="px-4 sm:px-6 md:px-12 py-5 sm:py-8 flex items-center justify-between w-full max-w-6xl border-b border-zinc-200/50 relative">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0 antialiased font-display text-xs sm:text-sm font-semibold">
            M
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900">Manager Workspace</h1>
            <span className="text-[10px] sm:text-xs text-slate-400 block font-mono">Operations Division</span>
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
            id="ask-apollo-leader-button"
            onClick={onAskApollo}
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-slate-950 hover:bg-slate-900 active:scale-95 hover:scale-105 transition-all duration-200 text-white rounded-full text-[10px] sm:text-xs font-semibold tracking-tight shadow-sm hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)] shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110" />
            <span>Ask Apollo</span>
          </button>

          <button 
            onClick={onExit}
            className="text-[10px] sm:text-xs font-mono tracking-wider font-semibold uppercase text-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-98 transition-all duration-200 border-b border-transparent hover:border-slate-900 pb-0.5 whitespace-nowrap"
          >
            <span className="sm:inline hidden">Switch Space &rarr;</span>
            <span className="inline sm:hidden">Switch &rarr;</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl px-4 sm:px-6 md:px-12 pb-24 flex flex-col mt-8 sm:mt-12 text-left">
        
        {/* Story Intro / High End Branding */}
        <div className="max-w-3xl w-full text-left mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-slate-950">
              Competencies & Skills
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal max-w-xl">
              Define team competencies, automatically generate related skills using AI, assign learning modules, and track team progress.
            </p>
          </div>
          
          {/* Main Top Actions */}
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 active:scale-95 hover:scale-[1.03] text-white rounded-2xl text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md shrink-0 sm:mb-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" /> Define Competency
            </button>
          )}
        </div>

        {/* Workspace Sub Navigation Tabs */}
        {!isCreating && (
          <div className="flex gap-8 mb-12 border-b border-zinc-200/60 pb-3">
            <button
              onClick={() => setActiveTab('strategy')}
              className={`text-sm font-medium transition-all pb-3 relative ${
                activeTab === 'strategy' ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Competencies
              {activeTab === 'strategy' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`text-sm font-medium transition-all pb-3 relative ${
                activeTab === 'progress' ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Team Learning Progress
              {activeTab === 'progress' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`text-sm font-medium transition-all pb-3 relative ${
                activeTab === 'matrix' ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Skill Matrix
              {activeTab === 'matrix' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
              )}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isCreating ? (
            /* ================= CREATE COMPETENCY & AI DERIVATION LAYER ================= */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full bg-white border border-zinc-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm"
            >
              <div className="flex justify-between items-center pb-6 border-b border-zinc-100 mb-8">
                <div>
                  <h3 className="text-xl font-medium font-display text-slate-900">Add New Competency</h3>
                  <p className="text-xs text-slate-400 mt-1">Add a team competency, and our AI assistant will decompose it into individual skills.</p>
                </div>
                <button 
                  onClick={() => { setIsCreating(false); setDerivationStep('idle'); }} 
                  className="p-2 border border-zinc-150 hover:bg-zinc-50 rounded-xl"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {derivationStep === 'idle' && (
                <form onSubmit={handleStartCreation} className="max-w-2xl space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Competency Focus Title</label>
                      <input 
                        type="text" 
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Distributed Event-Driven Systems"
                        className="w-full p-4 border border-zinc-200 rounded-2xl text-sm focus:ring-1 focus:ring-slate-900 bg-[#FAF9F6] outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Target Completion Score</span>
                      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between text-sm font-mono font-medium">
                        <span>Minimum target milestone:</span>
                        <strong className="text-indigo-650">85% score</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Competency Description & Focus Areas</label>
                    <textarea
                      required
                      rows={4}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Write a description detailing the goals, focus, and desired knowledge metrics for this competency..."
                      className="w-full p-4 border border-zinc-200 rounded-2xl text-sm focus:ring-1 focus:ring-slate-900 bg-[#FAF9F6] outline-none leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-8 py-4.5 bg-slate-950 hover:bg-zinc-850 text-white rounded-2xl text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" /> Generate Skills with AI
                  </button>
                </form>
              )}

              {derivationStep === 'analyzing' && (
                <div className="py-24 flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-indigo-550 border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-xl font-display font-medium text-slate-900 animate-pulse">AI Assistant Generating Skills</h4>
                  <p className="text-sm font-mono text-indigo-600 font-semibold">{loadingText}</p>
                </div>
              )}

              {derivationStep === 'display-derived' && (
                <div className="space-y-10">
                  <div className="p-6 bg-slate-50 border border-zinc-200/50 rounded-3xl flex items-start gap-4">
                    <div className="p-3 bg-white rounded-2xl text-indigo-600 shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">AI Analysis Complete</h4>
                      <strong className="text-lg font-medium text-slate-900 block mt-1">Generated 2 relevant skills:</strong>
                      <p className="text-xs text-slate-500 mt-1">These skills and modules support this competency's learning path.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tempDerivedSkills.map((ts, idx) => (
                      <div key={idx} className="p-6 bg-[#FAF9F6] border border-zinc-200/80 rounded-[1.75rem] space-y-3">
                        <h5 className="text-lg font-medium text-slate-950 font-display leading-snug">{ts.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{ts.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Deploy & Select Team Members */}
                  <div className="border-t border-zinc-100 pt-8 space-y-6">
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Assign Skills</h4>
                      <p className="text-xs text-slate-500 mt-1">This competency and its modules will be automatically assigned to all {associates.length} team members.</p>
                    </div>

                    <button
                      onClick={handleDeploySkillsAndCompetency}
                      className="px-8 py-4 bg-slate-950 hover:bg-zinc-850 active:bg-slate-950 text-white text-xs uppercase tracking-widest font-bold rounded-2xl shadow-md transition-all cursor-pointer w-full sm:w-auto"
                    >
                      Authorize & Update All Profiles
                    </button>
                  </div>
                </div>
              )}

              {derivationStep === 'deployed' && (
                <div className="py-24 flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center shadow-sm">
                    <Check className="w-8 h-8 text-emerald-600 stroke-[3]" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold text-slate-950">Competency Assigned</h4>
                  <p className="text-sm text-slate-500 max-w-sm font-normal">
                    Selected team members will see these learning modules on their dashboard.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* ================= REGULAR workspace VIEWS ================= */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {activeTab === 'strategy' && (
                <div className="space-y-8">
                  {/* Strategy section intro */}
                  <div className="p-6 bg-white border border-zinc-150 rounded-3xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#FAF9F6] rounded-2xl text-slate-600">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Competencies</span>
                        <strong className="text-slate-900 text-sm font-semibold">Active team competencies: {competencies.length}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Competency strategy cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {competencies.map((comp) => {
                      // Find derived skills mapped to this competency
                      const mappedSkills = derivedSkills.filter(s => s.competencyId === comp.id);

                      return (
                        <div 
                          key={comp.id}
                          className="bg-white border border-zinc-200/80 rounded-[2.25rem] p-8 hover:border-slate-950 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-default group"
                        >
                          <div className="space-y-6">

                            <div className="space-y-2">
                              <h4 className="text-2xl font-medium font-display text-slate-900 tracking-tight leading-snug">{comp.title}</h4>
                              <p className="text-[14px] text-slate-500 leading-relaxed font-normal">{comp.description}</p>
                            </div>

                            {/* Section showing derived skills */}
                            <div className="space-y-2.5 pt-4">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">AI-Generated Skills & Modules:</span>
                              {mappedSkills.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No skills available.</p>
                              ) : (
                                <div className="space-y-2">
                                  {mappedSkills.map(skill => (
                                    <div key={skill.id} className="flex gap-2.5 items-start bg-zinc-50 p-3 rounded-2xl border border-zinc-150/70">
                                      <div className="p-1.5 bg-white rounded-lg text-slate-500 shrink-0 mt-0.5 shadow-sm">
                                        <BookOpen className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-semibold text-slate-900">{skill.title}</h5>
                                        <p className="text-[10px] text-slate-500 font-normal line-clamp-1">{skill.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-8 pt-6 border-t border-zinc-150/60 flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-400">Created: {comp.createdAt}</span>
                            <button
                              onClick={() => handleDeleteCompetency(comp.id)}
                              className="p-2 border border-transparent rounded-lg hover:border-red-100 hover:bg-red-50 text-zinc-300 hover:text-red-600 transition-colors"
                              title="Delete Competency"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-10">
                  {/* High Level Numbers Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 border border-zinc-200/80 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">Average Completion</span>
                        <strong className="text-4xl font-normal font-display text-slate-900 tracking-tight">{averageGlobalScore}%</strong>
                      </div>
                      <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-zinc-100 leading-normal">
                        Average completion score across all assigned skills.
                      </p>
                    </div>

                    <div className="bg-white p-8 border border-zinc-200/80 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">Number of Associates</span>
                        <strong className="text-4xl font-normal font-display text-slate-900 tracking-tight">{associates.length}</strong>
                      </div>
                      <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-zinc-100 leading-normal">
                        Total active team members in the workplace.
                      </p>
                    </div>

                    <div className="bg-white p-8 border border-zinc-200/80 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">Number of Teams</span>
                        <strong className="text-4xl font-normal font-display text-slate-900 tracking-tight">1</strong>
                      </div>
                      <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-zinc-100 leading-normal">
                        Total unique specialized departments/divisions.
                      </p>
                    </div>
                  </div>

                  {/* Overall Average Progress Graph */}
                  <div className="bg-white border border-zinc-200/90 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
                    <div>
                      <h4 className="text-xl font-medium font-display text-slate-900">Overall Success Trend</h4>
                      <p className="text-xs text-slate-400 mt-1">Average team completion percentage over the last 6 months.</p>
                    </div>

                    <div className="h-80 w-full pt-4">
                      {(() => {
                        const currentScore = averageGlobalScore || 0;
                        const progressData = [
                          { month: 'Jan', score: Math.round(currentScore * 0.35) },
                          { month: 'Feb', score: Math.round(currentScore * 0.45) },
                          { month: 'Mar', score: Math.round(currentScore * 0.78) },
                          { month: 'Apr', score: Math.round(currentScore * 0.78) },
                          { month: 'May', score: Math.round(currentScore * 0.92) },
                          { month: 'Jun', score: currentScore }
                        ];

                        return (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                              <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 12, fill: '#94a3b8' }} 
                                dy={10}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace' }} 
                                domain={[0, 100]}
                                tickFormatter={(tick) => `${tick}%`}
                              />
                              <Tooltip 
                                cursor={{ stroke: '#f4f4f5', strokeWidth: 2, strokeDasharray: '3 3' }}
                                contentStyle={{ borderRadius: '1rem', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                                itemStyle={{ color: '#0f172a', fontWeight: 600, fontFamily: 'monospace' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="score" 
                                name="Average Score"
                                stroke="#4f46e5" 
                                strokeWidth={3}
                                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4, stroke: '#ffffff' }}
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#4338ca' }}
                                animationDuration={1000}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'matrix' && (
                <div className="bg-white border border-zinc-200/90 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
                  <div>
                    <h4 className="text-xl font-medium font-display text-slate-900">Skill Matrix</h4>
                    <p className="text-xs text-slate-400 mt-1">Cross-reference all associates and their current skill proficiencies.</p>
                  </div>
                  
                  <div className="w-full overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-max">
                      <thead>
                        <tr>
                          <th className="p-4 border-b border-zinc-200/80 bg-zinc-50/50 rounded-tl-xl font-semibold text-[11px] tracking-widest uppercase text-slate-500">Skills / Associates</th>
                          {associates.map(assoc => (
                            <th key={assoc.id} className="p-4 border-b border-zinc-200/80 bg-zinc-50/50 font-semibold text-xs text-slate-900">
                              <div className="flex flex-col gap-2">
                                <img src={assoc.avatar} alt={assoc.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-display">{assoc.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const groupedCompetencies = competencies.reduce((acc, comp) => {
                            acc[comp.title] = derivedSkills.filter(skill => skill.competencyId === comp.id);
                            return acc;
                          }, {} as Record<string, Skill[]>);

                          return Object.entries(groupedCompetencies).map(([category, skills]) => {
                            const isExpanded = expandedMatrixCompetencies[category];

                            return (
                              <React.Fragment key={category}>
                                {/* Competency Row */}
                                <tr 
                                  className="hover:bg-zinc-50/50 transition-colors group cursor-pointer bg-zinc-50/20"
                                  onClick={() => toggleExpandedMatrixCompetency(category)}
                                >
                                  <td className="p-4 border-b border-zinc-200/80 font-semibold text-sm text-slate-900 border-l-[3px] border-l-transparent group-hover:border-l-indigo-500 transition-all">
                                    <div className="flex items-center gap-2">
                                      {isExpanded ? (
                                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                      )}
                                      <span>{category}</span>
                                    </div>
                                  </td>
                                  {associates.map((assoc) => {
                                    // Average progress for this competency
                                    const validAssignments = assoc.assignments.filter(a => skills.some(s => s.id === a.skillId));
                                    const avg = validAssignments.length > 0 
                                      ? Math.round(validAssignments.reduce((acc, curr) => acc + curr.currentScore, 0) / validAssignments.length)
                                      : null;
                                  
                                    return (
                                      <td key={`comp-${category}-${assoc.id}`} className="p-4 border-b border-zinc-200/80 align-middle">
                                        {avg !== null ? (
                                          <div className="flex flex-col gap-1.5 w-max">
                                            <div className="text-xs font-mono font-bold text-slate-700">{avg}%</div>
                                            <div className="w-20 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                              <div 
                                                className={`h-full rounded-full transition-all ${avg >= 80 ? 'bg-emerald-500' : 'bg-slate-800'}`} 
                                                style={{ width: `${Math.min(avg, 100)}%` }} 
                                              />
                                            </div>
                                          </div>
                                        ) : (
                                          <span className="text-xs text-slate-300 italic">-</span>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Sub-Rows for Skills (if expanded) */}
                                {isExpanded && skills.map(skill => (
                                  <tr key={skill.id} className="hover:bg-zinc-50/30 transition-colors group">
                                    <td className="p-4 py-3 pl-10 border-b border-zinc-100 font-medium text-sm text-slate-600">
                                      <span>{skill.title}</span>
                                    </td>
                                    {associates.map((assoc) => {
                                      const assignment = assoc.assignments.find(a => a.skillId === skill.id);
                                      
                                      return (
                                        <td key={`${skill.id}-${assoc.id}`} className="p-4 py-3 border-b border-zinc-100 align-middle">
                                          {assignment ? (
                                            <div className="flex flex-col gap-1.5 w-max">
                                                <div className="text-xs font-mono font-medium text-slate-500">{assignment.currentScore}% <span className="text-slate-300 text-[10px]">tgt {assignment.targetScore}%</span></div>
                                                <div className="w-20 h-1 bg-zinc-100 rounded-full overflow-hidden">
                                                  <div 
                                                    className={`h-full rounded-full transition-all ${assignment.currentScore >= assignment.targetScore ? 'bg-emerald-400' : 'bg-slate-400 group-hover:bg-indigo-400'}`} 
                                                    style={{ width: `${Math.min((assignment.currentScore / assignment.targetScore) * 100, 100)}%` }} 
                                                  />
                                                </div>
                                            </div>
                                          ) : (
                                            <span className="text-xs text-slate-300 italic">-</span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </React.Fragment>
                            );
                          });
                        })()}
                        <tr className="bg-zinc-50/50">
                          <td className="p-4 font-semibold text-sm text-slate-900 border-t-2 border-zinc-200/80">
                            Associate Average
                          </td>
                          {associates.map((assoc) => {
                            const validAssignments = assoc.assignments;
                            const avg = validAssignments.length > 0 
                              ? Math.round(validAssignments.reduce((acc, curr) => acc + curr.currentScore, 0) / validAssignments.length)
                              : 0;
                            return (
                              <td key={`avg-${assoc.id}`} className="p-4 border-t-2 border-zinc-200/80 align-middle">
                                {validAssignments.length > 0 ? (
                                  <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 border border-indigo-100/50 rounded-lg inline-block whitespace-nowrap shadow-xs">
                                    {avg}%
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-300 italic">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
