import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const CANVAS_W = 720;
const CANVAS_H = 400;

type Point = { x: number; y: number };

/**
 * A golden foil layer painted on a canvas that the guest scratches away
 * (finger or mouse) to reveal the invitation details underneath.
 */
export function ScratchCard({
  children,
  className = "",
  brushRadius = 26,
}: {
  children: ReactNode;
  className?: string;
  brushRadius?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const moveCountRef = useRef(0);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Paint the golden foil once, on mount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const W = canvas.width;
    const H = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);

    // Brushed-gold base.
    const base = ctx.createLinearGradient(0, 0, W, H);
    base.addColorStop(0, "#b98a4e");
    base.addColorStop(0.22, "#e8c987");
    base.addColorStop(0.45, "#c9955a");
    base.addColorStop(0.68, "#eed9a1");
    base.addColorStop(0.86, "#c08e50");
    base.addColorStop(1, "#b07f44");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);

    // Diagonal sheen stripes.
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = "#ffffff";
    for (let x = -H; x < W + H; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 12, 0);
      ctx.lineTo(x + 12 - H, H);
      ctx.lineTo(x - H, H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Glimmering specks.
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.6 + 0.4;
      ctx.globalAlpha = Math.random() * 0.45 + 0.15;
      ctx.fillStyle =
        Math.random() > 0.4 ? "rgba(255,255,255,0.9)" : "rgba(110,70,20,0.5)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Call to action.
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(60,35,10,0.35)";
    ctx.font = "600 30px 'Fira Sans', sans-serif";
    ctx.fillText("Scratch to reveal", W / 2 + 2, H / 2 - 12 + 2);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "600 30px 'Fira Sans', sans-serif";
    ctx.fillText("Scratch to reveal", W / 2, H / 2 - 12);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "italic 400 17px 'Fira Sans', sans-serif";
    ctx.fillText("the wedding date & venue", W / 2, H / 2 + 26);
  }, []);

  const toCanvasPoint = (e: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const scratchLine = useCallback(
    (from: Point, to: Point) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [brushRadius],
  );

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || revealedRef.current) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.5) {
      revealedRef.current = true;
      setRevealed(true);
    }
  }, []);

  const endScratch = useCallback(() => {
    drawingRef.current = false;
    lastPointRef.current = null;
    checkProgress();
  }, [checkProgress]);

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = toCanvasPoint(e);
    lastPointRef.current = p;
    scratchLine(p, p);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealedRef.current) return;
    const p = toCanvasPoint(e);
    const last = lastPointRef.current ?? p;
    scratchLine(last, p);
    lastPointRef.current = p;
    // Sample scratched area periodically, not on every frame.
    moveCountRef.current += 1;
    if (moveCountRef.current % 10 === 0) checkProgress();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0">{children}</div>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ touchAction: "none", cursor: revealed ? "default" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endScratch}
        onPointerCancel={endScratch}
        aria-label="Golden scratch card — scratch to reveal the wedding date and venue"
      />
    </div>
  );
}
