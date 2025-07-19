import { motion, AnimatePresence } from "framer-motion";

const SortVisualizer = ({ steps }) => {
  console.log("Steps Received:", steps);

  const isValid =
    Array.isArray(steps) &&
    steps.every(
      (s) =>
        s &&
        typeof s === "object" &&
        Array.isArray(s.step) &&
        typeof s.code === "string"
    );

  if (!isValid) {
    return (
      <div className="mt-8 text-red-400">
        <p>Error: Invalid sorting steps received. Please check your input.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Sorting Steps
      </h2>

      {steps.length === 0 ? (
        <p className="text-gray-400">No steps to display. Try submitting an array.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {steps.map((stepObj, i) => {
            const array = stepObj?.step;
            const description = stepObj?.code ?? "";
            if (!Array.isArray(array)) return null;

            const match = description.match(/positions? (\d+) and (\d+)/);
            const a = match ? parseInt(match[1]) : -1;
            const b = match ? parseInt(match[2]) : -1;

            const maxVal = Math.max(...array);
            const minBarHeight = 40;
            const maxBarHeight = 120;

            const isMutationStep = /(swap|moved|inserted|pivot)/i.test(description);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-xl hover:scale-[1.02] transition-transform duration-200 ease-out flex flex-col justify-between items-center h-[260px]"
              >
                {/* Step Counter */}
                <div className="w-full text-left text-xs text-slate-300 font-mono mb-2 tracking-wide">
                  Step {i + 1}
                </div>

                {/* Bars */}
                <div className="flex items-end justify-center gap-2 h-[140px]">
                  <AnimatePresence>
                    {array.map((val, j) => {
                      const isTarget = j === a || j === b;
                      const height =
                        ((val / maxVal) * (maxBarHeight - minBarHeight)) +
                        minBarHeight;

                      // Force highlight logic
                      let barColor = "bg-gradient-to-b from-blue-400 to-indigo-600";
                      if (isTarget && isMutationStep) {
                        barColor = "bg-gradient-to-b from-rose-400 to-rose-600 animate-pulse";
                      } else if (isTarget && !isMutationStep) {
                        barColor = "bg-gradient-to-b from-orange-300 to-yellow-500";
                      }

                      return (
                        <motion.div
                          key={j}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.3 }}
                          title={`Index: ${j}\nValue: ${val}${isTarget ? isMutationStep ? " (mutating)" : " (comparing)" : ""}`}
                          className={`relative flex items-end justify-center text-[0.65rem] text-white font-mono ${barColor}`}
                          style={{
                            width: "26px",
                            height: `${height}px`,
                            borderRadius: "0px"
                          }}
                        >
                          {isTarget && (
                            <div className="absolute -top-4 text-[10px] text-white font-bold">
                              ↑
                            </div>
                          )}
                          {val}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Step Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-indigo-300 mt-3 text-center font-mono leading-snug"
                >
                  {description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortVisualizer;
