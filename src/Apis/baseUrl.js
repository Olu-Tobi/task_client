import axios from "axios";

export default axios.create({
  baseURL: "https://task-server-gamma.vercel.app/api/v1",
});
