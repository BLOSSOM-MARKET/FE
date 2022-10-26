import React, {useState} from 'react'
import "./LoginRegister.css"

function LoginPage() {
  const [userId, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState(""); 
  
  const onUserIdHandler = (event) => {
    setUserID(event.currentTarget.value);
  }

  const onUserPWDHandler = (event) => {
    setUserPWD(event.currentTarget.value)
}

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
      <div class="loginregister">
        <form>
            <div><input name="userID" type="text" placeholder="아이디" value={userId} onChange={onUserIdHandler} class="loginregister__input"/></div>
            <div><input name="userPWD" type="password" placeholder="비밀번호" value={userPWD} onChange={onUserPWDHandler} class="loginregister__input"/></div>
            <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">로그인</button></div>
        </form>
      </div>
    );
  }

export default LoginPage;