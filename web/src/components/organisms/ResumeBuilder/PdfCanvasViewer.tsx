// components/PdfCanvasViewer.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";            // if your bundler supports it
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

interface Props {
  blob: Blob | null;
  initialScale?: number;
}

const PdfCanvasViewer: React.FC<Props> = ({ blob, initialScale = 2 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages]     = useState(0);
  const [scale] = useState(initialScale);

  /* ───────── render current page ───────── */
  useEffect(() => {
    if (!blob) return;

    (async () => {
      const data = await blob.arrayBuffer();
      const pdf  = await pdfjsLib.getDocument({ data }).promise;

      // Save total once (or when blob changes)
      setNumPages(pdf.numPages);

      // Clamp pageNumber if blob replaced with different length
      const safePage = Math.min(pageNumber, pdf.numPages);

      const page = await pdf.getPage(safePage);
      const viewport = page.getViewport({ scale });

      const canvas  = canvasRef.current!;
      const context = canvas.getContext("2d")!;

      canvas.height = viewport.height;
      canvas.width  = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    })();
  }, [blob, pageNumber, scale]);

  /* ───────── navigation handlers ───────── */
  const prevPage = useCallback(() => setPageNumber((p) => Math.max(1, p - 1)), []);
  const nextPage = useCallback(
    () => setPageNumber((p) => Math.min(numPages, p + 1)),
    [numPages]
  );

  /* ───────── optional zoom controls ─────── */
//   const zoomIn  = () => setScale((s) => s + 1);
//   const zoomOut = () => setScale((s) => Math.max(0.4, s - 1));


  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };
  /* ───────── UI ───────── */
  return (
    <div className="inline-block border shadow p-4 w-full">
      {!blob && <p className="text-gray-500">Waiting for PDF…</p>}

      <canvas ref={canvasRef} className="mb-4 w-full" />

      {blob && (
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            ◀ Prev
          </button>

          <span>
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            Next ▶
          </button>
{/* 
          <button onClick={zoomOut} className="ml-6 px-2">－</button>
          <button onClick={zoomIn}  className="px-2">＋</button> */}
          <button
      onClick={() => downloadBlob(blob, "document.pdf")}
      className="ml-auto px-3 py-1 bg-indigo-600 text-white rounded"
    >
      Download PDF
    </button>
        </div>
      )}
    </div>
  );
};

export default PdfCanvasViewer;