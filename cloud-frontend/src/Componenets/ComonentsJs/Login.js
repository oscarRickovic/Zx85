import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../ComponentsCss/Login.css"
import LoginUserService from '../../Classes/Services/LoginUserService'
import { LoginUserServiceEnum } from '../../Classes/Enums/LoginUserServiceEnums'
import LoginUser from '../../Classes/Entities/LoginUser'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate()
    
    const errorsPresentations = {
        [LoginUserServiceEnum.EMAIL_ERROR]: setEmailError,
        [LoginUserServiceEnum.PASSWORD_ERROR]: setPasswordError,
    };

    const setAllErrorsEmpty = () => {
        setEmailError('');
        setPasswordError('');
    }
    
    const onButtonClick = () => {
        setAllErrorsEmpty()
        let user = new LoginUser(email, password);
        let checkUserResult = LoginUserService.checkLoginUserData(user);
        if (checkUserResult !== LoginUserServiceEnum.OK) {
            // Set the error message
            setErrorMessage(checkUserResult);
            if (errorsPresentations[checkUserResult]) {
                errorsPresentations[checkUserResult](checkUserResult);
            } else {
                console.error('Unknown error type:', checkUserResult);
            }
        }
    };

    // Automatically hide the error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(''); // Hide the error message
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [errorMessage]);

    return (
    <div className={'mainContainer'}>
        
        {errorMessage && (
            <div className="errorContainer">
                {errorMessage}
            </div>
        )}
        
        <div className="horizontalLine"></div>
        <div className="verticalLine"></div>

        <div className={'titleContainer'}>
        <div>Zx85</div>
        </div>

        <br />

        <div className={'inputContainer'}>
        <input
            value={email}
            placeholder="Enter email.."
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
        />
        </div>
        
        <br />
        
        <div className={'inputContainer'}>
        <input
            type='text'
            value={password}
            placeholder="Enter password.."
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
        />
        </div>
        
        <br />
        
        <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Login'} />
        </div>
        
        <p className = {"changePage"} onClick={ () => {navigate("/")}}>Don't have Account</p>
    </div>
    )
}

export default Login
