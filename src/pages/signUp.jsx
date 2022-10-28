import style from "./page.module.scss";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import yupPassword from "yup-password";
import { InputGroup } from "react-bootstrap";
import { checkDoubleNick } from "../utils/userInfoUtils";

const SignUpForm = () => {
  yupPassword(yup);

  const pwField = () =>
    yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(4, "비밀번호는 4~20글자입니다.")
      .max(20, "비밀번호는 4~20글자입니다.");

  const schema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주세요."),
    authCode: yup.string().required("이메일을 입력해주세요."),
    nickname: yup.string()
                    .required("닉네임을 입력해주세요.")
                    .test("doubleNick", "다른 회원과 중복되는 닉네임입니다.", checkDoubleNick),
    webPw: pwField()
      .minLowercase(1, "1개 이상의 소문자 알파벳을 포함해야 합니다.")
      .minNumbers(1, "1개 이상의 숫자를 포함해야 합니다.")
      .minSymbols(1, "1개 이상의 기호를 포함해야 합니다."),
    pWCheck: yup
      .string()
      .required("비밀번호를 똑같이 입력해주세요.")
      .oneOf([yup.ref("newPW")], "비밀번호가 일치하지 않습니다."),
  });

  const onSubmit = ({ newPW }, resetForm) => {
    console.log(newPW);
    // axios
    // 비밀번호 변경

    resetForm();
  };

  return (
    <Formik
      validateOnChange
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      initialValues={{
        email: "",
        authCode: "",
        webPw: "",
        nickname: "",
        pWCheck: "",
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
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik09">
              <div className={style.SignUp__Form__rowWrapper}>
                <Form.Control
                  className={style.SignUp__Form__mailInput}
                  type="text"
                  placeholder="회사메일"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className={style.SignUp__Form__mailTag}
                >
                  @shinsegae.com
                </InputGroup.Text>
                <Button className={`btn btn-dark ${style.SignUp__btn}`}>
                  인증요청
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik10">
              <div className={style.SignUp__Form__rowWrapper}>
                <Form.Control
                className={style.SignUp__shortInput}
                  type="text"
                  placeholder="인증번호"
                  name="authCode"
                  value={values.authCode}
                  onChange={handleChange}
                  isValid={touched.authCode && !errors.authCode}
                  isInvalid={touched.authCode && !!errors.authCode}
                />
                <Button className={`btn btn-dark ${style.SignUp__btn}`}>
                  인증확인
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.authCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik11">
              <div className={style.SignUp__Form__rowWrapper}>
                <Form.Control
                    className={style.SignUp__shortInput}
                  type="text"
                  placeholder="닉네임"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  isValid={touched.nickname && !errors.nickname}
                  isInvalid={touched.nickname && !!errors.nickname}
                />
                <Button className={`btn btn-dark ${style.SignUp__btn}`}>
                  중복확인
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.nickname}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.PWForm__row}`}>
            <Form.Group controlId="validationFormik12">
              <Form.Label>비밀번호</Form.Label>
              <span className={style.SignUp__Desc}>
                1개 이상의 소문자, 숫자, 기호를 사용하여 4~20글자로 만들어주세요
              </span>
              <Form.Control
                className={style.SignUp__longInput}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="webPw"
                value={values.webPw}
                onChange={handleChange}
                isValid={touched.webPw && !errors.webPw}
                isInvalid={touched.webPw && !!errors.webPw}
              />
              <Form.Control.Feedback type="invalid">
                {errors.webPw}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.PWForm__row}`}>
            <Form.Group controlId="validationFormik13">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                className={style.SignUp__longInput}
                type="password"
                placeholder="비밀번호를 똑같이 입력해주세요"
                name="pWCheck"
                value={values.pWCheck}
                onChange={handleChange}
                isValid={touched.pWCheck && !errors.pWCheck}
                isInvalid={touched.pWCheck && !!errors.pWCheck}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pWCheck}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            className={`btn btn-dark ${style.SignUp__SignUpBtn}`}
            type="submit"
          >
            회원가입
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const { setIsSignUp, setUserId, setYourNick } = useContext(UserContext);

  const isReady = (id, pw) => {
    return id && pw && id.length > 0 && pw.length > 0;
  };

  const onSubmit = ({ webId, webPw }) => {
    console.log(webId, webPw);
    if (!isReady(webId, webPw)) return;

    // axios
    // 로그인처리
    // 토큰 저장 필요

    // 더미데이터
    const userData = {
      userId: "user1@shinsegae.com",
      nickname: "hyegu",
    };
  };

  return (
    <div className={style.Page}>
      <div className={style.SignUp__wrapper}>
        <div className={style.SignUp}>
            <div className={style.SignUp__logo__wrapper}>
                <img onClick={() => navigate("/")} 
                    className={style.SignUp__logo} src="/bm_logo.png" alt="logo" />
            </div>
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
