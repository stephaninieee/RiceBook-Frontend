import React, { useState, useEffect } from 'react'
import Nav from './Nav.js'
import './profile.css'
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, handleProfileSubmit, fetchAvatar, updateAvatar , updatePassword} from '../util/profileFunction.js';


const Profile = () => {
const navigate = useNavigate();
const currentUserName = localStorage.getItem('userName') 

  const [userInfo, setUserInfo] = useState({
    accountName: currentUserName,
    displayName :"",
    email: "",
    phone: "",
    zipcode: "",
    dob:"",
    password: ""
  });

  const [avatar, setAvatar] = useState('')

  /*useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
    
       

        const currentUser = users.find(user => user.id === userId);

        if (currentUserName) {
            const fullZipcode = currentUser.address.zipcode;
            const firstFiveDigits = fullZipcode.substring(0, 5)
            const phoneNumber = currentUser.phone;
            const cleanedPhoneNumber = phoneNumber.replace(/^1-| x.*$/g, '');
          
          /*setUserInfo({
            accountName: firstUser.username,
            displayName: firstUser.name, 
            email: firstUser.email,
            phone: cleanedPhoneNumber,
            zipcode: firstFiveDigits
          }); 
          setUserInfo(prevState => ({
            ...prevState,
            accountName: currentUser.username,
            displayName: currentUser.name, 
            email: currentUser.email,
            phone: cleanedPhoneNumber,
            zipcode: firstFiveDigits
        }));
        
        } else {
          console.error('No user data found');
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(userInfo);
    
}
  */ 

  useEffect(() => {
    fetchUserInfo(userInfo, setUserInfo);
    fetchAvatar(avatar, setAvatar)
}, []);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
      updateAvatar(file, setAvatar);
  }
};

function handleSubmit(event) {
  handleProfileSubmit(userInfo, event);
  if (userInfo.password) {
    updatePassword(userInfo.password);
}
}

  function back() {
    navigate("/home");
  }
  return (
    <div>
      <Nav/>
      <div className="profile-container">
            <h2>Profile</h2>
            <img src={avatar} alt="Profile" />


            <label htmlFor="fileInput">Choose a file</label>
            <input type="file" id="fileInput" onChange={handleFileChange} />
         
            <form    data-testid="profile-form"  onSubmit={handleSubmit}>
            
            <div className="input-group">
                <div>
                    <label>Account Name:</label>
                    <input type="text" name="accountName" placeholder={userInfo.accountName} disabled  />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input type="text" name="displayName" value={userInfo.displayName}  onChange={e => setUserInfo({...userInfo, displayName: e.target.value})}/>
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label>Email Address:</label>
                    <input type="email" name="email" value={userInfo.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"   onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phone" value={userInfo.phone}  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  onChange={e => setUserInfo({...userInfo, phone: e.target.value})}/>
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={userInfo.dob}  disabled/>
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input type="text" name="zipcode" value={userInfo.zipcode}  pattern="[0-9]{5}" onChange={e => setUserInfo({...userInfo, zipcode: e.target.value})} />
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label htmlFor="passwordInput" >New Password:</label>
                    <input  id="passwordInput" type="password" name="password"  onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>
                </div>
                
            </div>
            <button type="submit" >Update Profile</button>
    
                
            </form>
            <button onClick={back} >Back to Main Page</button>
        </div>
      
    </div>
  )
}

export default Profile