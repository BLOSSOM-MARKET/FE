import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { UserContext } from "../contexts/UserContext";
import style from "./page.module.scss";

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

const MyCarousel = ({ icon, title, items }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-block w-100">
              {
                items.map((item, idx) => (
                  <Card item={item} size={"sm"} key={`item-${idx}`} />
                ))
              }
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const MyPage = () => {
  const { isLogin, userId, nickname } = useContext(UserContext);
  const navigate = useNavigate();
  const [soldItems, setSoldItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    // axios
    // 실제 데이터 가져오기

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

    const soldTemp = [...dummy, ...dummy, ...dummy];
    const boughtTemp = [...dummy, ...dummy, ...dummy];
    const favTemp = [...dummy, ...dummy, ...dummy];

    setSoldItems(soldTemp);
    setBoughtItems(boughtTemp);
    setFavItems(favTemp);
  }, []);

  return (
    <div className={style.Page}>
      <MyPageHeader />
      <section className={style.My__MyItems}>
        <MyCarousel
          icon={<i className="bi bi-gear"></i>}
          title={"판매 상품"}
          items={soldItems}
        />
        <MyCarousel
          icon={<i className="bi bi-gear"></i>}
          title={"구매 상품"}
          items={boughtItems}
        />
        <MyCarousel
          icon={<i className="bi bi-gear"></i>}
          title={"찜한 상품"}
          items={favItems}
        />
      </section>
    </div>
  );
};

export default MyPage;
