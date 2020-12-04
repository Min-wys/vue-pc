import request from "@utils/request";

// data数据是一个对象
export const reqGetProductDetail = id => {
  return request({
    method: "GET",
    url: `/item/${id}`
  });
};
