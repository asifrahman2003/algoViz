'use client';
import React, { useState, useEffect, useMemo } from "react";

export default function Home() {
  if (typeof window === 'undefined') return null;

  const [array, setArray] = useState('');
  const [method, setMethod] = useState('bubble');
  const [steps, setSteps] = useState<{step: number[], code: string}[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // controlled playback when isPlaying
  useEffect(() => {
    if (!isPlaying || steps.length === 0 || !steps[currentStepIndex]) return;
    console.log("Step", currentStepIndex, steps[currentStepIndex]);
    const interval = setInterval(() => {
      setCurrentStepIndex((idx) => {
        const next = idx + 1;
        if (next >= steps.length) {
          setIsPlaying(false);
          clearInterval(interval);
          return idx;
        }
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, steps, currentStepIndex]);

  // Always call hooks in the same order, move useMemo above conditional
  const swappedIndices = useMemo(() => {
    if (currentStepIndex === 0) return [];
    const prev = Array.isArray(steps[currentStepIndex - 1]?.step) ? steps[currentStepIndex - 1].step : [];
    const curr = Array.isArray(steps[currentStepIndex]?.step) ? steps[currentStepIndex].step : [];
    return curr.reduce<number[]>((acc, val, i) => {
      if (val !== prev[i]) acc.push(i);
      return acc;
    }, []);
  }, [currentStepIndex, steps]);

  // Remove early return to prevent hydration mismatch

  const stepArray = steps[currentStepIndex]?.step;
  console.log("Rendering bars for step:", currentStepIndex, stepArray);

  const shouldRenderBars = Array.isArray(stepArray) && stepArray.length > 0;

  const handleSort = async () => {
    // parse user input into numbers
    const parsed = array
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));
    if (parsed.length === 0) return; // nothing to sort
    const response = await fetch("http://127.0.0.1:5000/sort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array: parsed, method }),
    });
    const data = await response.json();
    if (!data.steps || !Array.isArray(data.steps)) {
      console.error("Unexpected response from backend:", data);
      return;
    }
    // Ensure data.steps is an array of objects with step and code
    const safeSteps = Array.isArray(data.steps) ? data.steps.filter(s => s && Array.isArray(s.step) && typeof s.code === 'string') : [];
    console.log('API steps →', safeSteps);
    setSteps(safeSteps);
    setCurrentStepIndex(0);
    console.log("Initial Step from API →", safeSteps[0]);
    setIsPlaying(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-gray-800 font-mono">
      <>
        <h1 className="text-3xl font-bold mb-4">Sorting Visualizer</h1>

        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            value={array}
            onChange={(e) => setArray(e.target.value)}
            placeholder="Enter comma-separated numbers"
            className="border p-2 rounded w-72"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
          </select>

          <button
            onClick={handleSort}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Visualize
          </button>
        </div>

        <div className="mt-6 w-full max-w-xl">
          {shouldRenderBars ? (
            <div className="mt-8 w-full max-w-5xl h-64 flex items-end gap-1 bg-white border p-4 rounded shadow">
              {stepArray.map((val, i) => (
                <div
                  key={i}
                  className={`flex-1 flex items-end justify-center rounded-sm transition-all duration-300 ease-in-out text-xs text-white font-bold ${
                    swappedIndices.includes(i) ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{
                    height: `${(val / Math.max(...stepArray)) * 100}%`,
                    transition: 'height 0.3s ease-in-out',
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 items-end justify-center h-64">
              <p className="text-gray-500">No data to display</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          {steps.length > 0 && (
            <pre suppressHydrationWarning className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap max-w-4xl mt-4">
              {steps[currentStepIndex]?.code}
            </pre>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
              disabled={currentStepIndex === 0}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              disabled={steps.length === 0}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => setCurrentStepIndex((i) => Math.min(steps.length - 1, i + 1))}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </>
    </main>
  );
}
