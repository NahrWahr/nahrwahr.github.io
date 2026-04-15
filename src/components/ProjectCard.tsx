import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { prepareWithSegments, layoutNextLine, clearCache } from '@chenglou/pretext';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
}

export default function ProjectCard({ title, description, link, imageUrl }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;



    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const fontSize = 18;
      const lineHeight = 1.6 * fontSize;
      const fontFamily = '"Lora", serif';
      const font = `${fontSize}px ${fontFamily}`;

      const imgWidth = imageUrl ? 200 : 0;
      const imgHeight = imageUrl ? 150 : 0;
      const imgMargin = 20;

      const prepared = prepareWithSegments(description, font);

      // Calculate height
      let tempY = 0;
      let tempCursor = { segmentIndex: 0, graphemeIndex: 0 };

      while (true) {
        const isBesideImage = imageUrl && tempY < (imgHeight + imgMargin);
        const allowedWidth = isBesideImage ? (width - imgWidth - imgMargin) : width;

        const line = layoutNextLine(prepared, tempCursor, allowedWidth);
        if (line === null) break;
        tempCursor = line.end;
        tempY += lineHeight;
      }

      const height = Math.max(tempY, imgHeight + imgMargin);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      ctx.textBaseline = 'top';
      ctx.font = font;
      ctx.fillStyle = '#e0e2d5';

      // Draw text
      let y = 0;
      let cursor = { segmentIndex: 0, graphemeIndex: 0 };

      while (true) {
        const isBesideImage = imageUrl && y < (imgHeight + imgMargin);
        const allowedWidth = isBesideImage ? (width - imgWidth - imgMargin) : width;

        const line = layoutNextLine(prepared, cursor, allowedWidth);
        if (line === null) break;

        ctx.fillText(line.text, 0, y);
        cursor = line.end;
        y += lineHeight;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });
    resizeObserver.observe(container);

    document.fonts.ready.then(() => {
      clearCache();
      draw();
    });

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [description, imageUrl]);

  return (
    <div className="project-item">
      <h3>
        {title}
      </h3>
      <div className="project-card-body">
        <canvas ref={canvasRef} style={{ display: 'block' }} />
        {imageUrl && (
          <img
            src={imageUrl.startsWith('/') ? `${import.meta.env.BASE_URL}${imageUrl.slice(1)}` : imageUrl}
            alt={`${title} preview`}
            className="project-card-img"
          />
        )}
      </div>
      <br />
      <Link to={link}>View Details ➝</Link>
    </div>
  );
}
