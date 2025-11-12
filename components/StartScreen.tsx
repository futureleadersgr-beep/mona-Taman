
import React, { useState } from 'react';
import { Industry, Difficulty, SCORProcess } from '../types';
import { INDUSTRIES, SCOR_PROCESSES } from '../constants';
import { Icons } from './Icons';

interface StartScreenProps {
  onStartGame: (industry: Industry, difficulty: Difficulty, process: SCORProcess | null) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<SCORProcess | null>(null);

  const handleStart = () => {
    if (selectedIndustry && selectedDifficulty) {
      onStartGame(selectedIndustry, selectedDifficulty, selectedProcess);
    }
  };

  const difficulties: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="bg-brand-surface p-8 rounded-lg border border-brand-border shadow-2xl max-w-4xl w-full transition-all duration-500">
        <h2 className="text-3xl font-bold text-brand-primary mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Welcome to the SCOR-RISK Simulator
        </h2>
        <p className="text-brand-text-secondary mb-8">
          Step into the role of a Supply Chain Manager. Identify, analyze, and respond to real-world risks. Your decisions will impact your company's bottom line and reputation.
        </p>
        
        {/* Step 1: Select Industry */}
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-brand-text mb-4">1. Select Your Industry</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((industry) => (
                <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`group flex flex-col items-center justify-center p-4 border rounded-lg transition-all duration-300 transform hover:scale-105 ${selectedIndustry === industry.id ? 'border-brand-primary bg-brand-secondary/20 scale-105' : 'bg-brand-bg border-brand-border hover:border-brand-primary hover:bg-brand-secondary/10'}`}
                >
                <Icons name={industry.icon as any} className={`w-12 h-12 mb-2 transition-colors ${selectedIndustry === industry.id ? 'text-brand-primary' : 'text-brand-text-secondary group-hover:text-brand-primary'}`} />
                <span className={`font-semibold transition-colors ${selectedIndustry === industry.id ? 'text-brand-primary' : 'text-brand-text group-hover:text-brand-primary'}`}>{industry.name}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Step 2: Select Difficulty */}
        <div className={`transition-all duration-500 ease-in-out ${selectedIndustry ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <h3 className="text-xl font-semibold text-brand-text mb-4">2. Select Difficulty</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
                {difficulties.map((level) => (
                     <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`p-4 font-bold border rounded-lg transition-all duration-300 transform hover:scale-105 ${selectedDifficulty === level ? 'bg-brand-primary text-white border-brand-primary scale-105' : 'bg-brand-bg border-brand-border text-brand-text-secondary hover:border-brand-primary hover:text-brand-primary'}`}
                     >
                        {level}
                     </button>
                ))}
            </div>
        </div>

        {/* Step 3: Focus Area */}
        <div className={`transition-all duration-500 ease-in-out ${selectedIndustry && selectedDifficulty ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <h3 className="text-xl font-semibold text-brand-text mb-4">3. Focus Area (Optional)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
                 <button
                    onClick={() => setSelectedProcess(null)}
                    className={`p-3 border rounded-md cursor-pointer text-center transition-colors font-semibold ${selectedProcess === null ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-bg border-brand-border hover:border-brand-secondary'}`}
                 >
                    All Processes
                 </button>
                {SCOR_PROCESSES.map((p) => (
                    <button
                        key={p}
                        onClick={() => setSelectedProcess(p)}
                        className={`p-3 border rounded-md cursor-pointer text-center transition-colors ${selectedProcess === p ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-bg border-brand-border hover:border-brand-secondary'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
        
        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selectedIndustry || !selectedDifficulty}
          className="w-full md:w-auto px-12 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-all duration-300 text-xl shadow-lg disabled:bg-brand-border disabled:text-brand-text-secondary disabled:cursor-not-allowed disabled:shadow-none transform disabled:scale-100 hover:scale-105"
        >
          Start Simulation
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
