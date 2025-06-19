// hooks/useHtml2Pdf.ts
import { useCallback } from 'react';

export const useHtml2Pdf = () => {
  return useCallback(
    async (element: HTMLElement, filename = 'document.pdf') => {
      const html2pdf = (await import('html2pdf.js')).default; // dynamic import → no SSR crash

      await html2pdf()
        .set({
          margin: 0.5,
          filename,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        })
        .from(element)
        .save();
    },
    []
  );
};
