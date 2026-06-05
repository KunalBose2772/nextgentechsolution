import { motion } from "framer-motion";

/**
 * SectionGlow — adds seamless corner accent glows to any black section.
 * Usage: drop this component inside any dark section.
 * The glows use var(--accent-primary-rgb) so they update seamlessly with the theme toggle.
 */
export default function SectionGlow() {
  return (
    <>
      {/* Top-Right Bright Animated Shadow / Glow Overlay */}
      <motion.div 
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 translate-x-[25%] -translate-y-[25%]"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.5) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.6, 1.0, 0.6],
          scale: [0.95, 1.15, 0.95],
          x: ["25%", "20%", "25%"],
          y: ["-25%", "-20%", "-25%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }}
      />

      {/* Top-Left Bright Animated Shadow / Glow Overlay */}
      <motion.div 
        className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 -translate-x-[25%] -translate-y-[25%]"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.4) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.4, 0.85, 0.4],
          scale: [0.9, 1.1, 0.9],
          x: ["-25%", "-20%", "-25%"],
          y: ["-25%", "-20%", "-25%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Bottom-Right Bright Animated Shadow / Glow Overlay */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 translate-x-[25%] translate-y-[25%]"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.45) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [0.95, 1.15, 0.95],
          x: ["25%", "20%", "25%"],
          y: ["25%", "20%", "25%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 6.5,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Bottom-Left Bright Animated Shadow / Glow Overlay */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 -translate-x-[25%] translate-y-[25%]"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.4) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.4, 0.85, 0.4],
          scale: [0.9, 1.1, 0.9],
          x: ["-25%", "-20%", "-25%"],
          y: ["25%", "20%", "25%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 7.5,
          ease: "easeInOut",
          delay: 2.0
        }}
      />
    </>
  );
}
