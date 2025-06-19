// useSocket.ts
import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

/* ──────────────────────────────────────────────────────────
   1) Event‑maps: customise these if you want stricter typing
─────────────────────────────────────────────────────────── */
interface ServerToClientEvents {
  "server:data": (payload: ArrayBuffer) => void;
}

interface ClientToServerEvents {
  "client:data": (payload: unknown) => void;
}

/* ──────────────────────────────────────────────────────────
   2) Hook
─────────────────────────────────────────────────────────── */
export default function useSocket<T = any>(
  onServerData: (payload: any) => void
) {
  // keep the live socket instance
  const socketRef = useRef<
    Socket<ServerToClientEvents, ClientToServerEvents> | null
  >(null);

  useEffect(() => {
    // ➊ connect
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:4000"
    );
    socketRef.current = socket;

    // ➋ listen for server pushes
    socket.on("server:data", (buf) => {
      // onServerData(payload as T)
      const blob = new Blob([buf as any], { type: "application/pdf" });
      onServerData(blob);
    });

    // ➌ cleanup
    return () => {
      socket.off("server:data", (payload) => onServerData(payload as T));
      socket.disconnect();
    };
  }, [onServerData]);

  /* helper that callers can use: emit JSON to the back end */
  const send = useCallback((data: T) => {
    socketRef.current?.emit("client:data", data);
  }, []);

  return send; // usage: const send = useSocket(cb); send(myObj);
}
