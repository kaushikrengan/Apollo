import { Competency, TeamComparisonItem, KPIStats } from './types';

export const COMPETENCIES_DATA: Competency[] = [
  {
    id: 'auto-sys-eng',
    name: 'Automotive Systems Engineering',
    coverage: 74,
    target: 90,
    gap: 16,
    trend: '+12%',
    risk: 'High',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 82 },
      { teamName: 'Valve Div', coverage: 73 },
      { teamName: 'Friction Material Div', coverage: 69 },
      { teamName: 'Die Casting Div', coverage: 61 }
    ],
    skillHealth: [
      { skillName: 'Systems Thinking', coverage: 84 },
      { skillName: 'Requirement Engineering', coverage: 78 },
      { skillName: 'V Model Development', coverage: 67 },
      { skillName: 'Verification and validation', coverage: 52 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 48 },
      { quarter: 'Q2', coverage: 59 },
      { quarter: 'Q3', coverage: 74 }
    ],
    insights: [
      'Die Casting Div is below target for Automotive Systems Engineering.',
      'Verification and validation remains the largest competency gap.',
      'Quarterly growth is strong at +12% driven by systems thinking workshops.'
    ]
  },
  {
    id: 'dfm',
    name: 'Design for Manufacturability',
    coverage: 84,
    target: 85,
    gap: 1,
    trend: '+6%',
    risk: 'Low',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 90 },
      { teamName: 'Friction Material Div', coverage: 88 },
      { teamName: 'Valve Div', coverage: 86 },
      { teamName: 'Die Casting Div', coverage: 72 }
    ],
    skillHealth: [
      { skillName: 'Tolerance Analysis', coverage: 91 },
      { skillName: 'Material Selection', coverage: 85 },
      { skillName: 'Cost Optimization', coverage: 81 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 70 },
      { quarter: 'Q2', coverage: 77 },
      { quarter: 'Q3', coverage: 84 }
    ],
    insights: [
      'DFM target likely to be achieved next quarter.',
      'Steering and Friction divisions lead adoption with value engineering.',
      'Die Casting Div has shown low compliance in tolerance stack-ups.'
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership & Ops Management',
    coverage: 62,
    target: 80,
    gap: 18,
    trend: '+2%',
    risk: 'Medium',
    teamContributions: [
      { teamName: 'Valve Div', coverage: 85 },
      { teamName: 'Friction Material Div', coverage: 60 },
      { teamName: 'Steering Systems Div', coverage: 55 },
      { teamName: 'Die Casting Div', coverage: 48 }
    ],
    skillHealth: [
      { skillName: 'Shop Floor Management', coverage: 70 },
      { skillName: 'Safety Leadership', coverage: 66 },
      { skillName: 'Strategic Capacity Planning', coverage: 58 },
      { skillName: 'Change Management', coverage: 54 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 55 },
      { quarter: 'Q2', coverage: 60 },
      { quarter: 'Q3', coverage: 62 }
    ],
    insights: [
      'Leadership growth has slowed this quarter.',
      'Valve Div is leading in cross-functional shifting programs at 85%.',
      'Under-indexing on strategic capacity planning across plant leads.'
    ]
  },
  {
    id: 'industrial-iot',
    name: 'Industrial IoT & Industry 4.0',
    coverage: 71,
    target: 85,
    gap: 14,
    trend: '-3%',
    risk: 'High',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 83 },
      { teamName: 'Friction Material Div', coverage: 72 },
      { teamName: 'Valve Div', coverage: 71 },
      { teamName: 'Die Casting Div', coverage: 58 }
    ],
    skillHealth: [
      { skillName: 'Predictive Maintenance', coverage: 78 },
      { skillName: 'Sensor Integration', coverage: 75 },
      { skillName: 'Machine Data Analytics', coverage: 68 },
      { skillName: 'PLC Programming', coverage: 63 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 77 },
      { quarter: 'Q2', coverage: 74 },
      { quarter: 'Q3', coverage: 71 }
    ],
    insights: [
      'IIoT coverage dropped 3% this quarter due to equipment legacy.',
      'Friction Material Div sensor configurations require immediate calibration.',
      'Die Casting predictive analytics remains an operational gap.'
    ]
  },
  {
    id: 'systems-thinking',
    name: 'Production System Architecture',
    coverage: 88,
    target: 85,
    gap: -3,
    trend: '+8%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 94 },
      { teamName: 'Valve Div', coverage: 91 },
      { teamName: 'Friction Material Div', coverage: 89 },
      { teamName: 'Die Casting Div', coverage: 78 }
    ],
    skillHealth: [
      { skillName: 'Line Balancing', coverage: 91 },
      { skillName: 'Cycle Time Optimization', coverage: 88 },
      { skillName: 'Bottleneck Analysis', coverage: 86 },
      { skillName: 'Plant Layout Design', coverage: 87 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 74 },
      { quarter: 'Q2', coverage: 81 },
      { quarter: 'Q3', coverage: 88 }
    ],
    insights: [
      'Production System Architecture competency exceeds target across all branches.',
      'Outstanding cycle time optimization in Steering Systems Div.',
      'Active development of cross-plant workflow topologies.'
    ]
  },
  {
    id: 'product-safety',
    name: 'Product Safety & Ergonomics',
    coverage: 81,
    target: 95,
    gap: 14,
    trend: '+5%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 85 },
      { teamName: 'Valve Div', coverage: 82 },
      { teamName: 'Friction Material Div', coverage: 78 },
      { teamName: 'Die Casting Div', coverage: 79 }
    ],
    skillHealth: [
      { skillName: 'ISO 45001 Compliance', coverage: 84 },
      { skillName: 'Workplace Ergonomics', coverage: 80 },
      { skillName: 'Hazard Identification', coverage: 82 },
      { skillName: 'Safety Critical Systems', coverage: 78 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 72 },
      { quarter: 'Q2', coverage: 76 },
      { quarter: 'Q3', coverage: 81 }
    ],
    insights: [
      'Product Safety certifications completed for core assembly lines.',
      'High alignment with external compliance targets.'
    ]
  },
  {
    id: 'advanced-robotics',
    name: 'Advanced Robotics',
    coverage: 68,
    target: 85,
    gap: 17,
    trend: '+8%',
    risk: 'Medium',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 84 },
      { teamName: 'Friction Material Div', coverage: 72 },
      { teamName: 'Valve Div', coverage: 62 },
      { teamName: 'Die Casting Div', coverage: 54 }
    ],
    skillHealth: [
      { skillName: 'Cobot Programming', coverage: 74 },
      { skillName: 'Automated Guided Vehicles', coverage: 66 },
      { skillName: 'Vision Systems Integrity', coverage: 70 },
      { skillName: 'Robotic Cell Safety', coverage: 62 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 58 },
      { quarter: 'Q2', coverage: 63 },
      { quarter: 'Q3', coverage: 68 }
    ],
    insights: [
      'Valve Div requires integration training on collaborative robots.',
      'Vision Systems Integrity coverage is progressing with +8% delta.'
    ]
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Resilience',
    coverage: 87,
    target: 95,
    gap: 8,
    trend: '+3%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 90 },
      { teamName: 'Valve Div', coverage: 88 },
      { teamName: 'Friction Material Div', coverage: 85 },
      { teamName: 'Die Casting Div', coverage: 85 }
    ],
    skillHealth: [
      { skillName: 'Just-in-Time (JIT) Delivery', coverage: 92 },
      { skillName: 'Inventory Optimization', coverage: 86 },
      { skillName: 'Risk Mitigation', coverage: 83 },
      { skillName: 'Demand Forecasting', coverage: 87 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 81 },
      { quarter: 'Q2', coverage: 84 },
      { quarter: 'Q3', coverage: 87 }
    ],
    insights: [
      'JIT compliance achieved ahead of projection across plants.',
      'Automatic inventory monitoring deployed to ERP systems.'
    ]
  },
  {
    id: 'business-continuity',
    name: 'Business Continuity',
    coverage: 58,
    target: 90,
    gap: 32,
    trend: '+1%',
    risk: 'High',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 64 },
      { teamName: 'Friction Material Div', coverage: 62 },
      { teamName: 'Valve Div', coverage: 55 },
      { teamName: 'Die Casting Div', coverage: 51 }
    ],
    skillHealth: [
      { skillName: 'Machine Breakdown Recovery', coverage: 61 },
      { skillName: 'Tooling Disaster Recovery', coverage: 56 },
      { skillName: 'Facility Power Failsafes', coverage: 59 },
      { skillName: 'Shift Reallocation Protocols', coverage: 56 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 56 },
      { quarter: 'Q2', coverage: 57 },
      { quarter: 'Q3', coverage: 58 }
    ],
    insights: [
      'Machine breakdown response drills are overdue for Die Casting and Valve Divs.',
      'Tooling recovery latency exceeds default thresholds.'
    ]
  },
  {
    id: 'supplier-quality',
    name: 'Supplier Quality Assurance',
    coverage: 72,
    target: 80,
    gap: 8,
    trend: '+4%',
    risk: 'Low',
    teamContributions: [
      { teamName: 'Steering Systems Div', coverage: 76 },
      { teamName: 'Valve Div', coverage: 74 },
      { teamName: 'Friction Material Div', coverage: 70 },
      { teamName: 'Die Casting Div', coverage: 68 }
    ],
    skillHealth: [
      { skillName: 'Supplier Auditing', coverage: 75 },
      { skillName: 'Cost Optimization Mappers', coverage: 72 },
      { skillName: 'Defect Rate Tracking', coverage: 71 },
      { skillName: 'Incoming Inspection Validation', coverage: 70 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 65 },
      { quarter: 'Q2', coverage: 68 },
      { quarter: 'Q3', coverage: 72 }
    ],
    insights: [
      'Defect rates are auto-monitored. Review quality alignment for Tier-2 suppliers.'
    ]
  }
];

