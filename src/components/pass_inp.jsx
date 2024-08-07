import React, { useState } from 'react';
import { styled } from "@mui/material";

const Input = styled('input')({
    border: 'none',
    borderBottom: '2px solid black',
    marginBottom: '25px',
    fontSize: '22px',
});

function PasswordInput({id, placeholder, onchange}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleVisibilityToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    
    return (
        <div style={{ position: 'relative' }}>
            <Input
                id={id}
                style={{ width: '100%' }}
                type={showPassword ? 'text' : 'password'}
                name={placeholder}
                placeholder={placeholder}
                onChange={onchange}
                required
            />
            <i id={`visibilitybtn-${id}`} onClick={handleVisibilityToggle} style={{ cursor: 'pointer' }}>
                <span id="v1" className="material-symbols-outlined" style={{ marginLeft: '-25px' }}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                </span>
            </i>
        </div>
    );
}

export default PasswordInput;
