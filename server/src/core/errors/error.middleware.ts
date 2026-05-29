import type { ErrorRequestHandler } from "express";
import { ERROR_CODES } from "./error-codes";
import { AppError } from "./custom-errors";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) =>{

    const isAppError = err instanceof AppError;
    
    const statusCode = isAppError ? err.statusCode: 500;
    const code = isAppError ? err.code: ERROR_CODES.INTERNAL_SERVER_ERROR;
    const message = isAppError ? err.message: "Internal server error";
  // 最后统一返回 JSON
//   res.json() 会发送 response；所以不用写return
    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
        },
    });
};    


//必须是 4 个参数，Express 才会把它识别成 error-handling middleware
// (err, req, res, next),参数名字可以改，但顺序不能乱。
// 这个 errorMiddleware 的核心作用就是：
// 判断这个 error 是不是我们自己定义的 AppError，如果是就用它自带的信息；如果不是，就给它一套兜底的默认错误信息。