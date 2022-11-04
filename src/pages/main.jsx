import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card/Card";
import ItemList from "../components/ItemList/ItemList";
import style from "./page.module.scss";
import React from "react";
import axios from "axios";
import UseAsync from "../utils/UseAsync";
import { useSearchParams } from "react-router-dom";
import { createQueryObj } from "../utils/searchutils";


const Main = () => {
    const [mainItems, setMainItems] = useState([]);
    const [mainItemPagination, setMainItemPagination] = useState({});

    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];
    const q = createQueryObj(queryList);

    useEffect(() => {
        // axios
        // dummy data 실제데이터로 변경
        const queryConfig = {};

        if ("page" in q) {
            queryConfig.page = q.page[0];
        }

        axios
        .get('/api/recommend/standard', {
            params: queryConfig
          })
        .then((res) => {
          console.log(res);
          let resData = res.data.list;

          setMainItems(resData);
          setMainItemPagination(res.data.pagination);

        })

    }, [searchParams]);

    return (
        <div className={style.Page}>
            {
                <ItemList items={mainItems} size={"md"} pagination={mainItemPagination} />
            }
        </div>
    );
}

export default Main;