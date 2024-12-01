import React, { useState, useEffect } from 'react';
import "../ComponentsCss/EmailValidation.css";

const EmailValidation = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [otp, setOtp] = useState(new Array(6).fill('')); // State for OTP

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
    const handleOtpSubmit = () => {
        alert(`Entered OTP: ${otp.join('')}`);
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

            <p>we have sent an email verification.</p>

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
