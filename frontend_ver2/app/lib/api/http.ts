import axios from "axios";

const DEFAULT_API_BASE_URL = "http://localhost:8090";

export const http = axios.create({
  baseURL: DEFAULT_API_BASE_URL,
});