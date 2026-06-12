"use client";

export default function SectionGlow() {
  return (
    <>
      <div 
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 translate-x-[25%] -translate-y-[25%] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.3) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
      />

      <div 
        className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 -translate-x-[25%] -translate-y-[25%] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.25) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
      />

      <div 
        className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 translate-x-[25%] translate-y-[25%] opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.3) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
      />

      <div 
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 -translate-x-[25%] translate-y-[25%] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.25) 0%, rgba(var(--accent-primary-rgb), 0) 70%)",
          filter: "blur(70px)",
        }}
      />
    </>
  );
}
