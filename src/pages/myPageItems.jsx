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

        if (itemPage === "soldItems") {
          // 판매한 상품 가져오기
          // 데이터 변경
          console.log("sold")
          itemTemp = [...dummy, ...dummy];
          setTitle("내가 판매한 상품");

        } else if (itemPage === "boughtItems") {
          // 구매한 상품 가져오기
          // 데이터 변경
          console.log("bought")
          itemTemp = [...dummy, ...dummy];
          setTitle("내가 구매한 상품");
        } else if (itemPage === "wishItems") {
          // 찜한 상품 가져오기
          // 데이터 변경
          console.log("wish")
          itemTemp = [...dummy, ...dummy];
          setTitle("내가 찜한 상품");
        }

          setItems(itemTemp);

    }, []);


    return (
        <div className={style.Page}>
          {
            isLogin
            ?
            <div className={style.MyPageItems}>
                <div className={style.MyPageItems__header}>
                    {title}
                </div>
                <ItemList items={items} size={'md'} />
            </div>
            :
            <div>로그인해주세요</div>
          }
        </div>
    )
}

export default MyPageItems;