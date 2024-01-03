import React from 'react'
import './Join.css';
import logo from './../../images/logo.png';
import { Link } from 'react-router-dom';


let user;
  

const Join = () => {

    const setUser = () =>{
        user  = document.getElementById('inputfield').value;
        document.getElementById('inputfield').value='';
        
      }
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <h1>Chit Chat</h1>
            <img src={logo} alt=''></img>
            <input type="text" placeholder='Enter Your name' id='inputfield'/>
            <Link to='/chat'><button onClick={setUser} type='submit' className='button'>Login</button></Link>
            
        </div>
      
    </div>
  )
}

export default Join
export { user }