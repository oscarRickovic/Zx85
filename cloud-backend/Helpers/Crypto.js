const crypto = require("crypto");
require('dotenv').config();


const algorithm = "aes-256-cbc";
console.log(process.env.SYM_KEY)
const secretKey = crypto.createHash("sha256").update(process.env.SYM_KEY).digest(); // 32-byte key
const iv = Buffer.from(process.env.IV, "hex"); // 16-byte IV (32 hex chars)

// input : cipher text.
// output : clear data
// details : uses the CBC encryption algorithm with specify IV and Key to decrypt it
function decryptSymEncryption(encryptedData) {
    try {
        // Decode Base64 ciphertext
        const encryptedBuffer = Buffer.from(encryptedData, "base64");
        console.log("Encrypted Buffer:", encryptedBuffer);

        // Decrypt using Node.js crypto
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedBuffer, "base64", "utf8");
        decrypted += decipher.final("utf8");
        return JSON.parse(decrypted); // Parse back to JSON
    } catch (error) {
        console.error("Decryption Error:", error.message);
        throw error;
    }
}

// Let's test it
const encryptedData = "Q/7aCkCQjEwuSgUAzl1Y8Y1GdrNxCeaparKZ6o138Br+APg++ldxVxzwC754KB/0T/QsyHak5LX9tE2OyqjuVVRdnwJe1t/c0xJKv93Lnis=";
try {
    const decryptedData = decryptSymEncryption(encryptedData);
    console.log("Decrypted Data:", decryptedData);
} catch (error) {
    console.error("Failed to Decrypt:", error.message);
}
