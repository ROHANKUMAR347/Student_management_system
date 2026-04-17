import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function RSLogo({ size = 120 }) {
  return (
    <MotionBox
      width={size}
      height={size}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 200 }}
      cursor="pointer"
    >
      <svg viewBox="0 0 300 300" width="100%" height="100%">
        <defs>
          {/* Metallic Gradient */}
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd1a3" />
            <stop offset="25%" stopColor="#ff9a6b" />
            <stop offset="50%" stopColor="#ff5e62" />
            <stop offset="75%" stopColor="#ff9966" />
            <stop offset="100%" stopColor="#ffd1a3" />
          </linearGradient>

          {/* Glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Swoosh */}
        <motion.path
          d="M40 160 Q150 20 260 120 Q180 80 120 200 Q200 150 260 220"
          stroke="url(#metal)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* RS Text */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="90"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fill="url(#metal)"
          filter="url(#glow)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          RS
        </motion.text>
      </svg>
    </MotionBox>
  );
}