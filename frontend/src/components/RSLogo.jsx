import React from "react";
import { Box } from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from "framer-motion";

const MotionBox = motion(Box);

export default function RSLogo3D({ size = 180 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimationControls();

  const smoothX = useSpring(x, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 15 });

  const rotateX = useTransform(smoothY, [-100, 100], [20, -20]);
  const rotateY = useTransform(smoothX, [-100, 100], [-20, 20]);

  const lightX = useTransform(smoothX, [-150, 150], [50, 350]);
  const lightY = useTransform(smoothY, [-150, 150], [50, 350]);

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

  // Animation sequence that repeats
  React.useEffect(() => {
    const sequence = async () => {
      await controls.start("pulse");
      setTimeout(() => controls.start("rotate"), 2000);
      setTimeout(() => controls.start("sparkle"), 4500);
      setTimeout(() => sequence(), 8000);
    };
    sequence();
  }, [controls]);

  return (
    <MotionBox
      width={size}
      height={size}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.98 }}
      cursor="pointer"
      variants={{
        pulse: { scale: [1, 1.08, 1], transition: { duration: 2 } },
        rotate: { rotateZ: [0, 360], transition: { duration: 3 } },
        sparkle: { scale: [1, 1.15, 1], transition: { duration: 1.5 } },
      }}
    >
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          {/* Metallic Gradients */}
          <radialGradient id="metalMain" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="30%" stopColor="#fab1a0" />
            <stop offset="60%" stopColor="#fd79a8" />
            <stop offset="100%" stopColor="#e17055" />
          </radialGradient>

          <linearGradient id="metalEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7675" />
            <stop offset="50%" stopColor="#fdcb6e" />
            <stop offset="100%" stopColor="#00b894" />
          </linearGradient>

          <radialGradient id="light" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Glow Filters */}
          <filter id="glowMain" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {/* Dynamic Light */}
        <motion.circle
          r="90"
          fill="url(#light)"
          style={{ cx: lightX, cy: lightY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Outer Ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="155"
          fill="none"
          stroke="url(#metalEdge)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glowMain)"
          animate={{
            pathLength: [0, 1],
            rotate: [0, 360],
          }}
          transition={{
            pathLength: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity },
          }}
        />

        {/* Background Glow Text */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="120"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fill="url(#metalMain)"
          opacity="0.2"
          filter="url(#bloom)"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          RS
        </motion.text>

        {/* Main RS Logo */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="140"
          fontFamily="Georgia, serif"
          fontWeight="900"
          fill="url(#metalMain)"
          stroke="#2d1b69"
          strokeWidth="1"
          filter="url(#glowMain)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          RS
        </motion.text>

        {/* Enhanced Swooshes */}
        <motion.path
          d="M70 190 Q190 30 330 150 Q270 90 210 270 Q290 230 340 300"
          stroke="url(#metalEdge)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowMain)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
        />

        <motion.path
          d="M90 290 Q170 350 280 310 Q340 290 360 270"
          stroke="url(#metalMain)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowMain)"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.8 },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />

        {/* Shine Animation */}
        <motion.rect
          x="-350"
          y="0"
          width="200"
          height="400"
          fill="white"
          opacity="0.12"
          rx="20"
          animate={{ x: ["-350", "550"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 2.8,
            ease: "linear",
          }}
        />

        {/* Sparkles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx={120 + i * 70}
            cy={90 + (i % 2) * 20}
            r="2.5"
            fill="white"
            filter="url(#glowMain)"
            animate={{
              scale: [0, 2.2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Floating Particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={100 + i * 100}
            cy={330}
            r="4"
            fill="url(#metalEdge)"
            animate={{
              y: [330, 310, 340, 330],
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </MotionBox>
  );
}