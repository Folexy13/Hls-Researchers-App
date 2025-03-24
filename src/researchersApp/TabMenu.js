import React from 'react'

                                              
function TabMenu(props) {

  const handleClick = (index)=>{
    props.onTabClick(index)
}                 
  return (
    <div className="tab-menu">
      <button onClick = {()=>handleClick(1)}  className= "tab-button" id="user-profile-button">User Profile</button>
      <button onClick = {()=>handleClick(2)}  className= "tab-button" id="select-supplements-button">Select Supplements</button>
      <button onClick = {()=>handleClick(3)}  className= "tab-button" id="gallery-button">Gallery</button>
    </div>
  )
}

export default TabMenu