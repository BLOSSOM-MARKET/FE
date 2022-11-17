import style from "./page.module.scss";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { ErrorMessage, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import yupPassword from "yup-password";
import { InputGroup, Modal } from "react-bootstrap";
import { checkPossibleNickname } from "../utils/userInfoUtils";
import { useEffect } from "react";
import axios from "axios";
import AlertModal from "../components/Modal/AlertModal";

const SignUpForm = ({ userMail, setUserMail, isSentAuthMail, setIsSentAuthMail, openAlertModal }) => {
  yupPassword(yup);
  const [isPossibleNickname, setIsPossibleNickname] = useState(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  
  const [isCheckedAuthCode, setIsCheckedAuthCode] = useState(false);
  const [isCorrectAuthCode, setIsCorrectAuthCode] = useState(false);

  const navigate = useNavigate();

  const pwField = () =>
    yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(4, "비밀번호는 4~20글자입니다.")
      .max(20, "비밀번호는 4~20글자입니다.");

  const schema = yup.object().shape({
    email: yup.string().required("사내메일 아이디를 입력해주세요."),
    authCode: yup.string().required("메일로 전달받은 인증 코드를 입력한 후 인증확인을 완료해주세요."),
    nickname: yup.string()
                    .required("닉네임을 입력해주세요."),
                    // .test("doubleNick", "다른 회원과 중복되는 닉네임입니다.", val => checkPossibleNickname(val)),
    username: yup.string()
              .required("이름을 입력해주세요."),
    webPw: pwField()
      .minLowercase(1, "1개 이상의 소문자 알파벳을 포함해야 합니다.")
      .minNumbers(1, "1개 이상의 숫자를 포함해야 합니다.")
      .minSymbols(1, "1개 이상의 기호를 포함해야 합니다."),
    pWCheck: yup
      .string()
      .required("비밀번호를 똑같이 입력해주세요.")
      .oneOf([yup.ref("webPw")], "비밀번호가 일치하지 않습니다."),
  });

  const onSubmit = ({ email, authCode, nickname, username, webPw, pWCheck }, resetForm) => {
    // console.log(email, authCode, nickname, webPw, pWCheck);

    // axios
    // 회원가입
    const data = {
      userId: `${email}@shinsegae.com`,
      userPwd: webPw,
      userNickname: nickname,
      mailKey: authCode,
      mailAuth: isCheckedAuthCode && isCorrectAuthCode,
      userName: username
    }

    axios.post("/api/user/join", data)
    .then((res) => {

      // 로그인페이지로 가기
      navigate("/login");
    })
    .catch((err) => {
      console.error(err);
      // alert("에러가 발생했습니다. 다시 시도해주세요.");
      openAlertModal("에러가 발생했습니다. 다시 시도해주세요.");
    })


    resetForm();
  };

  

  const onCheckNickname = async (nick) => {
    // 닉네임 중복체크

    if (!nick) return;
    
    axios.get("/api/user/check/nickname", {
        params: {
            nickname: nick
        }
    })
    .then((res) => {
      const result = res.data;
      
      if (!!result) {
        setIsCheckedNickname(true);    // 중복확인 완료
        setIsPossibleNickname(true);    // 사용 가능한 닉네임
      } else {
        setIsCheckedNickname(true);    // 중복확인 완료
        setIsPossibleNickname(false);   // 사용 불가능한 닉네임
      }
    })
    .catch((err) => {
        console.error(err);
    })
  }

  // const onSendAuthMail = (id) => {
  //   console.log(id)
  //   const emailAddress = `${id}@shinsegae.com`;
  //   const confirmString = `입력하신 주소로 인증 메일을 보냅니다. \n정확한 메일 주소가 맞는지 다시 한번 확인해주세요. \n${emailAddress}`;
  //   setIsSentAuthMail(false);
    
  //   if (window.confirm(confirmString)) {
  //     // axios
  //     // 메일 발송
  //     axios.post("/api/auth/mail", {
  //       address: emailAddress
  //     })
  //     .then(res => {
  //       setIsSentAuthMail(true);
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //   } 
  // }

  const CustomErrorHandler = ({ isPossibleNickname, isCheckedNickname }) => {
    // 수정 필요...
    
    const { values, errors } = useFormikContext();

    // 닉네임 중복
    useEffect(() => {
      if (!values.nickname) return;   // 입력 전에는 체크x

      if (!!isCheckedNickname && !!isPossibleNickname) {  // 정상적으로 확인 완료
        delete errors["nickname"];
      } else if (!!isCheckedNickname && !isPossibleNickname) {  // 중복확인 했지만 중복 닉네임
        errors.nickname = "이미 사용중인 닉네임입니다.";
      } else {                                          // 중복 확인 안함
        errors.nickname = "닉네임 중복 확인을 해주세요.";
      } 
    }, [errors, values.nickname, isPossibleNickname, isCheckedNickname]);

    
    useEffect(() => {
      setUserMail(values.email);
    }, [values.email])


    // 인증확인 X

    return null;
  }

  const handleChangeNickname = (errors) => {    // 닉네임 변경 시 중복확인 다시 해야함
    setIsCheckedNickname(false);
    setIsPossibleNickname(false);
    errors.nickname = "닉네임 중복 확인을 다시 해주세요.";
  }

  const handleChangeAuthMail = (errors) => {
    setIsSentAuthMail(false);
    setIsCheckedAuthCode(false);
    setIsCorrectAuthCode(false);
    errors.email = "이메일을 변경하셨습니다. 메일 인증을 다시 진행해주세요."
  }

  const handleChangeAuthCode = (errors) => {
    setIsCheckedAuthCode(false);
    setIsCorrectAuthCode(false);
    errors.authCode = "인증코드 일치 여부를 확인해주세요."
  }

  const tryCheckAuthCode = (code) => {
    if (!isSentAuthMail) {
      openAlertModal("인증메일을 먼저 요청한 후에 시도해주세요.");
      return;
    }

    axios.get("/api/auth/check", {
      params: {
        userKey: code
      }
    })
    .then((res) => {
      const result = res.data;
      setIsCheckedAuthCode(true);
      setIsCorrectAuthCode(result);
    })
    .catch((err) => {
      console.error(err);
    })
  }

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
        username: "",
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
          <CustomErrorHandler 
            isPossibleNickname={isPossibleNickname}
            isCheckedNickname={isCheckedNickname}
           />        
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik09">
                <Form.Control
                  className={`${style.SignUp__Form__mailInput} ${style.SignUp__Form__float}`}
                  type="text"
                  placeholder="사내메일 아이디를 입력해주세요"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeAuthMail(errors);
                  }}
                  isValid={touched.email && !errors.email && isSentAuthMail}
                  isInvalid={touched.email && !!errors.email}
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className={`${style.SignUp__Form__mailTag} ${style.SignUp__Form__float}`}
                >
                  @shinsegae.com
                </InputGroup.Text>
                <Button 
                  className={`btn btn-dark ${style.SignUp__btn}`}
                  // onClick={() => onSendAuthMail(values.email)}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  >
                    
                  인증요청
                </Button>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik10">
                <Form.Control
                  className={`${style.SignUp__shortInput} ${style.SignUp__Form__float}`}
                  type="text"
                  placeholder="인증 코드를 입력해주세요"
                  name="authCode"
                  value={values.authCode}
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeAuthCode(errors);
                  }}
                  isValid={touched.authCode && !errors.authCode && isCorrectAuthCode}
                  isInvalid={touched.authCode && !!errors.authCode}
                />
                <Button 
                  className={`btn btn-dark ${style.SignUp__btn}`}
                  onClick={() => tryCheckAuthCode(values.authCode)}>
                  인증확인
                </Button>
              <Form.Control.Feedback type="invalid">
                {errors.authCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.SignUp__row}`}>
            <Form.Group controlId="validationFormik11">
                <Form.Control
                  className={`${style.SignUp__shortInput} ${style.SignUp__Form__float}`}
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  name="nickname"
                  value={values.nickname}
                  onChange={(e) => {
                    handleChange(e)
                    handleChangeNickname(errors)
                  }}
                  isValid={touched.nickname && !errors.nickname && isPossibleNickname}
                  isInvalid={touched.nickname && !!errors.nickname}
                />
                <Button 
                  className={`btn btn-dark ${style.SignUp__btn}`}
                  onClick={() => onCheckNickname(values.nickname)}
                  >
                  중복확인
                </Button>
              <Form.Control.Feedback type="invalid">
                {errors.nickname}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.PWForm__row}`}>
            <Form.Group controlId="validationFormik12">
              <Form.Label>이름</Form.Label>
              <Form.Control
                className={style.SignUp__longInput}
                type="text"
                placeholder="이름을 입력해주세요"
                name="username"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className={`mb-3 ${style.PWForm__row}`}>
            <Form.Group controlId="validationFormik13">
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
            <Form.Group controlId="validationFormik14">
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

  const [userMail, setUserMail] = useState("");
  const [isSentAuthMail, setIsSentAuthMail] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // const alertModal = useRef();

  const sendAuthMail = () => {
    const emailAddress = `${userMail}@shinsegae.com`;
    axios.post("/api/auth/mail", {
      address: emailAddress
    })
    .then(res => {
      setIsSentAuthMail(true);
    })
    .catch(err => {
      console.error(err);
    })
  }

  const openAlertModal = (errTxt) => {
    setErrorMsg(errTxt);
    setModalShow(true);
  }

  return (
    <div className={style.Page}>
      <div className={style.SignUp__wrapper}>
        <div className={style.SignUp}>
            <div className={style.SignUp__logo__wrapper}>
                <img onClick={() => navigate("/")} 
                    className={style.SignUp__logo} src="/bm_logo.png" alt="logo" />
            </div>
          <SignUpForm
            userMail={userMail}
            setUserMail={setUserMail}
            isSentAuthMail={isSentAuthMail}
            setIsSentAuthMail={setIsSentAuthMail}
            openAlertModal={openAlertModal}
          />
        </div>
      </div>

      {/* send mail confirm modal */}
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
              입력하신 주소로 인증 메일을 보냅니다. <br/>
              다음 메일 주소가 맞는지 다시 한번 확인해주세요. <br/>
              <div className={style.SignUp__mailModal__addressBox}>
                <div className={style.SignUp__mailModal__addressBox__inner}>
                  <i className="bi bi-envelope"></i>
                  <strong>{userMail}@shinsegae.com</strong>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={sendAuthMail}
              >
                인증 메일 전송
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* alert modal */}
      <AlertModal
        errorMsg={errorMsg}
        modalShow={modalShow}
        setModalShow={setModalShow}
       />


    </div>
  );
};

export default SignUp;
