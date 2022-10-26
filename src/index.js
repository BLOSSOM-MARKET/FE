import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatMain from './pages/chatmain';
import Chat from './pages/chat';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';

import LoginPage from './components/Login/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
          <SocketContextProvider>
            <UserContextProvider>
              <Routes>
                {/* <Route path="/" element={<ChatMain />} /> */}
                {/* <Route path="/chatroom/:roomId/:userId" element={<Chat />} /> */}
                <Route path="/" element={<LoginPage />} />
              </Routes>
            </UserContextProvider>
          </SocketContextProvider>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
