import axios from 'axios';
import Crypto from '../../../../Classes/Helpers/Crypto';

export default class EmailValidationHandler {
    static handleOtpChange(variables, functions) {
        if (isNaN(variables.element.value)) return;

        const newOtp = [...variables.otp];
        newOtp[variables.index] = variables.element.value;
        functions.setOtp(newOtp);

        if (variables.element.value && variables.index < 5) {
            variables.element.nextSibling.focus();
        }
    }

    static handleOtpKeyDown (variables) {
        if (variables.e.key === 'Backspace' && variables.otp[variables.index] === '' && variables.index > 0) {
            variables.e.target.previousSibling.focus();
        }
    }

    static async handleOtpSubmit (variables, functions){
        const otpCode = variables.otp.join('');  // Joining the OTP array into a string
        const email = variables.email;
        try {
          // Send OTP and email to backend for verification
          let encryptedCredentials = Crypto.symetricalEncription({email, verificationCode : otpCode});
          const response = await axios.post('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + '/api/auth/verify-code', {encryptedCredentials});
          
          // If verification is successful, save token and navigate
          const token = response.data.token;
          console.log("TOKEN: ", token);
          localStorage.setItem('authToken', token);  // Store token
          localStorage.setItem('email', response.data.user.email)
          alert('Verification successful! You are logged in.');
          functions.navigate('/home');  // Redirect to homepage
    
        } catch (error) {
            functions.setErrorMessage('An error occurred. Please try again.');
            functions.navigate(`/login`);
        }
    }
}