import axios from "../libs/axios";

export const createQRCode = async () => {
  return await axios
    .post(`/api/paypay/qr`)
    .then((res) => {
      console.log("[paypayQRCode]作成成功");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("[paypayQRCode]作成失敗");
      console.log(error);
      return error;
    });
}
