/* SocketProvider.tsx */
import { createContext, useContext, useState } from "react";
import useSocket from "@/hooks/useSocket";

type SocketCtx = { send: (d: unknown) => void; last: unknown };
const Ctx = createContext<SocketCtx | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [last, setLast] = useState<unknown>(null);
  const send = useSocket(setLast);          // share one connection
  return <Ctx.Provider value={{ send, last }}>{children}</Ctx.Provider>;
}

export const useSocketCtx = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Wrap your tree in <SocketProvider>");
  return ctx;
}
