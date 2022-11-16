import style from "./page.module.scss";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChattingContext } from "../contexts/ChattingContext";
import axios from "axios";

const LoginForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    webId: yup.string().required("아이디를 입력해주세요."),
    webPw: yup.string().required("비밀번호를 입력해주세요."),
  });

  return (
    <Formik
      validateOnChange
      enableReinitialize
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        webId: "",
        webPw: "",
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
          <Row className={`mb-3 ${style.Login__row}`}>
            <Form.Group controlId="validationFormik08">
              <Form.Control
                type="text"
                placeholder="아이디 (이메일 형식)"
                name="webId"
                value={values.webId}
                onChange={handleChange}
                //   isValid={touched.webId && !errors.webId}
                isInvalid={touched.webId && !!errors.webId}
              />
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.Login__row}`}>
            <Form.Group controlId="validationFormik09">
              <Form.Control
                type="password"
                placeholder="비밀번호"
                name="webPw"
                value={values.webPw}
                onChange={handleChange}
                //   isValid={touched.webPw && !errors.webPw}
                isInvalid={touched.webPw && !!errors.webPw}
              />
              <Form.Control.Feedback type="invalid">
                {errors.webPw && errors.webId
                  ? "아이디와 패스워드를 입력해주세요."
                  : errors.webPw
                  ? errors.webPw
                  : errors.webId && errors.webId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button
            className={`btn btn-dark ${style.Login__LoginBtn}`}
            type="submit"
          >
            로그인
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const prevPath = searchParams.get("prev");
  console.log(prevPath);

  const { setIsLogin, setUserId } = useContext(UserContext);
  const { setYourNick } = useContext(ChattingContext);

  const isReady = (id, pw) => {
    return id && pw && id.length > 0 && pw.length > 0;
  };

  const isLoginSuccess = (val) => {
    return val === "ACCEPTED";
  };

  const onSubmit = ({ webId, webPw }) => {
    console.log(webId, webPw);
    if (!isReady(webId, webPw)) {
      alert("값을 모두 입력해주세요");
      return;
    }

    // axios
    // 로그인처리

    axios
      .post("/api/login", {
        userId: webId,
        userPwd: webPw,
      })
      .then((res) => {
        console.log(res);
        const loginResult = res.data.status;

        if (isLoginSuccess(loginResult)) {
          // 로그인 성공 시

          const userData = res.data;

          sessionStorage.setItem("userId", userData.userId);
          sessionStorage.setItem("nickname", userData.nickname);
          sessionStorage.setItem("isLogin", true);
          setIsLogin(true);
          setUserId(userData.userId);
          setYourNick(userData.nickname);

          // 이전 페이지/메인페이지로 이동
          const targetPath = prevPath ? prevPath : "/";
          window.location.href = targetPath;
          
        } else {
          // 로그인 실패 시
          alert("로그인 정보를 다시 입력해주세요");
        }
      });

  };

  return (
    <div className={style.Page}>
      <div className={style.Login__wrapper}>
        <div className={style.Login}>
          <img
            className={style.Login__logo}
            src="/bm_logo.png"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <LoginForm onSubmit={onSubmit} />
          <div className={style.Login__signUpBtn__wrapper}>
            <button
              className={style.Login__signUpBtn}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
