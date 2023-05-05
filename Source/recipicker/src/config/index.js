import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4001/api",
  baseURL: "https://recipicker-backend.vercel.app/api",
});
