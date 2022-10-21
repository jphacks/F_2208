import axios from "../libs/axios";

export const paypayPay = async (amount) => {
  return await axios
    .get(`/api/paypay?amount=${amount}`)
    .then((res) => {
      // console.log("[paypay]取得成功");
      // console.log(res);
      return res;
    })
    .catch((error) => {
      // console.log("[paypay]取得失敗");
      // console.log(error);
      return error;
    });
}

export const paypayPaymentDetails = async (merchantPaymentId) => {
  return await axios
    .get(`/api/paypay/payment?merchantPaymentId=${merchantPaymentId}`)
    .then((res) => {
      // console.log("[paypay]支払い成功");
      // console.log(res);
      return res;
    })
    .catch((error) => {
      // console.log("[paypay]支払い失敗");
      // console.log(error);
      return error;
    });
}
