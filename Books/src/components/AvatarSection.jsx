import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { render } from '../store/user';

// AvatarSection Component
const AvatarSection = ({ username, avatarUrl }) => {
const [avatars,setAvatars]=useState();
const userId=useSelector((state)=>state.user.data.result[0]._id);
const dispatch=useDispatch();

useEffect(()=>{
  try {
    fetch('http://localhost:3000/api/avatar/avatars')
    .then((res)=>res.json())
    .then((data)=>{
      setAvatars(data.result);
    })
  } catch (error) {
  }
},[])

let setImage=(url)=>{
  try {
    fetch('http://localhost:3000/api/user/changeProfilePicture',{
      method:"post",
      headers:
      {"Content-type":"application/json"},
      body:
      JSON.stringify({
        userId:userId,
        url:url
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
    })
  } catch (error) {
  }
  dispatch(render())
}

  return (
    <div style={styles.container}>  
    {avatars?avatars.map((el)=>(
    <div key={el.url}>
      <img 
        src={el.url} 
        alt="Avatar"
        style={styles.avatar}
      />
      <p style={styles.username}>{username || "Anonymous"}</p>
      <button onClick={()=>setImage(el.url)}>Select</button>
      </div>
    )):null}
    </div>
  );
};

// Styles for the AvatarSection
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '150px',
    textAlign: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  username: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  }
};

export default AvatarSection;
