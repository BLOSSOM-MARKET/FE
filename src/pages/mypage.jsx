import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { UserContext } from "../contexts/UserContext";
import style from "./page.module.scss";

import axios from 'axios';

const MyPageHeader = () => {
  const { isLogin, userId, nickname } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <section className={style.My__header}>
      <div className={style.My__header__left}>
        <div className={style.Settings__profile}>
          <div className={style.Settings__profile__icon}>
            <i className="bi bi-info-circle"></i>
          </div>
          <div className={style.Settings__profile__title}>아이디</div>
          <div className={style.Settings__profile__content}>{userId}</div>
        </div>
        <div className={style.Settings__profile}>
          <div className={style.Settings__profile__icon}>
            <i className="bi bi-person-fill"></i>
          </div>
          <div className={style.Settings__profile__title}>닉네임</div>
          <div className={style.Settings__profile__content}>{nickname}</div>
        </div>
      </div>
      <div className={style.My__header__right}>
        <button
          className={style.My__header__right__button}
          onClick={() => navigate("/item/new")}
        >
          <i
            className={`bi bi-plus-circle ${style.My__header__right__icon}`}
          ></i>
          <div className={style.My__header__right__desc}>상품등록</div>
        </button>
        <button
          className={style.My__header__right__button}
          onClick={() => navigate("/settings")}
        >
          <i className={`bi bi-gear ${style.My__header__right__icon}`}></i>
          <div className={style.My__header__right__desc}>계정설정</div>
        </button>
      </div>
    </section>
  );
};

const MyItemContainer = ({ icon, title, items, linkTo }) => {
  const navigate = useNavigate();

  if (items.length > 5) {
    items = items.slice(0, 5);
  }

  return (
    <div className={style.My__MyItemContainer}>
      <div className={style.My__MyItemContainer__header}>
        <div>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className={style.My__MyItemContainer__header__moreBtn}
              onClick={() => navigate(linkTo)}>
          more {">"}
        </div>
      </div>
      <div className={style.My__MyItemContainer__body}>
        {
          items.map((item, idx) => (
            <Card item={item} size={'sm'} key={`item-${idx}`} />
          ))
        }
      </div>
    </div>
  );
};

const MyPage = () => {
  const { isLogin, userId, nickname } = useContext(UserContext);
  const navigate = useNavigate();
  const [soldItems, setSoldItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    // axios
    // 실제 데이터 가져오기

    axios
    .get('/api/mypage/main', {
        params: {
          userId: userId
        }
      })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      
      // setNickname(nickname);
    });

    const dummy = [
      {
        id: 1,
        imgSrc:
          "https://shopping-phinf.pstatic.net/main_8318544/83185449617.7.jpg?type=f200",
        title: "곰인형 판매 (네고x)",
        price: 10000,
        time: new Date().toDateString(),
      },
      {
        id: 2,
        imgSrc:
          "http://image.bom.co.kr/product/detail/AQW/1912262016184445/_600.jpg",
        title: "곰돌이 귀 강쥐 후드",
        price: 25000,
        time: new Date().toDateString(),
      },
      {
        id: 3,
        imgSrc:
          "https://image.homeplus.kr/td/d8761252-5c09-4690-9cb0-6fb4e6ca8b6f",
        title: "마동석 곰돌이",
        price: 40000,
        time: new Date().toDateString(),
      },
    ];

    const soldTemp = [...dummy, ...dummy];
    const boughtTemp = [...dummy, ...dummy];
    const wishTemp = [...dummy, ...dummy];

    setSoldItems(soldTemp);
    setBoughtItems(boughtTemp);
    setWishItems(wishTemp);
  }, []);

  return (
    <div className={style.Page}>
      {
        isLogin
        ?
            <div className={style.My}>
              <MyPageHeader />
              <section className={style.My__MyItems}>
                <MyItemContainer
                  icon={<i className="bi bi-cash-coin"></i>}
                  title={"판매 상품"}
                  items={soldItems}
                  linkTo={"/mypage/soldItems"}
                />
                <MyItemContainer
                  icon={<i className="bi bi-cart"></i>}
                  title={"구매 상품"}
                  items={boughtItems}
                  linkTo={"/mypage/boughtItems"}
                />
                <MyItemContainer
                  icon={<i className="bi bi-heart"></i>}
                  title={"찜한 상품"}
                  items={wishItems}
                  linkTo={"/mypage/wishItems"}
                />
              </section>
            </div>
        :
        <div>로그인해주세요</div>
        
      }
      </div>
  );
};

export default MyPage;
