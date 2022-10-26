import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import NavBar from "../NavBar/NavBar";
import style from "./Header.module.scss";

const Header = () => {
    const { isLogin, userId, nickname, 
        setIsLogin, setNickname, setUserId, setYourNick, setRoomId, setIsChatOpen, setIsInChatroom } = useContext(UserContext);
    const navigate = useNavigate();

    const onClickLogIn = () => {
        if (isLogin) {
            // 로그인상태면 로그아웃
            console.log("로그아웃!!!!!");
            setIsLogin(false);
            setNickname('defaultNick');
            setUserId('defaultUserId');
            setYourNick(null);
            setRoomId('myRooms');
            setIsChatOpen(false);
            setIsInChatroom(false);
            sessionStorage.clear();

        } else {
            // 로그아웃상태면 로그인페이지로
            console.log("로그인!!!!");
            navigate("/login");
        }
    }

    return (
        <header className={style.Header}>
            <div className={style.WelcomeBar}>
                {
                    <>
                        <span className={style.WelcomeBar__WelcomeMsg}>{`${nickname}님, 환영합니다!`}</span>
                        <span className={style.WelcomeBar__logInBtn}
                            onClick={onClickLogIn}
                        >{isLogin ? "로그아웃" : "로그인"}
                        </span>
                    </>
                }
            </div>
            <NavBar />
        </header>
    )
}

export default Header;