import { WebSocketServer, WebSocket } from "ws";

interface WSClient extends WebSocket {
  device?: string | undefined;
}

class WSServer {
  private wss: WebSocketServer;
  private clients = new Set<WSClient>();

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws: WSClient, req) => {
      const params = new URLSearchParams(req.url?.split("?")[1]);
      ws.device = params.get("device") || undefined;

      this.clients.add(ws);

      ws.on("close", () => {
        this.clients.delete(ws);
      });
    });
  }

  broadcast(payload: any) {
    const message = JSON.stringify(payload);

    for (const client of this.clients) {
      if (
        client.readyState === WebSocket.OPEN &&
        (!client.device || client.device === payload.device)
      ) {
        client.send(message);
      }
    }
  }
}

export default WSServer;
