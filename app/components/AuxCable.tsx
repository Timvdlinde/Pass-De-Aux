"use client";

import { useEffect, useRef } from "react";

/**
 * De aux-kabel: een SVG-pad dat van de hero naar de footer slingert en
 * zichtbaar "oplicht" naarmate je scrollt — de aux wordt letterlijk
 * doorgegeven van sectie naar sectie.
 */
export default function AuxCable() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sleeveRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const liveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const sleeve = sleeveRef.current;
    const glow = glowRef.current;
    const live = liveRef.current;
    if (!wrap || !svg || !sleeve || !glow || !live) return;

    let length = 0;
    let raf = 0;

    const build = () => {
      if (getComputedStyle(wrap).display === "none") return;
      const h = wrap.offsetHeight;
      const w = wrap.offsetWidth;
      if (!h || !w) return;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.style.height = `${h}px`;

      const startY = Math.min(window.innerHeight * 0.92, 900);
      const endY = h - 260;
      const seg = 700;
      const zwaai = Math.min(w * 0.36, 520);
      const mid = w / 2;

      let d = `M ${mid} ${startY}`;
      let side = 1;
      for (let y = startY; y < endY; ) {
        const next = Math.min(y + seg, endY);
        const span = next - y;
        d += ` C ${mid + zwaai * side} ${y + span * 0.4}, ${
          mid + zwaai * side
        } ${next - span * 0.4}, ${mid} ${next}`;
        side *= -1;
        y = next;
      }

      for (const p of [sleeve, glow, live]) p.setAttribute("d", d);
      length = live.getTotalLength();
      glow.style.strokeDasharray = `${length}`;
      live.style.strokeDasharray = `${length}`;
      update();
    };

    const update = () => {
      if (!length) return;
      const total = document.documentElement.scrollHeight;
      const progress = Math.min(
        1,
        (window.scrollY + window.innerHeight * 0.85) / total,
      );
      const offset = length * (1 - progress);
      glow.style.strokeDashoffset = `${offset}`;
      live.style.strokeDashoffset = `${offset}`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", build);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="aux-cable" aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <path ref={sleeveRef} className="cable-sleeve" />
        <path ref={glowRef} className="cable-glow" />
        <path ref={liveRef} className="cable-live" />
      </svg>
    </div>
  );
}
