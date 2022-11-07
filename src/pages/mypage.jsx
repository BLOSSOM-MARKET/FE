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

const MyItemContainer = ({ icon, title, items, linkTo, blankText }) => {
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
        {
          items.length > 0
          &&
          <div className={style.My__MyItemContainer__header__moreBtn}
                onClick={() => navigate(linkTo)}>
            more {">"}
          </div>
        }
      </div>
      <div className={style.My__MyItemContainer__body}>
        {
          items.length > 0
          ?
          items.map((item, idx) => (
            <Card item={item} size={'sm'} key={`item-${idx}`} />
          ))
          :
          <div className={style.My__MyItemContainer__blankText}>
            <div>
              {blankText}
            </div>
          </div>
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
      const myData = res.data;
      
      if ("sell" in myData) {
        setSoldItems(myData.sell);
      }
      if ("buy" in myData) {
        setBoughtItems(myData.buy);
      }
      if ("like" in myData) {
        setWishItems(myData.like);
      }
    });
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
                  blankText={"첫 상품을 판매해보세요"}
                />
                <MyItemContainer
                  icon={<i className="bi bi-cart"></i>}
                  title={"구매 상품"}
                  items={boughtItems}
                  linkTo={"/mypage/boughtItems"}
                  blankText={"첫 상품을 구매해보세요"}
                />
                <MyItemContainer
                  icon={<i className="bi bi-heart"></i>}
                  title={"찜한 상품"}
                  items={wishItems}
                  linkTo={"/mypage/wishItems"}
                  blankText={"마음에 드는 상품을 찜해보세요"}
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
