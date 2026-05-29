// 给整个后端建立一套“统一描述错误”的语言。Express 默认只认识 Error，但普通 Error 信息太少
// 约定俗成Caplitalized
//第一个 const 是 JS 的，第二个 const 是 TS 的。
export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
} as const;//第二个const 代表请把这个对象里面的值当成最具体、只读、不可变的字面量类型。

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// keyof 的意思是：获取一个对象类型的所有 key。
// [keyof typeof ERROR_CODES] 用所有 key 去访问这个对象 type，拿到所有 value 的 type。
// 最后一行是这个的简写 类似于
// type User = {
//   id: number;
//   name: string;
// };

// type UserName = User["name"];
// type UserName = string; //因为 User["name"] 取到的是 name 这个属性的类型。


// type ErrorCodeKeys =
//   | "INTERNAL_SERVER_ERROR"
//   | "NOT_FOUND"
//   | "BAD_REQUEST";