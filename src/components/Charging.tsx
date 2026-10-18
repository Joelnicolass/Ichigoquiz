"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { vibrate } from "./fx";

const LINES = ["Leyendo tu reiatsu…", "Consultando al Gotei 13…", "Abriendo el Garganta…", "¡¿QUÉ?! ¡ES DE MÁS DE 9000!"];

export default function Charging({ color, onDone }: { color: string; onDone: () => void }) {
  const power = useMotionValue(0);
  const rounded = useTransform(power, (v) => Math.round(v).toLocaleString("es-AR"));
  const width = useTransform(power, [0, 9001], ["0%", "100%"]);
  const [line, setLine] = useState(0);

  useEffect(() => {
    // Slow in / slow out: la barra arranca lenta, acelera y frena antes del pico.
    const ctrl = animate(power, 9001, { duration: 2.6, ease: [0.7, 0, 0.3, 1] });
    const timers = [650, 1300, 2000].map((t, i) => setTimeout(() => setLine(i + 1), t));
    const end = setTimeout(() => {
      vibrate([60, 40, 120]);
      onDone();
    }, 2900);
    vibrate([10, 90, 10, 90, 10, 90, 20]);
    return () => {
      ctrl.stop();
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, [power, onDone]);

  return (
    <motion.section
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 20 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: [0, -2, 3, -3, 2, -4, 4, -5, 5, 0] }}
      transition={{ x: { duration: 2.6, ease: "easeIn" }, default: { duration: 0.3 } }}
      exit={{ scale: 3, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
    >
      <p className="label">
        <span className="neon">//</span> ESCANEO ESPIRITUAL
      </p>

      <motion.div
        className="display"
        style={{ fontSize: "clamp(70px, 24vw, 120px)", color }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 0.25, repeat: Infinity }}
      >
        <motion.span>{rounded}</motion.span>
      </motion.div>

      <div className="stat-bar" style={{ height: 28, borderWidth: 3 }}>
        <motion.div style={{ width, background: color }} />
      </div>

      <motion.p
        key={line}
        className="comic"
        initial={{ y: 20, opacity: 0, rotate: -3 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        style={{ fontSize: line === 3 ? 34 : 26, color: line === 3 ? color : undefined }}
      >
        {LINES[line]}
      </motion.p>

      <motion.span
        aria-hidden
        className="jp"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ fontSize: 64, alignSelf: "flex-end", color }}
      >
        ドドドド
      </motion.span>
    </motion.section>
  );
}
