import axios from 'axios';
import * as yup from 'yup';
import yupPassword from 'yup-password';
yupPassword(yup);


const checkPossibleNickname = async (nickname) => {
    // axios 
    // 닉네임 중복 판별
    axios.get("/api/user/check/nickname", {
        params: {
            nickname: nickname
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        return false;
    })
}

    
const pwField = (code) => yup.string()
                        .required(code + " 비밀번호를 입력해주세요.")
                        .min(4, "비밀번호는 4~20글자입니다.")
                        .max(20, "비밀번호는 4~20글자입니다.");

const userDataValidation = {
    presentPW: pwField("현재"),
newPW: pwField("새로운")
.minLowercase(1, '1개 이상의 소문자 알파벳을 포함해야 합니다.')
.minNumbers(1, '1개 이상의 숫자를 포함해야 합니다.')
.minSymbols(1, '1개 이상의 기호를 포함해야 합니다.'),
newPWCheck: yup.string()
    .required("새로운 비밀번호를 똑같이 입력해주세요.")
    .oneOf([yup.ref('newPW')], "비밀번호가 일치하지 않습니다."),
}



export {checkPossibleNickname, userDataValidation};