"use client";

import { motion, type Variants } from "framer-motion";
import { Marquee, Menacing } from "./fx";

const slam: Variants = {
  hidden: { scale: 2.6, opacity: 0, rotate: -6, y: -20 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { delay: 0.25 + i * 0.16, type: "spring", stiffness: 520, damping: 16, mass: 0.9 },
  }),
};

export default function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      style={{ display: "flex", flexDirection: "column", height: "100%", gap: 16 }}
      exit={{ opacity: 0, scale: 1.4, filter: "blur(6px)", transition: { duration: 0.35, ease: "easeIn" } }}
    >
      <motion.header
        className="topbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="label">
          ICHIGO<span className="neon">QUIZ</span>
        </span>
        <span className="chip label">
          <motion.span className="dot" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          REIATSU ONLINE
        </span>
      </motion.header>

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Menacing style={{ right: 8, top: "4%" }} />
        <Menacing style={{ right: 44, top: "12%", fontSize: 26 }} delay={0.3} />
        <Menacing style={{ right: 4, top: "20%", fontSize: 20 }} delay={0.6} />

        <motion.p
          className="label"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 22 }}
        >
          <span className="neon">//</span> EP.00 — EL DESPERTAR
        </motion.p>

        <h1 className="display" style={{ fontSize: "clamp(64px, 22vw, 108px)" }}>
          {["¿QUÉ", "PERSO-", "NAJE", "SOS?"].map((w, i) => (
            <motion.span
              key={w}
              custom={i}
              variants={slam}
              initial="hidden"
              animate="show"
              className={i === 1 ? "stroke" : i === 3 ? "neon" : undefined}
              style={{ display: "block", transformOrigin: "left center" }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.95, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{ height: 6, background: "var(--accent)", transformOrigin: "left", margin: "18px 0" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ fontSize: 14, lineHeight: 1.5, maxWidth: 330, opacity: 0.85 }}
        >
          8 preguntas. 8 almas posibles. Tu reiatsu no miente: descubrí qué personaje de{" "}
          <b className="neon">Bleach</b> llevás adentro.
        </motion.p>

        <motion.span
          className="jp"
          aria-hidden
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.08, rotate: -12 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ position: "absolute", right: -30, bottom: -10, fontSize: 200, lineHeight: 1, zIndex: -1 }}
        >
          卍解
        </motion.span>
      </div>

      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.25, type: "spring", stiffness: 260, damping: 18 }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <motion.button
          className="btn"
          onClick={onStart}
          // Anticipación + squash: se comprime al tocar, se estira al soltar.
          whileTap={{ scaleY: 0.82, scaleX: 1.06, x: 6, y: 6, boxShadow: "0px 0px 0 #f4f4f0" }}
          animate={{ rotate: [0, -1.2, 1.2, 0] }}
          transition={{ rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 2.4 } }}
        >
          <span>¡BANKAI!</span>
          <span className="jp" style={{ fontSize: 20 }}>
            卍解 →
          </span>
        </motion.button>
        <Marquee text="SHINIGAMI · ARRANCAR · QUINCY · ESPADA · CAPITANES · HOLLOWS" />
      </motion.div>
    </motion.section>
  );
}
