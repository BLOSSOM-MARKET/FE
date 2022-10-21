import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatMain from './pages/chatmain';
import Chat from './pages/chat';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';

const App = () => {
    return (
        <BrowserRouter>
          <SocketContextProvider>
            <UserContextProvider>
              <Routes>
                <Route path="/" element={<ChatMain />} />
                {/* <Route path="/chatroom/:roomId/:userId" element={<Chat />} /> */}
              </Routes>
            </UserContextProvider>
          </SocketContextProvider>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
