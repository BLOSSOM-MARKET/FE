import React from 'react';
import ChatRoomEntry from '../containers/ChatRoomEntry';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    console.log("main");
    return (
        <div>
            <ChatRoomEntry /> 
            <ToastContainer/>
        </div>
    );
}

export default Main;
