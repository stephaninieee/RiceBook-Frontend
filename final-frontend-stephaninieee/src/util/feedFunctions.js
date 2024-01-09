/*export const fetchUsers = (setUsers) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        });
};*/ 

export const fetchUsers = (currentUserName, setUsers) => {
    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/following`, {
        method: 'GET',
        credentials: 'include' 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //console.log(currentUserName)
        return response.json();
    })
    .then(data => {
        if (data && data.following){
            console.log(data.following)
            //setUsers(data.following); 
            const followingUsernames = data.following.map(user => user.username);
            const allUsers = [currentUserName, ...followingUsernames];
            setUsers(allUsers); 
            //console.log(allUsers)
        }
       
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};

/*
export const fetchPosts = (currentUserName, friends, users, setPosts) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const userPosts = data.map(post => {
                const author = users.find(user => user.id === post.userId);
                return {
                    ...post,
                    authorName: author ? author.username : "Unknown",
                    ts: new Date("2023-09-01T00:00:00").toLocaleString('en-US')
                };
            }).filter(post => {
                return friends.some(friend => friend.id === post.userId) || post.userId === currentUserId;
            });
            setPosts(userPosts);
        });
};*/ 

export const fetchPosts = async (currentUserName, users, friends, setPosts) => {
    const getPostsUrl = 'https://mysocialserver-626bbb68c54b.herokuapp.com/articles'; 

    try {
        const response = await fetch(getPostsUrl, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const userPosts = data.articles.map(post => {
            const isAuthorKnown = users.includes(post.author);
            return {
                ...post,
                authorName: isAuthorKnown ? post.author : "Unknown",
                ts: new Date(post.date).toLocaleString('en-US')
            };
        }).filter(post => {

            return post.author === currentUserName || friends.includes(post.author);
        });

        setPosts(userPosts);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const fetchAvatar = (users, setAvatar) => {
    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/avatar/${users}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(imageData => {
        //console.log(imageData.avatar)
        setAvatar(imageData.avatar); 
       // console.log(users)
    })
    .catch(error => {
        console.error('Error fetching profile image:', error);
    });
};



export const updateArticle = async (pid, newText, commentId ) => {
    console.log(pid, newText, commentId)
    try {
        const response = await fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/articles/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify({ text: newText, commentId }) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedArticle = await response.json();
        console.log(updateArticle)
        return updatedArticle; 
    } catch (error) {
        console.error("Error updating article:", error);
        throw error; 
    }
};



export const addNewPost = (post, setPosts) => {
    console.log("Adding new post:", post)
    setPosts(prevPosts => [post, ...prevPosts]);
    console.log(post)
};

export const filterPostsByTerm = (searchTerm, posts) => {
    return searchTerm ? 
        posts.filter(post => 
            post.title.includes(searchTerm) || 
            post.text.includes(searchTerm)  ||
            post.author.includes(searchTerm)
        ) : posts;
};
