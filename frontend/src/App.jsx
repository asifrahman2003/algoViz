import { useState } from "react";
import Navbar from './components/Navbar';
import SortInput from './components/SortInput';
import SortVisualizer from './components/SortVisualizer';
import Recommendation from './components/Recommendation';
import { getSortSteps } from './api/sortingAPI';

function App() {
  const [steps, setSteps] = useState([]);

  const handleSort = async (method, array) => {
    try {
      const response = await getSortSteps(method, array);
      const extractedSteps = response.steps.map((s) => s.step); // Just the step arrays
      setSteps(extractedSteps);
    } catch (err) {
      console.error("Error fetching sort steps:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
  <Navbar />
  <main className="max-w-4xl mx-auto p-6">
    <SortInput onSort={handleSort} />
    <SortVisualizer steps={steps} />
    <Recommendation />
  </main>
</div>
  );
}

export default App;
