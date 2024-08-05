import frame from '../static/images/Frame.png';
import image10 from '../static/images/image 10.png';
import { Checkbox, styled } from "@mui/material";
import { useState } from "react";
import PasswordInput from './pass_inp';

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
    cursor: "grab"
})

export default function LoginSignUp() {
    const [acc, toggleAcc] = useState('login');

    const handlebuttonclick = () => {
        if (acc === 'login')
            toggleAcc('signup');
        else
            toggleAcc('login');
    };

    const handlechange = () => {
        let pass = document.getElementById('pass2');
        let cpass = document.getElementById('pass3');
        console.log(pass.value, cpass.value);
        if (pass.value !== cpass.value) {
            document.getElementById('errormsg').style.display = 'block';
        }
        else {
            document.getElementById('errormsg').style.display = 'none';
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
                {acc === 'login' ?
                    <div>
                        <h1>Welcome back</h1>
                        <p style={{ fontSize: '20px' }}>Welcome back! Please enter your details.</p>
                        <br />
                        <form style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input type='email' name='Email' placeholder='Email' />
                            <PasswordInput id='pass1' placeholder="Password" />
                            <div style={{alignItems:'center', display:'flex' }}>
                                <p>Remember Me.</p>
                                <Checkbox id='terms_conditions'></Checkbox>
                                <a href='#' style={{ marginLeft:'27%' }}>Forgot Password.</a>
                            </div>
                            <Button>Log In</Button>
                        </form>
                        <p style={{ textAlign: 'center' }}>
                            Don't have an account?
                            <button onClick={handlebuttonclick}
                                style={{ border: "none", background: 'none', fontSize: '15px', cursor: "grab" }}>
                                <a style={{ marginLeft: '1%' }} href="#">
                                    Signup
                                </a>
                            </button>
                        </p>
                    </div>
                    :
                    <div>
                        <h1>Welcome back</h1>
                        <p style={{ fontSize: '20px' }}>Welcome back! Please enter your details.</p>
                        <br />
                        <form style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input type='text' name='username' placeholder='User Name' />
                            <Input type='email' name='Email' placeholder='Email' />
                            <PasswordInput id='pass2' placeholder="Password" />
                            <p style={{ display: 'none', margin: '0', color: 'red' }} id='errormsg' >Password's don't match</p>
                            <PasswordInput id='pass3' placeholder="Confirm Password" onchange={handlechange} />
                            <div style={{ display:'flex' }}>
                                <p>Agree to terms and conditions.</p>
                                <Checkbox id='terms_conditions'></Checkbox>
                            </div>
                            <Button>Log In</Button>
                        </form>
                        <p style={{ textAlign: 'center' }}>
                            Have an account?
                            <button onClick={handlebuttonclick}
                                style={{ border: "none", background: 'none', fontSize: '15px', cursor: "grab" }}>
                                <a style={{ marginLeft: '1%' }} href='#'>
                                    Login.
                                </a>
                            </button>
                        </p>
                    </div>
                }
            </div>

        </div>
    )
}
