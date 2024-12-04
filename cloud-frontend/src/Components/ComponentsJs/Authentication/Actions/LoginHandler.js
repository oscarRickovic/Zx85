import axios from 'axios'
import LoginUserService from '../../../../Classes/Services/LoginUserService'
import { LoginUserServiceEnum } from '../../../../Classes/Enums/LoginUserServiceEnums'
import Crypto from '../../../../Classes/Helpers/Crypto'

export default class LoginHandler {
    static async login(user, functions) {
        const errorsPresentations = {
            [LoginUserServiceEnum.EMAIL_ERROR]: functions.setEmailError,
            [LoginUserServiceEnum.PASSWORD_ERROR]: functions.setPasswordError,
        };

        functions.setEmailError('');
        functions.setPasswordError('');

        let checkUserResult = LoginUserService.checkLoginUserData(user);
        if (checkUserResult !== LoginUserServiceEnum.OK) {
            // Set the error message
            functions.setErrorMessage(checkUserResult);
            if (errorsPresentations[checkUserResult]) {
                errorsPresentations[checkUserResult](checkUserResult);
            } else {
                console.error('Unknown error type:', checkUserResult);
            }
        } else {
            try {
                user.password = Crypto.hashSHA256(user.password);
                let encyptedCredentials = Crypto.symetricalEncription(user);
                const response = await axios.post('http://localhost:5000/api/auth/login', {encyptedCredentials});
                
                // If login is successful
                console.log(response.data.message);
            
                // Store the token in localStorage for future requests
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('email', response.data.user.email);
                // Redirect to the home page
                functions.navigate('/home');
            } catch (error) {
                // Handle any error response from the backend
                if (error.response) {
                    console.error(error.response.data.error);
                    functions.setErrorMessage(error.response.data.error || 'An error occurred during login');
                } else {
                    console.error(error);
                    functions.setErrorMessage('An error occurred while trying to log in')
                }
            }
        }
    }
}