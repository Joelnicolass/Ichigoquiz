"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Character } from "@/lib/data";
import { saveAndGetShare } from "@/lib/supabase";
import { Burst, Marquee, vibrate } from "./fx";

export default function Result({ c, onRetry }: { c: Character; onRetry: () => void }) {
  const [share, setShare] = useState<{ percent: number; total: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    saveAndGetShare(c.id).then((r) => alive && setShare(r));
    return () => {
      alive = false;
    };
  }, [c.id]);

  async function onShare() {
    vibrate(20);
    const text = `¡Soy ${c.name} (${c.kanji})! ${c.tagline} ¿Y vos qué personaje sos?`;
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Ichigoquiz", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <motion.section
      className="scroll"
      style={{ height: "100%", margin: "0 -16px", padding: "0 16px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 60, transition: { duration: 0.3 } }}
    >
      <Burst text="ドン!" color={c.color} size={220} x={250} y={150} />

      <div className="topbar">
        <span className="label">
          RESULTADO <span style={{ color: c.color }}>■</span>
        </span>
        <span className="label" style={{ opacity: 0.7 }}>
          {c.title}
        </span>
      </div>

      {/* Staging: el personaje es lo único que importa en este cuadro. */}
      <div style={{ position: "relative", padding: "18px 0 8px", minHeight: 300 }}>
        <motion.span
          aria-hidden
          className="jp"
          // Arcos: el kanji entra describiendo una curva, no en línea recta.
          initial={{ x: 160, y: -120, rotate: 25, opacity: 0, scale: 0.4 }}
          animate={{ x: [160, 60, 0], y: [-120, 20, 0], rotate: [25, -6, 0], opacity: 1, scale: [0.4, 1.2, 1] }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            position: "absolute",
            right: -8,
            top: 0,
            fontSize: Math.min(120, Math.round(270 / c.kanji.length)),
            opacity: 0.9,
            lineHeight: 1,
            writingMode: "vertical-rl",
            color: c.color,
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "6px 6px 0 #f4f4f0",
            zIndex: 0,
          }}
        >
          {c.kanji}
        </motion.span>

        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          Tu alma es…
        </motion.p>

        <h1
          className="display"
          aria-label={c.name}
          style={{ fontSize: c.name.length > 7 ? "clamp(58px, 18vw, 84px)" : "clamp(72px, 24vw, 110px)", position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", marginTop: 6 }}
        >
          {c.name.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ y: 120, scaleY: 1.6, opacity: 0 }}
              animate={{ y: 0, scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 600, damping: 14 }}
              style={{ display: "inline-block", transformOrigin: "bottom" }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -3 }}
          transition={{ delay: 1, type: "spring", stiffness: 400, damping: 12 }}
          className="comic"
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-block",
            marginTop: 14,
            padding: "8px 14px",
            background: "#f4f4f0",
            color: "#0a0a0a",
            border: "3px solid #0a0a0a",
            boxShadow: `5px 5px 0 ${c.color}`,
            fontSize: 24,
            transformOrigin: "left",
          }}
        >
          {c.attack}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
        className="display"
        style={{ fontSize: 26, lineHeight: 1.05, color: c.color, margin: "10px 0 8px" }}
      >
        “{c.tagline}”
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25 }}
        style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}
      >
        {c.description}
      </motion.p>

      <motion.div
        className="brutal"
        style={{ padding: 16, marginTop: 22, boxShadow: `6px 6px 0 ${c.color}` }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
      >
        <p className="label" style={{ marginBottom: 12 }}>
          FICHA DE COMBATE
        </p>
        {c.stats.map((s, i) => (
          <div key={s.label} style={{ marginBottom: 10 }}>
            <div className="label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 10 }}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
            <div className="stat-bar">
              <motion.div
                style={{ width: `${s.value}%`, background: c.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1.08, 1] }}
                transition={{ delay: 1.5 + i * 0.12, duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ margin: "22px 0", display: "flex", alignItems: "baseline", gap: 10 }}
      >
        <span className="display" style={{ fontSize: 56, color: c.color }}>
          {share ? `${share.percent}%` : "··%"}
        </span>
        <span style={{ fontSize: 13, lineHeight: 1.4, opacity: 0.85 }}>
          de los jugadores también es {c.name.charAt(0) + c.name.slice(1).toLowerCase()}
          {share ? ` (${share.total.toLocaleString("es-AR")} almas analizadas)` : ""}
        </span>
      </motion.div>

      <div style={{ margin: "0 -16px 18px" }}>
        <Marquee text={`${c.name} · ${c.kanji} · ${c.attack}`} duration={10} />
      </div>

      <motion.div
        style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 12 }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
      >
        <motion.button
          className="btn"
          style={{ background: c.color }}
          onClick={onShare}
          whileTap={{ scaleY: 0.82, scaleX: 1.06, x: 6, y: 6, boxShadow: "0px 0px 0 #f4f4f0" }}
        >
          <span>{copied ? "¡COPIADO!" : "COMPARTIR"}</span>
          <span>↗</span>
        </motion.button>
        <motion.button
          className="btn ghost"
          style={{ boxShadow: `6px 6px 0 ${c.color}` }}
          onClick={onRetry}
          whileTap={{ scaleY: 0.82, scaleX: 1.06, x: 6, y: 6, boxShadow: "0px 0px 0 #f4f4f0" }}
        >
          <span>OTRA VEZ</span>
          <span>↺</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
