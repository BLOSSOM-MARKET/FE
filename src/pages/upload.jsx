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
    const [titleLength, setTitleLength] = useState(0);
    const [contentLength, setContentLength] = useState(0);

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

    function lengthCheck(e) {
        console.log(e)
        const len = e.target.value.length;
        setTitleLength(len);
    }

    return (
        <div className={style.Page}>
            <form name="productUpload">
                <span className={styleLabel.infolabel__boldfont}>
                    기본정보
                </span>
                <span className="text-danger">   *필수항목</span>
                <div className={`position-relative ${style.Settings__formBody}`}>
                    <Form.Item name="imgUpload d-inline p-2 position-absolute start-0">
                        <div className={style.Settings__CameraIcon__wrapper}>

                            <Upload name="image" action="http://localhost:3000/image"
                                listType="picture" showUploadList={false} onChange={onChangeImage}>

                                {/* 업로드 이미지가 있으면 이미지를 나타내고 업로드 이미지가 없으면
                            회색배경에 업로드 아이콘이 나타나도록 ... */}
                                {imageUrl ? <img src={imageUrl}
                                    alt="" width="200px" height="200px" /> :
                                    (<div id="upload-img-placeholder">
                                        <div className={style.Settings__CameraIcon}>
                                            <div className={style.Settings__CameraIcon__inner}>
                                                <i className={`bi bi-camera-fill ${style.Settings__CameraIcon__icon}`}></i>
                                                <div>이미지 등록</div>
                                            </div>
                                        </div>
                                        {/* <img src="/camera.png" alt="" className={`cameraIcon ${style.Settings__CameraIcon__size}`} /> */}
                                    </div>)}
                            </Upload>
                            <span className={`text-primary ${style.Settings__CameraIcon__label__wrapper}`}>
                                <span className={style.Settings__CameraIcon__label__big}>
                                    * 이미지 아이콘을 클릭하여 이미지 등록을 할 수 있습니다. <br />
                                </span>
                                <label className={style.Settings__CameraIcon__label__small}>
                                        - 상품 이미지는 최대 3개까지 등록 가능합니다.<br>
                                        </br>
                                        - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br>
                                        </br>
                                        - 대표이미지는 처음으로 등록된 사진으로 지정됩니다.
                                </label>
                                {/* <span className="fw-semibold position-absolute fs-5 top-50 start-40 ">
                                    *이미지 아이콘을 클릭하여 이미지 등록을 할 수 있습니다.
                                    <br>
                                    </br>
                                    <label className="fw-normal fs-6 styleLabel.smallfont">
                                        - 상품 이미지는 최대 3개까지 등록 가능합니다.<br>
                                        </br>
                                        - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br>
                                        </br>
                                        - 대표이미지는 처음으로 등록된 사진으로 지정됩니다.
                                    </label>
                                </span> */}
                            </span>
                        </div>
                    </Form.Item>
                </div>
                <form className="row g-3">
                    <div className="row g-3">
                        <div className={styleLabel.h1}></div>
                        <div className="row">
                            <label for="inputProName" className="col-sm-2 col-form-label">
                                <label className="fs-3">제목</label>
                                <label className="fs-3 text-danger">*</label>
                            </label>
                            <div className="col-md-10">
                                <input onChange={lengthCheck} type="text" className="form-control" id="inputProName" required minlength="0" maxlength="30" placeholder="상품 제목을 입력하세요." />
                                <div className="text-end"><span className="proname"></span>
                                {titleLength}/30</div>
                            </div>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div className="col-md-4">
                            <label for="inputAddress" className="form-label">카테고리<span className="text-danger">*</span></label>
                            <select id="inputCategory" className="form-select">
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
                        <div className="col-md-3">
                            <label for="inputAddress" className="form-label">지역<span className="text-danger">*</span></label>
                            <select id="inputState" className="form-select">
                                <option selected>지역을 선택해주세요</option>
                                <option>명동</option>
                                <option>성수</option>
                                <option>경기</option>
                                <option>김포</option>
                                <option>부산</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label for="inputState" className="form-label">상태<span className="text-danger">*</span></label>
                            <select id="inputState" className="form-select">
                                <option selected>판매중</option>
                                <option>예약중</option>
                                <option>판매완료</option>
                            </select>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div className={`col-md-3`}>
                            <label for="inputCity" className="form-label">가격<span className="text-danger">*</span></label>
                            <div className={styleLabel.priceInput__wrapper}>
                                <input type="text" className={`form-control ${styleLabel.priceInput}`} id="inputCity" placeholder="숫자만 입력해주세요" />
                                <span>원</span>
                            </div>
                        </div>
                        <div className={styleLabel.h1}></div>
                        <div className="col-12">
                            <label for="inputContent" className="form-label">상세설명<span className="text-danger">*</span></label>
                            <textarea type="text"   min="20" max="500" onChange={(e) => setContentLength(e.target.value.length)}
                             className={`form-control ${styleLabel.textArea}`} rows="5" id="inputContent" placeholder="여러 장의 상품 사진과 구입 연도, 브랜드, 사용감 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요.(20자 이상)&#13;&#10;안전하고 건전한 거래 환경을 위해 신세계 I&C가 함께 합니다."></textarea>
                            <div className={styleLabel.contentLength}>{contentLength}자</div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" className={`btn btn-outline-dark ${styleBtn.Nav__SearchBtn} ${styleLabel.Btn}`}>
                            등록하기
                        </button>
                    </div>
                </form>
            </form>
        </div>
    );
};

export default Uploadpage;
