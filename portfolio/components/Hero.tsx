"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { CvButton, Socials, Portrait } from "./ui";

const nodes = [[60, 60], [60, 150], [60, 240], [190, 100], [190, 200], [320, 60], [320, 150], [320, 240], [440, 150]];
const edges = [[0,3],[1,3],[1,4],[2,4],[3,5],[3,6],[4,6],[4,7],[5,8],[6,8],[7,8]];

export default function Hero() {
  const reduce = useReducedMotion();
  const a = (d: number) => reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } };
  return (
    <section className="wrap grid items-center gap-12 pb-16 pt-16 lg:grid-cols-2 lg:pt-24">
      <div>
        <motion.p {...a(0)} className="inline-block rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent">{site.availability}</motion.p>
        <motion.h1 {...a(0.08)} className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Building AI solutions for real-world problems.</motion.h1>
        <motion.p {...a(0.16)} className="mt-5 max-w-xl text-slate-400">I'm Sarra Ben Bettaieb, a final-year Data Science &amp; AI engineering student at Tek-Up University. I build practical AI applications across machine learning, NLP, RAG systems, and intelligent automation.</motion.p>
        <motion.div {...a(0)} className="flex flex-wrap items-center gap-4">
          <Portrait size={72} />
          <p className="rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent">{site.availability}</p>
        </motion.div>
        <div className="mt-6"><Socials /></div>
      </div>
      <svg viewBox="0 0 500 300" role="img" aria-label="Diagram of connected nodes representing a neural network feeding one output" className="w-full rounded-lg border border-slate-700/70 bg-card/60 p-3">
        {edges.map(([x, y], i) => <line key={i} x1={nodes[x][0]} y1={nodes[x][1]} x2={nodes[y][0]} y2={nodes[y][1]} stroke="#3B82F6" strokeOpacity={0.35} />)}
        {nodes.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={i === 8 ? 12 : 8} fill={i === 8 ? "#3B82F6" : "#0F172A"} stroke="#3B82F6" strokeWidth={2} />)}
        <text x="30" y="285" fill="#94A3B8" fontSize="11" fontFamily="monospace">data → embeddings → model → product</text>
      </svg>
    </section>
  );
}
