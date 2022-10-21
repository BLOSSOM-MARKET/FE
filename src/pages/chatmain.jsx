import React from 'react';
import ChatRoomEntry from '../containers/ChatRoomEntry';
import { ToastContainer } from "react-toastify";

import style from './page.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    console.log("main");
    return (
        <div className={style.Page}>
            <ChatRoomEntry /> 
            <ToastContainer/>
        </div>
    );
}

export default Main;
