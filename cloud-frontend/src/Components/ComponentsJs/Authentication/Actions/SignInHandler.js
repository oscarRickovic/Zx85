import axios from 'axios'
import UserService from '../../../../Classes/Services/UserService'
import { UserServiceEnum } from '../../../../Classes/Enums/UserServiceEnum'
import Crypto from '../../../../Classes/Helpers/Crypto'
export default class SignInHandler{
    static async signUser(user, functions) {
        const errorsPresentations = {
            [UserServiceEnum.EMAIL_ERROR]: functions.setEmailError,
            [UserServiceEnum.PASSWOR_ERROR]: functions.setPasswordError,
            [UserServiceEnum.REPEATED_PASSWORD_ERROR]: functions.setRepeatedPasswordError
        };
        functions.setEmailError('');
        functions.setPasswordError('');
        functions.setRepeatedPasswordError('');
        let checkUserResult = UserService.checkUserData(user);
        if (checkUserResult !== UserServiceEnum.OK) {
            functions.setErrorMessage(checkUserResult);
            if (errorsPresentations[checkUserResult]) {
                errorsPresentations[checkUserResult](checkUserResult);
            } else {
                console.error('Unknown error type:', checkUserResult);
            }
        } else {
            try {
                user.password = Crypto.hashSHA256(user.password);
                user.repeatedPassword = Crypto.hashSHA256(user.repeatedPassword);
                let encryptedCredentials = Crypto.symetricalEncription(user);
                const response = await axios.post('http://localhost:5000/api/auth/register', { encryptedCredentials });
                functions.navigate(`/validation?email=${user.email}`);
            } catch (error) {
                let errorMessage = error.response.data.error || "An error occured";
                functions.setErrorMessage(errorMessage);
            }  
        }
    }
}