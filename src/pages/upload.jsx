import React, { useContext, useEffect, useRef, useState } from "react";
//import React from 'react';
//import '../Upload/Upload.module.scss';
import style from "./page.module.scss";
import "antd/dist/antd.css";
import BootForm from "react-bootstrap/Form";
import styleBtn from "../components/SearchBar/SearchBar.module.scss";
import styleLabel from "../components/Upload/Upload.module.scss";
import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import { CATE } from "../utils/categories";
import { now } from "moment";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const ImgUploadSection = ({ attachments, setAttachments, attachmentURLs, setAttachmentURLs }) => {
    
    const onFileChange = event => {
        const { target : { files }} = event;

        if (attachments.length >= 3) {
            alert("사진은 최대 3장까지 등록할 수 있습니다.");
            return
        }
    
        // 파일 목록에 추가
        setAttachments(prev => [...prev, ...files]);
    
        // 미리보기 이미지 url 생성 후 저장
        const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setAttachmentURLs(prev => [...prev, ...fileUrls]);
    
        // url 해제 (메모리 누수 방지)
        Array.from(files).map(file => URL.revokeObjectURL(file));
        
      };

      const fileInput = useRef();

        const onDeleteAttachment = (i) => {
            setAttachments(prev => prev.filter((att, idx) => idx !== i));
            setAttachmentURLs(prev => prev.filter((att, idx) => idx !== i));
        };

    return (
        <section className={style.Settings__CameraIcon__wrapper}>
        <label className="my-label" htmlFor="attachFile">
            <div id="upload-img-placeholder">
                <div className={style.Settings__CameraIcon}>
                <div className={style.Settings__CameraIcon__inner}>
                    <i
                    className={`bi bi-camera-fill ${style.Settings__CameraIcon__icon}`}
                    ></i>
                    <div>이미지 등록</div>
                </div>
                </div>
            </div>
        </label>
        <div className={style.Settings__CameraIcon__right}>
                <ul id="ImgPreview" className={styleLabel.preview__image__ul}>
                {
                    attachmentURLs.map((url, i) => (
                    <li className={styleLabel.preview__image__li} key={`attachment-preview-${i}`}>
                        <div className={styleLabel.preview__image__wrapper}>
                            <img 
                            alt={`attachment-preview-${i}`}
                            src={url}
                            className={styleLabel.preview__image} />
                        </div>
                        <button 
                        className={styleLabel.preview__image__delBtn}
                        onClick={() => onDeleteAttachment(i)}>
                            <i className="bi bi-x-square"></i>
                        </button>
                    </li>
                    ))
                }
                </ul>
                <input 
                    id="attachFile"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput} 
                    multiple 
                    style={{ display: "none"}} />

                <span
                className={`text-primary ${style.Settings__CameraIcon__label__wrapper}`}
            >
                <span className={style.Settings__CameraIcon__label__big}>
                * 이미지 아이콘을 클릭하여 이미지를 등록할 수 있습니다. <br />
                </span>
                <label className={style.Settings__CameraIcon__label__small}>
                - 상품 이미지는 최대 3개까지 등록 가능합니다.<br></br>- 큰 이미지일
                경우 이미지가 깨지는 경우가 발생할 수 있습니다.
                <br></br>- 대표이미지는 처음으로 등록된 사진으로 지정됩니다.
                </label>
            </span>
        </div>
      </section>
    )
}

