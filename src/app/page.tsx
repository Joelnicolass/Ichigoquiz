"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useState } from "react";
import Intro from "@/components/Intro";
import QuestionView from "@/components/QuestionView";
import Charging from "@/components/Charging";
import Result from "@/components/Result";
import { Burst, Flash, SpeedLines, vibrate } from "@/components/fx";
import { CHARACTERS, QUESTIONS, computeResult, type CharacterId, type Option } from "@/lib/data";

type Phase = "intro" | "quiz" | "charging" | "result";
type Hit = { id: number; text: string; x: number; y: number };

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Partial<Record<CharacterId, number>>>({});
  const [result, setResult] = useState<CharacterId | null>(null);
  const [hit, setHit] = useState<Hit | null>(null);
  const [flash, setFlash] = useState(0);
  const shake = useAnimationControls();

  const leader = computeLeader(scores);
  const accent = result ? CHARACTERS[result].color : leader ? CHARACTERS[leader].color : "#1ce783";

  function start() {
    vibrate(30);
    setScores({});
    setIndex(0);
    setResult(null);
    setPhase("quiz");
  }

  function answer(opt: Option, point: { x: number; y: number }) {
    const next = { ...scores };
    for (const [k, v] of Object.entries(opt.points) as [CharacterId, number][]) next[k] = (next[k] ?? 0) + v;
    setScores(next);
    setHit({ id: Date.now(), text: opt.sfx, x: point.x, y: point.y });
    shake.start({ x: [0, -10, 9, -6, 4, 0], y: [0, 6, -4, 3, 0], transition: { duration: 0.35 } });

    // Timing: dejamos respirar el impacto antes de pasar de cuadro.
    setTimeout(() => {
      if (index + 1 < QUESTIONS.length) {
        setIndex(index + 1);
      } else {
        setResult(computeResult(next));
        setPhase("charging");
      }
    }, 720);
  }

  const reveal = useCallback(() => {
    setFlash((f) => f + 1);
    setPhase("result");
  }, []);

  return (
    <motion.main
      className="app"
      animate={shake}
      style={{ ["--accent" as string]: accent }}
    >
      <div className="grid-bg" />
      <motion.div className="halftone" animate={{ opacity: phase === "result" ? 0.3 : 0.18 }} />
      <SpeedLines speed={phase === "charging" ? 4 : phase === "result" ? 20 : 80} opacity={phase === "quiz" ? 0.5 : 1} />

      <AnimatePresence mode="wait">
        {phase === "intro" && <Intro key="intro" onStart={start} />}
        {phase === "quiz" && (
          <QuestionView key={`q-${QUESTIONS[index].id}`} q={QUESTIONS[index]} index={index} total={QUESTIONS.length} onAnswer={answer} />
        )}
        {phase === "charging" && result && <Charging key="charging" color={CHARACTERS[result].color} onDone={reveal} />}
        {phase === "result" && result && <Result key="result" c={CHARACTERS[result]} onRetry={start} />}
      </AnimatePresence>

      <AnimatePresence>{hit && phase === "quiz" && <Burst key={hit.id} text={hit.text} color={accent} x={hit.x} y={hit.y} />}</AnimatePresence>
      {flash > 0 && <Flash key={flash} />}
    </motion.main>
  );
}

function computeLeader(scores: Partial<Record<CharacterId, number>>): CharacterId | null {
  let best: CharacterId | null = null;
  let max = 0;
  for (const [k, v] of Object.entries(scores) as [CharacterId, number][]) {
    if (v > max) {
      max = v;
      best = k;
    }
  }
  return best;
}
