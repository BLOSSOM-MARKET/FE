import React, { useEffect, useState } from "react";
//import React from 'react';
//import '../Upload/Upload.module.scss';
import style from "./page.module.scss";
import "antd/dist/antd.css";
import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import BootForm from "react-bootstrap/Form";
import styleBtn from "../components/SearchBar/SearchBar.module.scss";
import styleLabel from "../components/Upload/Upload.module.scss";
import { useLocation } from "react-router-dom";
import { CATE } from "../utils/categories";
//import categotyStyle from "../components/SearchBar/SearchBar.module.scss"

const Uploadpage = (props) => {
  const [titleLength, setTitleLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [itemInfo, setItemInfo] = useState({});

  //이미지 경로 상태관리 추가
  const [imageUrl, setImageUrl] = useState(null);

  const loc = useLocation();
  const isNew = loc.pathname === "/item/new";
  const isModify = loc.pathname === "/item/modify";

  useEffect(() => {
    // axios
    // isModify일 때 기존 상품 데이터 가져오기
    if (!isModify) return;

    const tempData = {
      buyerId: "",
      categoryId1: "0101",
      categoryId2: "0201",
      categoryId3: "0301",
      content: "싸게 팔아요",
      createDate: "2022-11-02T08:54:29.912Z",
      image: "사진 수정 불가",
      goodId: "string",
      price: 100000,
      productId: "1",
      productName: "쓰던 물병 팝니다",
      sellerId: "user1@shinsegae.com",
      status: "1",
      updateDate: "2022-11-02T08:54:29.912Z",
      viewCount: 0,
    };
    setItemInfo(tempData);
  }, []);

  //이미지 처리 함수
  const onChangeImage = (info) => {
    //파일이 업로드 중일 때
    console.log(info.file);
    if (info.file.status === "uploading") {
      return;
    }

    //파일이 업로드 완료
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;

      //받은 이미지 경로를 imageUrl에 넣어줌
      setImageUrl(imageUrl);
    }
  };

  function lengthCheck(e) {
    console.log(e);
    const len = e.target.value.length;
    setTitleLength(len);
  }

  const onChangeVal = (e, target) => {
    console.log(e.target);
    const newVal = e.target.value;
    const newItemInfo = { ...itemInfo };
    newItemInfo[target] = newVal;
    setItemInfo(newItemInfo);
  };

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  const onCheckPrice = (e) => {
    const val = e.target.value;
    if (!isNumeric(val)) {
      alert("숫자만 입력해주세요");
      return false;
    }
    return true;
  };

//   // debugging
//   useEffect(() => {
//     console.log(itemInfo.categoryId1);
//   }, [itemInfo.categoryId1]);

const onFinish = (e) => {
    console.log(e)
}

  return (
    <div className={style.Page}>
      <div name="productUpload">
        <span className={styleLabel.infolabel__boldfont}>기본정보</span>
        <span className="text-danger"> *필수항목</span>
        <BootForm onFinish={onFinish}>
          <div className={`position-relative ${style.Settings__formBody}`}>
            <BootForm.Item name="imgUpload d-inline p-2 position-absolute start-0">
              <div className={style.Settings__CameraIcon__wrapper}>
                <Upload
                  name="image"
                  action="http://localhost:3000/image"
                  listType="picture"
                  showUploadList={false}
                  onChange={onChangeImage}
                >
                  {/* 업로드 이미지가 있으면 이미지를 나타내고 업로드 이미지가 없으면
                                회색배경에 업로드 아이콘이 나타나도록 ... */}
                  {imageUrl ? (
                    <img src={imageUrl} alt="" width="200px" height="200px" />
                  ) : (
                    <div id="upload-img-placeholder">
                      <div className={style.Settings__CameraIcon}>
                        <div className={style.Settings__CameraIcon__inner}>
                          <i
                            className={`bi bi-camera-fill ${style.Settings__CameraIcon__icon}`}
                          ></i>
                          <div>이미지 등록</div>
                        </div>
                      </div>
                      {/* <img src="/camera.png" alt="" className={`cameraIcon ${style.Settings__CameraIcon__size}`} /> */}
                    </div>
                  )}
                </Upload>
                <span
                  className={`text-primary ${style.Settings__CameraIcon__label__wrapper}`}
                >
                  <span className={style.Settings__CameraIcon__label__big}>
                    * 이미지 아이콘을 클릭하여 이미지 등록을 할 수 있습니다.{" "}
                    <br />
                  </span>
                  <label className={style.Settings__CameraIcon__label__small}>
                    - 상품 이미지는 최대 3개까지 등록 가능합니다.<br></br>- 큰
                    이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
                    <br></br>- 대표이미지는 처음으로 등록된 사진으로 지정됩니다.
                  </label>
                </span>
              </div>
            </BootForm.Item>
          </div>
          <div className="row g-3">
            <div className="row g-3">
              <div className={styleLabel.h1}></div>
              <div className={`row ${styleLabel.rowAlign}`}>
                <label
                  htmlFor="inputProName"
                  className="col-sm-1 col-form-label"
                >
                  <label className="fs-4">제목</label>
                  <label className="fs-4 text-danger">*</label>
                </label>
                <div className="col-md-11">
                  <input
                    type="text"
                    className="form-control"
                    id="inputProName"
                    required
                    minLength="0"
                    maxLength="30"
                    placeholder="상품 제목을 입력하세요."
                    defaultValue={
                      isModify && itemInfo.productName
                        ? itemInfo.productName
                        : ""
                    }
                    onChange={(e) => {
                      lengthCheck(e);
                      onChangeVal(e, "productName");
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="text-end">
                  <span className="proname"></span>
                  {titleLength}/30
                </div>
              </div>
              <div className={styleLabel.h1}></div>
              <div className="col-md-4">
                <label htmlFor="inputAddress" className="form-label">
                  카테고리<span className="text-danger">*</span>
                </label>
                <BootForm.Select
                  value={
                    isModify && itemInfo.categoryId1
                      ? itemInfo.categoryId1
                      : "0100"
                  }
                  onChange={(e) => onChangeVal(e, "categoryId1")}
                >
                  {CATE.categories.data.map((cate, idx) => {
                    const fullCode = CATE.categories.parentCode + cate.code;
                    return (
                      <option value={fullCode} key={`option-${fullCode}`}>
                        {cate.name}
                      </option>
                    );
                  })}
                </BootForm.Select>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputAddress" className="form-label">
                  지역<span className="text-danger">*</span>
                </label>
                <BootForm.Select
                  value={
                    isModify && itemInfo.categoryId2
                      ? itemInfo.categoryId2
                      : "0200"
                  }
                  onChange={(e) => onChangeVal(e, "categoryId2")}
                >
                  {CATE.regions.data.map((cate, idx) => {
                    const fullCode = CATE.regions.parentCode + cate.code;
                    return (
                      <option value={fullCode} key={`option-${fullCode}`}>
                        {cate.name}
                      </option>
                    );
                  })}
                </BootForm.Select>
              </div>
              {isModify && (
                <div className="col-md-2">
                  <label htmlFor="inputState" className="form-label">
                    상태<span className="text-danger">*</span>
                  </label>
                  <BootForm.Select
                    value={
                      isModify && itemInfo.categoryId3
                        ? itemInfo.categoryId3
                        : "0301"
                    }
                    onChange={(e) => onChangeVal(e, "categoryId3")}
                  >
                    {CATE.status.data
                      .filter((item) => item.code !== "00")
                      .map((cate, idx) => {
                        const fullCode = CATE.status.parentCode + cate.code;
                        return (
                          <option value={fullCode} key={`option-${fullCode}`}>
                            {cate.name}
                          </option>
                        );
                      })}
                  </BootForm.Select>
                </div>
              )}
              <div className={styleLabel.h1}></div>
              <div className={`col-md-3`}>
                <label htmlFor="inputCity" className="form-label">
                  가격<span className="text-danger">*</span>
                </label>
                <div className={styleLabel.priceInput__wrapper}>
                  <input
                    type="text"
                    className={`form-control ${styleLabel.priceInput}`}
                    id="inputCity"
                    placeholder="숫자만 입력해주세요"
                    defaultValue={
                      isModify && itemInfo.price ? itemInfo.price : ""
                    }
                    onChange={(e) => {
                      if (onCheckPrice(e)) {
                        onChangeVal(e, "price");
                      } else {
                        e.target.value = e.target.value.slice(0, -1);
                      }
                    }}
                  />
                  <span>원</span>
                </div>
              </div>
              <div className={styleLabel.h1}></div>
              <div className="col-12">
                <label htmlFor="inputContent" className="form-label">
                  상세설명<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  min="20"
                  max="500"
                  onChange={(e) => setContentLength(e.target.value.length)}
                  className={`form-control ${styleLabel.textArea}`}
                  rows="5"
                  id="inputContent"
                  placeholder="여러 장의 상품 사진과 구입 연도, 브랜드, 사용감 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요.(20자 이상)&#13;&#10;안전하고 건전한 거래 환경을 위해 신세계 I&C가 함께 합니다."
                ></textarea>
                <div className={styleLabel.contentLength}>
                  {contentLength}자
                </div>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                className={`btn btn-outline-dark ${styleBtn.Nav__SearchBtn} ${styleLabel.Btn}`}
              >
                {isNew ? "등록하기" : "수정하기"}
              </button>
            </div>
          </div>
        </BootForm>
      </div>
    </div>
  );
};

export default Uploadpage;