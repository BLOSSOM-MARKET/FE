import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SettingsBox from "../components/Box/SettingsBox";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import { UserContext } from "../contexts/UserContext";
import style from "./page.module.scss";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Formik } from "formik";
import * as yup from 'yup';
import { isPossibleNickname } from "../utils/userInfoUtils";

import axios from 'axios';

const MyProfile = ({ userId, nickname }) => {
  const { setNickname } = useContext(UserContext);

    const schema = yup.object().shape({
        nickname: yup.string()
                    .required("닉네임을 입력해주세요.")
                    .test("doubleNick", "다른 회원과 중복되는 닉네임입니다.", isPossibleNickname),
      });

    const onSubmit = ({ nickname }) => {
        console.log(nickname)
        // axios
        // 닉네임 변경
        axios
        .post('/api/mypage/profile/updatenickname', {
          params: {
            nickName: nickname,
            userId: userId
          }
        })
        .then((res) => {
          console.log(res);

          // client에서도 닉네임 변경
          sessionStorage.setItem("nickname", nickname);
          setNickname(nickname);
        })
        .catch((e) => {
          console.error(e);
          alert(`오류가 발생했습니다. 다시 시도해주세요.(${e.status})`)
        });
    }
      
  return (
    <div>
      <div className={style.Settings__profile}>
        <div className={style.Settings__profile__icon}>
          <i className="bi bi-info-circle"></i>
        </div>
        <div className={style.Settings__profile__title}>아이디</div>
        <div className={style.Settings__profile__content}>{userId}</div>
      </div>
      <div className={style.Settings__profile}>
        <div className={style.Settings__profile__icon}>
          <i className="bi bi-person-fill"></i>
        </div>
        <div className={style.Settings__profile__title}>닉네임</div>
        <div className={style.Settings__profile__content}>
          <Formik
            validateOnChange
            enableReinitialize
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
              nickname: nickname
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isValid,
              dirty,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className={`mb-3 ${style.Settings__profile__row}`}>
                  <Form.Group as={Col} md="8" controlId="validationFormik07">
                    <Form.Control
                      type="text"
                      placeholder="닉네임"
                      name="nickname"
                      value={values.nickname}
                      onChange={handleChange}
                      isValid={touched.nickname && !errors.nickname}
                      isInvalid={!!errors.nickname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nickname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    className={`btn btn-dark ${style.Settings__profile__changeBtn}`}
                    type="submit"
                    disabled={!(dirty && isValid)}
                  >
                    변경
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
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
  const { Logout, isLogin, userId, nickname } = useContext(UserContext);

  const onWithdraw = () => {
    console.log("회원탈퇴!");
    Logout();
    navigate("/");
  };

  return (
    <>
      <div className={style.Page}>
        <div className={style.Page__SettingsPage}>
          {isLogin ? (
            <>
              <SettingsBox title={"내 프로필"}>
                <MyProfile userId={userId} nickname={nickname} />
              </SettingsBox>
              <SettingsBox title={"비밀번호 변경"}>
                <ChangePassword />
              </SettingsBox>

              <Withdrawal />
            </>
          ) : (
            <div>
              로그인해주세요
            </div>
          )}
        </div>
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
    </>
  );
};

export default Settings;
