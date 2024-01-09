import React,  { useState, useEffect }from 'react'
import "./rightbar.css"
import { unfollowUserLogic, handleAddFollowerLogic, fetchUser } from '../util/rightbarFunction';

const Rightbar = ({friends, setFriends}) => {
    
  const [newFollowerName, setNewFollowerName] = useState('');
    const currentUserName = localStorage.getItem('userName')
 
    useEffect(() => {
      fetchUser(currentUserName, setFriends);
      //console.log(currentUserName)
      //console.log(friends)
  }, [currentUserName, friends]);

  const unfollowUser = (friendUsername) => {
    const updatedFriends = unfollowUserLogic(friends, friendUsername, currentUserName);
    setFriends(updatedFriends);
}

const handleAddFollower = () => {
  handleAddFollowerLogic(newFollowerName, setFriends, setNewFollowerName, currentUserName);
};
   
    //unfollower
    /*const unfollowUser = (userId) => {
        const updatedFriends = friends.filter(friend => friend.id !== userId);
        setFriends(updatedFriends);

        const currentFollowers = JSON.parse(localStorage.getItem('followersID') || '[]');
        const updatedFollowers = currentFollowers.filter(id => id !== userId);
        localStorage.setItem('followersID', JSON.stringify(updatedFollowers));
    }

    */ 


  return (
    <div className= "rightbar">
        Contacts
    <ul className='friendList'>
      {friends && friends.map(friend => (
        <div key={ friend.username}> 
          <img className="friendImg" src={friend.avatar} alt={friend.username} />
          <h5 className="friendName">{friend.username}</h5>
          <p className="friendHeadline">{friend.headline}</p>
          <button className="unfollowButton"  onClick={() => unfollowUser(friend.username)}>Unfollow</button>
        </div>
        ))}
    </ul>
    <input className = "addFollowerInput" type="text"  placeholder="Enter user name" value={newFollowerName}
  onChange={(e) => setNewFollowerName(e.target.value)}/>
            <button className="addFollowerButton" onClick={handleAddFollower}>Add Follower</button>
    </div>
  )
}

export default Rightbar