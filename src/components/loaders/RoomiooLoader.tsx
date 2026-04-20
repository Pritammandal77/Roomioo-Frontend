import { motion } from "framer-motion";

interface RoomiooPropsType {
  isAddBg: boolean;
  textContent: string;
}

export default function RoomiooLoader({ isAddBg, textContent }: RoomiooPropsType) {
  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center fixed top-0 right-0 z-999 ${
        isAddBg && "bg-green-50"
      }`}
    >
      {/* SVG House Drawing */}
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="text-green-600"
      >
        {/* Roof */}
        <motion.path
          d="M10 50 L50 15 L90 50"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.2,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5, // pause here
          }}
        />

        {/* Walls */}
        <motion.path
          d="M20 50 L20 85 L80 85 L80 50"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "linear",
            delay: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5, // same pause
          }}
        />

        {/* Door */}
        <motion.rect
          x="45"
          y="65"
          width="10"
          height="20"
          rx="2"
          fill="currentColor"
          initial={{ opacity: 1 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0, // pause sync
          }}
        />
      </motion.svg>

      {/* Text */}
      <motion.p
        className="mt-4 text-green-700 font-medium tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
      >
        {textContent}
      </motion.p>
    </div>
  );
}