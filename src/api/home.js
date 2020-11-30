import request from "@utils/request";
import mockRequest from "@utils/mockRequest";

export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "product/getBaseCategoryList"
  });
};

// 请求轮播图的模拟数据,使用mock的拦截器
export const reqGetBanners = () => {
  return mockRequest({
    method: "GET",
    url: "banners"
  });
};

// 请求楼层的数据，使用mock的拦截器
export const reqGetFloors = () => {
  return mockRequest({
    method: "GET",
    url: "floors"
  });
};
