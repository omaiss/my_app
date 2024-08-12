import { styled } from "@mui/material";
import React, { useState } from "react";

const Input = styled('input')({
    border: '1px solid',
    borderRadius: '5px',
    fontSize: '25px',
    width: '50px',
    height: '50px',
    textAlign: 'center',
    margin: '10px',
    '&::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '&[type="number"]': {
        MozAppearance: 'textfield',
    }
})

const ButtonA = styled('button')({
    border: 'none',
    color: '-webkit-link',
    background: 'none',
    fontSize: '15px',
    textDecoration: 'underline',
    cursor: 'pointer'
})

export default function OTP_UI({ email }) {
    const [otp, setOTP] = useState(new Array(6).fill(""))

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false;
        setOTP([...otp.map((data, indx) => (indx === index ? e.target.value : data))])
        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    const checkOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otp.join('') }),
            });

            const data = await response.json();
            if (data.success) {
                alert('OTP verified successfully!');
                window.location.reload();
                // Proceed with the next steps (e.g., navigating to another page)
            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('There was an error verifying the OTP. Please try again later.');
        }
    };

    const resendOTP = async () => {
        try {
            const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
            if (data.success) {
                console.log('OTP sent successfully');                
            } else {
                alert('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    return (
        <>
            <p style={{ fontSize: '22px', fontFamily: 'Arial', textAlign: 'center' }}>
                Please enter the OTP sent you at <br /> {email}
            </p>
            <form>
                <div>
                    {otp.map((data, i) => {
                        return <Input type="number" min={0} max={9} required
                            value={data} onChange={(e) => handleChange(e, i)} />
                    })}
                </div>
                <button
                    style={{
                        margin: '0',
                        marginTop: '20px',
                        padding: '15px',
                        borderRadius: '15px',
                        fontSize: '30px',
                        background: 'black',
                        color: 'white',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer'
                    }} onClick={checkOTP}>
                    Verify </button>
            </form>
            <p style={{ textAlign: 'center' }}>Didn't recieve a code?
                <ButtonA onClick={resendOTP}>
                    Resend.
                </ButtonA>
            </p>
        </>
    )
}