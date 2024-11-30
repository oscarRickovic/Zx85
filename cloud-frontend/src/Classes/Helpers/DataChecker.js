export default class DataChecker{
    static isEmailValid (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isPasswordValid(password) {
        // 1. Length greater than 8 characters
        // 2. At least one uppercase letter
        // 3. At least one lowercase letter
        // 4. At least one number
        // 5. we accepts of the special characters (-, _, #, @)
        const passwordRegex = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))[A-Za-z\d-_#@]{9,}$/;
        return passwordRegex.test(password);
    }

    static isPasswordsMatch(password, repeatedPassword) {
        return password == repeatedPassword;
    }
}