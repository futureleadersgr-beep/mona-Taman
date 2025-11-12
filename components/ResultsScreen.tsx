import React from 'react';
import { Decision, Outcome, Scenario, GameHistory } from '../types';
import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icons } from './Icons';

interface ResultsScreenProps {
  scenario: Scenario;
  decision: Decision;
  outcome: Outcome;
  onNext: () => void;
  onRestart: () => void;
  operatingCost: number;
  score: number;
  round: number;
  gameHistory: GameHistory[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(value);
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ scenario, decision, outcome, onNext, onRestart, operatingCost, score, round, gameHistory }) => {
  const Checkmark = ({ correct }: { correct: boolean }) => (
    correct ? 
    <Icons name="check" className="w-5 h-5 text-brand-success"/> : 
    <Icons name="cross" className="w-5 h-5 text-brand-danger"/>
  );

  const recentHistory = gameHistory.slice(-3);

  const kpiData = recentHistory.map((entry) => {
    const roundIndex = gameHistory.indexOf(entry);
    const cumulativeImpact = gameHistory.slice(0, roundIndex + 1).reduce((acc, h) => acc + h.outcome.costImpact, 0);
    const endOfRoundOpCost = operatingCost + cumulativeImpact;

    return {
      round: `R${roundIndex + 1}`,
      'Cost Impact': entry.outcome.costImpact,
      'Score Change': entry.outcome.scoreChange,
      'Operating Cost': endOfRoundOpCost,
    };
  });

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-6 sm:p-8 shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6" style={{fontFamily: "'Orbitron', sans-serif"}}>
            Round {round} Debrief
        </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Decision Analysis */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">Decision Analysis</h3>
            <div className="bg-brand-bg p-4 rounded-lg border border-brand-border space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-brand-text-secondary">Affected SCOR Process:</span>
                <div className="flex items-center gap-2 font-semibold">
                    <Checkmark correct={outcome.isCorrectProcess} />
                    <span>{decision.process}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text-secondary">Risk Type:</span>
                <div className="flex items-center gap-2 font-semibold">
                    <Checkmark correct={outcome.isCorrectRiskType} />
                    <span>{decision.riskType}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text-secondary">Response Strategy:</span>
                 <div className="flex items-center gap-2 font-semibold">
                    <Checkmark correct={outcome.isOptimalResponse} />
                    <span>{outcome.isOptimalResponse ? 'Optimal' : 'Sub-optimal'}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">AI Expert Feedback</h3>
            <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
                <p className="text-brand-text-secondary italic">"{outcome.aiFeedback}"</p>
            </div>
          </div>
            
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">Optimal Strategy</h3>
            <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
                <p className="font-semibold text-brand-text mb-2">{scenario.options[scenario.analysis.optimalResponseIndex]}</p>
                <p className="text-sm text-brand-text-secondary">{scenario.analysis.justification}</p>
            </div>
          </div>
        </div>

        {/* Right column: Impact Visualization */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">KPI Trends (Last 3 Rounds)</h3>
            <div className="bg-brand-bg p-4 rounded-lg border border-brand-border h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpiData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                      <XAxis dataKey="round" tick={{ fill: '#8B949E' }} />
                      <YAxis yAxisId="left" tickFormatter={formatCurrency} tick={{ fill: '#8B949E', fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#8B949E' }} />
                      <Tooltip
                          contentStyle={{ backgroundColor: '#161B22', border: `1px solid #30363D` }}
                          labelStyle={{ color: '#C9D1D9' }}
                          formatter={(value: number, name: string) => {
                              if (name === 'Score Change') {
                                  return [`${value} pts`, name];
                              }
                              return [formatCurrency(value), name];
                          }}
                      />
                      <Legend formatter={(value) => <span className="text-brand-text-secondary">{value}</span>} />
                      <Line yAxisId="left" type="monotone" dataKey="Operating Cost" stroke="#58A6FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line yAxisId="left" type="monotone" dataKey="Cost Impact" stroke="#F85149" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="Score Change" stroke="#3FB950" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
              </ResponsiveContainer>
            </div>
             <div className="text-center mt-2">
                <p className={`text-lg font-bold ${outcome.costImpact > 0 ? 'text-brand-danger' : 'text-brand-success'}`}>
                    This Round's Cost Impact: {formatCurrency(outcome.costImpact)} ({outcome.costImpactPercentage.toFixed(2)}%)
                </p>
            </div>
          </div>
          
           <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">Performance Score</h3>
            <div className="bg-brand-bg p-4 rounded-lg border border-brand-border text-center">
                 <p className="text-4xl font-bold text-brand-text">{score.toLocaleString()}</p>
                 <p className={`text-lg font-semibold ${outcome.scoreChange >= 0 ? 'text-brand-success' : 'text-brand-danger'}`}>
                     {outcome.scoreChange >= 0 ? '+' : ''}{outcome.scoreChange} points
                 </p>
            </div>
          </div>
        </div>
      </div>

      {gameHistory.length > 0 && (
        <div className="mt-10">
            <h3 className="text-2xl font-bold text-center mb-4" style={{fontFamily: "'Orbitron', sans-serif"}}>
                Simulation History
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-brand-bg rounded-lg border border-brand-border">
                {gameHistory.map((entry, index) => (
                    <div key={index} className="bg-brand-surface p-4 rounded-md border border-brand-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex-1">
                            <p className="font-bold text-brand-text">
                                Round {index + 1}: <span className="text-brand-text-secondary font-normal">{entry.scenario.description.substring(0, 80)}...</span>
                            </p>
                            <p className="text-sm text-brand-text-secondary mt-1">
                                <span className="font-semibold">Your Response:</span> {entry.scenario.options[entry.decision.responseIndex]}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-right shrink-0">
                           <div className="flex items-center gap-2 font-semibold">
                                <Checkmark correct={entry.outcome.isOptimalResponse} />
                                <span>{entry.outcome.isOptimalResponse ? 'Optimal' : 'Sub-optimal'}</span>
                            </div>
                           <div className={`font-bold text-lg ${entry.outcome.scoreChange >=0 ? 'text-brand-success' : 'text-brand-danger'}`}>
                                {entry.outcome.scoreChange >= 0 ? '+' : ''}{entry.outcome.scoreChange}
                           </div>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </div>
      )}
      
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors text-lg shadow-lg">
            Next Scenario
        </button>
        <button onClick={onRestart} className="w-full sm:w-auto px-8 py-3 bg-brand-surface border border-brand-border text-brand-text-secondary font-bold rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors text-lg">
            End Simulation
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;