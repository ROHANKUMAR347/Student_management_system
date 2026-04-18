import { Box } from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const MotionBox = motion(Box);

export default function RSLogo3D({ size = 180 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 15 });

  const rotateX = useTransform(smoothY, [-100, 100], [15, -15]);
  const rotateY = useTransform(smoothX, [-100, 100], [-15, 15]);

  const lightX = useTransform(smoothX, [-150, 150], [0, 300]);
  const lightY = useTransform(smoothY, [-150, 150], [0, 300]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionBox
      width={size}
      height={size}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      whileHover={{ scale: 1.08 }}
      cursor="pointer"
    >
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          {/* Metallic Gradient */}
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd8b0" />
            <stop offset="40%" stopColor="#ff9a6b" />
            <stop offset="70%" stopColor="#ff5e62" />
            <stop offset="100%" stopColor="#ffd8b0" />
          </linearGradient>

          {/* Dynamic Light (follows mouse) */}
          <radialGradient id="light">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Blur for bloom */}
          <filter id="bloom">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Mouse Light Reflection */}
        <motion.circle
          r="120"
          fill="url(#light)"
          style={{ cx: lightX, cy: lightY }}
          opacity={0.25}
        />

        {/* Glow Background */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="130"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fill="url(#metal)"
          opacity="0.25"
          filter="url(#bloom)"
        >
          RS
        </text>

        {/* Swoosh Ring */}
        <motion.path
          d="M80 200 Q200 40 320 160 Q260 120 200 280 Q280 240 320 300"
          stroke="url(#metal)"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Bottom swoosh */}
        <motion.path
          d="M100 300 Q200 350 300 290"
          stroke="url(#metal)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
        />

        {/* Main RS */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="130"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fill="url(#metal)"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          RS
        </motion.text>

        {/* Shine Sweep */}
        <motion.rect
          x="-300"
          y="0"
          width="200"
          height="400"
          fill="white"
          opacity="0.1"
          transform="rotate(20)"
          animate={{ x: ["-300", "500"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />

        {/* Spark */}
        <motion.circle
          cx="150"
          cy="100"
          r="4"
          fill="#fff"
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </svg>
    </MotionBox>
  );
}