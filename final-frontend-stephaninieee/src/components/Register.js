import React, { useState, useEffect } from 'react';
import "./register.css";
import { useNavigate } from "react-router-dom";
import { fetchUsers, handleSubmit, handleInputChange, } from '../util/registerFunctions';


const Register = () => {
      const [users, setUsers] = useState([]);
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
        accountName: '',
        displayName: '',
        email: '',
        phone: '',
        dob: '',
        zipcode: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
      fetchUsers(setUsers);
  }, []);
 

  const handleFormSubmit = (e) => {
      handleSubmit(e, formData,  navigate)
  };

  const handleLogin = () => {
      navigate("/");
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className='registerLogo'>Kasukabe shi😎</h3>
          <p className='registerDesc'>Connect with friends on Kasukabe shi.</p>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form id="registerForm" method="post" onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="accountName" className="form-label"><b>Account Name:</b></label>
                    <input name="accountName" className="form-control" required value={formData.accountName}  onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                  <div className="col">
                    <label htmlFor="displayName" className="form-label"><b>Display Name:</b></label>
                    <input name="displayName" className="form-control" value={formData.displayName} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="email" className="form-label"><b>Email Address:</b></label>
                    <input name="email" className="form-control" type="email" required value={formData.email} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                  <div className="col">
                    <label htmlFor="phone" className="form-label"><b>Phone Number:</b></label>
                    <input name="phone" className="form-control" type="tel" required value={formData.phone} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="dob" className="form-label"><b>Date of Birth:</b></label>
                    <input name="dob" className="form-control" type="date" required value={formData.dob} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                  <div className="col">
                    <label htmlFor="zipcode" className="form-label"><b>Zip Code:</b></label>
                    <input name="zipcode" className="form-control" type="text" required value={formData.zipcode} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="password" className="form-label"><b>Password:</b></label>
                    <input type="password" className="form-control" name="password" required value={formData.password} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                  <div className="col">
                    <label htmlFor="confirmPassword" className="form-label"><b>Confirm Password:</b></label>
                    <input className="form-control" type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={(e) => handleInputChange(e, setFormData)}  />
                  </div>
                </div>

                <div className="buttonContainer">
                  <div className="buttonWrap">
                    <button className="btn registerButton"  type="submit" >Create Account</button>
                  </div>
                  <div className="buttonWrap">
                    <p className="loginForgot"><a href="#" onClick={e => e.preventDefault()}>Forgot Password?</a></p>
                  </div>
                  <div className="buttonWrap">
                    <button className="btn loginButton" onClick={handleLogin}>Login</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