const TitleSection = ({
  isModify,
  itemInfo,
  onLengthChange,
  onChangeVal,
  titleLength,
}) => {
  return (
    <section className={styleLabel.UploadSection}>
      <div className={`row ${styleLabel.rowAlign}`}>
        <label htmlFor="inputProName" className="col-sm-1 col-form-label">
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
              isModify && itemInfo.productName ? itemInfo.productName : ""
            }
            onChange={(e) => {
              onLengthChange(e);
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
    </section>
  );
};

const CategorySection = ({ isModify, isNew, itemInfo, onChangeVal }) => {
  return (
    <section className={styleLabel.UploadSection}>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="inputAddress" className="form-label">
            카테고리<span className="text-danger">*</span>
          </label>
          <BootForm.Select
            value={
                (isModify && itemInfo.categoryId1)
                ? itemInfo.categoryId1
                : (isNew && itemInfo.categoryId1)
                ? itemInfo.categoryId1 : "0100"
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
                    (isModify && itemInfo.categoryId2)
                        ? itemInfo.categoryId2
                        : (isNew && itemInfo.categoryId2)
                        ? itemInfo.categoryId2 : "0200"
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
                      (isModify && itemInfo.categoryId3)
                        ? itemInfo.categoryId3
                        : (isNew && itemInfo.categoryId3)
                        ? itemInfo.categoryId3 : "0301"
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
      </div>
    </section>
  );
};


const PriceSection = ({ isModify, itemInfo, onChangeVal, onCheckPrice }) => {
  return (
    <section className={styleLabel.UploadSection}>
      <div className="row">
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
      </div>
    </section>
  );
};

const ContentSection = ({ onChange, contentLength, itemInfo, isModify }) => {
  return (
    <section className={styleLabel.UploadSection}>
      <div className="row">
      <div className="col-12">
                <label htmlFor="inputContent" className="form-label">
                  상세설명<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  min="20"
                  max="500"
                  onChange={onChange}
                  className={`form-control ${styleLabel.textArea}`}
                  rows="5"
                  id="inputContent"
                  placeholder="여러 장의 상품 사진과 구입 연도, 브랜드, 사용감 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요.(20자 이상)&#13;&#10;안전하고 건전한 거래 환경을 위해 신세계 I&C가 함께 합니다."
                  defaultValue={
                    isModify && itemInfo.content ? itemInfo.content : ""
                  }
                ></textarea>
                <div className={styleLabel.contentLength}>
                  {contentLength}자
                </div>
              </div>
      </div>
    </section>
  );
};

const ButtonSection = ({ isNew }) => {
    return (
        <div className="row">
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                className={`btn btn-outline-dark ${styleBtn.Nav__SearchBtn} ${styleLabel.Btn}`}
              >
                {isNew ? "등록하기" : "수정하기"}
              </button>
            </div>
        </div>
    )
}

const Uploadpage = (props) => {
  const [titleLength, setTitleLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [itemInfo, setItemInfo] = useState({});

  const [attachments, setAttachments] = useState([]);   // 이미지파일
  const [attachmentURLs, setAttachmentURLs] = useState([]);   // 이미지파일 미리보기

  const { userId } = useContext(UserContext);

  const loc = useLocation();
  const isNew = loc.pathname === "/item/new";
  const isModify = new RegExp("/item/modify/").test(loc.pathname);

  const navigate = useNavigate();

  const { itemId } = useParams();
  console.log(loc.pathname, itemId, isModify)

  useEffect(() => {
    // axios
    // isModify일 때 기존 상품 데이터 가져오기
    if (!isModify) return;

    axios
    .get('/api/product/detail', {
        params: {
            productId: itemId
        }
    })
    .then(res => {
        const tempItemData = res.data[0];
        console.log(tempItemData)
        setItemInfo(tempItemData);
    })
  }, []);

  const onLengthChange = (e, targetFunc) => {
    console.log(e);
    const len = e.target.value.length;
    targetFunc(len);
  };

  const onChangeVal = (e, target) => {
    console.log(e.target);
    const newVal = e.target.value;
    const newItemInfo = { ...itemInfo };
    newItemInfo[target] = newVal;
    setItemInfo(newItemInfo);
  };

  const isNumeric = (str) => {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  const onCheckPrice = (e) => {
    const val = e.target.value;
    if (!isNumeric(val)) {
      alert("숫자만 입력해주세요");
      return false;
    }
    return true;
  };

  //   // debugging
  // useEffect(() => {
  //   console.log(itemInfo.categoryId1);
  // }, [itemInfo.categoryId1]);
  // useEffect(() => {
  //     console.log(itemInfo.productName);
  //   }, [itemInfo.productName]);

  const downloadImgsToLocalFolder = async (file) => {
    try {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = URL.createObjectURL(new Blob([file]));
        a.download = "blossom_market_" + file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error(error);
    }
  }

  const onSubmit = (e) => {
    console.log(itemInfo);
    console.log("imgs", attachments);
    e.preventDefault();

    if (isNew) {
        // axios
        // 신규 등록
        const bodyData = {
            ...itemInfo,
            price: Number(itemInfo.price),
            categoryId3: "0301",
            createDate: now(),
            // image1: attachments[0],
            // image2: attachments[1],
            // image3: attachments[2],
            sellerId: userId,
            status: "1",
            updateDate: now(),
            viewCount: 0,
          };
        
          for (let i=0; i < attachments.length; i++) {
                const img = attachments[i];
                downloadImgsToLocalFolder(img);
                const path = `${process.env.REACT_APP_IMG_FOLDER}/blossom_market_${img.name}`;
                bodyData[`image${i+1}`] = path;

            //   const path = `../../downloadImgs/${img.name}`
            //     fs.writeFile(path, img, function(err, data) {
            //         if (err) {
            //             throw (err);
            //         }
            //         // save filepath to wherever for later.
            //         bodyData[`image${i+1}`] = path;
            //     });
          }

          console.log(bodyData)

          axios
            .post('/api/product/insert', bodyData)
            .then((res) => {
            console.log(res);
            console.log(res.data);
            
            // 수정!!!
            // 상세페이지로 이동해서 작성 글 확인
            const productId = res.data;
            navigate('/item/' + productId);
            });

    } else if (isModify) {
        // axios
        // 기존 글 수정

        console.log(itemInfo)

        axios
            .patch('/api/product/update', itemInfo)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                
                // 수정!!!
                // 상세페이지로 이동해서 작성 글 확인
                console.log(itemId)
                navigate('/item/' + itemId);
            });

    }
  };

  return (
    <div className={style.Page}>
      <div name="productUpload">
        <span className={styleLabel.infolabel__boldfont}>기본정보</span>
        <span className="text-danger"> *필수항목</span>
        <BootForm.Group onSubmit={onSubmit}>
          <div className={`position-relative ${style.Settings__formBody}`}>
            <BootForm name="imgUpload d-inline p-2 position-absolute start-0">

              <div className={style.Settings__CameraIcon__wrapper}>
                {
                    isNew
                    ?
                    <ImgUploadSection
                        attachments={attachments}
                        setAttachments={setAttachments}
                        attachmentURLs={attachmentURLs}
                        setAttachmentURLs={setAttachmentURLs}
                    />
                    :
                    <div className="row">
                        <div className={style.Settings__CameraIcon__Alert}>
                            이미지 수정 기능은 준비중입니다. 이미지 수정을 원하시면 글 삭제 후 다시 등록해주세요.
                        </div>
                    </div>
                }
              </div>

              <TitleSection
                isModify={isModify}
                itemInfo={itemInfo}
                onLengthChange={(e) => onLengthChange(e, setTitleLength)}
                onChangeVal={onChangeVal}
                titleLength={titleLength}
              />
              <CategorySection
                isModify={isModify}
                isNew={isNew}
                itemInfo={itemInfo}
                onChangeVal={onChangeVal}
              />
              <PriceSection
                isModify={isModify}
                itemInfo={itemInfo}
                onChangeVal={onChangeVal}
                onCheckPrice={onCheckPrice}
               />
               <ContentSection 
                itemInfo={itemInfo}
                isModify={isModify}
                onChange={(e) => {
                    setContentLength(e.target.value.length)
                    onChangeVal(e, "content")
                }}
                contentLength={contentLength}
               />
               <ButtonSection 
                isNew={isNew}
               />
            </BootForm>
          </div>
        </BootForm.Group>
      </div>
    </div>
  );
};

export default Uploadpage;
