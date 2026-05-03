import { io } from "socket.io-client";
import BASE_URL from "../config";

const socket = io(BASE_URL, {
  transports: ["websocket"],   // 🔥 FORCE WEBSOCKET
  reconnection: true,          // 🔥 auto reconnect
  reconnectionAttempts: 5,
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

export default socket;