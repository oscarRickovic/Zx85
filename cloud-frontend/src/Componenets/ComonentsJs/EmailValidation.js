import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ComponentsCss/EmailValidation.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Inside your EmailValidation component


const EmailValidation = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [otp, setOtp] = useState(new Array(6).fill('')); // State for OTP
    const [email, setEmail] = useState('');  // Store email for verification

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(new URLSearchParams(location.search).get('email'));
    }, [location.search]);

    // Handle OTP input change
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && index < 5) {
            element.nextSibling.focus();
        }
    };

    // Handle backspace navigation
    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            e.target.previousSibling.focus();
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async () => {
        const otpCode = otp.join('');  // Joining the OTP array into a string
      
        try {
          // Send OTP and email to backend for verification
          const response = await axios.post('http://localhost:5000/api/auth/verify-code', { email, verificationCode: otpCode });
          
          // If verification is successful, save token and navigate
          const token = response.data.token;
          console.log("TOKEN: ", token);
          localStorage.setItem('authToken', token);  // Store token
          alert('Verification successful! You are logged in.');
          navigate('/home');  // Redirect to homepage
    
        } catch (error) {
          // Handle errors
          if (error.response) {
            // If the error is from the backend
            console.error(error.response.data.error);
            alert('Verification failed.');
          } else {
            // For other errors (e.g., network issues)
            setErrorMessage('An error occurred. Please try again.');
          }
          
          // Redirect to login page in case of failure
          navigate(`/login`);
        }
    };
      

    // Automatically hide the error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className={'mainContainer'}>
            {/* Error Message */}
            {errorMessage && (
                <div className="errorContainer">
                    {errorMessage}
                </div>
            )}

            <div className="horizontalLine"></div>
            <div className="verticalLine"></div>
            
            <div className={'titleContainer'}>
                <h2>Zx85</h2>
            </div>

            <p>we have sent an email verification to { email }.</p>

            <div className="otp-container">
                <h3>Enter the 6-digit OTP</h3>
                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            className="otp-input"
                        />
                    ))}
                </div>
                <button className="submit-button" onClick={handleOtpSubmit}>
                    Validate
                </button>
            </div>
        </div>
    );
};

export default EmailValidation;
