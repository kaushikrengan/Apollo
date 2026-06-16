import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, Activity, Shield, Bug, Check, RefreshCw, 
  HelpCircle, Archive, AlertTriangle, Eye, ShieldCheck, Terminal, Layers
} from 'lucide-react';

interface SandboxProps {
  onComplete: () => void;
}

// ==========================================
// 1. CYCLE TIME OPTIMIZATION SANDBOX (formerly RAG)
// ==========================================
export function RagSandbox({ onComplete }: SandboxProps) {
  const [chunkSize, setChunkSize] = useState(400);
  const [overlap, setOverlap] = useState(15);
  const [userInteracted, setUserInteracted] = useState(false);

  const sampleText = "The Apollo production tracking pipeline extracts machine-level telemetry. In cycle time optimization, we match tact boundaries with active station capacity. Choosing optimal speeds ensures the cell meets production goals without creating bottleneck queues.";

  // Calculate simulated parameters
  const totalChunks = Math.max(2, Math.ceil(1200 / (chunkSize - (chunkSize * (overlap / 100)))));
  
  // Optimum is around 300-600 size and 15-25% overlap
  const retrievalAccuracy = Math.round(
    98 - Math.abs(500 - chunkSize) / 15 - Math.abs(20 - overlap) * 0.8
  );
  const contextNoise = Math.round(
    (chunkSize / 1000) * 80 + (overlap / 40) * 15
  );

  const handleSliderChange = (type: 'size' | 'overlap', val: number) => {
    setUserInteracted(true);
    if (type === 'size') setChunkSize(val);
    else setOverlap(val);
  };

  // Generate mock chunk slices
  const numChunksToShow = Math.min(4, totalChunks);
  const chunksArr = Array.from({ length: numChunksToShow }).map((_, i) => {
    const startIdx = Math.max(0, Math.round(i * (chunkSize * (1 - overlap / 100)) / 4));
    const endIdx = Math.min(sampleText.length, Math.round(startIdx + chunkSize / 4));
    return {
      id: i,
      text: sampleText.substring(startIdx, endIdx) || sampleText.substring(0, 50),
      overlapText: sampleText.substring(Math.max(0, endIdx - 20), endIdx)
    };
  });

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full text-left">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Interactive Sandbox</span>
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">Station Cadence Optimizer</h3>
        </div>
        <Sliders className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Adjust expected cycle limits and buffer fractional margins dynamically. Observe how assemblies are prioritized, buffers absorb latency, and throughput yields map out.
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-zinc-100">
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-700">Target Station Target (s)</span>
            <span className="text-xs font-mono font-semibold text-indigo-600">{chunkSize} sec</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="1000" 
            step="50"
            value={chunkSize}
            onChange={(e) => handleSliderChange('size', Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Fast (100s)</span>
            <span>Slow (1000s)</span>
          </div>
        </div>

        <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-zinc-100">
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-700">Target Line Buffer</span>
            <span className="text-xs font-mono font-semibold text-emerald-600">{overlap}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="40" 
            step="5"
            value={overlap}
            onChange={(e) => handleSliderChange('overlap', Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0% (Broken sentences)</span>
            <span>40% (Redundant)</span>
          </div>
        </div>
      </div>

      {/* Dynamic visualizations */}
      <div className="space-y-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Simulated Segment Slices</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chunksArr.map((chk, i) => (
            <div key={chk.id} className="border border-zinc-200/80 rounded-2xl p-4 bg-white relative overflow-hidden flex flex-col justify-between">
              <span className="absolute top-2 right-3 text-[10px] font-mono font-bold text-slate-300">CHUNK #{i + 1}</span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans pr-8">
                ...{chk.text}
              </p>
              {overlap > 0 && (
                <div className="mt-3 bg-indigo-50/50 border border-indigo-150 rounded-lg p-1.5 text-[10px] text-indigo-600 font-mono">
                  <span className="font-bold">Overlap Window:</span> "{chk.overlapText}..."
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Outcome KPI Badges */}
      <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-zinc-100 mb-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Chunks</span>
          <span className="text-xl font-display font-medium text-slate-900">{totalChunks}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-x border-zinc-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy Ratio</span>
          <span className={`text-xl font-display font-medium ${retrievalAccuracy > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {retrievalAccuracy}%
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Context Noise</span>
          <span className={`text-xl font-display font-medium ${contextNoise < 50 ? 'text-emerald-650' : 'text-rose-600'}`}>
            {contextNoise}%
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <button
          onClick={onComplete}
          disabled={!userInteracted}
          className={`py-2.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
            userInteracted 
              ? 'bg-slate-950 text-white hover:bg-slate-900 shadow-sm cursor-pointer' 
              : 'bg-zinc-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {userInteracted ? 'Confirm Ingestion Settings' : 'Adjust sliders to continue'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. AI EVALUATION & SAFETY SANDBOX
// ==========================================
export function AiEvalSandbox({ onComplete }: SandboxProps) {
  const reference = "The Apollo platform automatically safeguards active deployments and tracks coverage scores.";
  
  const candidates = [
    {
      id: "a",
      name: "Summary A (Truncated - Low recall)",
      text: "The Apollo platform automatically safeguards active deployments.",
      expl: "High Precision (all words are correct), but Low Recall (missed the tracking of scores)."
    },
    {
      id: "b",
      name: "Summary B (Irrelevant - 0% scores)",
      text: "Deploy cloud database instances across target availability zones.",
      expl: "Completely incorrect. Matches zero context tokens."
    },
    {
      id: "c",
      name: "Summary C (Optimal Balanced - Target 0.85 ROUGE)",
      text: "Platform automatically safeguards active deployments while tracking system coverage scores.",
      expl: "Excellent alignment. Captures main entities and actions, high BLEU & ROUGE."
    }
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getMetrics = (id: string) => {
    switch(id) {
      case 'a': return { precision: 100, recall: 60, rouge: 0.72 };
      case 'b': return { precision: 0, recall: 0, rouge: 0.00 };
      case 'c': return { precision: 92, recall: 90, rouge: 0.91 };
      default: return { precision: 0, recall: 0, rouge: 0.0 };
    }
  };

  const activeMetrics = selectedId ? getMetrics(selectedId) : null;
  const activeCand = candidates.find(c => c.id === selectedId);

  // Return highlighted word arrays
  const renderHighlightedWords = () => {
    if (!activeCand) return <span className="text-slate-400 font-mono">Select a summary variant to audit...</span>;
    const refWords = reference.toLowerCase().replace(/[.,]/g, "").split(" ");
    const candWords = activeCand.text.split(" ");

    return (
      <div className="flex flex-wrap gap-1.5 leading-relaxed text-sm">
        {candWords.map((word, i) => {
          const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
          const isMatch = refWords.includes(cleanWord);
          return (
            <span 
              key={i} 
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                isMatch 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-100'
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full text-left">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Interactive Sandbox</span>
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">N-Gram Matching Simulator</h3>
        </div>
        <Activity className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        ROUGE measures how much information from the golden reference is preserved (Recall). BLEU measures how much predicted noise is generated (Precision).
      </p>

      {/* Golden Reference Card */}
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 mb-6 relative">
        <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-widest absolute top-2 right-4">Golden Reference Ground Truth</span>
        <h4 className="text-xs font-bold text-slate-800 mb-1.5">Reference Guide:</h4>
        <p className="text-sm font-sans italic text-slate-705">"{reference}"</p>
      </div>

      {/* Dropdown Options */}
      <div className="space-y-3 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Select Candidate Text to Evaluater:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {candidates.map((cand) => (
            <button
              key={cand.id}
              onClick={() => setSelectedId(cand.id)}
              className={`p-4 border text-left rounded-2xl transition-all cursor-pointer ${
                selectedId === cand.id 
                  ? 'border-indigo-600 bg-indigo-50/20 shadow-xs' 
                  : 'border-zinc-200 hover:bg-slate-50'
              }`}
            >
              <h5 className="text-xs font-bold text-slate-800 mb-1">{cand.name}</h5>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{cand.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Word Highlight matches */}
      {selectedId && (
        <div className="border border-zinc-200/80 rounded-2xl p-5 mb-6 space-y-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Vocabulary Matching In-line Grid:</span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-zinc-150 text-emerald-700 font-semibold font-bold">Green = Precision Hit</span>
          </div>
          
          <div className="bg-white p-4 border border-zinc-200/85 rounded-xl">
            {renderHighlightedWords()}
          </div>

          <p className="text-xs text-slate-500 italic mt-2">{activeCand?.expl}</p>

          {/* Metric calculations */}
          {activeMetrics && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">N-Gram Precision (BLEU)</span>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-slate-900">{activeMetrics.precision}%</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${activeMetrics.precision}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">N-Gram Recall (ROUGE)</span>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-indigo-600">{activeMetrics.recall}%</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${activeMetrics.recall}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">ROUGE-L Score Coefficient</span>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-emerald-600">{activeMetrics.rouge.toFixed(2)}</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeMetrics.rouge * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <button
          onClick={onComplete}
          disabled={!selectedId}
          className={`py-2.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
            selectedId 
              ? 'bg-slate-950 text-white hover:bg-slate-900 shadow-sm cursor-pointer' 
              : 'bg-zinc-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedId ? 'Submit Evaluation Audit' : 'Select a candidate variant to continue'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. THREAT MODELING & SECURITY (STRIDE)
// ==========================================
export function ThreatModSandbox({ onComplete }: SandboxProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [auditedNodes, setAuditedNodes] = useState<string[]>([]);

  const architectureNodes = [
    {
      id: "browser",
      name: "API Host / Browser Link",
      vulnerability: "SPOOFING",
      explanation: "Attacker mimics trusted employees' security tokens to gain unauthenticated backend access.",
      remediation: "Deploy OAuth2 authentication and strict JWT expiration timers."
    },
    {
      id: "router",
      name: "Non-Root Container Gateway",
      vulnerability: "TAMPERING",
      explanation: "Attackers inject unauthorized code parameters into configuration directories.",
      remediation: "Utilize SAST scanners during builds to audit inline docker commands."
    },
    {
      id: "database",
      name: "Database Server Core",
      vulnerability: "INFORMATION DISCLOSURE",
      explanation: "Secret configuration variables are exposed via simple error message call stacks.",
      remediation: "Exclude environment configuration logging outside designated debug spaces."
    },
    {
      id: "ledger",
      name: "Activity Audit Logs",
      vulnerability: "REPUDIATION",
      explanation: "System actions carry anonymous logs without non-repudiation tracking.",
      remediation: "Mandate cryptographic signing signatures on active task entries."
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    if (!auditedNodes.includes(nodeId)) {
      setAuditedNodes(prev => [...prev, nodeId]);
    }
  };

  const activeNodeObj = architectureNodes.find(n => n.id === selectedNode);

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full text-left">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Interactive Sandbox</span>
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">Boundary Vulnerability Auditor</h3>
        </div>
        <Shield className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        The STRIDE taxonomy requires security experts to audit infrastructure components individually. Tap each node below to identify its danger vector and suggest mitigations.
      </p>

      {/* Visual Node Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {architectureNodes.map((node) => {
          const isSelected = selectedNode === node.id;
          const isAudited = auditedNodes.includes(node.id);
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`p-4 border rounded-2xl flex flex-col items-center text-center cursor-pointer relative transition-all ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/10 shadow-xs' 
                  : isAudited 
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-zinc-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center border ${
                isSelected 
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
                  : isAudited 
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-250' 
                    : 'bg-zinc-100 text-slate-550 border-zinc-200'
              }`}>
                {isAudited ? <ShieldCheck className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
              </div>
              <h5 className="text-[11px] font-bold text-slate-800 leading-snug">{node.name}</h5>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full mt-2 font-semibold ${
                node.vulnerability === "SPOOFING" ? "bg-rose-50 text-rose-700" :
                node.vulnerability === "TAMPERING" ? "bg-amber-50 text-amber-700" :
                node.vulnerability === "INFORMATION DISCLOSURE" ? "bg-indigo-50 text-indigo-700" :
                "bg-slate-100 text-slate-700"
              }`}>
                {node.vulnerability}
              </span>
            </button>
          );
        })}
      </div>

      {/* Auditor Details Card */}
      {selectedNode && activeNodeObj ? (
        <div className="border border-zinc-200/80 rounded-2xl p-5 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-150 pb-2">
            <span className="text-xs font-mono font-bold text-slate-400">AUDITOR REPORT SUMMARY: {activeNodeObj.vulnerability}</span>
            <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>STRIDE Breach Target Found</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1 font-mono">Breach Risk Scenario:</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{activeNodeObj.explanation}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1 font-mono">Mandated Security Action:</h4>
            <p className="text-xs text-emerald-700 leading-normal">{activeNodeObj.remediation}</p>
          </div>
        </div>
      ) : (
        <div className="p-8 border border-dashed border-zinc-200 text-center rounded-2xl text-slate-400 text-xs">
          Select an architectural node above to begin the security check audit.
        </div>
      )}

      {/* Completion button */}
      <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-100">
        <span className="text-xs font-mono text-slate-400">
          Audited components: <strong>{auditedNodes.length}/4</strong> complete
        </span>
        <button
          onClick={onComplete}
          disabled={auditedNodes.length < 4}
          className={`py-2.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
            auditedNodes.length >= 4 
              ? 'bg-slate-950 text-white hover:bg-slate-900 shadow-sm cursor-pointer' 
              : 'bg-zinc-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {auditedNodes.length >= 4 ? 'Confirm Architecture Compliance' : 'Complete all 4 audits'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. DEVSECOPS AUTOMATION GATES
// ==========================================
export function DevSecOpsSandbox({ onComplete }: SandboxProps) {
  const [activeScan, setActiveScan] = useState<'sast' | 'sca' | null>(null);

  const sastVulnerabilities = [
    {
      file: "auth_controller.ts",
      code: `const DB_PASS = "ZpSecurity_09A8B7_prod";\nconst CLIENT_ID = "apollo_app_dev_internal_bypass";`,
      highlightLine: "DB_PASS",
      finding: "Hardcoded Credentials Leak",
      impact: "Allows total database compromise when source files are leaked or indexed.",
      patch: 'const DB_PASS = process.env.DB_PASS || throwError("Missing Secret");'
    }
  ];

  const scaVulnerabilities = [
    {
      file: "package.json",
      code: `"dependencies": {\n  "express": "^4.18.2",\n  "lodash": "4.17.15", \n  "axios": "^1.2.0"\n}`,
      highlightLine: "lodash",
      finding: "CVE-2020-8203 (High Severity Vuln)",
      impact: "Prototype pollution vulnerability allows malicious users to hijack backend execution clusters dynamically.",
      patch: `"lodash": "^4.17.21"`
    }
  ];

  const handleScan = (type: 'sast' | 'sca') => {
    setActiveScan(type);
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full text-left">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Interactive Sandbox</span>
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">CI Security Gate Audits</h3>
        </div>
        <Bug className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        <strong>SAST</strong> scans internal written codebase strings. <strong>SCA</strong> scans the public versions of external modules from package catalogs.
      </p>

      {/* Action Scan buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleScan('sast')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeScan === 'sast' 
              ? 'border-indigo-600 bg-indigo-50/10' 
              : 'border-zinc-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600"><Terminal className="w-4 h-4" /></span>
            <span className="text-xs font-bold font-mono">SAST SCAN (Written source files)</span>
          </div>
          <p className="text-[11px] text-slate-400">Checks code variables and credential leak strings.</p>
        </button>

        <button
          onClick={() => handleScan('sca')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeScan === 'sca' 
              ? 'border-indigo-600 bg-indigo-50/10' 
              : 'border-zinc-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600"><Layers className="w-4 h-4" /></span>
            <span className="text-xs font-bold font-mono">SCA SCAN (Third-party Libraries)</span>
          </div>
          <p className="text-[11px] text-slate-400">Matches packages in directories against CVE servers.</p>
        </button>
      </div>

      {activeScan === 'sast' && (
        <div className="border border-zinc-150 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs text-slate-300 p-5 space-y-4">
          <div className="flex justify-between items-center text-slate-400 border-b border-zinc-800 pb-2">
            <span>FILE: /src/controllers/{sastVulnerabilities[0].file}</span>
            <span className="text-rose-500 font-bold">&#9679; CRITICAL FAILURE</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-red-900/30">
            <span className="text-red-400 font-bold">1 | </span> {sastVulnerabilities[0].code.split("\n")[0]} <span className="bg-rose-950 px-1 border border-rose-800 text-rose-300 font-bold rounded">Finding &larr;</span><br />
            <span className="text-slate-655">2 | </span> {sastVulnerabilities[0].code.split("\n")[1]}
          </div>

          <div className="bg-white text-slate-800 p-4 rounded-xl font-sans mt-4 space-y-2">
            <h5 className="font-bold text-xs text-rose-700">Breach Finding: {sastVulnerabilities[0].finding}</h5>
            <p className="text-xs text-slate-600">{sastVulnerabilities[0].impact}</p>
            <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 p-2.5 rounded-lg text-[11px] font-mono mt-2">
              <span className="font-bold font-sans block text-emerald-900 mb-1">In-line Remediation Patch:</span>
              {sastVulnerabilities[0].patch}
            </div>
          </div>
        </div>
      )}

      {activeScan === 'sca' && (
        <div className="border border-zinc-150 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs text-slate-300 p-5 space-y-4">
          <div className="flex justify-between items-center text-slate-400 border-b border-zinc-800 pb-2">
            <span>FILE: /package.json</span>
            <span className="text-rose-500 font-bold">&#9679; CVE WARNING</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-red-900/30">
            <span className="text-slate-655">1 | </span> "dependencies": &#123;<br />
            <span className="text-red-400 font-bold">2 | </span>   "lodash": "4.17.15" <span className="bg-rose-950 px-1 border border-rose-800 text-rose-300 font-bold rounded">Outdated &larr;</span><br />
            <span className="text-slate-655 font-bold">3 | </span> &#125;
          </div>

          <div className="bg-white text-slate-800 p-4 rounded-xl font-sans mt-4 space-y-2">
            <h5 className="font-bold text-xs text-rose-700">Scan Inquest: {scaVulnerabilities[0].finding}</h5>
            <p className="text-xs text-slate-600">{scaVulnerabilities[0].impact}</p>
            <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 p-2.5 rounded-lg text-[11px] font-mono mt-2">
              <span className="font-bold font-sans block text-emerald-900 mb-1">Upgrade Patch Required:</span>
              {scaVulnerabilities[0].patch}
            </div>
          </div>
        </div>
      )}

      {/* Initial state of scan prompt */}
      {!activeScan && (
        <div className="p-8 border border-dashed border-zinc-200 text-center rounded-2xl text-slate-400 text-xs">
          Perform a test scan by choosing SAST or SCA to view continuous security enforcement gates.
        </div>
      )}

      <div className="flex justify-end pt-4 mt-6 border-t border-zinc-100">
        <button
          onClick={onComplete}
          disabled={!activeScan}
          className={`py-2.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
            activeScan 
              ? 'bg-slate-950 text-white hover:bg-slate-900 shadow-sm cursor-pointer' 
              : 'bg-zinc-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {activeScan ? 'Verify CI Automation Compliance' : 'Complete scanner trial'}
        </button>
      </div>
    </div>
  );
}
