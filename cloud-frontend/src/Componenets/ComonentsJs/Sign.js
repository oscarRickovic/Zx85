import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../ComponentsCss/Sign.css"
import User from '../../Classes/Entities/User'
import UserService from '../../Classes/Services/UserService'
import { UserServiceEnum } from '../../Classes/Enums/UserServiceEnum'

const Sign = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();
    
    const errorsPresentations = {
        [UserServiceEnum.EMAIL_ERROR]: setEmailError,
        [UserServiceEnum.PASSWOR_ERROR]: setPasswordError,
        [UserServiceEnum.REPEATED_PASSWORD_ERROR]: setRepeatedPasswordError
    };

    const setAllErrorsEmpty = () => {
        setEmailError('');
        setPasswordError('');
        setRepeatedPasswordError('');
    }
    
    const onButtonClick = async () => {
        setAllErrorsEmpty()
        let user = new User(email, password, repeatedPassword);
        let checkUserResult = UserService.checkUserData(user);
        if (checkUserResult !== UserServiceEnum.OK) {
            // Set the error message
            setErrorMessage(checkUserResult);
            if (errorsPresentations[checkUserResult]) {
                errorsPresentations[checkUserResult](checkUserResult);
            } else {
                console.error('Unknown error type:', checkUserResult);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
                alert(response.data.message);
                navigate(`/validation?email=${email}`);
            } catch (error) {
                console.log(error.response.data.error || 'An error occurred');
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
        
        <br/>
        <div className={'inputContainer'}>
        <input
            type='text'
            value={repeatedPassword}
            placeholder="Reenter password.."
            onChange={(ev) => setRepeatedPassword(ev.target.value)}
            className={'inputBox'}
        />
        </div>
        
        <br />
        
        <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign'} />
        </div>
        
        <p className = {"changePage"} onClick={ () => {navigate("/login")}}>Already have Account</p>
    </div>
    )
}

export default Sign
