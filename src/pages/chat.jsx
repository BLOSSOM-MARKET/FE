import React from 'react';
import { ToastContainer } from "react-toastify";

import ChatContainer from '../containers/Chat';

import style from './page.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import ChatListContainer from '../containers/ChatList';

const Chat = () => {
    return (
        <div className={style.ChatPop}>
            {/* <ChatContainer />  */}
            <ChatListContainer />
            <ToastContainer/>
        </div>
    );
}

export default Chat;
