/**
 * HandScrollController v4 — Fast & Correctly Mirrored
 *
 * Fixes vs v3:
 *   1. Mirror bug: the input frame is now horizontally flipped BEFORE being
 *      sent to MediaPipe (mirrors Python's cv2.flip(frame, 1)). All landmark
 *      coords therefore arrive in the same coordinate space the user sees,
 *      so the skeleton, fingertip dot, and fingersUp() thumb test all line
 *      up with the displayed image.
 *
 *   2. Performance:
 *        - modelComplexity: 0  (lite model — same as Python's model_complexity=0)
 *        - No per-frame React re-renders. Cursor + status badge are mutated
 *          via refs to plain DOM nodes; setStatus is only called on actual
 *          state transitions (idle → scroll, scroll → move, etc.).
 *        - Camera resolution capped at 480×360 (the model down-samples
 *          internally anyway — extra pixels are wasted work).
 *        - Skeleton drawing is optional (DRAW_SKELETON flag).
 *
 * Public API is unchanged: default export, no props.
 *
 * Gestures (matches Python hand_controller.py):
 *   Index up only      → move (highlights cursor only, no scroll)
 *   Pinch              → click on the element under the cursor
 *   2 fingers up       → toggle pause
 *   All fingers up    → scroll (anchor-based, 1:1 with acceleration)
 *   Fist               → drag-scroll (locked anchor while fist is held)
 */

import { useEffect, useRef, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

// ─── Tuning (mirrors Python defaults) ────────────────────────────────────────
const SPEED = 1.8;
const SMOOTHING = 0.22;
const ACCELERATION = 1.4;
const PINCH_CLICK = 0.048;
const PINCH_FRAMES = 3;
const CLICK_CD = 700;
const SCROLL_BUF = 6;
const DEAD_ZONE = 0.012;
const DRAW_SKELETON = true;          // flip to false for an even faster preview

// Lower internal resolution → less work per frame. Display size is independent.
const W = 480, H = 360;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const dist = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);

/** Returns [thumb, idx, mid, ring, pinky] booleans.
 *  NOTE: works on landmarks coming from the FLIPPED frame, exactly like
 *  Python's fingers_up(lm) helper. */
function fingersUp(lm: any[]) {
  const up = [lm[4].x < lm[3].x];
  for (const [tip, pip] of [[8, 6], [12, 10], [16, 14], [20, 18]]) {
    up.push(lm[tip].y < lm[pip].y - 0.015);
  }
  return up;
}

const rawToNorm = (v: number, m = 0.08) =>
  Math.max(0, Math.min(1, (v - m) / (1 - 2 * m)));

