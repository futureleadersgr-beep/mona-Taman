import React, { useState } from 'react';
import { Scenario, Decision, SCORProcess, RiskType } from '../types';
import { SCOR_PROCESSES, RISK_TYPES, MAIN_FACTORS, EXPECTED_OUTCOMES } from '../constants';
import { Icons } from './Icons';

interface GameScreenProps {
  scenario: Scenario;
  onSubmit: (decision: Decision) => void;
  round: number;
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ scenario, onSubmit, round, score }) => {
  const [process, setProcess] = useState<SCORProcess | ''>('');
  const [riskType, setRiskType] = useState<RiskType | ''>('');
  const [responseIndex, setResponseIndex] = useState<number | null>(null);
  const [justification, setJustification] = useState('');
  const [mainFactor, setMainFactor] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (process && riskType && responseIndex !== null && justification && mainFactor && expectedOutcome) {
      onSubmit({
        process,
        riskType,
        responseIndex,
        justification,
        mainFactor,
        expectedOutcome,
      });
    } else {
      alert('Please complete all fields before submitting.');
    }
  };

  const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-3 flex items-center">
      {icon}
      <div className="ml-3">
        <div className="text-xs text-brand-text-secondary">{label}</div>
        <div className="text-lg font-bold text-brand-text">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard icon={<Icons name="round" className="w-8 h-8 text-brand-primary"/>} label="Current Round" value={round} />
          <StatCard icon={<Icons name="score" className="w-8 h-8 text-brand-success"/>} label="Total Score" value={score.toLocaleString()} />
       </div>

      <div className="bg-brand-surface border border-brand-border rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-brand-primary mb-4">RISK SCENARIO</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
            {scenario.productImage && (
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img 
                    src={`data:image/png;base64,${scenario.productImage}`} 
                    alt={scenario.productName || 'Product image'} 
                    className="rounded-lg object-cover w-full h-auto aspect-square bg-brand-bg border border-brand-border"
                    />
                    {scenario.productName && <p className="text-center text-sm text-brand-text-secondary mt-2 font-semibold">{scenario.productName}</p>}
                </div>
            )}
            <div className="flex-1">
                <p className="text-brand-text-secondary leading-relaxed">{scenario.description}</p>
            </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <fieldset>
              <legend className="text-lg font-semibold text-brand-text mb-3 flex items-center gap-2">
                <span>1. Identify Affected SCOR Process</span>
                 <div className="relative group flex items-center">
                    <Icons name="info" className="w-4 h-4 text-brand-text-secondary cursor-pointer" />
                    <div className="absolute bottom-full mb-2 w-64 p-3 bg-brand-bg border border-brand-border text-brand-text-secondary text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 left-1/2 -translate-x-1/2">
                        Pinpointing the exact SCOR process helps in deploying targeted solutions and understanding the root cause of the disruption.
                    </div>
                 </div>
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SCOR_PROCESSES.map((p) => (
                  <label key={p} className={`p-3 border rounded-md cursor-pointer text-center transition-colors ${process === p ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-bg border-brand-border hover:border-brand-secondary'}`}>
                    <input type="radio" name="process" value={p} checked={process === p} onChange={() => setProcess(p)} className="sr-only" />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
                <legend className="text-lg font-semibold text-brand-text mb-3 flex items-center gap-2">
                    <span>2. Analyze Risk Type</span>
                    <div className="relative group flex items-center">
                        <Icons name="info" className="w-4 h-4 text-brand-text-secondary cursor-pointer" />
                        <div className="absolute bottom-full mb-2 w-64 p-3 bg-brand-bg border border-brand-border text-brand-text-secondary text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 left-1/2 -translate-x-1/2">
                            Correctly identifying the risk type is crucial for assessing its potential impact and selecting the most effective mitigation strategy.
                        </div>
                    </div>
                </legend>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {RISK_TYPES.map((rt) => (
                  <label key={rt} className={`p-3 border rounded-md cursor-pointer text-center transition-colors ${riskType === rt ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-bg border-brand-border hover:border-brand-secondary'}`}>
                    <input type="radio" name="riskType" value={rt} checked={riskType === rt} onChange={() => setRiskType(rt)} className="sr-only" />
                    {rt}
                  </label>
                ))}
              </div>
            </fieldset>

             <fieldset>
                <legend className="text-lg font-semibold text-brand-text mb-3">3. Select Response</legend>
                <div className="space-y-3">
                    {scenario.options.map((opt, index) => (
                        <label key={index} className={`flex items-start p-4 border rounded-md cursor-pointer transition-colors ${responseIndex === index ? 'bg-brand-secondary/20 border-brand-primary' : 'bg-brand-bg border-brand-border hover:border-brand-primary hover:bg-brand-secondary/10'}`}>
                            <input type="radio" name="response" checked={responseIndex === index} onChange={() => setResponseIndex(index)} className="mt-1 mr-4 shrink-0 accent-brand-primary"/>
                            <span className="text-brand-text-secondary">{opt}</span>
                        </label>
                    ))}
                </div>
            </fieldset>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <fieldset>
                <legend className="text-lg font-semibold text-brand-text mb-3">4. Justify Your Choice</legend>
                <textarea
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={5}
                    placeholder="Explain the trade-offs (cost, reliability, flexibility, reputation) that influenced your decision..."
                    className="w-full p-3 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
                    required
                ></textarea>
            </fieldset>
             <fieldset>
                <legend className="text-lg font-semibold text-brand-text mb-3">Main factor influencing your choice:</legend>
                <select value={mainFactor} onChange={e => setMainFactor(e.target.value)} required className="w-full p-3 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition">
                    <option value="" disabled>Select a factor...</option>
                    {MAIN_FACTORS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </fieldset>
             <fieldset>
                <legend className="text-lg font-semibold text-brand-text mb-3">Expected outcome of your choice:</legend>
                <select value={expectedOutcome} onChange={e => setExpectedOutcome(e.target.value)} required className="w-full p-3 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition">
                    <option value="" disabled>Select an outcome...</option>
                    {EXPECTED_OUTCOMES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </fieldset>
          </div>
        </div>
        <div className="flex justify-end mt-8">
            <button type="submit" className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors text-lg shadow-lg">
                Submit Decision
            </button>
        </div>
      </form>
    </div>
  );
};

export default GameScreen;