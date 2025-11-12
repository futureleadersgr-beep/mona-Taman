
import React, { useState, useCallback } from 'react';
import { GameState, Industry, Scenario, Decision, Outcome, GameHistory, Difficulty, SCORProcess } from './types';
import { BASE_OPERATING_COSTS, COST_IMPACT_FACTORS, INITIAL_SCORE } from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import { generateScenario, evaluateJustification } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [scorProcessFilter, setScorProcessFilter] = useState<SCORProcess | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [lastDecision, setLastDecision] = useState<Decision | null>(null);
  const [lastOutcome, setLastOutcome] = useState<Outcome | null>(null);
  const [score, setScore] = useState<number>(INITIAL_SCORE);
  const [baseOperatingCost, setBaseOperatingCost] = useState<number>(0);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [round, setRound] = useState<number>(0);

  const fetchNewScenario = useCallback(async (selectedIndustry: Industry, selectedDifficulty: Difficulty, selectedProcess: SCORProcess | null) => {
    setError(null);
    setGameState(GameState.Evaluating);
    try {
      const scenario = await generateScenario(selectedIndustry, round + 1, selectedDifficulty, gameHistory, selectedProcess);
      
      setCurrentScenario(scenario);
      setGameState(GameState.Playing);
      setRound(prev => prev + 1);
    } catch (e) {
      console.error("Failed to generate scenario:", e);
      setError("Failed to generate a new scenario. Please try again.");
      setGameState(GameState.Start);
    }
  }, [round, gameHistory]);

  const startGame = useCallback((selectedIndustry: Industry, selectedDifficulty: Difficulty, selectedProcess: SCORProcess | null) => {
    setIndustry(selectedIndustry);
    setDifficulty(selectedDifficulty);
    setScorProcessFilter(selectedProcess);
    setBaseOperatingCost(BASE_OPERATING_COSTS[selectedIndustry]);
    setScore(INITIAL_SCORE);
    setGameHistory([]);
    setRound(0);
    fetchNewScenario(selectedIndustry, selectedDifficulty, selectedProcess);
  }, [fetchNewScenario]);

  const handleDecisionSubmit = async (decision: Decision) => {
    if (!currentScenario || !industry) return;

    setGameState(GameState.Evaluating);
    setLastDecision(decision);
    
    try {
      const aiFeedback = await evaluateJustification(currentScenario, decision);

      const { analysis } = currentScenario;
      const isCorrectProcess = decision.process === analysis.affectedProcess;
      const isCorrectRiskType = decision.riskType === analysis.riskType;
      const isOptimalResponse = decision.responseIndex === analysis.optimalResponseIndex;

      let scoreChange = 0;
      if (isCorrectProcess) scoreChange += 10;
      if (isCorrectRiskType) scoreChange += 10;
      if (isOptimalResponse) scoreChange += 30;
      else scoreChange -= 15;

      const [minImpact, maxImpact] = COST_IMPACT_FACTORS[analysis.affectedProcess];
      const impactFactor = isOptimalResponse ? 
        (Math.random() * (0 - minImpact) + minImpact) : // Optimal response is a cost saving or small cost
        (Math.random() * (maxImpact - (maxImpact * 0.5)) + (maxImpact * 0.5)); // Suboptimal is costly

      const costImpact = baseOperatingCost * impactFactor;
      
      const newScore = score + scoreChange;
      setScore(newScore);

      const outcome: Outcome = {
        costImpact: costImpact,
        costImpactPercentage: impactFactor * 100,
        scoreChange,
        aiFeedback,
        isCorrectProcess,
        isCorrectRiskType,
        isOptimalResponse,
      };
      setLastOutcome(outcome);
      setGameHistory(prev => [...prev, { scenario: currentScenario, decision, outcome }]);
      setGameState(GameState.Results);
    } catch(e) {
      console.error("Failed to evaluate justification:", e);
      setError("Failed to get feedback on your decision. Please proceed to the next round.");
      // Still calculate a result, but with generic feedback
      const outcome: Outcome = {
          costImpact: 0,
          costImpactPercentage: 0,
          scoreChange: 0,
          aiFeedback: "Could not get feedback from the AI expert at this time.",
          isCorrectProcess: false,
          isCorrectRiskType: false,
          isOptimalResponse: false
      }
      setLastOutcome(outcome);
      setGameState(GameState.Results);
    }
  };

  const handleNextRound = () => {
    if (industry && difficulty) {
      fetchNewScenario(industry, difficulty, scorProcessFilter);
    }
  };

  const restartGame = () => {
    setGameState(GameState.Start);
    setIndustry(null);
    setCurrentScenario(null);
    setLastDecision(null);
    setLastOutcome(null);
    setDifficulty(null);
    setScorProcessFilter(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStartGame={startGame} />;
      case GameState.Playing:
        return currentScenario && <GameScreen scenario={currentScenario} onSubmit={handleDecisionSubmit} round={round} score={score}/>;
      case GameState.Evaluating:
        return <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-brand-text-secondary">Analyzing & Simulating...</p>
        </div>;
      case GameState.Results:
        return lastDecision && lastOutcome && currentScenario && 
               <ResultsScreen 
                  scenario={currentScenario}
                  decision={lastDecision} 
                  outcome={lastOutcome} 
                  onNext={handleNextRound}
                  onRestart={restartGame}
                  operatingCost={baseOperatingCost}
                  score={score}
                  round={round}
                  gameHistory={gameHistory}
               />;
      default:
        return <StartScreen onStartGame={startGame} />;
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-text" style={{fontFamily: "'Orbitron', sans-serif"}}>
                SCOR-RISK <span className="text-brand-primary">SIMULATOR</span>
            </h1>
            {gameState !== GameState.Start && (
                <button
                    onClick={restartGame}
                    className="px-4 py-2 bg-brand-surface border border-brand-danger text-brand-danger rounded-md hover:bg-brand-danger hover:text-white transition-colors"
                >
                    Restart
                </button>
            )}
        </header>
        {error && (
            <div className="bg-brand-danger/20 border border-brand-danger text-brand-danger p-4 rounded-md mb-4">
                <strong>Error:</strong> {error}
            </div>
        )}
        {renderContent()}
      </div>
    </main>
  );
};

export default App;
