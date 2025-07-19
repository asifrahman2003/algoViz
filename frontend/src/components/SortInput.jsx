import { useState } from "react";
import { motion } from "framer-motion";
import { FaListOl, FaSortAmountDown } from "react-icons/fa";

const SortInput = ({ onSort }) => {
  const [arrayInput, setArrayInput] = useState("");
  const [method, setMethod] = useState("bubble");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedArray = arrayInput
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (parsedArray.length === 0) {
      alert("⚠️ Please enter a valid array of numbers.");
      return;
    }

    onSort(method, parsedArray);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl p-6 rounded-2xl mb-8 w-full mx-auto space-y-6"
    >
      {/* Input Array */}
      <div>
        <label className="flex items-center gap-2 text-sm text-slate-300 font-semibold mb-1">
          <FaListOl /> Enter Array
        </label>
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          className="w-full rounded-lg px-4 py-2 bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="e.g. 5, 2, 9, 1"
        />
      </div>

      {/* Sorting Method Dropdown */}
      <div>
        <label className="flex items-center gap-2 text-sm text-slate-300 font-semibold mb-1">
          <FaSortAmountDown /> Select Sorting Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full rounded-lg px-4 py-2 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="heap">Heap Sort</option>
          <option value="radix">Radix Sort</option>
          <option value="shell">Shell Sort</option>
        </select>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 text-white py-2 rounded-xl font-medium tracking-wide shadow-lg"
      >
        Visualize
      </button>
    </motion.form>
  );
};

export default SortInput;
