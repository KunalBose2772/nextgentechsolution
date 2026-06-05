"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function CustomScrollbar() {
  const [show, setShow] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(40);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartMouseY = useRef(0);
  const dragStartScrollTop = useRef(0);

  // Track page scroll with framer-motion
  const { scrollY } = useScroll();

  const updateScrollbar = () => {
    if (typeof window === "undefined") return;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) {
      setShow(false);
      return;
    }

    // Calculate height proportion
    const height = Math.max((winHeight / docHeight) * winHeight, 48);
    setThumbHeight(height);

    // Calculate top position
    const currentScroll = window.scrollY;
    const percentage = currentScroll / maxScroll;
    
    // Keep 12px margin at top/bottom of track
    const trackHeight = winHeight - 24;
    const top = 12 + percentage * (trackHeight - height);
    setThumbTop(top);
  };

  // Keep scrollbar visible when scrolling, hide after a short delay
  useMotionValueEvent(scrollY, "change", () => {
    updateScrollbar();
    setShow(true);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    if (!isDragging) {
      scrollTimeout.current = setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  });

  // Handle window resizing
  useEffect(() => {
    const handleInit = () => {
      updateScrollbar();
    };
    const frameId = requestAnimationFrame(handleInit);

    window.addEventListener("resize", updateScrollbar);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateScrollbar);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      const trackHeight = winHeight - 24;
      const scrollableTrackHeight = trackHeight - thumbHeight;

      if (scrollableTrackHeight <= 0) return;

      const deltaY = e.clientY - dragStartMouseY.current;
      const ratio = deltaY / scrollableTrackHeight;
      const targetScroll = dragStartScrollTop.current + ratio * maxScroll;

      window.scrollTo({
        top: Math.max(0, Math.min(targetScroll, maxScroll)),
        behavior: "auto", // Instant updates while dragging
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset fade-out timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setShow(false);
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbHeight]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartMouseY.current = e.clientY;
    dragStartScrollTop.current = window.scrollY;
  };

  return (
    <AnimatePresence>
      {(show || isDragging) && (
        <motion.div
          className="fixed right-1 top-0 bottom-0 w-2.5 z-[9999] flex items-center justify-center select-none"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* Scrollbar Track */}
          <div className="absolute top-3 bottom-3 right-0.5 left-0.5 rounded-full bg-white/[0.02] border border-white/[0.04] backdrop-blur-[2px] pointer-events-none" />

          {/* Interactive Scrollbar Thumb */}
          <motion.div
            className="absolute right-0.5 w-1.5 rounded-full cursor-grab active:cursor-grabbing transition-[width] hover:w-2"
            style={{
              height: `${thumbHeight}px`,
              top: `${thumbTop}px`,
              background: isDragging
                ? "var(--accent-primary)"
                : "linear-gradient(to bottom, var(--accent-primary), rgba(var(--accent-primary-rgb), 0.7))",
              boxShadow: "0 0 12px rgba(var(--accent-primary-rgb), 0.45)",
            }}
            onMouseDown={handleMouseDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
