import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ComponentsCss/EmailValidation.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Crypto from '../../Classes/Helpers/Crypto';
import EmailValidationHandler from './Actions/EmailValidationHandler';

// Inside your EmailValidation component


const EmailValidation = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [otp, setOtp] = useState(new Array(6).fill('')); // State for OTP
    const [email, setEmail] = useState('');  // Store email for verification

    const location = useLocation();
    const navigate = useNavigate();

    // Automatically hide the error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    useEffect(() => {
        setEmail(new URLSearchParams(location.search).get('email'));
    }, [location.search]);

    // Handle OTP input change

    const handleOtpChange = (element, index) => {
        EmailValidationHandler.handleOtpChange({
            element,
            index,
            otp
        }, {
            setOtp
        })
    }

    // Handle backspace navigation
    const handleOtpKeyDown = (e, index) => {
        EmailValidationHandler.handleOtpKeyDown({
            e,
            index,
            otp
        })
    };

    const handleOtpSubmit = async () => {
        await EmailValidationHandler.handleOtpSubmit({
            otp,
            email
        }, {
            setErrorMessage,
            navigate
        });
    }

      

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
