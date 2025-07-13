import { motion } from "framer-motion";

function SplashView() {
  return (
    <div className="fixed !z-[9999] top-0 left-0 w-full h-full  flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-center text-3xl font-peydaExBold">نوبت</h1>
      </motion.div>
    </div>
  );
}

export default SplashView;
