const isDevelopment = process.env.NODE_ENV === "development";

export const server = isDevelopment
  ? "http://localhost:3000"
  : `${process.env.VERCEL_URL}`;
