'use client'
import { useState } from 'react';

interface JobEntry {
  company: string;
  title: string;
  years: string;
}

export default function ResumeBuilder() {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [jobs, setJobs] = useState<JobEntry[]>([]);
  const [currentJob, setCurrentJob] = useState<Partial<JobEntry>>({});

  const prompts = [
    "Enter company name:",
    "Enter job title:",
    "Enter years (e.g., 2020-2023):",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory([...commandHistory, `> ${input}`]);
      
      // Handle job information collection
      const stepWithinJob = currentStep % 3;
      const jobIndex = Math.floor(currentStep / 3);

      switch(stepWithinJob) {
        case 0:
          setCurrentJob({ company: input });
          break;
        case 1:
          setCurrentJob(prev => ({ ...prev, title: input }));
          break;
        case 2:
          const newJob = { ...currentJob, years: input } as JobEntry;
          setJobs(prev => [...prev, newJob]);
          setCurrentJob({});
          
          // If we've collected 3 jobs, generate the resume
          if (jobIndex === 2) {
            const jobsPrompt = jobs.concat([newJob])
              .map(job => `${job.company} | ${job.title} | ${job.years}`)
              .join('\n');
              
            try {
              const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  prompt: `Create a professional experience section for a resume with these jobs:\n${jobsPrompt}` 
                }),
              });

              const data = await response.json();
              if (data.result) {
                setOutput(data.result);
              }
            } catch (error) {
              console.error('Error:', error);
              setCommandHistory(prev => [...prev, "Error: Failed to get AI response"]);
            }
          }
          break;
      }

      // Move to next step if not finished
      if (currentStep < 8) { // 3 jobs × 3 fields = 9 steps (0-8)
        setCurrentStep(prev => prev + 1);
      }

      setInput('');
    }
  };

  const handleHistoryClick = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
      const entry = commandHistory[index].replace('> ', '');
      setInput(entry);
      setCommandHistory(prev => prev.slice(0, index));
      
      const jobIndex = Math.floor(index / 3);
      const stepWithinJob = index % 3;
      
      setJobs(prev => prev.slice(0, jobIndex));
      
      if (stepWithinJob === 0) {
        setCurrentJob({});
      } else {
        const currentJobData: Partial<JobEntry> = {};
        if (stepWithinJob >= 1) currentJobData.company = commandHistory[index - 1].replace('> ', '');
        if (stepWithinJob >= 2) currentJobData.title = commandHistory[index - 2].replace('> ', '');
        if (stepWithinJob >= 3) currentJobData.years = commandHistory[index - 3].replace('> ', '');
        setCurrentJob(currentJobData);
      }
    }
  };

  // Calculate which job and field we're currently collecting
  const jobNumber = Math.floor(currentStep / 3) + 1;
  const currentPrompt = `Job ${jobNumber}: ${prompts[currentStep % 3]}`;

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <main className="max-w-6xl mx-auto pt-16">
        <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-700 p-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-sm text-slate-300">Resume Builder Terminal</span>
            </div>
            
            <div className="p-4 h-[calc(100%-2.5rem)] flex flex-col">
              <div className="flex-1 overflow-auto text-slate-300 font-mono">
                {currentStep < 9 && (
                  <div className="mb-4 text-yellow-400">{currentPrompt}</div>
                )}
                {commandHistory.map((cmd, index) => (
                  <div 
                    key={index} 
                    className="mb-2 cursor-pointer hover:text-yellow-400 transition-colors"
                    onClick={() => handleHistoryClick(index)}
                  >
                    {cmd}
                  </div>
                ))}
              </div>
              {currentStep < 9 && (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">→</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-slate-300 font-mono"
                      placeholder="Type your answer..."
                      autoFocus
                    />
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 overflow-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Resume Preview</h2>
            <div className="prose max-w-none">
              {output ? (
                <div className="text-slate-800">{output}</div>
              ) : (
                <p className="text-slate-400 italic">Resume preview will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 