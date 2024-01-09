import React, { useState, useRef, useEffect } from 'react';
import "./share.css"
import {PermMedia} from "@mui/icons-material"
import {  fetchAvatar, publishPost, handleImageChange, clearText } from '../util/shareFunction.js';


const Share = ({addPost, currentUserName}) => {

    //const currentUserId = parseInt(localStorage.getItem('userId'));
    //const currentUserName = localStorage.getItem('userName');

    const [newTitle, setNewTitle] = useState('');
    const [newArticle, setNewArticle] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const fileInputRef = useRef(null);


    useEffect(() => {
        fetchAvatar(avatar, setAvatar);
    }, [])
    
    /*const publishPost = () => {
        console.log("Attempting to publish post...")
            if (newTitle.trim() !== '' || newArticle.trim() !== '') {
                const newPostObject = {
                    userId: currentUserId, 
                    authorName: currentUserName, 
                    id: Date.now(), 
                    title: newTitle, 
                    body: newArticle,
                    image: newImage, 
                    ts: new Date().toLocaleString('en-US')
                };
                addPost(newPostObject);
                clearText();
            }
    };*/ 
/*
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            console.log("Image URL:", imageUrl);
            setNewImage(imageUrl);
        }
    }; 


    const clearText = () => {
        setNewTitle(''); 
        setNewArticle('');
        setNewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';  
        }
    };
*/
  return (
    <div className = "share">
        <div className = "shareWrap">
        <div className = " shareTop">
            <img className='shareProfileImg' src={avatar } alt="Profile" />
            <div className="inputWrapper"> 
            <input  type= "text" 
                    className="shareInput" 
                    placeholder= "whats ur title"
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
            ></input>
            <input  type= "text" 
                    className="shareInput" 
                    placeholder= "Write sth in your mind"
                    value={newArticle} 
                    onChange={(e) => setNewArticle(e.target.value)} 
            
            ></input>
            </div>
        </div>
        <hr />
        <div className = "shareBottom">
            <div className= "shareOption">
                <PermMedia className='shareIcon' htmlColor='grey' />
                <input type="file" accept="image/*"  onChange={(e) => handleImageChange(e, setNewImage)} ref={fileInputRef} />
            </div>
            <div className='button'>
            <button className="postButton" onClick={() => publishPost(newTitle, newArticle, newImage,  addPost, () => clearText(setNewTitle, setNewArticle, setNewImage, fileInputRef))}>Post it</button>
            <button className="cancelButton" onClick={() => clearText(setNewTitle, setNewArticle, setNewImage, fileInputRef)} >Cancel</button>

            </div>
        </div>
        
         </div>
        </div>


  )
}

export default Share