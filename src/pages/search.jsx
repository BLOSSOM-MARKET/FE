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

        if ("orderByType" in q) {
            queryConfig.orderByType = q.orderByType[0];
        }

        // 수정!!!
        // 조건 다중선택 가능하게 수정
        if (!("cat" in q && q.cat.length === 1 && q.cat[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId1 = q.cat.join(",");
        }
        if (!("reg" in q && q.reg.length === 1 && q.reg[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId2 = q.reg.join(",");
        }
        if (!("status" in q && q.status.length === 1 && q.status[0] === "00")) {   // 전체선택이 아니면
            queryConfig.categoryId3 = q.status.join(",");
        }
        
        // axios
        // 검색결과 받아오기
        axios
        .get('/api/recommend/standard', {
          params: queryConfig
        })
        .then((res) => {
          console.log(res);
          setSearchItems(res.data.list);
            setPagination(res.data.pagination);
        })

    }, [searchParams]);

    const onChangeSort = (e) => {
        console.log(e.target.value)
        const s = e.target.value;
        const params = q;
        params['orderByType'] = s;
        params['page'] = 1;
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        });
    }

    // const onClickPageBtn = (targetPage) => {
    //     console.log("page:",targetPage);
    //     const params = q;
    //     params['page'] = targetPage;
    //     navigate({
    //         pathname: '/search',
    //         search: `?${createSearchParams(params)}`
    //     });
    // }   

    return (
        <div className={style.Page}>
            <div className={style.Search__sort__wrapper}>
                <select className={`form-select ${style.Search__sort}`} 
                    onChange={onChangeSort}                
                    aria-label="Default select example">
                    <option defaultValue value="standard">인기순</option>
                    <option value="viewcount">조회순</option>
                    <option value="new">최신순</option>
                    <option value="price">낮은 가격순</option>
                    <option value="like">좋아요순</option>
                </select>
            </div>
            {
                <ItemList items={searchItems} size={'md'} pagination={pagination} />
            }
        </div>
    )
}

export default Search;