import * as yup from 'yup';
import yupPassword from 'yup-password';
yupPassword(yup);

const checkDoubleNick = () => {
    // axios 
    // 닉네임 중복 판별
    // function(value){return new Promise((resolve, reject) => {
    //     axios.post('http://localhost:5000/users/register/validEmail', {'email': value})
    //     .then(res => {if(res.data.msg === 'Username already been taken'){resolve(false)} resolve(true)})
    // })

    return false;
}

const presentPWCheck = async () => {
    // axios 
    // 현재 비밀번호 일치여부 판단
    // function(value){return new Promise((resolve, reject) => {
    //     axios.post('http://localhost:5000/users/register/validEmail', {'email': value})
    //     .then(res => {if(res.data.msg === 'Username already been taken'){resolve(false)} resolve(true)})
    // })

    return true;
}


    
const pwField = (code) => yup.string()
                        .required(code + " 비밀번호를 입력해주세요.")
                        .min(4, "비밀번호는 4~20글자입니다.")
                        .max(20, "비밀번호는 4~20글자입니다.");

const userDataValidation = {
    presentPW: pwField("현재")
    .test("presentPWCheck", "현재 비밀번호와 일치하지 않습니다.", presentPWCheck),
newPW: pwField("새로운")
.minLowercase(1, '1개 이상의 소문자 알파벳을 포함해야 합니다.')
.minNumbers(1, '1개 이상의 숫자를 포함해야 합니다.')
.minSymbols(1, '1개 이상의 기호를 포함해야 합니다.'),
newPWCheck: yup.string()
    .required("새로운 비밀번호를 똑같이 입력해주세요.")
    .oneOf([yup.ref('newPW')], "비밀번호가 일치하지 않습니다."),
}



export {checkDoubleNick, presentPWCheck, userDataValidation};