import "./post.css";
import React, { useState, useEffect } from 'react';

import { fetchAvatar , updateArticle} from '../util/feedFunctions.js';


const CommentItem = ({ avatar, name, text }) => (
    <div className="commentItem">
        <img src={avatar} alt={name} className="commentAvatar" />
        <div className="commentDetails">
            <div className="commenterName">{name}</div>
            <div className="commentText">{text}</div>
        </div>
    </div>
);

const Post = ({ post }) => {

    const currentUserName = localStorage.getItem('userName');
    const displayedImage = post.img 
    const [isEditing, setIsEditing] = useState(false); 
    const [editedText, setEditedText] = useState(post.text)

    const [showComments, setShowComments] = useState(false);
    const [avatar, setAvatar] = useState('')

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedText(post.text); 
    };
    

    const handleSave = async () => {
        try {
            const updatedArticle = await updateArticle(post.pid, editedText);
            console.log("Updated article:", updatedArticle);
            setIsEditing(false);
            //console.log(post.pid)
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };
   

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const avatarUrl = await fetchAvatar(post.author, setAvatar); 
            } catch (error) {
                console.error("Failed to fetch avatar:", error);
            }
        };
    
        loadAvatar();
    }, [post.author, setAvatar]); 
    
    
    return (
        <div className="post">
            <div className="listWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg' src={avatar} alt="Profile" />
                        <span className="postUsername">{post.author}</span>
                        <span className="timeStamp">{post.ts}</span>
                    </div>
                    <div className="postTopRight">
                    {isEditing ? (
                    <button className='editButton' onClick={handleSave}>Save</button>
                ) : (
                    currentUserName === post.author && (
                    <button className='editButton' onClick={handleEditToggle}>Edit</button>)
                )}
                
                    </div>
                </div>
                <div className="postCenter">
                <span className="postText">{post.title}</span>
                    {isEditing ? (
                    <>
                        <textarea className="editText"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <p>{post.text}</p>
                    </>
                )}
                    {displayedImage && <img className="postImg" src={post.img} alt="Post" />}
                </div>

                <div className="postBottom">
                    <button className="stickyButton"  onClick={() => setShowComments(!showComments)}>
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>

                    {showComments && (
                        <div className="commentsList">
                            <CommentItem avatar="./assets/account/account2.jpeg" name="John Doe" text="this is the first comment" />
                            <CommentItem avatar="./assets/account/account4.jpeg" name="Stephanie" text="impressive" />
                            <CommentItem avatar="./assets/account/account3.jpeg" name="Rayyyy Chen" text="love this" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;
