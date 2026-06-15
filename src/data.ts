import { Competency, TeamComparisonItem, KPIStats } from './types';

export const COMPETENCIES_DATA: Competency[] = [
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    coverage: 74,
    target: 90,
    gap: 16,
    trend: '+12%',
    risk: 'High',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 82 },
      { teamName: 'Product Team', coverage: 73 },
      { teamName: 'DevOps Team', coverage: 69 },
      { teamName: 'QA Team', coverage: 61 }
    ],
    skillHealth: [
      { skillName: 'Prompt Engineering', coverage: 84 },
      { skillName: 'AI Deployment', coverage: 78 },
      { skillName: 'AI Evaluation', coverage: 67 },
      { skillName: 'RAG Systems', coverage: 52 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 48 },
      { quarter: 'Q2', coverage: 59 },
      { quarter: 'Q3', coverage: 74 }
    ],
    insights: [
      'QA Team is below target for AI Engineering.',
      'RAG Systems remains the largest competency gap.',
      'Quarterly growth is strong at +12% driven by recent workshop certifications.'
    ]
  },
  {
    id: 'cloud-architecture',
    name: 'Cloud Architecture',
    coverage: 84,
    target: 85,
    gap: 1,
    trend: '+6%',
    risk: 'Low',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 90 },
      { teamName: 'DevOps Team', coverage: 88 },
      { teamName: 'Product Team', coverage: 86 },
      { teamName: 'QA Team', coverage: 72 }
    ],
    skillHealth: [
      { skillName: 'Cloud Native', coverage: 91 },
      { skillName: 'Serverless', coverage: 85 },
      { skillName: 'High Availability', coverage: 81 },
      { skillName: 'IaC (Terraform)', coverage: 79 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 70 },
      { quarter: 'Q2', coverage: 77 },
      { quarter: 'Q3', coverage: 84 }
    ],
    insights: [
      'Cloud Architecture target likely to be achieved next quarter.',
      'Platform and DevOps teams lead adoption with extensive certifications.',
      'QA Team has shown low compliance in infrastructure scripts.'
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership',
    coverage: 62,
    target: 80,
    gap: 18,
    trend: '+2%',
    risk: 'Medium',
    teamContributions: [
      { teamName: 'Product Team', coverage: 85 },
      { teamName: 'DevOps Team', coverage: 60 },
      { teamName: 'Platform Team', coverage: 55 },
      { teamName: 'QA Team', coverage: 48 }
    ],
    skillHealth: [
      { skillName: 'Execution Excellence', coverage: 70 },
      { skillName: 'Mentoring & Feedback', coverage: 66 },
      { skillName: 'Strategic Vision', coverage: 58 },
      { skillName: 'Change Management', coverage: 54 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 55 },
      { quarter: 'Q2', coverage: 60 },
      { quarter: 'Q3', coverage: 62 }
    ],
    insights: [
      'Leadership growth has slowed this quarter.',
      'Product Team is leading in cross-functional alignment programs at 85%.',
      'Under-indexing on strategic vision across engineering leads.'
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    coverage: 71,
    target: 85,
    gap: 14,
    trend: '-3%',
    risk: 'High',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 83 },
      { teamName: 'DevOps Team', coverage: 72 },
      { teamName: 'Product Team', coverage: 71 },
      { teamName: 'QA Team', coverage: 58 }
    ],
    skillHealth: [
      { skillName: 'Identity & Access Mgmt', coverage: 78 },
      { skillName: 'DevSecOps Automation', coverage: 75 },
      { skillName: 'Threat Modeling', coverage: 68 },
      { skillName: 'Incident Response', coverage: 63 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 77 },
      { quarter: 'Q2', coverage: 74 },
      { quarter: 'Q3', coverage: 71 }
    ],
    insights: [
      'Cybersecurity coverage dropped 3% this quarter.',
      'DevOps IAM configurations require immediate remediation.',
      'QA security regression testing remains is an operational gap.'
    ]
  },
  {
    id: 'systems-thinking',
    name: 'Systems Thinking',
    coverage: 88,
    target: 85,
    gap: -3,
    trend: '+8%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 94 },
      { teamName: 'Product Team', coverage: 91 },
      { teamName: 'DevOps Team', coverage: 89 },
      { teamName: 'QA Team', coverage: 78 }
    ],
    skillHealth: [
      { skillName: 'Feedback Loops Design', coverage: 91 },
      { skillName: 'Complexity Scaling', coverage: 88 },
      { skillName: 'Synthesis & Mapping', coverage: 86 },
      { skillName: 'Mental Models Theory', coverage: 87 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 74 },
      { quarter: 'Q2', coverage: 81 },
      { quarter: 'Q3', coverage: 88 }
    ],
    insights: [
      'Systems Thinking competency exceeds target across all engineering team branches.',
      'Outstanding system complexity scores in Platform Team.',
      'Active development of cross-team workflow topologies.'
    ]
  },
  {
    id: 'product-safety',
    name: 'Product Safety',
    coverage: 81,
    target: 95,
    gap: 14,
    trend: '+5%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 85 },
      { teamName: 'Product Team', coverage: 82 },
      { teamName: 'DevOps Team', coverage: 78 },
      { teamName: 'QA Team', coverage: 79 }
    ],
    skillHealth: [
      { skillName: 'Policy Auditing', coverage: 84 },
      { skillName: 'Threat Defense', coverage: 80 },
      { skillName: 'Security Sandboxing', coverage: 82 },
      { skillName: 'Validation Pipelines', coverage: 78 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 72 },
      { quarter: 'Q2', coverage: 76 },
      { quarter: 'Q3', coverage: 81 }
    ],
    insights: [
      'Product Safety certifications completed for core platform services.',
      'High alignment with external compliance targets.'
    ]
  },
  {
    id: 'system-architecture',
    name: 'System Architecture',
    coverage: 68,
    target: 85,
    gap: 17,
    trend: '+8%',
    risk: 'Medium',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 84 },
      { teamName: 'DevOps Team', coverage: 72 },
      { teamName: 'Product Team', coverage: 62 },
      { teamName: 'QA Team', coverage: 54 }
    ],
    skillHealth: [
      { skillName: 'Microservices Topology', coverage: 74 },
      { skillName: 'Orchestration Standards', coverage: 66 },
      { skillName: 'System Telemetry', coverage: 70 },
      { skillName: 'Multi-tenant Orchestration', coverage: 62 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 58 },
      { quarter: 'Q2', coverage: 63 },
      { quarter: 'Q3', coverage: 68 }
    ],
    insights: [
      'Product Team requires integration training on event-driven infrastructure.',
      'System telemetry coverage is progressing with +8% delta.'
    ]
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    coverage: 87,
    target: 95,
    gap: 8,
    trend: '+3%',
    risk: 'Healthy',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 90 },
      { teamName: 'Product Team', coverage: 88 },
      { teamName: 'DevOps Team', coverage: 85 },
      { teamName: 'QA Team', coverage: 85 }
    ],
    skillHealth: [
      { skillName: 'SOC2 Audit Trail', coverage: 92 },
      { skillName: 'GDPR Data Governance', coverage: 86 },
      { skillName: 'Automated Compliance Engine', coverage: 83 },
      { skillName: 'Threat Detection logs', coverage: 87 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 81 },
      { quarter: 'Q2', coverage: 84 },
      { quarter: 'Q3', coverage: 87 }
    ],
    insights: [
      'SOC2 Audit compliance achieved ahead of projection.',
      'Automatic log monitoring deployed to DevOps automation stacks.'
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
      { teamName: 'Platform Team', coverage: 64 },
      { teamName: 'DevOps Team', coverage: 62 },
      { teamName: 'Product Team', coverage: 55 },
      { teamName: 'QA Team', coverage: 51 }
    ],
    skillHealth: [
      { skillName: 'Failover Orchestration', coverage: 61 },
      { skillName: 'DR Replication Audits', coverage: 56 },
      { skillName: 'Multi-Region Topology', coverage: 59 },
      { skillName: 'Real-time Alerting', coverage: 56 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 56 },
      { quarter: 'Q2', coverage: 57 },
      { quarter: 'Q3', coverage: 58 }
    ],
    insights: [
      'DR Replication drills are overdue for QA and Product clusters.',
      'Backup storage latency exceeds default thresholds.'
    ]
  },
  {
    id: 'vendor-management',
    name: 'Vendor Management',
    coverage: 72,
    target: 80,
    gap: 8,
    trend: '+4%',
    risk: 'Low',
    teamContributions: [
      { teamName: 'Platform Team', coverage: 76 },
      { teamName: 'Product Team', coverage: 74 },
      { teamName: 'DevOps Team', coverage: 70 },
      { teamName: 'QA Team', coverage: 68 }
    ],
    skillHealth: [
      { skillName: 'Integration Assessments', coverage: 75 },
      { skillName: 'Cost Optimization Scopes', coverage: 72 },
      { skillName: 'Third-Party Policy Alignments', coverage: 71 },
      { skillName: 'SLA Validation Tools', coverage: 70 }
    ],
    trendAnalytics: [
      { quarter: 'Q1', coverage: 65 },
      { quarter: 'Q2', coverage: 68 },
      { quarter: 'Q3', coverage: 72 }
    ],
    insights: [
      'SLA violations are auto-monitored. Review SLA coverage for SaaS partners.'
    ]
  }
];

