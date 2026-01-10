import axios from "axios";

export async function sendMessage(userId, message) {
  const res = await axios.post("http://localhost:5000/chat", {
    userId,
    message
  });
  return res.data.reply;
}
