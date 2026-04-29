import { io } from "socket.io-client";
import BASE_URL from "../config";
const socket = io(BASE_URL);

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

export default socket;