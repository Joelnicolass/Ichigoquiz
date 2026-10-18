"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Option, Question } from "@/lib/data";
import { vibrate } from "./fx";

type Props = {
  q: Question;
  index: number;
  total: number;
  onAnswer: (opt: Option, point: { x: number; y: number }) => void;
};

const KEYS = ["A", "B", "C", "D"];

export default function QuestionView({ q, index, total, onAnswer }: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    if (picked !== null) return;
    setPicked(i);
    vibrate([18, 30, 40]);
    const host = (e.currentTarget.closest(".app") as HTMLElement).getBoundingClientRect();
    onAnswer(q.options[i], { x: e.clientX - host.left, y: e.clientY - host.top });
  }

  return (
    <motion.section
      key={q.id}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      // Entra desde la derecha con skew (smear) y se asienta con follow-through.
      initial={{ x: "110%", skewX: -14, opacity: 0 }}
      animate={{ x: 0, skewX: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      exit={{ x: "-120%", skewX: 16, opacity: 0, transition: { duration: 0.32, ease: [0.55, 0, 1, 0.45] } }}
    >
      <header>
        <div className="topbar">
          <span className="label">
            EP.<span className="neon">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </span>
          <span className="label" style={{ opacity: 0.7 }}>
            {q.kicker}
          </span>
        </div>
        <div className="progress">
          {Array.from({ length: total }).map((_, i) => (
            <motion.span
              key={i}
              initial={false}
              animate={{
                background: i < index ? "var(--accent)" : i === index ? "#f4f4f0" : "rgba(0,0,0,0)",
                scaleY: i === index ? [1, 1.6, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 12 }}>
        <motion.span
          aria-hidden
          className="display stroke"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          style={{ fontSize: 120, lineHeight: 0.8, position: "absolute", right: 16, top: "13%", zIndex: -1 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.h2
          className="display"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 380, damping: 20 }}
          style={{ fontSize: "clamp(38px, 11vw, 54px)", lineHeight: 1, marginBottom: 22 }}
        >
          {q.question}
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const dimmed = picked !== null && !isPicked;
            return (
              <motion.button
                key={opt.text}
                className={`option${isPicked ? " selected" : ""}`}
                onClick={(e) => pick(i, e)}
                // Acción superpuesta: cada opción entra con un pequeño retraso.
                initial={{ x: 80, opacity: 0, rotate: 2 }}
                animate={
                  isPicked
                    ? { x: 0, opacity: 1, rotate: [0, -2, 1, 0], scaleX: [1, 1.08, 0.97, 1], scaleY: [1, 0.86, 1.04, 1] }
                    : dimmed
                      ? { x: 0, opacity: 0.25, rotate: 0, scale: 0.96, y: 6 }
                      : { x: 0, opacity: 1, rotate: 0 }
                }
                transition={
                  isPicked
                    ? { duration: 0.45, ease: "easeOut" }
                    : { delay: picked === null ? 0.22 + i * 0.07 : 0, type: "spring", stiffness: 420, damping: 26 }
                }
                whileTap={{ scale: 0.95, x: 5, y: 5, boxShadow: "0px 0px 0 #f4f4f0" }}
                disabled={picked !== null}
              >
                <span className="key">{KEYS[i]}</span>
                {opt.text}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
