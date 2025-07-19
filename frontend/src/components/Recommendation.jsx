import { useState } from "react";
import { motion } from "framer-motion";
import { getRecommendation } from "../api/sortingAPI";
import { FaSearch } from "react-icons/fa";

const Recommendation = () => {
  const [dataType, setDataType] = useState("numbers");
  const [dataSize, setDataSize] = useState("");
  const [realTime, setRealTime] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!dataSize || isNaN(dataSize)) {
    alert("Please enter a valid data size.");
    return;
  }

  const res = await getRecommendation(dataType, parseInt(dataSize), realTime);
  setRecommendation(res?.recommended);
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl w-full mx-auto"
    >
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2 tracking-tight">
        <FaSearch className="text-indigo-400" />
        Sorting Recommendation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-200">
        {/* Data Type */}
        <div>
          <label className="block mb-1 font-medium">Data Type:</label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="w-full bg-white/80 text-black border border-gray-300 p-2 rounded-lg"
          >
            <option value="numbers">Numbers</option>
            <option value="strings">Strings</option>
          </select>
        </div>

        {/* Data Size */}
        <div>
          <label className="block mb-1 font-medium">Data Size:</label>
          <input
            type="number"
            value={dataSize}
            onChange={(e) => setDataSize(e.target.value)}
            className="w-full bg-white/80 text-black border border-gray-300 p-2 rounded-lg"
            placeholder="e.g. 100"
          />
        </div>

        {/* Real-time Requirement */}
        <div className="flex items-center space-x-2">
          <input
            id="realTime"
            type="checkbox"
            checked={realTime}
            onChange={() => setRealTime(!realTime)}
            className="form-checkbox text-indigo-500"
          />
          <label htmlFor="realTime" className="font-medium">
            Real-time requirement
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 text-white py-2 rounded-xl font-medium tracking-wide shadow-lg"
        >
          Get Recommendation
        </button>
      </form>

      {/* Output */}
      {recommendation && (
        <p className="mt-6 text-sm text-green-400 font-semibold font-mono">
          Recommended Algorithm:{" "}
          <span className="text-blue-300">{recommendation}</span>
        </p>
      )}
    </motion.div>
  );
};

export default Recommendation;
