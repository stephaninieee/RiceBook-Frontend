import React, { useState, useEffect} from 'react';
import "./feed.css"
import Share from "./Share.js"
import Post from './Post'
import { fetchUsers, fetchPosts, addNewPost, filterPostsByTerm } from '../util/feedFunctions.js';

const Feed = ({searchTerm, friends}) => {
  
    const currentUserName = localStorage.getItem('userName');
    //const followedIds = JSON.parse(localStorage.getItem('followersID')) || [];
    const [posts, setPosts] = useState([]);  
    const [users, setUsers] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
  

 

   
  /*useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

    useEffect(() => {
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
              }).filter(post => followedIds.includes(post.userId) || post.userId === currentUserId);
              setPosts(userPosts);
          });
  }, [currentUserId]); */ 

  /*useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);
  
 useEffect(() => {
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
        }). filter(post => {
          return friends.some(friend => friend.id === post.userId) || post.userId === currentUserId;
        });
        setPosts(userPosts);
      
      });
  }, [currentUserId, friends, users]); 

    const addPost = (post) => {
      console.log("Adding new post:", post)
        setPosts(prevPosts => [post, ...prevPosts]); 
    };
    
    const filteredPosts = searchTerm ? 
    posts.filter(post => 
        post.title.includes(searchTerm) || 
        post.body.includes(searchTerm)  ||
        post.authorName.includes(searchTerm)
    ) : posts;*/ 

      useEffect(() => {
        fetchUsers(currentUserName,setUsers);
    }, []);

    useEffect(() => {
        fetchPosts(currentUserName, friends, users, setPosts);
        
    }, [currentUserName, friends, users]);

    const addPost = (post) => {
        addNewPost(post, setPosts);
        console.log('Post object:', post);
    };

    const filteredPosts = filterPostsByTerm(searchTerm, posts);
    const sortedPosts = filteredPosts.sort((a, b) => {
      return new Date(b.ts) - new Date(a.ts);
  });
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className= "feed" >
        <div className= "feedWrpper">
            <Share  addPost = {addPost} currentUserName={currentUserName}/>
            {currentPosts .map((post) => (
          <Post key={post.pid} post={post} currentUserName={currentUserName}   />
        ))}
         <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={sortedPosts.length}
                    paginate={paginate}
                />

        </div> 
    </div>
    
  )
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
  }

  return (
      <nav>
          <ul className='pagination'>
              {pageNumbers.map(number => (
                  <li key={number} className='page-item'>
                      <a onClick={() => paginate(number)} href='#!' className='page-link'>
                          {number}
                      </a>
                  </li>
              ))}
          </ul>
      </nav>
  );
};
export default Feed