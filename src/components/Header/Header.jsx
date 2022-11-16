import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
// import Logout from "../../utils/logout";
import NavBar from "../SearchBar/SearchBar";
import style from "./Header.module.scss";

const Header = () => {
    const { Logout, isLogin, userId, nickname } = useContext(UserContext);
    const [show, setShow] = useState(true);

    const navigate = useNavigate();
    const loc = useLocation();
    const path = loc.pathname;

    useEffect(() => {
        if (path === "/login" || path === "/signup") {
            setShow(false);
        } else if (!show) {
            setShow(true);
        }
    }, [path])

    const onClickLogIn = () => {
        if (isLogin) {
            // 로그인상태면 로그아웃
            Logout();
        } else {
            // 로그아웃상태면 로그인페이지로
            navigate({
                pathname: '/login',
                search: `?${createSearchParams({
                    prev: path
                })}`
            });
        }
    }

    return (
        <div>
            {
                show
                &&
                
                <header className={style.Header}>
                    <div className={style.WelcomeBar}>
                        {
                            <>
                                {
                                    isLogin 
                                    ?
                                    <span className={style.WelcomeBar__WelcomeMsg}>
                                        <span 
                                            onClick={() => navigate("/mypage")}
                                            className={style.WelcomeBar__nickname}
                                        >
                                            {nickname}
                                        </span>
                                        {`님, 환영합니다!`}
                                    </span>
                                    :
                                    <span className={style.WelcomeBar__signUpBtn}
                                     onClick={() => navigate("/signup")}
                                    >{"회원가입"}
                                    </span>
                                }
                                <span className={style.WelcomeBar__logInBtn}
                                    onClick={onClickLogIn}
                                >{isLogin ? "로그아웃" : "로그인"}
                                </span>
                            </>
                        }
                    </div>
                    <NavBar />
                </header>
            }
        </div>
    )
}

export default Header;