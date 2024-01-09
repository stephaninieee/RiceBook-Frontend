import React, {useState, useEffect} from 'react'
import Nav from '../../components/Nav.js'
import Sidebar from '../../components/Sidebar.js'
import Rightbar from '../../components/Rightbar.js'
import Post from '../../components/Post.js'
import "./home.css"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Profile from "../../components/Profile.js"
import Feed from '../../components/Feed.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';






    // const Home = () => {
    // return  (
    //     <BrowerserRouter>
    //         <Routes>
    //             <Route path = "/" element = {Profile}></Route>
    //         </Routes>
    //     </BrowerserRouter>
    //     <div>
    //         <Nav />
    //         <div className = "homeContainer">
    //             <Sidebar />
    //             <Post />
    //             <Rightbar  />
    //         </div>
    //     </div>
    // )
    // }

   

    const Home = () => {

        const [searchTerm, setSearchTerm] = useState('');
        const [friends, setFriends] = useState([]);

      
        
       
       
        return ( 
            <div>
              <Nav setSearchTerm={setSearchTerm}  />
              <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-7">
                        <Feed searchTerm={searchTerm}  friends={friends} />
                    </div>
                    <div className="col-md-3">
                        <Rightbar  friends={friends} setFriends={setFriends} />
                    </div>
                </div>
            </div>
            
            </div>
    
    
        );
      }
      

export default Home