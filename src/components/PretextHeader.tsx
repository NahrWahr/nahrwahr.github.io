import { useRef, useEffect } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

export default function PretextHeader({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const fontSize = 48;
    const fontFamily = 'Orbitron';
    const font = `${fontSize}px ${fontFamily}`;

    const prepared = prepareWithSegments(text, font);
    const { height, lines } = layoutWithLines(prepared, width, fontSize * 1.2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.font = font;
    ctx.fillStyle = '#e0e2d5';
    ctx.textBaseline = 'top';

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].text, 0, i * (fontSize * 1.2));
    }
  }, [text]);

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto 2rem' }} />;
}
