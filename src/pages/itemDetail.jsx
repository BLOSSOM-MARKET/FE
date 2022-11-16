import { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./page.module.scss";
import styleC from "../components/MiniItemCarousel/MiniItemCarousel.module.scss";

import { UserContext } from "../contexts/UserContext";
import { itemTimeFormatterLong, priceFormatter } from "../utils/formatters";
import { CATE, getCateName } from "../utils/categories";
import MiniItemCarousel from "../components/MiniItemCarousel/MiniItemCarousel";
import { SocketContext } from "../contexts/SocketContext";
import { ChattingContext } from "../contexts/ChattingContext";
import Card from "../components/Card/Card";
import { Button, Carousel, Container, Row } from "react-bootstrap";
import axios from "axios";

const ItemPicCarousel = ({ pics }) => {
  const { isChatOpen } = useContext(ChattingContext);

  return (
    <div
      id="carouselExampleIndicators"
      className={`carousel slide ${style.Detail__carousel__inner}`}
      data-bs-ride="true"
    >
      <div className="carousel-indicators">
        {pics.map((pic, idx) => (
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={idx}
            className={idx === 0 ? `active` : undefined}
            aria-current={idx === 0 ? "true" : "false"}
            aria-label={`Slide ${idx}`}
            key={`indeicator-${idx}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {pics.map((pic, idx) => (
          <div
            className={`carousel-item ${idx === 0 && "active"} ${
              style.Detail__carousel__pic
            }`}
            key={`item-pic-${idx}`}
          >
            <img src={pic} className="d-block w-100" alt={`pic-${idx}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { userId, nickname, isLogin } = useContext(UserContext);
  const {
    setIsChatOpen,
    setIsInChatroom,
    setRoomId,
    setYourNick,
    yourId,
    setYourId,
    productId,
    setProductId,
    setMessages,
    setProductName,
    setProductImg,
  } = useContext(ChattingContext);
  const { joinRoom, updateMessage, addMessage } = useContext(SocketContext);
  const myId = userId;

  console.log("itemId: ", itemId);

  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //데이터 가져오기 product/detail + query productId

    console.log(itemId);
    const getItemDetail = () => {
      return axios.get("/api/product/detail", {
        params: {
          productId: itemId,
        },
      });
    };

    const getRelatedItems = (categoryId) => {
      return axios.get("/api/recommend/relation", {
        params: {
          categoryId1: categoryId,
        },
      });
    };

    const getPersonalizedItems = () => {
      return axios.get("/api/recommend/personalization");
    };

    const reqs = [getItemDetail()];

    if (isLogin) {
      console.log("IS LOgIN?!")
      reqs.push(getPersonalizedItems());
    }

    axios
      .all(reqs)
      .then((res) => {
        console.log(res);
        const itemDetail = res[0].data[0];
        const itemData = { ...itemDetail };
        itemData.likeCount = res[0].data[1]; // 좋아요개수
        const myLike = res[0].data[2];
        const sellerNickname = res[0].data[3]; // 판매자 닉네임
        itemData.sellerNickname = sellerNickname;

        if (myLike == 1) {
          // 내 좋아요 여부
          setIsInWishlist(true);
        }

        const pictures = [];
        if (itemDetail.image1) {
          pictures.push(itemDetail.image1);
        }
        if (itemDetail.image2) {
          pictures.push(itemDetail.image2);
        }
        if (itemDetail.image3) {
          pictures.push(itemDetail.image3);
        }
        itemData.pictures = pictures;

        // 로그인했을 때, 개인 추천 상품 리스트
        if (isLogin) {
          const personalizedItems = res[1].data;
          itemData.personalizedItems = personalizedItems;
        }

        return itemData;
        
      })
      .then((itemData) => {
        const categoryId = itemData.categoryId1;
        getRelatedItems(categoryId)
        .then(res => {
          const relatedItems = res.data;
          itemData.relatedItems = relatedItems;
          console.log(relatedItems)

          setItem(itemData);

          // UserContext에 저장
          setYourId(itemData.sellerId);
          setYourNick(itemData.sellerNickname);
          setProductId(itemId);
          
        })
      });
  }, [itemId]);

  const onEditItem = () => {
    // 수정 페이지로 이동
    navigate("/item/modify/" + itemId);
  };

  // 상품 삭제
  const onDeleteItem = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.patch(`/api/product/delete/${itemId}`)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }

  const onClickWishBtn = () => {
    if (!isLogin) return;
    if (myId === yourId) return;

    // axios
    // 좋아요 변경

    if (isInWishlist) {
      // delete

      setIsInWishlist(false);

      axios
        .get("/api/like/delete", {
          params: {
            productId: itemId,
          },
        })
        .then((res) => {
        //   console.log(res);
        //   console.log(res.data);
        //   setIsInWishlist(false);
        });
    } else {
      // save
      console.log("itemId", itemId);
      setIsInWishlist(true);
      const data2 = {
        productId: itemId,
        ppp: 99,
      };
      console.log(data2);
      axios.post("/api/like/save", data2).then((res) => {
        // console.log(res);
        // console.log(res.data);
        // setIsInWishlist(true);
      });
    }
  };


  const onClickChatting = () => {
    const ownerId = item.sellerId;
    const roomId = ownerId + myId + itemId;
    const yourNick = item.sellerNickname;
    setIsChatOpen(true);
    setIsInChatroom(true);
    setRoomId(roomId);
    setYourNick(yourNick);
    setProductName(item.productName);
    setProductImg(item.pictures[0]);
    joinRoom({ roomId, yourId, myId, productId, nickname, yourNick });
    // updateMessage();
    // moveToChatRoom(roomId);
  };

  const [curPage1, setCurPage1] = useState(1);
  const [curPage2, setCurPage2] = useState(1);

  const carousel1 = useRef();
  const onPrevClick = (targetC) => {
    targetC.current.prev();
  };
  const onNextClick = (targetC) => {
    targetC.current.next();
  };

  const onPageBtnClick = (d, currentPage, setCurrentPage, itemList) => {
    if (
      (d === -1 && currentPage === 1) ||
      (d === 1 && currentPage === itemList.length)
    )
      return;
    setCurrentPage((prev) => prev + d);
  };

  return (
    <div className={style.Page}>
      {item && (
        <div className={style.Detail}>
          <section className={style.Detail__carousel}>
            <ItemPicCarousel pics={item.pictures} />
          </section>
          <section className={style.Detail__sellerInfo}>
            <div className={style.Detail__sellerInfo__inner}>
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="profil pic"
                className={style.Detail__sellerInfo__pic}
              />
              <span className={style.Detail__sellerInfo__nick}>
                {item.sellerNickname}
              </span>
            </div>
            <div className={style.Detail__sellerInfo__inner}>
              <div onClick={onClickWishBtn}>
                {isInWishlist ? (
                  <i
                    className={`bi bi-heart-fill ${style.Detail__sellerInfo__wishBtn} ${style.Detail__sellerInfo__wishBtn__active}`}
                  ></i>
                ) : (
                  <i
                    className={`bi bi-heart ${style.Detail__sellerInfo__wishBtn}`}
                  ></i>
                )}
              </div>
              <button
                className="btn btn-dark"
                onClick={onClickChatting}
                disabled={item.sellerId === myId || !isLogin}
              >
                채팅하기
              </button>
            </div>
          </section>
          <section className={style.Detail__header}>
            <div>
              <div className={style.Detail__header__title}>
                {item.productName}
              </div>
              <div className={style.Detail__header__desc}>
                {getCateName(item.categoryId1.slice(2, 4))} ·{" "}
                {itemTimeFormatterLong(item.createDate)}
              </div>
            </div>
            <div className={style.Detail__header__price}>
              {priceFormatter(item.price)}
            </div>
          </section>
          <section className={style.Detail__body}>
            {item.content.split("\n").map((p, idx) => (
              <div key={`p-${idx}`}>{p}</div>
            ))}
            {item.sellerId === myId && (
              <div className={style.Detail__editBtn__wrapper}>
                <button className={`btn btn-outline-dark ${style.Detail__Btns}`} onClick={onEditItem}>
                  수정하기
                </button>
                <button className={`btn btn-outline-dark ${style.Detail__Btns}`} onClick={onDeleteItem}>
                  삭제하기
                </button>
              </div>
            )}
            <div className={style.Detail__body__footer}>
              조회 {item.viewCount} · 찜 {item.likeCount}
            </div>
          </section>
          {/*  */}
          <section className={style.Detail__recommend}>
            {item.relatedItems && item.relatedItems.length > 0 && (
              <MiniItemCarousel
                code={"00"}
                title={["다른 고객이 많이 본", "연관 상품"]}
                itemList={item.relatedItems}
              />
            )}
            {item.personalizedItems && item.personalizedItems.length > 0 && (
              <MiniItemCarousel
                code={"01"}
                title={[
                  `${
                    isLogin && nickname ? nickname + "님" : "당신"
                  }이 찾고 계신`,
                  `바로 그 상품`,
                ]}
                itemList={item.personalizedItems}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
