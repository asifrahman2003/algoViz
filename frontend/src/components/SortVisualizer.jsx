import { motion, AnimatePresence } from "framer-motion";

const SortVisualizer = ({ steps }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Sorting Steps</h2>
      {steps.length === 0 ? (
        <p className="text-gray-500">No steps to display. Try submitting an array.</p>
      ) : (
        <div className="space-y-6">
          {steps.map((stepObj, i) => (
            <div key={i}>
              <div className="flex items-end gap-2">
                <AnimatePresence>
                  {stepObj.step.map((val, j) => (
                    <motion.div
                      key={j}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-blue-500 text-white text-xs text-center rounded-sm"
                      style={{
                        width: "28px",
                        height: `${val * 5}px`,
                      }}
                    >
                      {val}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-gray-600 mt-1"
              >
                {stepObj.code}
              </motion.p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortVisualizer;
