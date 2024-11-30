// Import SHA-256 from crypto-js
import SHA256 from 'crypto-js/sha256';

export default class Crypto {
    static sha256Hash(data) {
        // Use SHA-256 hashing from crypto-js
        return SHA256(data).toString(); // Convert WordArray to string (hex)
    }   
}
