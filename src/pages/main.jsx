import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card/Card";
import ItemList from "../components/ItemList/ItemList";
import style from "./page.module.scss";

const Main = () => {
    const [mainItems, setMainItems] = useState([]);

    useEffect(() => {
        // axios
        // dummy data 실제데이터로 변경
        const dummy = [
            {
                id: 1,
                imgSrc: "https://shopping-phinf.pstatic.net/main_8318544/83185449617.7.jpg?type=f200",
                title: "곰인형 판매 (네고x)",
                price: 10000, 
                time: new Date().toDateString()
            },
            {
                id: 2,
                imgSrc: "http://image.bom.co.kr/product/detail/AQW/1912262016184445/_600.jpg",
                title: "곰돌이 귀 강쥐 후드",
                price: 25000, 
                time: new Date().toDateString()
            },
            {
                id: 3,
                imgSrc: "https://image.homeplus.kr/td/d8761252-5c09-4690-9cb0-6fb4e6ca8b6f",
                title: "마동석 곰돌이",
                price: 40000, 
                time: new Date().toDateString()
            },
        ]

        // 테스트용 개수부풀리기
        const data = [...dummy, ...dummy, ...dummy, ...dummy]

        setMainItems(data);

    }, []);

    return (
        <div className={style.Page}>
            {
                <ItemList items={mainItems} size={"md"} />
            }
        </div>
    );
}

export default Main;