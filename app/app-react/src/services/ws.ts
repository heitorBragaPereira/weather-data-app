let socket: WebSocket | null = null;

export function connectWS(device?: string) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  const url = device
    ? `ws://192.168.4.3:8091?device=${device}`
    : `ws://192.168.4.3:8091`;

  socket = new WebSocket(url);

  return socket;
}

export function closeWS() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
