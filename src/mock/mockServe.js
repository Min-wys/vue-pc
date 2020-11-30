import Mock from "mockjs";

import banners from "./rbanners";
import floors from "./rfloors";

// 一旦运行就会拦截Get请求，请求地址是/mock/banners 相当于是服务器
Mock.mock("/mock/banners", "get", {
  code: 200,
  "data|4": banners
});

Mock.mock("/mock/floors", "get", {
  code: 200,
  "data|2": floors
});
