


import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {

  const navigate = useNavigate()
  console.log("GoogleAuth");

  useEffect(() => {
    fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/oauth_success', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        console.log("response", response);
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log("data")
        //onSuccess(data);
        console.log('Login response data:', data);
        localStorage.setItem('userName', data.username);
        navigate("/home");
      })
      .catch((error) => console.error(error));
  },[navigate]);



  return (
    <div>
      <h1>Loading .... </h1>
    </div>
  );
};

export default GoogleAuth;
