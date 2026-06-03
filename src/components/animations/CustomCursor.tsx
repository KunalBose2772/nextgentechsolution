"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const visible = useMotionValue(0);
  const hovering = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.3 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      visible.set(1);
    };

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => hovering.set(1));
        el.addEventListener("mouseleave", () => hovering.set(0));
      });
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", () => visible.set(0));
    document.documentElement.addEventListener("mouseenter", () => visible.set(1));
    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY, visible, hovering]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-9998 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible,
          width: 32,
          height: 32,
        }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{ borderColor: "rgba(59, 130, 246, 0.4)" }}
        />
      </motion.div>
    </>
  );
}
