export * from "./error-codes";
export * from "./custom-errors";
export * from "./error.middleware";

// Barrel : 用一个 index.ts 文件，把一个 folder 里的多个 export 统一集中导出。
// 这样不需要：
// import { errorMiddleware } from "./core/errors/error.middleware";
// import { NotFoundError } from "./core/errors/custom-errors";
// import { ERROR_CODES } from "./core/errors/error-codes";
// 可以直接
// import { errorMiddleware, NotFoundError, ERROR_CODES } from "./core/errors";


