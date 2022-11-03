import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import ItemList from "../components/ItemList/ItemList";
import { createQueryObj } from "../utils/searchutils";
import style from "./page.module.scss";

const Search = () => {
    const [searchItems, setSearchItems] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];
    const q = createQueryObj(queryList);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("queryObj: ", q);

        const queryConfig = {
            keyword: q.key[0],
            page: q.page[0]
        }

        // 수정!!!
        // 조건 다중선택 가능하게 수정
        if (!(q.cat.length === 1 && q.cat[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId1 = q.cat[0];
        }
        if (!(q.reg.length === 1 && q.reg[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId2 = q.reg[0];
        }
        if (!(q.status.length === 1 && q.status[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId3 = q.status[0];
        }
        
        // axios
        // 검색결과 받아오기
        axios
        .get('/api/recommend/standard', {
          params: queryConfig
        })
        .then((res) => {
          console.log(res);
            setPagination(res.data.pagination);
          
        })


        // // dummy data 실제데이터로 변경
        // const dummy = [
        //     {
        //         id: 1,
        //         imgSrc: "https://shopping-phinf.pstatic.net/main_8318544/83185449617.7.jpg?type=f200",
        //         title: "곰인형 판매 (네고x)",
        //         price: 10000, 
        //         time: new Date().toDateString()
        //     },
        //     {
        //         id: 2,
        //         imgSrc: "http://image.bom.co.kr/product/detail/AQW/1912262016184445/_600.jpg",
        //         title: "곰돌이 귀 강쥐 후드",
        //         price: 25000, 
        //         time: new Date().toDateString()
        //     },
        //     {
        //         id: 3,
        //         imgSrc: "https://image.homeplus.kr/td/d8761252-5c09-4690-9cb0-6fb4e6ca8b6f",
        //         title: "마동석 곰돌이",
        //         price: 40000, 
        //         time: new Date().toDateString()
        //     },
        // ]

        // const data = [
        //     ...dummy, ...dummy, ...dummy
        // ]

        // setSearchItems(data);
    }, [searchParams]);

    const onChangeSort = (e) => {
        console.log(e.target.value)
        const s = e.target.value;
        const params = q;
        params['sort'] = s;
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        });

        // //axios
        // // 정렬기준에 따른 검색 결과 재요청
        // const data = [];
        // setSearchItems(data);
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
                    <option value="5">좋아요순</option>
                </select>
            </div>
            {
                <ItemList items={searchItems} size={'md'} pagination={pagination} />
            }
        </div>
    )
}

export default Search;