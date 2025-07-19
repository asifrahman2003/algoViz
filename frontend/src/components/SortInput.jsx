import { useState } from "react";

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
      alert("Please enter a valid array.");
      return;
    }

    onSort(method, parsedArray); // Call function from App
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-4">
      <label className="block mb-2 font-semibold text-gray-700">
        Enter array (e.g. 5, 2, 9, 1):
      </label>
      <input
        type="text"
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="e.g. 5, 2, 9, 1"
      />

      <label className="block mb-2 font-semibold text-gray-700">
        Select Sorting Method:
      </label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Visualize
      </button>
    </form>
  );
};

export default SortInput;
