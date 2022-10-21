import { useState, useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Message from '../Message';
import style from './Chat.module.scss';

import moment from 'moment';

const ChatList = ({}) => {

    
    useEffect(() => {
        
    }, []);



    return (
        <Container maxWidth="sm" className={style.Chat__wrapper}>
            <List className={style.Chat__list} >
                {}
            </List>
        </Container>
    )
}

export default ChatList;