import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../ComponentsCss/Sign.css"
import User from '../../Classes/Entities/User'
import SignInHandler from './Actions/SignInHandler'

const Sign = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    
    const navigate = useNavigate();

    const onButtonClick = async () => {
        let user = new User(email, password, repeatedPassword);
        await SignInHandler.signUser(user, 
            {
                setEmailError,
                setPasswordError,
                setRepeatedPasswordError,
                setErrorMessage,

                navigate
            }
        )
        
    };
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
            type='password'
            value={password}
            placeholder="Enter password.."
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
        />
        </div>
        
        <br/>
        <div className={'inputContainer'}>
        <input
            type='password'
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
