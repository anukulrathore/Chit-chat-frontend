import React, { useEffect } from 'react'
import {user} from './../Join/Join'
import './Chat.css'
import socketIo from 'socket.io-client';
import send from './../../images/send.png';
import { useState } from 'react';
import Msgcomp from '../Message/Msgcomp';
import ScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from './../../images/closeIcon.png'
const ENDPOINT = "https://chit-chat-server-ohox.onrender.com";
var socket;

const Chat = () => {
  
  const [id,setId] = useState("");
  const [msg,setMsg] = useState([]);
  
  const sendMsg = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('sentmsg',{message,id});
    document.getElementById('chatInput').value = '';
  }

  useEffect(()=>{
    socket = socketIo(ENDPOINT, { transports: ['websocket']});
    socket.on('connect', ()=> {
        setId(socket.id);
    socket.emit('joined', {user});
    socket.on('userjoined', (data)=>{
      setMsg([...msg, data]);
    })
    socket.on('welcome', (data)=>{
      setMsg([...msg, data]);
    })
    socket.on('leave', (data)=>{
      setMsg([...msg, data]);
    })
    
    })

    return ()=>{
      socket.on('disconnect',()=>{
        socket.off();
      });
      
    }
  }, [])

  useEffect(()=>{
    socket.on('sharemsg', (data)=>{
      setMsg([...msg, data]);
    })
    return ()=>{
      socket.off();
    }
  },[msg])
  
  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='chatHeader'>
        <h2>C CHAT</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                    </div>        
        <ScrollToBottom className='chatBox'>
        
          {msg.map((item, i) => {
  console.log('Current id:', id);
  return (
    <Msgcomp
      user={item.id === id ? "You" : item.user}
      message={item.message}
      cls={item.id === id ? 'left' : 'right'}
    />
  );
})}
        </ScrollToBottom>
        <div className='chatInput'>
            <input onKeyDown={(event)=> event.key==='Enter'? sendMsg() : null} type='text' id='chatInput'></input>
            <button type='submit' onClick={sendMsg} className='sendBtn'><img src={send} alt="send" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat
