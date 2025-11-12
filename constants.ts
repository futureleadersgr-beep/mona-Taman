
import { Industry, SCORProcess, RiskType } from './types';

export const INDUSTRIES = [
  { id: Industry.Electronics, name: "Electronics", icon: "chip" },
  { id: Industry.Apparel, name: "Apparel", icon: "shirt" },
  { id: Industry.Food, name: "Food & Beverage", icon: "food" },
  { id: Industry.Logistics, name: "Logistics", icon: "truck" },
];

export const SCOR_PROCESSES: SCORProcess[] = [
  SCORProcess.Plan,
  SCORProcess.Source,
  SCORProcess.Make,
  SCORProcess.Deliver,
  SCORProcess.Return,
  SCORProcess.Enable,
];

export const RISK_TYPES: RiskType[] = [
  RiskType.Operational,
  RiskType.Environmental,
  RiskType.Financial,
  RiskType.Reputational,
  RiskType.Geopolitical,
  RiskType.Cybersecurity,
];

export const MAIN_FACTORS = ["Cost efficiency", "Service reliability", "Flexibility", "Reputation"];
export const EXPECTED_OUTCOMES = ["Higher cost but fewer delays", "Lower cost but more risk", "Improved sustainability"];

export const COST_IMPACT_FACTORS: Record<SCORProcess, [number, number]> = {
  [SCORProcess.Plan]: [-0.05, 0.15],
  [SCORProcess.Source]: [-0.10, 0.30],
  [SCORProcess.Make]: [-0.15, 0.40],
  [SCORProcess.Deliver]: [-0.10, 0.35],
  [SCORProcess.Return]: [-0.10, 0.25],
  [SCORProcess.Enable]: [-0.05, 0.10], // Assuming 'Enable' has a smaller impact
};

export const BASE_OPERATING_COSTS: Record<Industry, number> = {
  [Industry.Electronics]: 50000000,
  [Industry.Apparel]: 20000000,
  [Industry.Food]: 35000000,
  [Industry.Logistics]: 75000000,
};

export const INITIAL_SCORE = 1000;
