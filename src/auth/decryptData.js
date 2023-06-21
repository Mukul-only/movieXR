import CryptoJS from "crypto-js";
const decryptData = (text) => {
  try {
    const secretPass = "XkheoKeErTR";
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  } catch (error) {
    // console.log(error.message);
    return false;
  }
};
export default decryptData;
