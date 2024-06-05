// export const API_URL = "http://localhost:5000";

export const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4001";
