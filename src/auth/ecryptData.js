import CryptoJS from "crypto-js";
const encryptData = (text) => {
  const secretPass = "XkheoKeErTR";
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretPass
  ).toString();

  return data;
};
export default encryptData;
