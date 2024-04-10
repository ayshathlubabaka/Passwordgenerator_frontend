import { useState } from "react"
import React from 'react'

function PasswordGeneration() {

    const [password, setPassword] = useState('')

    const generatePassword = (strength,length) => {

    const generateWeakPassword = () => {
        const lowercaseChars= 'abcdefghijklmnopqrstuvwxyz';
        const result =  Array.from({length}, () => lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]).join('');
        setPassword(result)
    }
    const generateMediumPassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const result =  Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        setPassword(result)
    }
    const generateStrongPassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
        const result = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        setPassword(result)
    }

    switch (strength) {
        case 'weak':
            return generateWeakPassword();
        case 'medium':
            return generateMediumPassword();
        case 'strong':
            return generateStrongPassword();
        default:
            return '';
    }
}
return {password, generatePassword}
}

export default PasswordGeneration
