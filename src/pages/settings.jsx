import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SettingsBox from "../components/Box/SettingsBox";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import { UserContext } from "../contexts/UserContext";
import style from "./page.module.scss";

const MyProfile = () => {
    const { userId, nickname } = useContext(UserContext);

    return (
        <div>
            <div className={style.Settings__profile}>
                <div className={style.Settings__profile__icon}>
                <i class="bi bi-info-circle"></i>
                </div>
                <div className={style.Settings__profile__title}>
                    아이디
                </div>
                <div className={style.Settings__profile__content}>
                    {userId}
                </div>
            </div>
            <div className={style.Settings__profile}>
                <div className={style.Settings__profile__icon}>
                    <i class="bi bi-person-fill"></i>
                </div>
                <div className={style.Settings__profile__title}>
                    닉네임
                </div>
                <div className={style.Settings__profile__content}>
                    {nickname}
                </div>
            </div>
        </div>
    );
};

const Withdrawal = () => {
  return (
    <div className={style.Settings__Withdrawal}>
      <button
        className={`btn btn-outline-dark 
                ${style.Settings__Withdrawal__WithdrawalBtn}`}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        회원탈퇴
      </button>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();

  const onWithdraw = () => {
    console.log("회원탈퇴!");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={style.Page}>
      <div className={style.Page__SettingsPage}>
        <SettingsBox title={"내 프로 필"}>
          <MyProfile />
        </SettingsBox>
        <SettingsBox title={"비밀번호 수정"}>
          <ChangePassword />
        </SettingsBox>

        <Withdrawal />
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              정말 탈퇴하시겠습니까? <br />
              회원님의 계정과 관련된 모든 정보가 삭제됩니다.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onWithdraw}
              >
                탈퇴하기
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
