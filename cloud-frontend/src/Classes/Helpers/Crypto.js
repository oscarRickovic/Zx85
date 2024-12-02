import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";

export default class Crypto {

    // input : JSON data representation.
    // output : Cipher text.
    // details : using CBC encryption algo with specific key and IV variable to generate the cipher text
    static symetricalEncription(data) {
        console.log(process.env.REACT_APP_SYM_KEY)
        const secretKey = CryptoJS.enc.Hex.parse(SHA256(process.env.REACT_APP_SYM_KEY).toString().substr(0, 64)); // 32-byte key
        const iv = CryptoJS.enc.Hex.parse(process.env.REACT_APP_IV); // 16-byte IV 32 element from [0-f]
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            secretKey,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        return encrypted.toString(); // Encrypted data in Base64
    }
}

