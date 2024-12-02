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
        const otpCode = otp.join('');
        
        try {
            // Send OTP and email to backend for verification
            const response = await axios.post('http://localhost:5000/api/auth/verify-code', { email, verificationCode: otpCode });
            alert(response.data.message);
            navigate(`/login`);
        } catch (error) {
            setErrorMessage(error.response.data.error || 'An error occurred');
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
