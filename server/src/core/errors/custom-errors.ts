import { ERROR_CODES, type ErrorCode } from "./error-codes";
//define what is ERROR

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCode;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode = 500, //if no status code, set to 500 as default
        code: ErrorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
        isOperational = true,
    ){
        super(message);
        //子类
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

// super(message) 的讲解
// Error 是父类：负责创建“错误对象”的基础结构
// AppError 是子类：在基础错误对象上加 statusCode / code
// super(message); // 先让 Error 创建基础部分
// this.statusCode = statusCode; // 再添加 AppError 自己的部分
// this.code = code;
// this.isOperational = isOperational;


// 把常见的 AppError 再封装一下，让你 throw error 的时候更简单、更统一
// 原本： throw new AppError("Todo not found", 404, ERROR_CODES.NOT_FOUND);
// now: throw new NotFoundError("Todo not found");

export class NotFoundError extends AppError {
    constructor(message = "Resource not found"){
        super(message,404, ERROR_CODES.NOT_FOUND);
    }
}
export class BadRequestError extends AppError {
    constructor(message = "Bad request"){
        super(message,400, ERROR_CODES.BAD_REQUEST);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized"){
        super(message,401, ERROR_CODES.UNAUTHORIZED);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden"){
        super(message,403, ERROR_CODES.FORBIDDEN);
    }
}
