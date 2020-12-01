import request from "@utils/request";

// data数据是一个对象
export const reqGetProductList = data => {
  return request({
    method: "POST",
    url: "/list",
    data
  });
};