// ─── Component ───────────────────────────────────────────────────────────────
export default function HandScrollController() {
  const [active, setActive] = useState(false);
  // status is only used for the badge text + colour — flips on transitions only
  const [status, setStatus] = useState('idle');

  // refs (no re-render)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // visible preview
  const flipCanvasRef = useRef<HTMLCanvasElement | null>(null); // hidden — flipped frame fed to MediaPipe
  const cursorRef = useRef<HTMLDivElement | null>(null);
  // floating dot DOM node
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  // smooth cursor state (normalised 0–1)
  const smX = useRef(0.5);
  const smY = useRef(0.5);
  const prevRX = useRef(0.5);
  const prevRY = useRef(0.5);

  // scroll anchor state
  const scrollAnchor = useRef<number | null>(null);
  const scrollPageAnchor = useRef<number | null>(null);

  // pinch state
  const pinchCount = useRef(0);
  const wasPinching = useRef(false);
  const lastClick = useRef(0);

  // fist / drag state
  const wasFist = useRef(false);
  const dragAnchorY = useRef<number | null>(null);
  const dragScrollAnchor = useRef<number | null>(null);

  // pause toggle
  const paused = useRef(false);
  const lastTwoUp = useRef(false);

  // throttle setStatus → only fire on transitions
  const lastStatusRef = useRef('idle');
  const setStatusIfChanged = (s: string) => {
    if (lastStatusRef.current !== s) {
      lastStatusRef.current = s;
      setStatus(s);
    }
  };

  // ring buffer for scroll Y smoothing
  const scrollBuf = useRef<number[]>([]);
  function smoothedScrollY(val: number) {
    const buf = scrollBuf.current;
    buf.push(val);
    if (buf.length > SCROLL_BUF) buf.shift();
    return buf.reduce((a, b) => a + b, 0) / buf.length;
  }

  // exponential cursor smoothing (mirrors Python smooth_cursor)
  function smoothCursor(tx: number, ty: number) {
    const dPx = Math.hypot((tx - smX.current) * W, (ty - smY.current) * H);
    const alpha = dPx < 80 ? SMOOTHING : SMOOTHING * 0.3;
    smX.current += (tx - smX.current) * (1 - alpha);
    smY.current += (ty - smY.current) * (1 - alpha);
    return [smX.current, smY.current];
  }

  // direct DOM mutation for the floating cursor — NO setState
  function moveCursorDom(nx: number, ny: number, color: string) {
    const node = cursorRef.current;
    if (!node) return;
    const x = nx * window.innerWidth;
    const y = ny * window.innerHeight;
    node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    if (color) {
      node.style.borderColor = color;
      node.style.boxShadow = `0 0 12px ${color}88, 0 0 4px ${color}`;
      const dot = node.firstChild as HTMLElement;
      if (dot) dot.style.background = color;
    }
    node.style.opacity = '1';
  }
  function hideCursorDom() {
    const node = cursorRef.current;
    if (node) node.style.opacity = '0';
  }

  // pinch meter bar
  function drawPinchBar(ctx: CanvasRenderingContext2D, pinchDist: number) {
    const ratio = Math.max(0, Math.min(1, (PINCH_CLICK * 2 - pinchDist) / (PINCH_CLICK * 2)));
    const barW = Math.floor(W * ratio);
    const col = ratio >= 0.85 ? '#00e650' : '#3ca0ff';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, H - 16, W, 16);
    ctx.fillStyle = col;
    ctx.fillRect(0, H - 16, barW, 16);
    ctx.fillStyle = '#c8c8c8';
    ctx.font = '10px monospace';
    ctx.fillText('Pinch', 6, H - 4);
  }

  // small HUD label
  function drawHUD(ctx: CanvasRenderingContext2D, label: string, col: string) {
    ctx.fillStyle = 'rgba(12,12,12,0.82)';
    ctx.fillRect(0, 0, W, 32);
    ctx.fillStyle = col;
    ctx.font = 'bold 14px DM Sans, sans-serif';
    ctx.fillText(label, 8, 22);
  }

  // ── main onResults ────────────────────────────────────────────────────────
  function onResults(results: any) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Frame is ALREADY mirrored (we flipped the offscreen canvas before sending
    // it to MediaPipe), so we draw it as-is. Landmarks are in the mirrored
    // coordinate space, matching the displayed pixels.
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(results.image, 0, 0, W, H);

    let pinchDist = 1.0;

    if (!results.multiHandLandmarks?.length) {
      scrollAnchor.current = null;
      dragAnchorY.current = null;
      wasFist.current = false;
      drawPinchBar(ctx, pinchDist);
      drawHUD(ctx, 'No hand', '#3c3c3c');
      hideCursorDom();
      setStatusIfChanged('idle');
      return;
    }

    const lm = results.multiHandLandmarks[0];
    const up = fingersUp(lm);
    const idx = lm[8];
    const thb = lm[4];
    const wrist = lm[0];

    // floating cursor on screen — landmarks are already mirrored, so use idx.x
    // directly (no 1 - idx.x flip like before).
    const cursorColor = '#ffffff';
    moveCursorDom(idx.x, idx.y, cursorColor);

    pinchDist = dist(idx, thb);
    const isPinch = pinchDist < PINCH_CLICK;
    const isFist = dist(idx, wrist) < 0.25 && up.slice(1).filter(Boolean).length <= 1;
    const isAllUp = up.slice(1).filter(Boolean).length >= 4;
    const isTwoUp = up[1] && up[2] && !up[3] && !up[4] && !isFist;
    const now = Date.now();

    // skeleton (optional — costs a few ms per frame)
    if (DRAW_SKELETON) {
      drawConnectors(ctx, lm, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
      drawLandmarks(ctx, lm, { color: '#FF0000', lineWidth: 1, radius: 2 });
    }

    const fx = idx.x * W, fy = idx.y * H;
    const tx2 = thb.x * W, ty2 = thb.y * H;

    // pause toggle on rising edge
    if (isTwoUp && !lastTwoUp.current) {
      paused.current = !paused.current;
      scrollAnchor.current = null;
    }
    lastTwoUp.current = isTwoUp;

    if (paused.current) {
      const col = '#f59e0b';
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(fx, fy, 11, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(fx, fy, 3, 0, 2 * Math.PI); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx2, ty2); ctx.stroke();
      drawPinchBar(ctx, pinchDist);
      drawHUD(ctx, 'Paused', col);
      moveCursorDom(idx.x, idx.y, col);
      setStatusIfChanged('paused');
      return;
    }

    const [, smNY] = smoothCursor(rawToNorm(idx.x), rawToNorm(idx.y));

    // ── SCROLL (all fingers up) ────────────────────────────────────────────
    if (isAllUp && !isPinch) {
      const col = '#00d4ff';
      const smoothY = smoothedScrollY(smNY);

      // acceleration: large dy → bigger boost (mirrors Python)
      const dy = Math.abs(smNY - prevRY.current);
      prevRY.current = smNY;

      if (scrollAnchor.current === null) {
        scrollAnchor.current = smoothY;
        scrollPageAnchor.current = window.scrollY;
      } else {
        const delta = smoothY - scrollAnchor.current;
        if (Math.abs(delta) > DEAD_ZONE) {
          const boost = 1 + dy * ACCELERATION * 4;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const target = Math.max(0, Math.min(maxScroll,
            scrollPageAnchor.current! + delta * maxScroll * SPEED * boost));
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      }
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(fx, fy, 11, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(fx, fy, 3, 0, 2 * Math.PI); ctx.fill();
      drawPinchBar(ctx, pinchDist);
      drawHUD(ctx, 'Scroll', col);
      moveCursorDom(idx.x, idx.y, col);
      setStatusIfChanged('scrolling');
      return;
    }

    scrollAnchor.current = null;

    // ── FIST / DRAG ────────────────────────────────────────────────────────
    if (isFist) {
      const col = '#00beff';
      if (!wasFist.current) {
        dragAnchorY.current = smNY;
        dragScrollAnchor.current = window.scrollY;
        wasFist.current = true;
      } else {
        const delta = smNY - dragAnchorY.current!;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const target = Math.max(0, Math.min(maxScroll,
          dragScrollAnchor.current! + delta * maxScroll * SPEED));
        window.scrollTo({ top: target, behavior: 'instant' });
      }
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(fx, fy, 11, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(fx, fy, 3, 0, 2 * Math.PI); ctx.fill();
      drawPinchBar(ctx, pinchDist);
      drawHUD(ctx, 'Drag', col);
      moveCursorDom(idx.x, idx.y, col);
      setStatusIfChanged('fist');
      return;
    }

    if (wasFist.current) {
      wasFist.current = false;
      dragAnchorY.current = null;
    }

    // ── PINCH (click) ──────────────────────────────────────────────────────
    if (isPinch) {
      pinchCount.current++;
      const pct = Math.min(pinchCount.current / PINCH_FRAMES, 1);
      const col = '#00ff64';
      const label = pct >= 1 ? 'CLICK!' : `🤏 Pinch ${Math.floor(pct * 100)}%`;

      if (pinchCount.current >= PINCH_FRAMES && !wasPinching.current) {
        if (now - lastClick.current > CLICK_CD) {
          // dispatch click on element under the cursor (idx is already mirrored)
          const el = document.elementFromPoint(
            idx.x * window.innerWidth,
            idx.y * window.innerHeight,
          );
          if (el) (el as HTMLElement).click();
          lastClick.current = now;
          wasPinching.current = true;
        }
      }
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(fx, fy, 11, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(fx, fy, 3, 0, 2 * Math.PI); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx2, ty2); ctx.stroke();
      drawPinchBar(ctx, pinchDist);
      drawHUD(ctx, label, col);
      moveCursorDom(idx.x, idx.y, col);
      setStatusIfChanged('pinch');
      return;
    }

    pinchCount.current = 0;
    wasPinching.current = false;

    // ── MOVE (default — index up only) ─────────────────────────────────────
    const col = '#ffffff';
    ctx.strokeStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(fx, fy, 11, 0, 2 * Math.PI); ctx.stroke();
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(fx, fy, 3, 0, 2 * Math.PI); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx2, ty2); ctx.stroke();
    drawPinchBar(ctx, pinchDist);
    drawHUD(ctx, 'Moving', col);
    moveCursorDom(idx.x, idx.y, col);
    setStatusIfChanged('moving');
  }

  // ── lifecycle ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) {
      cameraRef.current?.stop();
      handsRef.current = null;
      cameraRef.current = null;

      [videoRef, canvasRef, flipCanvasRef].forEach(r => {
        if (r.current?.parentNode) r.current.parentNode.removeChild(r.current);
        r.current = null;
      });

      smX.current = 0.5; smY.current = 0.5;
      prevRX.current = 0.5; prevRY.current = 0.5;
      scrollAnchor.current = null; dragAnchorY.current = null;
      pinchCount.current = 0; wasPinching.current = false;
      wasFist.current = false; paused.current = false;
      scrollBuf.current = [];
      lastStatusRef.current = 'idle';
      setStatus('idle');
      return;
    }

    setStatus('loading');
    lastStatusRef.current = 'loading';

    // hidden video element
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.style.cssText =
      'position:fixed;opacity:0;pointer-events:none;width:1px;height:1px;top:0;left:0;';
    document.body.appendChild(video);
    videoRef.current = video;

    // visible preview canvas
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = [
      'position:fixed', 'top:10px', 'left:10px',
      'width:240px', 'height:180px',
      'border-radius:12px', 'border:2px solid #C8102E',
      'z-index:2147483647',
      'background:#000', 'box-shadow:0 4px 24px rgba(0,0,0,0.6)',
    ].join(';');
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // hidden flip canvas — this is what we feed to MediaPipe so the
    // landmarks come out in mirrored (selfie-view) coordinates.
    const flipCanvas = document.createElement('canvas');
    flipCanvas.width = W;
    flipCanvas.height = H;
    flipCanvasRef.current = flipCanvas;
    const flipCtx = flipCanvas.getContext('2d');

    let destroyed = false;
    let processing = false;

    const hands = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0,    // lite model — matches Python (was 1, that was the main lag)
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);
    handsRef.current = hands;

    const camera = new Camera(video, {
      onFrame: async () => {
        if (destroyed || !handsRef.current || processing) return;
        processing = true;
        try {
          // Flip the frame horizontally → mirrored selfie view, like
          // cv2.flip(frame, 1) in Python. Then send the flipped canvas to
          // MediaPipe so all landmark coordinates are in mirror space.
          if (flipCtx) {
            flipCtx.save();
            flipCtx.translate(W, 0);
            flipCtx.scale(-1, 1);
            flipCtx.drawImage(video, 0, 0, W, H);
            flipCtx.restore();
          }
          await handsRef.current.send({ image: flipCanvas });
        } catch (_) { /* swallow during teardown */ }
        finally { processing = false; }
      },
      width: W,
      height: H,
    });

    camera.start()
      .then(() => { if (!destroyed) { setStatus('idle'); lastStatusRef.current = 'idle'; } })
      .catch(err => {
        console.error('[HandScroll] camera error', err);
        if (!destroyed) { setStatus('idle'); lastStatusRef.current = 'idle'; }
      });
    cameraRef.current = camera;

    return () => {
      destroyed = true;
      handsRef.current = null;
      camera.stop();
      setTimeout(() => { try { hands.close(); } catch (_) { } }, 200);
      [videoRef, canvasRef, flipCanvasRef].forEach(r => {
        if (r.current?.parentNode) r.current.parentNode.removeChild(r.current);
        r.current = null;
      });
    };
  }, [active]); // eslint-disable-line

  // ── colour map for the badge ──────────────────────────────────────────────
  const C: Record<string, string> = {
    idle: '#1e293b',
    loading: '#f59e0b',
    moving: '#ffffff',
    scrolling: '#00d4ff',
    pinch: '#00ff64',
    fist: '#00beff',
    paused: '#f59e0b',
  };
  const accent = C[status] ?? C.idle;

  return (
    <>
      {/* floating cursor — mounted ONCE, mutated via ref */}
      {active && (
        <div
          ref={cursorRef}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '3px solid #ffffff',
            background: 'rgba(255,255,255,0.13)',
            boxShadow: '0 0 12px #ffffff88, 0 0 4px #ffffff',
            pointerEvents: 'none',
            zIndex: 2147483646,
            opacity: 0,
            willChange: 'transform',
            transition: 'border-color .12s, box-shadow .12s, opacity .15s',
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 6, height: 6, borderRadius: '50%',
            background: '#ffffff',
            transform: 'translate(-50%, -50%)',
          }} />
        </div>
      )}

      {/* control panel */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 99998,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {active && (
          <div style={{
            background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(10px)',
            border: `1px solid ${accent}50`, borderRadius: 10,
            padding: '5px 13px', fontSize: 12, fontWeight: 700, color: accent,
            transition: 'color .2s, border-color .2s',
          }}>
            {status === 'loading' ? 'Loading…'
              : status === 'scrolling' ? 'Scrolling'
                : status === 'fist' ? 'Drag'
                  : status === 'pinch' ? 'Pinch'
                    : status === 'paused' ? 'Paused'
                      : status === 'moving' ? 'Moving'
                        : 'Ready — show your hand'}
          </div>
        )}

        {active && status === 'idle' && (
          <div style={{
            background: 'rgba(10,15,30,0.88)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14,
            padding: '12px 16px', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 2,
          }}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: 4 }}>Gestures</div>
            <div>Index up → move</div>
            <div>All fingers → scroll</div>
            <div>Fist → drag-scroll</div>
            <div>Pinch → click</div>
            <div>2 fingers → pause/resume</div>
          </div>
        )}

        <button
          onClick={() => setActive(v => !v)}
          title={active ? 'Disable hand control' : 'Enable hand control'}
          style={{
            width: 54, height: 54, borderRadius: '50%', border: 'none',
            cursor: 'pointer', fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: active
              ? `linear-gradient(135deg,${accent},${accent}99)`
              : 'linear-gradient(135deg,#1e293b,#0f172a)',
            color: '#fff',
            boxShadow: active
              ? `0 0 0 3px ${accent}40,0 8px 24px ${accent}50`
              : '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'all .2s',
          }}
        >
          {status === 'loading'
            ? <span style={{
              width: 20, height: 20,
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff', borderRadius: '50%',
              display: 'inline-block', animation: 'hs-spin .6s linear infinite',
            }} />
            : '✋'}
        </button>

        <style>{`@keyframes hs-spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </>
  );
}
