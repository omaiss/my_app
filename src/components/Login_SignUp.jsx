import frame from '../static/images/Frame.png';
import image10 from '../static/images/image 10.png';
import { Checkbox, styled } from "@mui/material";
import { useState } from "react";
import PasswordInput from './pass_inp';
import OTP_UI from './OTP';
import axios from 'axios';

const Input = styled('input')({
    border: 'none',
    borderBottom: '2px solid black',
    marginBottom: '25px',
    fontSize: '22px',
});

const Button = styled('button')({
    marginTop: '20px',
    borderRadius: '5px',
    background: 'black',
    color: 'white',
    textAlign: 'center',
    fontSize: "25px",
    height: "50px",
    cursor: "pointer"
})

const ButtonA = styled('button')({
    border: 'none',
    marginLeft: '27%',
    color: '-webkit-link',
    background: 'none',
    fontSize: '15px',
    textDecoration: 'underline',
    cursor: 'pointer'
})

export default function LoginSignUp() {
    const [acc, toggleAcc] = useState('login');
    const [otp, showOtp] = useState('hide');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const inputChange = (e) => {
        console.log(email, username, password);
        if (e.target.id === 'username')
            setusername(e.target.value);
        if (e.target.id === 'email')
            setemail(e.target.value);
    }

    const handleOTP = async () => {  
        
        if (!username || !email || !password) {
            alert('Please fill out all the fields first');
            showOtp('hide');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const newUser = {
            username,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        const formData = { 
            username: username, 
            email: email,
            password: password
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/app/useradd/', formData);
            const message = response.data.message;
            if (message && response.status === 200){
                console.log(message);
                if (otp === 'hide')
                    showOtp('show');
                else
                    showOtp('hide');
            }
            else console.log(message)
        }catch(error){
            console.log(error);        
            return;
        }
    };

    const handlebuttonclick = () => {
        if (acc === 'login')
            toggleAcc('signup');
        else
            toggleAcc('login');
    };


    const handlechange = (e) => {
        let pass = document.getElementById('pass2');
        let cpass = document.getElementById('pass3');
        const errorMsg = document.getElementById('errormsg');

        if (pass.value !== cpass.value) {
            errorMsg.style.display = 'block';
            errorMsg.style.textAlign = 'center';
            errorMsg.innerText = "Passwords don't match";
            return;
        }

        if (pass.value.length < 8) {
            console.log(pass.value.length);
            errorMsg.style.display = 'block';
            errorMsg.style.textAlign = 'center';
            errorMsg.innerText = 'Password must be 8 characters long';
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(pass.value)) {
            errorMsg.style.display = 'block';
            errorMsg.style.textAlign = 'center';
            errorMsg.innerText = 'Password must contain at least one uppercase letter,\n one lowercase letter, one number, and one special character';
            return;
        }

        // If all validations pass, hide error message and set the password
        errorMsg.style.display = 'none';
        setpassword(e.target.value);
    };

    const handleSubmit = (e) => {
        if (!handlechange(e)) {
            e.preventDefault();
            alert("Please enter correct credentials!");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let userEmailInput = document.getElementById('useremail').value;
        let userPasswordInput = document.getElementById('userpassword').value;

        const user_data = {
            email: userEmailInput,
            password: userPasswordInput
        }
        try{
            const response = await axios.post('http://127.0.0.1:8000/app/userlogin/', user_data);
            console.log(response.status);
            if (response.status === 200) {
                alert('Login successful!');
                window.location.reload();
            } else {
                alert('Invalid email or password.');
            }
        }
        catch (error){
            console.log(error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <img src={image10} alt='10' />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', whiteSpace: 'nowrap' }}>
                <div style={{ position: 'absolute', top: '0', width: '100%', display: 'flex', alignItems: 'center' }}>
                    <img src={frame} alt='frame' style={{ width: '24px', height: '24px' }} />
                    <h4 style={{ marginLeft: '1%' }}>User Interface Enhancement for Access Database</h4>
                </div>
                {otp === 'hide' ? (
                    acc === 'login' ?
                        <div>
                            <h1>Welcome back</h1>
                            <p style={{ fontSize: '20px' }}>Welcome back! Please enter your details.</p>
                            <br />
                            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleLogin}>
                                <Input id='useremail' type='email' name='Email' placeholder='Email' />
                                <PasswordInput id='userpassword' placeholder="Password" />
                                <div style={{ alignItems: 'center', display: 'flex' }}>
                                    <Checkbox id='terms_conditions' style={{ margin: '0' }}></Checkbox>
                                    <p>Remember Me.</p>
                                    <ButtonA>
                                        Forgot Password</ButtonA>
                                </div>
                                <Button>Log In</Button>
                            </form>
                            <p style={{ textAlign: 'center' }}>
                                Don't have an account?
                                <ButtonA style={{ marginLeft: '1%' }} onClick={handlebuttonclick}>
                                    Signup
                                </ButtonA>
                            </p>
                        </div>
                        :
                        <div>
                            <h1>Welcome back</h1>
                            <p style={{ fontSize: '20px' }}>Welcome back! Please enter your details.</p>
                            <br />
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                                <Input onChange={inputChange} id='username' type='text' name='username' placeholder='User Name' />
                                <Input onChange={inputChange} id='email' type='email' name='Email' placeholder='Email' />
                                <PasswordInput onchange={handlechange} id='pass2' placeholder="Password" />
                                <p style={{ display: 'none', margin: '0', color: 'red', fontSize: '15px' }} id='errormsg' >Password's don't match</p>
                                <PasswordInput id='pass3' placeholder="Confirm Password" onchange={handlechange} />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Checkbox id='terms_conditions' required style={{ margin: '0' }}></Checkbox>
                                    <p>Agree to terms and conditions.</p>
                                </div>
                                <Button onClick={handleOTP}>Sign Up </Button>
                            </form>
                            <p style={{ textAlign: 'center' }}>
                                Have an account?
                                <ButtonA style={{ margin: '0' }} onClick={handlebuttonclick}>
                                    Login.
                                </ButtonA>
                            </p>
                        </div>
                ) :
                    (<OTP_UI email={email} />)
                }
            </div>

        </div>
    )
}
