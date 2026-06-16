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
// 1. SYSTEM COUPLING SANDBOX (formerly RagSandbox)
// ==========================================
export function RagSandbox({ onComplete }: SandboxProps) {
  const [chunkSize, setChunkSize] = useState(400);
  const [overlap, setOverlap] = useState(15);
  const [userInteracted, setUserInteracted] = useState(false);

  const sampleText = "The Vehicle Control Unit (VCU) orchestrates powertrain signals. In systems engineering, we define clear interfaces between the engine sensors and the braking module. Without defined thresholds, emergency override latency might cause safety faults.";

  // Calculate simulated parameters
  const totalChunks = Math.max(2, Math.ceil(1200 / (chunkSize - (chunkSize * (overlap / 100)))));
  
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
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">System Interfacing & Boundaries</h3>
        </div>
        <Sliders className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Adjust system module processing times and bus data overlaps. Observe how tight coupling creates latency chains, and how optimal modularity improves subsystem response.
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-zinc-100">
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-700">Subsystem Execution Cycle (ms)</span>
            <span className="text-xs font-mono font-semibold text-indigo-600">{chunkSize} ms</span>
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
            <span>Fast (100ms)</span>
            <span>Slow (1000ms)</span>
          </div>
        </div>

        <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-zinc-100">
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-700">Bus Redundancy Overlap</span>
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
            <span>0% (Brittle)</span>
            <span>40% (Redundant)</span>
          </div>
        </div>
      </div>

      {/* Dynamic visualizations */}
      <div className="space-y-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Simulated Telemetry Streams</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chunksArr.map((chk, i) => (
            <div key={chk.id} className="border border-zinc-200/80 rounded-2xl p-4 bg-white relative overflow-hidden flex flex-col justify-between">
              <span className="absolute top-2 right-3 text-[10px] font-mono font-bold text-slate-300">NODE #{i + 1}</span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans pr-8">
                ...{chk.text}
              </p>
              {overlap > 0 && (
                <div className="mt-3 bg-indigo-50/50 border border-indigo-150 rounded-lg p-1.5 text-[10px] text-indigo-600 font-mono">
                  <span className="font-bold">Sync Data:</span> "{chk.overlapText}..."
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Outcome KPI Badges */}
      <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-zinc-100 mb-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Modules</span>
          <span className="text-xl font-display font-medium text-slate-900">{totalChunks}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-x border-zinc-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">System Cohesion</span>
          <span className={`text-xl font-display font-medium ${retrievalAccuracy > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {retrievalAccuracy}%
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bus Conflict Risk</span>
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
          {userInteracted ? 'Confirm System Baseline' : 'Adjust timings to continue'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. REQUIREMENT TRACEABILITY SANDBOX (formerly AiEvalSandbox)
// ==========================================
export function AiEvalSandbox({ onComplete }: SandboxProps) {
  const reference = "The steering module shall respond to turn inputs within 50 milliseconds while monitoring wheel slippage continuously.";
  
  const candidates = [
    {
      id: "a",
      name: "Requirement A (Ambiguous - Untestable)",
      text: "The steering module must be fast and responsive when monitoring tire traction.",
      expl: "Lacks verifiable metric. 'Fast and responsive' is an ambiguous descriptor that cannot be tested objectively."
    },
    {
      id: "b",
      name: "Requirement B (Irrelevant Spec)",
      text: "The cabin light must remain on for 20 seconds after the door closes.",
      expl: "Incorrect boundary. Irrelevant to steering latency or slippage monitoring."
    },
    {
      id: "c",
      name: "Requirement C (Testable Target - Verifiable)",
      text: "Steering module shall complete input processing in < 50 ms and sample wheel slippage at 1000 Hz.",
      expl: "Excellent alignment. Provides hard, verifiable numerical limits mapping back to the stakeholder need."
    }
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getMetrics = (id: string) => {
    switch(id) {
      case 'a': return { precision: 20, recall: 45, rouge: 0.35 };
      case 'b': return { precision: 0, recall: 0, rouge: 0.00 };
      case 'c': return { precision: 95, recall: 100, rouge: 0.98 };
      default: return { precision: 0, recall: 0, rouge: 0.0 };
    }
  };

  const activeMetrics = selectedId ? getMetrics(selectedId) : null;
  const activeCand = candidates.find(c => c.id === selectedId);

  // Return highlighted word arrays
  const renderHighlightedWords = () => {
    if (!activeCand) return <span className="text-slate-400 font-mono">Select a requirement to evaluate...</span>;
    const candWords = activeCand.text.split(" ");
    
    // Highlight numbers and specific engineering terms as "Precision Hits"
    const isTermOrTarget = (word: string) => {
      return word.match(/\d/g) || word.toLowerCase().includes('shall') || word.toLowerCase().includes('millisecond') || word.toLowerCase().includes('sample') || word.toLowerCase().includes('slippage');
    };

    return (
      <div className="flex flex-wrap gap-1.5 leading-relaxed text-sm">
        {candWords.map((word, i) => {
          const isMatch = isTermOrTarget(word) && activeCand.id === 'c';
          const isVague = word.toLowerCase() === 'fast' || word.toLowerCase() === 'responsive';
          return (
            <span 
              key={i} 
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                isMatch 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : isVague ? 'bg-rose-50 text-rose-800 border border-rose-100' : 'bg-slate-50 text-slate-700'
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
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">Requirement Traceability Evaluator</h3>
        </div>
        <Activity className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Compare candidate engineering requirements against the Golden Stakeholder Need. A valid requirement must be atomic, unambiguous, and fully testable with objective criteria.
      </p>

      {/* Golden Reference Card */}
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 mb-6 relative">
        <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-widest absolute top-2 right-4">Stakeholder Need</span>
        <h4 className="text-xs font-bold text-slate-800 mb-1.5">Reference Baseline:</h4>
        <p className="text-sm font-sans italic text-slate-705">"{reference}"</p>
      </div>

      {/* Dropdown Options */}
      <div className="space-y-3 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Select Requirement Candidate to Audit:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {candidates.map((cand) => (
            <button
              key={cand.id}
              onClick={() => setSelectedId(cand.id)}
              className={`p-4 border text-left rounded-2xl transition-all cursor-pointer flex flex-col justify-between ${
                selectedId === cand.id 
                  ? 'border-indigo-600 bg-indigo-50/20 shadow-xs' 
                  : 'border-zinc-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-1 leading-tight">{cand.name}</h5>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-2">{cand.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Word Highlight matches */}
      {selectedId && (
        <div className="border border-zinc-200/80 rounded-2xl p-5 mb-6 space-y-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Vocabulary & Specification Check:</span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-zinc-150 text-emerald-700 font-semibold font-bold">Green = Hard Numeric Constraint</span>
          </div>
          
          <div className="bg-white p-4 border border-zinc-200/85 rounded-xl">
            {renderHighlightedWords()}
          </div>

          <p className="text-xs text-slate-500 italic mt-2">{activeCand?.expl}</p>

          {/* Metric calculations */}
          {activeMetrics && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Testability Index</span>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-slate-900">{activeMetrics.precision}%</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${activeMetrics.precision}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Coverage Recall</span>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-indigo-600">{activeMetrics.recall}%</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${activeMetrics.recall}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Compliance Score</span>
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
          {selectedId ? 'Submit Requirements Audit' : 'Select a candidate variant to continue'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. TOLERANCE AND MATERIAL VARIANCE SANDBOX (formerly ThreatModSandbox)
// ==========================================
export function ThreatModSandbox({ onComplete }: SandboxProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [auditedNodes, setAuditedNodes] = useState<string[]>([]);

  const architectureNodes = [
    {
      id: "clearance",
      name: "Fastener Clearance Fit",
      vulnerability: "INTERFERENCE CLASH",
      explanation: "Worst-case stacking of bracket dimensions results in bolt interference at maximum material condition (MMC).",
      remediation: "Apply RSS (Root Sum Square) statistical tolerancing to expand hole dimensions safely."
    },
    {
      id: "yield",
      name: "Tension Control Arm",
      vulnerability: "MATERIAL YIELD FAILURE",
      explanation: "Standard aluminum alloy chosen does not possess adequate fatigue limit for cyclical pot-hole loading.",
      remediation: "Upgrade material specification to forged high-strength steel or structural carbon fiber."
    },
    {
      id: "weight",
      name: "Chassis Cross-member",
      vulnerability: "EXCESS MASS PENALTY",
      explanation: "Using heavy steel profiles reduces range efficiency, outweighing the minor cost savings per unit.",
      remediation: "Redesign geometry for thin-wall cast aluminum to achieve target strength-to-weight."
    },
    {
      id: "thermal",
      name: "Battery Heat Shield",
      vulnerability: "THERMAL DEFORMATION",
      explanation: "Material expands past clearance boundary conditions during heavy charging cycles.",
      remediation: "Specify materials with lower coefficient of thermal expansion (CTE) and define GD&T positional limits."
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
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">Tolerance & Material Variance Auditor</h3>
        </div>
        <Layers className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Engineers must audit individual component stack-ups and material decisions. Tap each node below to identify potential failure modes and suggest engineering remediations.
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
                {isAudited ? <Check className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
              </div>
              <h5 className="text-[11px] font-bold text-slate-800 leading-snug">{node.name}</h5>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full mt-2 inline-block leading-tight font-semibold ${
                node.vulnerability.includes("FAILURE") ? "bg-rose-50 text-rose-700" :
                node.vulnerability.includes("INTERFERENCE") ? "bg-amber-50 text-amber-700" :
                node.vulnerability.includes("MASS") ? "bg-indigo-50 text-indigo-700" :
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
            <span className="text-xs font-mono font-bold text-slate-400">ENGINEERING AUDIT: {activeNodeObj.vulnerability}</span>
            <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Design Risk Target Found</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1 font-mono">Variant Failure Scenario:</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{activeNodeObj.explanation}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1 font-mono">Mandated Engineering Action:</h4>
            <p className="text-xs text-emerald-700 leading-normal">{activeNodeObj.remediation}</p>
          </div>
        </div>
      ) : (
        <div className="p-8 border border-dashed border-zinc-200 text-center rounded-2xl text-slate-400 text-xs">
          Select an assembly component above to begin the mechanical constraint check.
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
          {auditedNodes.length >= 4 ? 'Confirm Assembly Compliance' : 'Complete all 4 audits'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. COST OVERHEAD & VALIDATION AUTOMATION GATES
// ==========================================
export function DevSecOpsSandbox({ onComplete }: SandboxProps) {
  const [activeScan, setActiveScan] = useState<'hil' | 'cost' | null>(null);

  const hilFailures = [
    {
      file: "brake_ecu_unit.h",
      code: `float max_psi = 1200.5;\nif (pedal_travel > 80% && latency < 50ms)`,
      highlightLine: "latency < 50ms",
      finding: "Latency Threshold Breach",
      impact: "HIL physical test bench shows hydraulic lag of 85ms under cold weather simulation, failing safety requirements.",
      patch: 'if (pedal_travel > 80% && latency < 100ms) // Adjusted boundary based on physical constraints.'
    }
  ];

  const costFailures = [
    {
      file: "door_assembly_bom.csv",
      code: `FASTENER_M6x15_Ti : Qty 24\nFASTENER_M6x20_Ti : Qty 6`,
      highlightLine: "FASTENER_M6x20_Ti",
      finding: "Excessive Fastener Variety",
      impact: "Using two very similar titanium fastener lengths forces two separate sorting bins and doubles procurement overhead.",
      patch: `Consolidate to FASTENER_M6x20_Ti : Qty 30 (Using standardized lengths reduces scale costs despite material delta)`
    }
  ];

  const handleScan = (type: 'hil' | 'cost') => {
    setActiveScan(type);
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full text-left">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Interactive Sandbox</span>
          <h3 className="text-xl font-display font-medium text-slate-900 mt-2">DVP & Cost Optimization Gates</h3>
        </div>
        <Check className="w-5 h-5 text-indigo-500" />
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        <strong>HIL Scanner</strong> checks real hardware logic loops against requirement specifications. <strong>BOM Analyzer</strong> scans the bill of materials to identify standard part consolidation targets.
      </p>

      {/* Action Scan buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleScan('hil')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeScan === 'hil' 
              ? 'border-indigo-600 bg-indigo-50/10' 
              : 'border-zinc-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600"><Terminal className="w-4 h-4" /></span>
            <span className="text-xs font-bold font-mono">HIL TEST RIG (Hardware checking)</span>
          </div>
          <p className="text-[11px] text-slate-400">Verifies true physical response timings.</p>
        </button>

        <button
          onClick={() => handleScan('cost')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeScan === 'cost' 
              ? 'border-indigo-600 bg-indigo-50/10' 
              : 'border-zinc-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600"><Layers className="w-4 h-4" /></span>
            <span className="text-xs font-bold font-mono">BOM ANALYZER (Cost check)</span>
          </div>
          <p className="text-[11px] text-slate-400">Matches bill of materials against standardization libraries.</p>
        </button>
      </div>

      {activeScan === 'hil' && (
        <div className="border border-zinc-150 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs text-slate-300 p-5 space-y-4">
          <div className="flex justify-between items-center text-slate-400 border-b border-zinc-800 pb-2">
            <span>MODULE: /system/verification/{hilFailures[0].file}</span>
            <span className="text-rose-500 font-bold">&#9679; SPEC FAILURE</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-red-900/30">
            <span className="text-slate-655">1 | </span> {hilFailures[0].code.split("\n")[0]}<br />
            <span className="text-red-400 font-bold">2 | </span> {hilFailures[0].code.split("\n")[1]} <span className="bg-rose-950 px-1 border border-rose-800 text-rose-300 font-bold rounded">Lag Reject &larr;</span>
          </div>

          <div className="bg-white text-slate-800 p-4 rounded-xl font-sans mt-4 space-y-2">
            <h5 className="font-bold text-xs text-rose-700">DVP Finding: {hilFailures[0].finding}</h5>
            <p className="text-xs text-slate-600">{hilFailures[0].impact}</p>
            <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 p-2.5 rounded-lg text-[11px] font-mono mt-2">
              <span className="font-bold font-sans block text-emerald-900 mb-1">Validation Overlap Solution:</span>
              {hilFailures[0].patch}
            </div>
          </div>
        </div>
      )}

      {activeScan === 'cost' && (
        <div className="border border-zinc-150 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs text-slate-300 p-5 space-y-4">
          <div className="flex justify-between items-center text-slate-400 border-b border-zinc-800 pb-2">
            <span>FILE: /assemblies/{costFailures[0].file}</span>
            <span className="text-rose-500 font-bold">&#9679; COST WARNING</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-red-900/30">
            <span className="text-slate-655">1 | </span> {costFailures[0].code.split("\n")[0]}<br />
            <span className="text-red-400 font-bold">2 | </span> {costFailures[0].code.split("\n")[1]} <span className="bg-rose-950 px-1 border border-rose-800 text-rose-300 font-bold rounded">Consolidate &larr;</span><br />
          </div>

          <div className="bg-white text-slate-800 p-4 rounded-xl font-sans mt-4 space-y-2">
            <h5 className="font-bold text-xs text-rose-700">Analytics Inquest: {costFailures[0].finding}</h5>
            <p className="text-xs text-slate-600">{costFailures[0].impact}</p>
            <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 p-2.5 rounded-lg text-[11px] font-mono mt-2">
              <span className="font-bold font-sans block text-emerald-900 mb-1">Standardization Protocol:</span>
              {costFailures[0].patch}
            </div>
          </div>
        </div>
      )}

      {/* Initial state of scan prompt */}
      {!activeScan && (
        <div className="p-8 border border-dashed border-zinc-200 text-center rounded-2xl text-slate-400 text-xs">
          Perform a test scan by choosing HIL Rig or BOM Check to view continuous engineering gates.
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
          {activeScan ? 'Verify System Compliance' : 'Complete test rig'}
        </button>
      </div>
    </div>
  );
}
