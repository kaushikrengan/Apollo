export interface TeamContribution {
  teamName: string;
  coverage: number;
}

export interface SkillHealthItem {
  skillName: string;
  coverage: number;
}

export interface TrendAnalyticsPoint {
  quarter: string;
  coverage: number;
}

export type RiskLevel = 'High' | 'Medium' | 'Low' | 'Healthy';

export interface Competency {
  id: string;
  name: string;
  coverage: number;
  target: number;
  trend: string;
  risk: RiskLevel;
  gap: number;
  teamContributions: TeamContribution[];
  skillHealth: SkillHealthItem[];
  trendAnalytics: TrendAnalyticsPoint[];
  insights: string[];
}

export interface TeamComparisonItem {
  teamName: string;
  coverage: number;
}

export interface KPIStats {
  competenciesCount: number;
  avgCoverage: number;
  atRiskCount: number;
  topTeam: string;
  topTeamCoverage: number;
  growth: string;
}
