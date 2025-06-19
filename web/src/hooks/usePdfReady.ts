// hooks/usePdfReady.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function usePdfReady() {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socketRef.current = socket;

    socket.on("pdf:ready", (data: ArrayBuffer) => {
      const blob = new Blob([data], { type: "application/pdf" });
      setPdfBlob(blob);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return { pdfBlob };
}
