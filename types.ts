
export enum GameState {
  Start,
  Playing,
  Evaluating,
  Results,
}

export enum Industry {
  Electronics = "Electronics",
  Apparel = "Apparel",
  Food = "Food & Beverage",
  Logistics = "Logistics",
}

export enum SCORProcess {
  Plan = "Plan",
  Source = "Source",
  Make = "Make",
  Deliver = "Deliver",
  Return = "Return",
  Enable = "Enable",
}

export enum RiskType {
  Operational = "Operational",
  Environmental = "Environmental",
  Financial = "Financial",
  Reputational = "Reputational",
  Geopolitical = "Geopolitical",
  Cybersecurity = "Cybersecurity",
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export type Scenario = {
  description: string;
  options: string[];
  difficulty: Difficulty;
  analysis: {
    affectedProcess: SCORProcess;
    riskType: RiskType;
    optimalResponseIndex: number;
    justification: string;
  };
  productName?: string;
  productImage?: string;
};

export type Decision = {
  process: SCORProcess;
  riskType: RiskType;
  responseIndex: number;
  justification: string;
  mainFactor: string;
  expectedOutcome: string;
};

export type Outcome = {
  costImpact: number;
  costImpactPercentage: number;
  scoreChange: number;
  aiFeedback: string;
  isCorrectProcess: boolean;
  isCorrectRiskType: boolean;
  isOptimalResponse: boolean;
};

export type GameHistory = {
    scenario: Scenario;
    decision: Decision;
    outcome: Outcome;
}