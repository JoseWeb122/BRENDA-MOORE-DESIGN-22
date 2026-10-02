import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * A restrained gold cursor follower for fine-pointer devices.
 * The native cursor remains visible at all times, so usability is
 * never affected. Disabled entirely for touch input and reduced motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const el = event.target as HTMLElement | null;
      const interactive = Boolean(
        el?.closest('a, button, input, select, textarea, [role="button"], [data-cursor="hover"]'),
      );
      ring.dataset.active = interactive ? "true" : "false";
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(loop);
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-active="false" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
