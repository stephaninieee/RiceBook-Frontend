import React, {useState, useEffect} from 'react'
import "./sidebar.css"
import Nav from './Nav.js'

const Sidebar = () => {

  const [status, setStatus] = useState('Hello, Im working on react need help  ');
  const [newStatus, setNewStatus] = useState('')
  const currentUserName = localStorage.getItem('userName');
  const [avatar, setAvatar] = useState('')

 /* useEffect(() => {
    const savedStatus = localStorage.getItem('userStatus');
    if (savedStatus) {
      setStatus(savedStatus);
    }else {
    fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/headline')
      .then(response => response.json())
      .then(data => {
        const matchedUser = data.find(user => user.username === currentUserName);
        if (matchedUser && matchedUser.company) {
          setStatus(matchedUser.company.catchPhrase);
        }
      });
    }
}, []); */ 

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
      setAvatar(data.avatar); 
    })
    .catch(error => {
      console.error('Error fetching avatar:', error);
    });

    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/headline/${currentUserName}`, { 
      method: 'GET', 
      credentials: 'include' ,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setStatus(data.headline); 
    })
    .catch(error => {
      console.error("Error fetching headline:", error);
    });
  }
}, [currentUserName]); 

const handleStatusUpdate = () => {
  fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/headline', {
    method: 'PUT',
    credentials: 'include' ,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ headline: newStatus })  
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Status updated:', data);
    setStatus(newStatus);
  })
  .catch(error => {
    console.error('Error updating status:', error);
  });

  setNewStatus('');
};

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={avatar} alt="User Avatar" className="User-avatar" />
        <h3>{currentUserName}</h3>
        <p className="status">{status}</p>
        <div>
          <input 
            type="text"  className = "statusInput"
            placeholder="Update your status..." 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <button onClick={handleStatusUpdate} className="updateButton">Update Status</button>
        </div>
      </div>
  </div>


  )
}

export default Sidebar