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
//const encryptedData = 'wcDgWmzHBO+LTNNSkUVsZqXt+K8hXbrcVFp1MefnPYNOhku2isr5dASG75iBYiLjrPdW+8pmJAMhVu7m88euiQ1kSt/kiGZDQOsZzaHGIqd41BqwoWcnlhORdntcylFfqoZfIA99aZULsVBf/BH35wHdzo/YB1t0xG+CLVqcz3U=';
//Crypto.test(encryptedData);


module.exports = Crypto;
