export const fetchUser = (currentUserName,setFriends) => {
    // Assuming your backend expects the current user's ID as a query parameter
    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/following/${currentUserName}`, {
        method: 'GET',
        credentials: 'include' // Keeps the session cookies with the request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.following){
            //console.log(data.following)
            setFriends(data.following); 
        }
       
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};


/*export const unfollowUserLogic = (friends, userId) => {
    const updatedFriends = friends.filter(friend => friend.id !== userId);
    const currentFollowers = JSON.parse(localStorage.getItem('followersID') || '[]');
    const updatedFollowers = currentFollowers.filter(id => id !== userId);
    localStorage.setItem('followersID', JSON.stringify(updatedFollowers));
    return updatedFriends;
}*/ 
export const unfollowUserLogic = (friends, friendUsername, loggedInUser) => {
    const updatedFriends = friends.filter(friend => friend.username !== friendUsername);

    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/following/${friendUsername}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loggedInUser })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Unfollow successful:', data);
        //console.log(friends.username)
    })
    .catch(error => {
        console.error('Error unfollowing user:', error);
    });

    return updatedFriends;
}


/*export const handleAddFollowerLogic = (newFollowerName, setFriends, setNewFollowerName) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const user = data.find(u => u.name && u.name.toLowerCase() === newFollowerName.toLowerCase());
            if (user) {
                setFriends(prevFriends => [...prevFriends, user]);
                const currentFollowers = JSON.parse(localStorage.getItem('followersID') || '[]');
                currentFollowers.push(user.id);
                localStorage.setItem('followersID', JSON.stringify(currentFollowers));
                setNewFollowerName('');
            } else {
                alert('User does not exist!');
            }
        });
};*/ 

export const handleAddFollowerLogic = (newFollowerUsername, setFriends, setNewFollowerName, loggedInUser) => {
    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/following/${newFollowerUsername}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loggedInUser })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(`Successfully added follower: ${newFollowerUsername}`);
        setFriends(data.following);
        setNewFollowerName('');
    })
    .catch(error => {
        console.error('Error adding follower:', error);
        alert('Failed to add follower. Please try again.');
    });
};
