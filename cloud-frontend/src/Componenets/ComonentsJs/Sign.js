import React, { useState } from 'react'
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

    const navigate = useNavigate()
    
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
    
    const onButtonClick = () => {
        setAllErrorsEmpty()
        let user = new User(email, password, repeatedPassword);
        let checkUserResult = UserService.checkUserData(user);
        alert(checkUserResult);
        if (checkUserResult != UserServiceEnum.OK) {
            if (errorsPresentations[checkUserResult]) {
                errorsPresentations[checkUserResult](checkUserResult);
            } else {
                console.error('Unknown error type:', checkUserResult);
            }
        }
    };
    

    return (
    <div className={'mainContainer'}>
        
        <div class="horizontalLine"></div>
        <div class="verticalLine"></div>


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
        <label className="errorLabel">{emailError}</label>
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
        <label className="errorLabel">{passwordError}</label>
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
        <label className="errorLabel">{repeatedPasswordError}</label>
        </div>
        
        <br />
        
        <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign'} />
        </div>

    </div>
    )
    }

export default Sign