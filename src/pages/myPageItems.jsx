import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList/ItemList";
import { UserContext } from "../contexts/UserContext";
import style from "./page.module.scss";

const MyPageItems = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const { itemPage } = useParams();
  const { isLogin } = useContext(UserContext);

  useEffect(() => {
    let itemTemp;
    // axios
    // 데이터 가져오기

    if (itemPage === "soldItems") {
      // 판매한 상품 가져오기
      // 데이터 변경
      axios
        .get("/api/mypage/sellproductlist")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setItems(res.data);
        });
      setTitle("내가 판매한 상품");
    } else if (itemPage === "boughtItems") {
      // 구매한 상품 가져오기
      // 데이터 변경
      axios
        .get("/api/mypage/buyproductlist")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setItems(res.data);
        });
      setTitle("내가 구매한 상품");
    } else if (itemPage === "wishItems") {
      // 찜한 상품 가져오기
      // 데이터 변경
      axios
        .get("/api/mypage/likeproductlist")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setItems(res.data);
        });
      console.log("wish");
      setTitle("내가 찜한 상품");
    }

    setItems(itemTemp);
  }, []);

  return (
    <div className={style.Page}>
      {isLogin ? (
        <div className={style.MyPageItems}>
          <div className={style.MyPageItems__header}>{title}</div>
          {
            (items && items.length > 0)
            &&
            <ItemList items={items} size={"md"} />
          }
        </div>
      ) : (
        <div>로그인해주세요</div>
      )}
    </div>
  );
};

export default MyPageItems;
