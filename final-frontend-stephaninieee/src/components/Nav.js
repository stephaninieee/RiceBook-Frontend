import "./nav.css"
import React, { useState, useEffect } from 'react';
import {Search} from "@mui/icons-material"
import { Link, Outlet} from 'react-router-dom'; 

const Nav = ({ setSearchTerm,}) => {
    const currentUserName = localStorage.getItem('userName');
    const [avatar, setAvatar] = useState(' '); 

    useEffect(() => {
         if (currentUserName) {
            fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/avatar/${currentUserName}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.avatar) {
                    localStorage.setItem('userAvatar', data.avatar);
                    setAvatar(data.avatar);
                }
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
        }
    }, [currentUserName]);
    /*const handleLogout = () => {
        
        localStorage.clear();
    };*/ 
    function handleLogout() {
        fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/logout', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.clear();

            } else {
                // Handle errors, like showing a message to the user
            }
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
    }
    
    return (
    <div className = "navbarContainer ">
        <div className = "navbarLeft">
            <span className="logo">Kasukabe shi😎</span>
        </div>
        <div className = "navbarCenter">
            <div className = "searchBar">
                <Search className="searchIcon" />
                <input data-testid= "searchQuery" placeholder = "Search for post" className = "searchInput" onChange={e => setSearchTerm(e.target.value)}></input>
            </div>
        </div>
        <div className = "navbarRight">
            <div className ="navbarLink">
            <Link to="/profile" className="profile">Profile</Link>
            <Link to="/" className= "logout" onClick={handleLogout}>Logout</Link>
            <span className= "userName">{currentUserName}</span>
            </div>
            <img src={avatar} alt="User Avatar" className ="navbarImg" />
        </div>
        <Outlet />
    </div>
  )
}

export default Nav