export const TEAM_COMPARISON_DATA: TeamComparisonItem[] = [
  { teamName: 'Platform Team', coverage: 82 },
  { teamName: 'Product Team', coverage: 79 },
  { teamName: 'DevOps Team', coverage: 69 },
  { teamName: 'QA Team', coverage: 61 }
];

export const KPI_STATS: KPIStats = {
  competenciesCount: 12,
  avgCoverage: 76,
  atRiskCount: 3,
  topTeam: 'Platform Team',
  topTeamCoverage: 92,
  growth: '+11%'
};

export const GLOBAL_AI_INSIGHTS = [
  { id: 'g1', text: 'Cybersecurity coverage dropped 3%.', priority: 'high', category: 'Risk' },
  { id: 'g2', text: 'QA Team is below target for AI Engineering.', priority: 'high', category: 'Gap' },
  { id: 'g3', text: 'Cloud Architecture target likely to be achieved next quarter.', priority: 'medium', category: 'Milestone' },
  { id: 'g4', text: 'RAG Systems remains the largest competency gap.', priority: 'medium', category: 'Gap' },
  { id: 'g5', text: 'Leadership growth has slowed this quarter.', priority: 'low', category: 'Trend' }
];

export const MOCK_USER = {
  name: 'Sarah Jenkins',
  role: 'Leader',
  department: 'Engineering Department',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
};
