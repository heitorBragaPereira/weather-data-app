import { useEffect, useRef, useState } from "react";
import { connectWS, closeWS } from "../services/ws";
import { LiveReading } from "../interfaces/socket";

export function useLiveReading(device: string) {
  const [reading, setReading] = useState<LiveReading | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = connectWS(device);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data: LiveReading = JSON.parse(event.data);
        if (data.type === "reading") {
          setReading(data);
        }
      } catch (err) {
        console.warn("Mensagem WS inválida:", err);
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setConnected(false);
    };

    return () => {
      closeWS();
    };
  }, [device]);

  return { reading, connected };
}
