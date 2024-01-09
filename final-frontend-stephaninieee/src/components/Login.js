import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css"
import { loginUser } from '../util/loginFunction';
import { useLocation } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    //const [users, setUsers] = useState([]);
  
    /*function validateLogin() {
        const user = users.find(user => user.username === accountName && user.address.street === password);
        
        if (user) {
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userName', user.username);
            localStorage.setItem('userId', user.id.toString());
            handleLogin();
        } else {
            alert("Invalid credentials!");
        }
    }*/ 
 
    const handleLoginSuccess = (user) => {
        console.log("Logged in user:", user);
        localStorage.setItem('userName', user.username);
        //localStorage.setItem('userId', user.id.toString());
        navigate("/home");
    };

    const handleLoginFailure = () => {
        alert("Invalid credentials!");
    };

    const validateLogin = () => {
        loginUser(accountName, password, handleLoginSuccess, handleLoginFailure); 
           
    }

    const googleAuth = () => {
        window.location.href = 'https://mysocialserver-626bbb68c54b.herokuapp.com/auth/google';
      };


    


    /*const validateLogin = () => {
        const user = validateLoginLogic(users, accountName, password);
        if (user) {
            handleLogin();
        } else {
            alert("Invalid credentials!");
        }
    };*/ 

    /*const validateLogin = () => {
        loginUser(accountName, password, 
            (user) => {
                localStorage.setItem('userName', user.username);
                localStorage.setItem('userId', user.id.toString());
                handleLogin();
            },
            () => {
                alert("Invalid credentials!");
            }
        );
    };*/ 


    function handleRegister() {
        navigate("/register");
    }

    return (
        <div className="login container mt-5">
            <div className="loginWrapper row">
                <div className="loginLeft col-md-6">
                    <h3 className="loginLogo mb-4">Kasukabe shi😎</h3>
                    <p className="loginDesc">Connect with friends on Kasukabe shi.</p>
            
                </div>
                <div className="loginRight col-md-6">
                    <div className="loginForm card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="loginInput form-control" placeholder="Account Name" value={accountName} onChange={e => setAccountName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="loginInput form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <button type="button" className="loginButton btn btn-primary mb-2" onClick={validateLogin}>Login</button>
                                </div>
                                <div>
                                    <button type="button" className="loginButton btn btn-primary mb-2" onClick={googleAuth}>Login with Google</button>
                                </div>
                                <p className="text-center loginForgot"><a href="#" onClick={e => { e.preventDefault(); handleRegister(); }}>Create a New Account</a></p>
                                <p className="text-center"><a href="#" onClick={e => e.preventDefault()}>Forgot Password?</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

