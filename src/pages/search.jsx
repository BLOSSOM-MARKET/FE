import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ItemList from "../components/ItemList/ItemList";
import { createQueryObj } from "../utils/searchutils";
import style from "./page.module.scss";

const Search = () => {
    const [searchItems, setSearchItems] = useState([]);
    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];

    useEffect(() => {
        const q = createQueryObj(queryList);
        console.log("queryObj: ", q);
        
        // axios
        // 검색결과 받아오기

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

        const data = [
            ...dummy, ...dummy, ...dummy
        ]

        setSearchItems(data);
    }, []);

    const onChangeSort = (e) => {
        console.log(e.target.value)

        //axios
        // 정렬기준에 따른 검색 결과 재요청
        const data = [];
        setSearchItems(data);
    }

    return (
        <div className={style.Page}>
            <div className={style.Search__sort__wrapper}>
                <select className={`form-select ${style.Search__sort}`} 
                    onChange={onChangeSort}                
                    aria-label="Default select example">
                    <option defaultValue value="1">인기순</option>
                    <option value="2">조회순</option>
                    <option value="3">최신순</option>
                    <option value="4">낮은 가격순</option>
                </select>
            </div>
            {
                <ItemList items={searchItems} size={'md'} />
            }
        </div>
    )
}

export default Search;