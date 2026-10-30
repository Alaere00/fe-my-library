import React from 'react';
import LoginButton from '../LoginButton/LoginButton';
import "./Header.css"
export const Header = () => {
    return (
        <div className="header-container">
            <h1 style={{ fontWeight: "bold", fontSize: 20 }}>MyLibrary</h1>
            <LoginButton></LoginButton>
        </div>
    )
}