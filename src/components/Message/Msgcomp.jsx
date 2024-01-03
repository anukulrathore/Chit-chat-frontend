import React from 'react'
import  './Msgcomp.css'

const Msgcomp = ({user,message,cls}) => {
    
  return (
    <div className={`messageBox ${cls}`}>
      {`${user}:${message}`}
    </div>
  )
}

export default Msgcomp
