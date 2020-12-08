import request from "@utils/request";

// 获取商品详情
export const reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade"
  });
};

// 提交订单
export const reqSubmitOrder = ({
  tradeNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList
}) => {
  return request({
    method: "POST",
    url: "/order/auth/submitOrder",
    params: {
      tradeNo
    },
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList
    }
  });
};

// 确认支付
export const reqGetQrcode = orderId => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`
  });
};
