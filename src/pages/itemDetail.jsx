import { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./page.module.scss";
import styleC from "../components/MiniItemCarousel/MiniItemCarousel.module.scss";

import { UserContext } from "../contexts/UserContext";
import { itemTimeFormatterLong, priceFormatter } from "../utils/formatters";
import { getCateName } from "../utils/categories";
import MiniItemCarousel from "../components/MiniItemCarousel/MiniItemCarousel";
import { SocketContext } from "../contexts/SocketContext";
import { ChattingContext } from "../contexts/ChattingContext";
import Card from "../components/Card/Card";
import { Button, Carousel, Container, Row } from "react-bootstrap";

const ItemPicCarousel = ({ pics }) => {
    const { isChatOpen } = useContext(ChattingContext);

    return (
        <div id="carouselExampleIndicators" className={`carousel slide ${style.Detail__carousel__inner}`} data-bs-ride="true">
            <div className="carousel-indicators">
                {
                    pics.map((pic, idx) => (
                        <button type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={idx} className={idx === 0 ? `active` : undefined}
                            aria-current={idx === 0 ? "true" : "false"} aria-label={`Slide ${idx}`} key={`indeicator-${idx}`}>
                        </button>
                    ))
                }
            </div>
            <div className="carousel-inner">
                {
                    pics.map((pic, idx) => (
                        <div className={`carousel-item ${idx === 0 && 'active'} ${style.Detail__carousel__pic}`} key={`item-pic-${idx}`}>
                            <img src={pic} className="d-block w-100" alt={`pic-${idx}`} />
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

const ItemDetail = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { userId, nickname, isLogin } = useContext(UserContext);
    const { setIsChatOpen, setIsInChatroom,
        setRoomId, setYourNick, yourId, setYourId, productId, setProductId, setMessages } = useContext(ChattingContext);
    const { joinRoom, updateMessage, addMessage } = useContext(SocketContext);
    const myId = userId;

    const navigate = useNavigate();

    useEffect(() => {
        // axios
        //데이터 가져오기 product/detail + query productId

        const itemData = {
            user: {
                nickname: "용지함",
                userId: "jiyong@shinsegae.com"
            },
            pictures: [
                "http://www.palnews.co.kr/news/photo/201801/92969_25283_5321.jpg",
                "https://cdn.newspenguin.com/news/photo/202101/3899_12249_529.jpg",
                "https://img.etoday.co.kr/pto_db/2018/01/20180118112233_1176969_600_387.jpg",
                "https://cdn.newspenguin.com/news/photo/202101/3899_12249_529.jpg",
            ],
            title: "꽃인형 판매 (네고X)",
            category: "01",
            uploadTime: new Date().toDateString(),
            price: 30000,
            content: "김포 장기동으로 오면 무료나눔",
            viewNum: 3,
            likeNum: 1,
            myLike: true,
            relatedItems: [
                [
                    {
                        imgSrc: "https://cdn.cashfeed.co.kr/attachments/1eb9b8ff1b.jpg",
                        title: "기여운 고양이",
                        itemId: "123"
                    },
                    {
                        imgSrc: "http://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg",
                        title: "[더데일리]고양이",
                        itemId: "341"
                    },
                    {
                        imgSrc: "https://t1.daumcdn.net/news/202105/25/catlab/20210525060513319cxip.jpg",
                        title: "냥냥냐냐냐냐냥",
                        itemId: "753"
                    },
                ],
                [
                    {
                        imgSrc: "http://image.dongascience.com/Photo/2020/06/e7febac8f9a1c9005c08c93d25997f47.jpg",
                        title: "화난토끼고앵",
                        itemId: "332"
                    },
                    {
                        imgSrc: "https://steptohealth.co.kr/wp-content/uploads/2021/12/-%ED%86%A0%EB%81%BC-500x375-1-470x353.jpg",
                        title: "롭이어토끼",
                        itemId: "556"
                    },
                    {
                        imgSrc: "https://img.insight.co.kr/static/2020/12/13/700/img_20201213152823_hh576838.webp",
                        title: "토깽펀치",
                        itemId: "980"
                    },
                ],
            ],
            findingItems: [
                [
                    {
                        imgSrc: "http://image.dongascience.com/Photo/2020/06/e7febac8f9a1c9005c08c93d25997f47.jpg",
                        title: "화난토끼고앵크앙",
                        itemId: "332"
                    },
                    {
                        imgSrc: "https://steptohealth.co.kr/wp-content/uploads/2021/12/-%ED%86%A0%EB%81%BC-500x375-1-470x353.jpg",
                        title: "롭이어토끼",
                        itemId: "556"
                    },
                    {
                        imgSrc: "https://img.insight.co.kr/static/2020/12/13/700/img_20201213152823_hh576838.webp",
                        title: "토깽펀치",
                        itemId: "980"
                    },
                ],
                [
                    {
                        imgSrc: "https://cdn.cashfeed.co.kr/attachments/1eb9b8ff1b.jpg",
                        title: "기여운 고양이기여운고양이기여운",
                        itemId: "123"
                    },
                    {
                        imgSrc: "http://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg",
                        title: "[더데일리]고양이",
                        itemId: "341"
                    },
                    {
                        imgSrc: "https://t1.daumcdn.net/news/202105/25/catlab/20210525060513319cxip.jpg",
                        title: "냥냥냐냐냐냐냥",
                        itemId: "753"
                    },
                ],
            ],
        }

        setItem(itemData);

        // UserContext에 저장
        setYourId(itemData.user.userId);
        setYourNick(itemData.user.nickname);
        setProductId(itemId);


        if (itemData.myLike) {
            setIsInWishlist(true);
        }

    }, [itemId]);

    const onEditItem = () => {
        // 수정 페이지로 이동
    }

    const onClickWishBtn = () => {
        setIsInWishlist(prev => !prev);

        // axios
        // 좋아요 변경
    }

    // const addMessage = (message) => {
    //     console.log(message);
    //     setMessages((prev) => prev.concat(message));
    // }

    const onClickChatting = () => {
        const ownerId = item.user.userId;
        const roomId = ownerId + myId + itemId;
        const yourNick = item.user.nickname;
        setIsChatOpen(true);
        setIsInChatroom(true);
        setRoomId(roomId);
        setYourNick(yourNick);
        joinRoom({ roomId, yourId, myId, productId, nickname, yourNick });
        // updateMessage();
        // moveToChatRoom(roomId);
    }

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
        if ((d === -1 && currentPage === 1) || (d === 1 && currentPage === itemList.length)) return;
        setCurrentPage(prev => prev + d);
    }

    return (
        <div className={style.Page}>
            {
                item &&
                <div className={style.Detail}>
                    <section className={style.Detail__carousel}>
                        <ItemPicCarousel pics={item.pictures} />
                    </section>
                    <section className={style.Detail__sellerInfo}>
                        <div className={style.Detail__sellerInfo__inner}>
                            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="profil pic" className={style.Detail__sellerInfo__pic} />
                            <span className={style.Detail__sellerInfo__nick}>
                                {item.user.nickname}
                            </span>
                        </div>
                        <div className={style.Detail__sellerInfo__inner}>
                            <div onClick={onClickWishBtn}>
                                {
                                    isInWishlist
                                        ?
                                        <i className={`bi bi-heart-fill ${style.Detail__sellerInfo__wishBtn} ${style.Detail__sellerInfo__wishBtn__active}`}></i>
                                        :
                                        <i className={`bi bi-heart ${style.Detail__sellerInfo__wishBtn}`}></i>
                                }
                            </div>
                            <button className="btn btn-dark" onClick={onClickChatting}
                                disabled={item.user.userId === myId}>
                                채팅하기
                            </button>
                        </div>
                    </section>
                    <section className={style.Detail__header}>
                        <div>
                            <div className={style.Detail__header__title}>
                                {item.title}
                            </div>
                            <div className={style.Detail__header__desc}>
                                {getCateName(item.category)} · {itemTimeFormatterLong(item.uploadTime)}
                            </div>
                        </div>
                        <div className={style.Detail__header__price}>
                            {priceFormatter(item.price)}
                        </div>
                    </section>
                    <section className={style.Detail__body}>
                        {
                            item.user.userId === myId
                            &&
                            <button className="btn btn-dark" onClick={onEditItem}>
                                수정하기
                            </button>
                        }
                        {
                            item.content
                        }
                        <div className={style.Detail__body__footer}>
                            조회 {item.viewNum} · 찜 {item.likeNum}
                        </div>
                    </section>
                    {/*  */}
                    <section className={style.Detail__recommend}>
                        <MiniItemCarousel code={"00"} title={["다른 고객이 많이 본", "연관 상품"]} itemList={item.relatedItems} />
                        <MiniItemCarousel code={"01"} title={[`${isLogin && nickname ? nickname + "님" : "당신"}이 찾고 계신`, `바로 그 상품`]} itemList={item.findingItems} />
                    </section>
                </div>
            }
        </div>
    )
}

export default ItemDetail;