export const TEAM_COMPARISON_DATA: TeamComparisonItem[] = [
  { teamName: 'Steering Systems Div', coverage: 82 },
  { teamName: 'Valve Div', coverage: 79 },
  { teamName: 'Friction Material Div', coverage: 69 },
  { teamName: 'Die Casting Div', coverage: 61 }
];

export const KPI_STATS: KPIStats = {
  competenciesCount: 10,
  avgCoverage: 76,
  atRiskCount: 3,
  topTeam: 'Steering Systems Div',
  topTeamCoverage: 92,
  growth: '+11%'
};

export const GLOBAL_AI_INSIGHTS = [
  { id: 'g1', text: 'IIoT coverage dropped 3% due to legacy equipment.', priority: 'high', category: 'Risk' },
  { id: 'g2', text: 'Die Casting Div is below target for Lean Manufacturing.', priority: 'high', category: 'Gap' },
  { id: 'g3', text: 'QMS target likely to be achieved next quarter.', priority: 'medium', category: 'Milestone' },
  { id: 'g4', text: 'Six Sigma DMAIC remains the largest competency gap.', priority: 'medium', category: 'Gap' },
  { id: 'g5', text: 'Leadership capacity planning growth has slowed this quarter.', priority: 'low', category: 'Trend' }
];

export const MOCK_USER = {
  name: 'Lakshmi Narayanan',
  role: 'Plant Head (Demo)',
  department: 'Operations',
  avatar: 'https://images.unsplash.com/photo-1542614917-8178ee7ea2ff?auto=format&fit=crop&w=120&h=120&q=80'
};
