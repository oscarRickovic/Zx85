const crypto = require("crypto");
const dotenv = require("dotenv")

dotenv.config();

class Crypto {
    static algorithm = "aes-256-cbc";
    static secretKey = crypto.createHash("sha256").update(process.env.SYM_KEY).digest(); // 32-byte key
    static iv = Buffer.from(process.env.IV, "hex"); // 16-byte IV (32 hex chars)

    // Static method for decryption
    static decryptSymEncryption(encryptedData) {
        try {
            // Decode Base64 ciphertext
            const encryptedBuffer = Buffer.from(encryptedData, "base64");
            console.log("Encrypted Buffer:", encryptedBuffer);
    
            // Decrypt using Node.js crypto
            const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.iv);
            let decrypted = decipher.update(encryptedBuffer, "base64", "utf8");
            decrypted += decipher.final("utf8");
            return JSON.parse(decrypted); // Parse back to JSON
        } catch (error) {
            console.error("Decryption Error:", error.message);
            throw error;
        }
    }

    // Static method for testing
    static test(encryptedData) {
        try {
            const decryptedData = this.decryptSymEncryption(encryptedData);
            console.log("Decrypted Data:", decryptedData);
        } catch (error) {
            console.error("Failed to Decrypt:", error.message);
        }
    }
}

// Test example
//const encryptedData = 'wcDgWmzHBO+LTNNSkUVsZlqImioFtDWYyvwDHFosk+ySK8YoXCwuFjB1c5Q8REQfdOKdOmB3ryuZIirJ/bmTxOmQwZ87Fzhkv/WyU13f+60MtzSQDpxPfLVt2Gz8Y8MPk5uUmXwgEvxOadgDNzhuL1HUhH6JGRXCRdsmgizo5fgPpZ7ffvS7rUn1cGzfAeWz3RCBDmyeIWttM8NjwzNMF1kfe8RtuNEBdRZkeKU7ICGA1GkmQkNtl5Rq6MAjnMK/4u8AbD0JouiT61UZ48PeJw==';
//Crypto.test(encryptedData);


module.exports = Crypto;
