"use client";

import { motion } from "framer-motion";

/** Líneas de velocidad estilo manga girando lento detrás de todo. */
export function SpeedLines({ speed = 60, opacity = 1 }: { speed?: number; opacity?: number }) {
  return (
    <motion.div
      className="speedlines"
      style={{ opacity }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    />
  );
}

/** Estrella de impacto de cómic con onomatopeya. */
export function Burst({
  text,
  color = "#ffe500",
  size = 180,
  x = 0,
  y = 0,
}: {
  text: string;
  color?: string;
  size?: number;
  x?: number;
  y?: number;
}) {
  const spikes = 14;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 30 + ((i * 7) % 9);
    const a = (Math.PI * i) / spikes;
    pts.push(`${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`);
  }
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        zIndex: 50,
        pointerEvents: "none",
      }}
      // Exageración + squash & stretch: aparece enorme, se aplasta y rebota.
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: [0, 1.35, 0.9, 1.05, 1], rotate: [-30, 8, -3, 0, 0], opacity: [1, 1, 1, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.2, 0.4, 0.8, 1], ease: "easeOut" }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
        <polygon points={pts.join(" ")} fill={color} stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span
        className="jp"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: size / (text.length > 3 ? 6.2 : 4.2),
          color: "#0a0a0a",
          transform: "rotate(-8deg)",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/** Flash blanco de impacto a pantalla completa. */
export function Flash({ color = "#fff" }: { color?: string }) {
  return (
    <motion.div
      aria-hidden
      style={{ position: "absolute", inset: 0, background: color, zIndex: 60, pointerEvents: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.45, times: [0, 0.15, 1] }}
    />
  );
}

/** "ゴゴゴゴ" amenazante flotando (referencia JoJo). */
export function Menacing({ style, delay = 0 }: { style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className="jp"
      style={{ position: "absolute", fontSize: 34, color: "#b26bff", WebkitTextStroke: "1.5px #0a0a0a", ...style }}
      animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.12, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      ゴ
    </motion.span>
  );
}

export function Marquee({ text, duration = 14 }: { text: string; duration?: number }) {
  const chunk = `${text}  ✦  `.repeat(6);
  return (
    <div className="marquee">
      <motion.div
        className="display"
        style={{ display: "flex", fontSize: 20, padding: "6px 0" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <span>{chunk}</span>
        <span>{chunk}</span>
      </motion.div>
    </div>
  );
}

export function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {}
}
