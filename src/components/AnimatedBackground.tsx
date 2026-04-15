import { useEffect, useRef } from 'react';

/**
 * Interactive signal-flow-graph mesh background.
 * A grid of nodes connected by directed edges warps toward the mouse cursor,
 * evoking the signal flow graphs used in microwave / RF network analysis.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    // --- Mesh configuration ---
    const SPACING = 70;          // base grid spacing in px
    const WARP_RADIUS = 220;     // how far the mouse influence reaches
    const WARP_STRENGTH = 35;    // max displacement in px
    const NODE_RADIUS = 2.2;
    const LINE_COLOR = 'rgba(107, 142, 107, 0.15)';
    const NODE_COLOR = 'rgba(107, 142, 107, 0.25)';
    const NODE_HIGHLIGHT = 'rgba(144, 175, 144, 0.6)';
    const ARROW_SIZE = 5;

    interface MeshNode {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      col: number;
      row: number;
    }

    let nodes: MeshNode[] = [];
    let cols = 0;
    let rows = 0;

    const buildMesh = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      cols = Math.ceil(w / SPACING) + 2;
      rows = Math.ceil(h / SPACING) + 2;
      const offsetX = ((cols - 1) * SPACING - w) / 2;
      const offsetY = ((rows - 1) * SPACING - h) / 2;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * SPACING - offsetX;
          const baseY = r * SPACING - offsetY;
          nodes.push({ baseX, baseY, x: baseX, y: baseY, col: c, row: r });
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMesh();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const getNode = (r: number, c: number): MeshNode | undefined => {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return undefined;
      return nodes[r * cols + c];
    };

    /** Draw a small arrowhead along an edge, biased toward the end node */
    const drawArrow = (
      fromX: number, fromY: number,
      toX: number, toY: number,
      color: string,
      proximity: number
    ) => {
      // Place arrow at ~65% along the line
      const t = 0.65;
      const ax = fromX + (toX - fromX) * t;
      const ay = fromY + (toY - fromY) * t;
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const size = ARROW_SIZE * (0.6 + proximity * 0.6);

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(
        ax - size * Math.cos(angle - 0.4),
        ay - size * Math.sin(angle - 0.4)
      );
      ctx.lineTo(
        ax - size * Math.cos(angle + 0.4),
        ay - size * Math.sin(angle + 0.4)
      );
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // --- Update node positions (warp toward mouse) ---
      for (const node of nodes) {
        const dx = node.baseX - mouseX;
        const dy = node.baseY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < WARP_RADIUS && dist > 0) {
          const factor = 1 - dist / WARP_RADIUS;
          // Smooth ease-out curve
          const ease = factor * factor;
          const displaceX = (dx / dist) * ease * WARP_STRENGTH;
          const displaceY = (dy / dist) * ease * WARP_STRENGTH;
          // Smooth interpolation toward target
          node.x += (node.baseX - displaceX - node.x) * 0.15;
          node.y += (node.baseY - displaceY - node.y) * 0.15;
        } else {
          // Spring back
          node.x += (node.baseX - node.x) * 0.08;
          node.y += (node.baseY - node.y) * 0.08;
        }
      }

      // --- Draw edges ---
      for (const node of nodes) {
        const { col, row } = node;

        // Right neighbor
        const right = getNode(row, col + 1);
        // Down neighbor
        const down = getNode(row + 1, col);
        // Diagonal down-right (for mesh density)
        const diagDR = getNode(row + 1, col + 1);

        const neighbors = [
          { n: right, diagonal: false },
          { n: down, diagonal: false },
          { n: diagDR, diagonal: true },
        ];

        for (const { n: neighbor, diagonal } of neighbors) {
          if (!neighbor) continue;

          // Proximity of midpoint to mouse → brightness boost
          const mx = (node.x + neighbor.x) / 2;
          const my = (node.y + neighbor.y) / 2;
          const mdx = mx - mouseX;
          const mdy = my - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const proximity = Math.max(0, 1 - mDist / (WARP_RADIUS * 1.5));

          const lineAlpha = diagonal
            ? 0.06 + proximity * 0.10
            : 0.12 + proximity * 0.15;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.strokeStyle = proximity > 0.1
            ? `rgba(139, 121, 105, ${lineAlpha})`
            : (diagonal ? `rgba(180, 158, 138, ${lineAlpha})` : LINE_COLOR);
          ctx.lineWidth = diagonal ? 0.5 : (0.7 + proximity * 0.6);
          ctx.stroke();

          // Draw directional arrowheads on non-diagonal edges near cursor
          if (!diagonal && proximity > 0.15) {
            const arrowColor = `rgba(114, 91, 72, ${0.15 + proximity * 0.25})`;
            drawArrow(node.x, node.y, neighbor.x, neighbor.y, arrowColor, proximity);
          }
        }
      }

      // --- Draw nodes ---
      for (const node of nodes) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / WARP_RADIUS);

        const radius = NODE_RADIUS + proximity * 2;
        const color = proximity > 0.2 ? NODE_HIGHLIGHT : NODE_COLOR;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow ring on close nodes
        if (proximity > 0.4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(114, 91, 72, ${proximity * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-bg"
      aria-hidden="true"
    />
  );
}
