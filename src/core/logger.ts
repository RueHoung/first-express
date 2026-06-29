import pino from "pino";

// 判斷是否為開發環境
const isDevelopment = process.env.NODE_ENV !== "production";

// 建立 logger 實例
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined, // 生產環境直接輸出 JSON
});

export default logger;