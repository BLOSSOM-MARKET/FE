import React, { useState } from 'react';
//import React from 'react';
//import '../Upload/Upload.module.scss';
import style from "./page.module.scss";
import 'antd/dist/antd.css';
import { Form, Divider, Input, InputNumber, Button, Upload } from 'antd';
import styleBtn from "../components/SearchBar/SearchBar.module.scss";
import styleLabel from "../components/Upload/Upload.module.scss";
//import categotyStyle from "../components/SearchBar/SearchBar.module.scss"

{/* <script>
    {$("#searchKeyword").keyup(function(e) {
    var content = $(this).val();
    $("#textLengthCheck").val("(" + content.length + "/ 30)"); //실시간 글자수 카운팅
		if (content.length > 30) {
        Alert("최대 30자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 30));
    $('#textLengthCheck').html("(200 / 최대 200자)");
		}
	})}
</script> */}

const Uploadpage = (props) => {

    //이미지 경로 상태관리 추가
    const [imageUrl, setImageUrl] = useState(null);

    //이미지 처리 함수
    const onChangeImage = (info) => {
        //파일이 업로드 중일 때
        console.log(info.file)
        if (info.file.status === "uploading") {
            return
        }

        //파일이 업로드 완료
        if (info.file.status === "done") {
            const response = info.file.response
            const imageUrl = response.imageUrl

            //받은 이미지 경로를 imageUrl에 넣어줌
            setImageUrl(imageUrl);
        }
    }

    function lengthCheck(str) {
        return str.value.length
    }

    return (
        <div className={style.Page}>
            <form name="productUpload">
                <span className={styleLabel.infolabel__boldfont}>
                    기본정보
                </span>
                <span class="text-danger">   *필수항목</span>
                <div class="position-relative">
                    <Form.Item name="imgUpload d-inline p-2 position-absolute start-0">
                        <Upload name="image" action="http://localhost:3000/image"
                            listType="picture" showUploadList={false} onChange={onChangeImage}>

                            {/* 업로드 이미지가 있으면 이미지를 나타내고 업로드 이미지가 없으면
                        회색배경에 업로드 아이콘이 나타나도록 ... */}
                            {imageUrl ? <img src={imageUrl}
                                alt="" width="200px" height="200px" /> :
                                (<div id="upload-img-placeholder">
                                    <img src="/camera.png" alt="" className={`cameraIcon ${style.Settings__CameraIcon__size}`} />
                                </div>)}
                        </Upload>
                        <span className="text-primary">
                            <span class="fw-semibold position-absolute fs-5 top-50 start-40 ">
                                *이미지를 클릭할 경우 이미지 등록을 할 수 있습니다.
                                <br>
                                </br>
                                <label class="fw-normal fs-6 styleLabel.smallfont">
                                    -상품 이미지는 최대 5개까지 등록 가능합니다.<br>
                                    </br>
                                    -큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br>
                                    </br>
                                    -대표이미지는 마지막으로 등록된 사진으로 보여집니다.
                                </label>
                            </span>
                        </span>
                    </Form.Item>
                </div>
                <form class="row g-3">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" className={`btn btn-outline-dark ${styleBtn.Nav__SearchBtn} ${styleLabel.Btn}`}>
                            등록하기
                        </button>
                    </div>
                    <div class="row g-3">
                        <div className={styleLabel.h1}></div>
                        <div class="row mb-3">
                            <label for="inputProName" class="col-sm-2 col-form-label">
                                <label class="fs-3">제목</label>
                                <label class="fs-3 text-danger">*</label>
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" id="inputProName" required minlength="0" maxlength="30" placeholder="상품 제목을 입력하세요." />
                                <div class="text-end"><span class="proname" onChange={lengthCheck}></span>/30</div>
                            </div>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div class="col-md-6">
                            <label for="inputAddress" class="form-label">카테고리<span class="text-danger">*</span></label>
                            <select id="inputCategory" class="form-select">
                                <option selected>전체</option>
                                <option>생활/주방/가구/건강</option>
                                <option>가전/IT</option>
                                <option>의류/잡화</option>
                                <option>스포츠/레저/자동차</option>
                                <option>화장품/미용</option>
                                <option>유아동/도서/문구</option>
                                <option>식품</option>
                                <option>청소/생활용품</option>
                                <option>기타</option>
                            </select>

                        </div>
                        <div class="col-md-6">
                            <label for="inputAddress" class="form-label">지역<span class="text-danger">*</span></label>
                            <select id="inputState" class="form-select">
                                <option selected>지역을 선택해주세요</option>
                                <option>명동</option>
                                <option>성수</option>
                                <option>경기</option>
                                <option>김포</option>
                                <option>부산</option>
                            </select>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">가격<span class="text-danger">*</span></label>
                            <input type="text" class="form-control width=15px" id="inputCity" placeholder="숫자만 입력해주세요" />원
                        </div>
                        <div class="col-md-6">
                            <label for="inputState" class="form-label">상태<span class="text-danger">*</span></label>
                            <select id="inputState" class="form-select">
                                <option selected>판매중</option>
                                <option>예약중</option>
                                <option>판매완료</option>
                            </select>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div class="col-12" className={styleLabel.textArea}>
                            <label for="inputContent" class="form-label">상세설명<span class="text-danger">*</span></label>
                            <textarea type="text" class="form-control" rows="5" id="inputContent" placeholder="여러 장의 상품 사진과 구입 연도, 브랜드, 사용감 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요.(20자 이상)&#13;&#10;안전하고 건전한 거래 환경을 위해 신세계 I&C가 함께 합니다."></textarea>
                        </div>
                    </div>
                </form>
            </form>
        </div>
    );
};

export default Uploadpage;
