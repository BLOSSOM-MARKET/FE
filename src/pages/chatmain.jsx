import React from 'react';
import ChatRoomEntry from '../containers/ChatRoomEntry';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Main = () => {
    const [showChat, setShowChat] = useState(false);
    const loc = useLocation();
    const path = loc.pathname;

    useEffect(() => {
        const notShowChat = (path === "/login" || path === "/signup");
        setShowChat(!notShowChat);
    }, [path])
    
    return (
        <div>
            {
                showChat
                &&
                <>
                    <ChatRoomEntry /> 
                    <ToastContainer/>
                </>
            }
        </div>
    );
}

export default Main;
