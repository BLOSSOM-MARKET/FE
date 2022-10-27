import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
// import Logout from "../../utils/logout";
import NavBar from "../SearchBar/SearchBar";
import style from "./Header.module.scss";

const Header = () => {
    const { Logout, isLogin, userId, nickname } = useContext(UserContext);
    const navigate = useNavigate();

    const onClickLogIn = () => {
        if (isLogin) {
            // 로그인상태면 로그아웃
            console.log("로그아웃!!!!!");
            Logout();
        } else {
            // 로그아웃상태면 로그인페이지로
            console.log("로그인!!!!");
            navigate("/login");
        }
    }

    console.log("Header isLogin:", isLogin)

    return (
        <header className={style.Header}>
            <div className={style.WelcomeBar}>
                {
                    <>
                        {
                            isLogin &&
                            <span className={style.WelcomeBar__WelcomeMsg}>
                                {`${nickname}님, 환영합니다!`}
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
    )
}

export default Header;