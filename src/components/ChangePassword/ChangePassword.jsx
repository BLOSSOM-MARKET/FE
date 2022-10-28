import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import style from "./ChangePassword.module.scss";

import { Formik } from "formik";
import * as yup from 'yup';
import yupPassword from 'yup-password';
import { presentPWCheck, userDataValidation } from '../../utils/userInfoUtils';

const ChangePassword =() => {

    yupPassword(yup);
    
    const pwField = (code) => yup.string()
                            .required(code + " 비밀번호를 입력해주세요.")
                            .min(4, "비밀번호는 4~20글자입니다.")
                            .max(20, "비밀번호는 4~20글자입니다.");

    
    const schema = yup.object().shape({
        presentPW: pwField("현재")
        .test("presentPWCheck", "현재 비밀번호와 일치하지 않습니다.", presentPWCheck),
        newPW: pwField("새로운")
                .minLowercase(1, '1개 이상의 소문자 알파벳을 포함해야 합니다.')
                .minNumbers(1, '1개 이상의 숫자를 포함해야 합니다.')
                .minSymbols(1, '1개 이상의 기호를 포함해야 합니다.'),
        newPWCheck: yup.string()
                    .required("새로운 비밀번호를 똑같이 입력해주세요.")
                    .oneOf([yup.ref('newPW')], "비밀번호가 일치하지 않습니다."),
      });

    const onSubmit = ({newPW}, resetForm) => {
        console.log(newPW)
        // axios
        // 비밀번호 변경

        resetForm();
    }

  return (
    <div className={style.PWForm}>
        <Formik
        validateOnChange
        enableReinitialize 
        validationSchema={schema}
        onSubmit={(values, {resetForm}) => onSubmit(values, resetForm)}
        initialValues={{
            presentPW: '',
            newPW: '',
            newPWCheck: '',
        }}
        >
        {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isValid,
            dirty
        }) => (
            <Form noValidate onSubmit={handleSubmit}>
            <Row className={`mb-3 ${style.PWForm__row}`}>
                <Form.Group as={Col} md="10" controlId="validationFormik01">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="현재 비밀번호를 입력해주세요"
                    name="presentPW"
                    value={values.presentPW}
                    onChange={handleChange}
                    isValid={touched.presentPW && !errors.presentPW}
                    isInvalid={!!errors.presentPW}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                <Form.Control.Feedback type="invalid">
                    {errors.presentPW}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className={`mb-3 ${style.PWForm__row}`}>
                <Form.Group as={Col} md="10" controlId="validationFormik05">
                <Form.Label>새 비밀번호</Form.Label>
                <span className={style.PWForm__Desc}>
                    1개 이상의 소문자, 숫자, 기호를 사용하여 4~20글자로 만들어주세요
                </span>
                <Form.Control
                    type="password"
                    placeholder="새 비밀번호를 입력해주세요"
                    name="newPW"
                    value={values.newPW}
                    onChange={handleChange}
                    isValid={touched.newPW && !errors.newPW}
                    isInvalid={!!errors.newPW}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.newPW}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className={`mb-3 ${style.PWForm__row}`}>
                <Form.Group as={Col} md="10" controlId="validationFormik06">
                <Form.Label>새 비밀번호 확인</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="새 비밀번호를 똑같이 입력해주세요"
                    name="newPWCheck"
                    value={values.newPWCheck}
                    onChange={handleChange}
                    isValid={touched.newPWCheck && !errors.newPWCheck}
                    isInvalid={!!errors.newPWCheck}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.newPWCheck}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className={`mb-3 ${style.PWForm__row}`}>
                <Button 
                        className={`btn btn-dark ${style.PWForm__submitBtn}`} type="submit"
                        disabled={!(dirty && isValid)}>
                    비밀번호 변경
                </Button>
            </Row>
            </Form>
        )}
        </Formik>
    </div>
  );
}

export default ChangePassword;