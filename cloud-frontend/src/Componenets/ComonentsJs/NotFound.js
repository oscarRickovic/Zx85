import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../ComponentsCss/NotFound.css"

const NotFound = (props) => {

    const navigate = useNavigate()

    return (
    <div className={'mainContainer'}>
        
        <div className="horizontalLineError"></div>
        <div className="verticalLine"></div>

        <div className={'titleContainer'}>
        <div>PAGE NOT FOUND</div>
        </div>

        <br />
        
        <p className = {"changePage"} onClick={ () => {navigate("/login")}}>Log in</p>
    </div>
    )
}

export default NotFound;
