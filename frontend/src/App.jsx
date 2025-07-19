import { useState } from "react";
import Navbar from './components/Navbar';
import SortInput from './components/SortInput';
import SortVisualizer from './components/SortVisualizer';
import Recommendation from './components/Recommendation';
import { getSortSteps } from './api/sortingAPI';
import Footer from "./components/Footer";

function App() {
  const [steps, setSteps] = useState([]);

  const handleSort = async (method, array) => {
    try {
      const response = await getSortSteps(method, array);
      console.log("Full steps received from backend:", response.steps);
      setSteps(response.steps);
    } catch (err) {
      console.error("Error fetching sort steps:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20">
        <SortInput onSort={handleSort} />
        <SortVisualizer steps={steps} />
        <Recommendation/>
      </main>

      <Footer />
    </div>
  );
}

export default App;
