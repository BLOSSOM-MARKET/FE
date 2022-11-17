import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CATE } from "../../utils/categories";
import { createQueryObj } from "../../utils/searchutils";
import style from "./SearchBar.module.scss";


const categories = CATE.categories.data;
const regions = CATE.regions.data;
const status = CATE.status.data;

const defaultCateVal = {
    categories: CATE.categories.data[0],
    regions: CATE.regions.data[0],
    status: CATE.status.data[0]
}


const SearchBar = () => {
    const [checkedCategories, setCheckedCategories] = useState([defaultCateVal.categories]);
    const [checkedRegions, setCheckedRegions] = useState([defaultCateVal.regions]);
    const [checkedStatus, setCheckedStatus] = useState([defaultCateVal.status]);
    const [isCatAllDisabled, setIsCatAllDisabled] = useState(true);
    const [isRegionAllDisabled, setIsRegionAllDisabled] = useState(true);
    const [isStatusAllDisabled, setIsStatusAllDisabled] = useState(true);

    const [inputVal, setInputVal] = useState("");

    const navigate = useNavigate();
    const loc = useLocation();

    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];

    const searchInput = useRef();
    
    const allBtns = {
        catAll: useRef(),
        regionAll: useRef(),
        statusAll: useRef()
    }

    useEffect(() => {
        if (loc.pathname === '/search') {
            const q = createQueryObj(queryList);

            const { key } = q;
            if (key) {

                setInputVal(key);
                searchInput.current.value = key;
            }

            if ('cat' in q && 'reg' in q && 'status' in q) {
                const { cat, reg, status } = q;
                console.log(CATE.categories.data)
                setCheckedCategories(CATE.categories.data.filter(el => cat.includes(el.code)));
                setCheckedRegions(CATE.regions.data.filter(el => reg.includes(el.code)));
                setCheckedStatus(CATE.status.data.filter(el => status.includes(el.code)));

                setIsCatAllDisabled(cat.includes("00"));
                setIsRegionAllDisabled(reg.includes("00"));
                setIsStatusAllDisabled(status.includes("00"));
            }
        } else if (loc.pathname === '/') {
            // main오면 리셋
            setInputVal("");
            searchInput.current.value = '';

            if (!('search_cat_all' in checkedCategories)) {
                setCheckedCategories([defaultCateVal.categories]);
                setIsCatAllDisabled(true);
            }

            if (!('search_region_all' in checkedRegions)) {
                setCheckedRegions([defaultCateVal.regions]);
                setIsRegionAllDisabled(true);
            }

            if (!('search_status_all' in checkedStatus)) {
                setCheckedStatus([defaultCateVal.status]);
                setIsStatusAllDisabled(true);
            }
        }

    }, [loc.pathname]);

    const setDisabled = (parentShortCode, b) => {
        allBtns[`${parentShortCode}All`].current.checked = true;
        // // console.log(parentShortCode, allBtns[`${parentShortCode}All`],  allBtns[`${parentShortCode}All`].current.checked);
        // const checkbox = allBtns[`${parentShortCode}All`].current;
        // if (checkbox) {
        //     checkbox.focus();
        //     checkbox.select();
        // }
        if (parentShortCode === 'cat') {
            setIsCatAllDisabled(b);
        } else if (parentShortCode === 'region') {
            setIsRegionAllDisabled(b);
        } else if (parentShortCode === 'status') {
            setIsStatusAllDisabled(b);
        }
    }

    const checkAll = (setTargetList, item) => {
        const parentShortCode = item.id.split('_')[1];
        setTargetList([item]);
        setDisabled(parentShortCode, true);
    }

    const changeHandler = (checked, item, targetList, setTargetList) => {
        // const targetCode = id.split('_')[1];
        // const item = {id: id, code: targetCode};
        const parentCode = item.id.split('_')[1];

        // 전체선택 O 비활성화상태로 변경
        // 1. 처음 default
        // 2. 모든 체크박스 해제됐을 때 || 3. 전체선택 박스 체크했을 때
        if ((targetList.length <= 1 && !item.id.includes('all') && !checked) 
            || (checked && item.id.includes('all'))) {
                
            let targetAllItem = null;

            if (parentCode === 'cat') {
                targetAllItem = categories[0];
            } else if (parentCode === 'region') {
                targetAllItem = regions[0];
            } else if (parentCode === 'status') {
                targetAllItem = status[0];
            }

            checkAll(setTargetList, targetAllItem);
            return
        }

        // 전체선택 X 활성화 상태로 변경
        // 1. 전체선택 상태일 때 다른 박스 체크
        if (checked && targetList.length <= 1 && !item.id.includes('all')) {
            setTargetList([...targetList.filter((el) => !el.id.includes('all')), item]);
            setDisabled(parentCode, false);
            return
        }

        // 선택 토글
        if (checked) {
            // 추가
            setTargetList([...targetList, item]);
        } else {
            // 삭제
            setTargetList(targetList.filter((el) => el.id !== item.id));
        }

    };


    // 검색!
    const onSearchClick = (e) => {
        e.preventDefault();

        console.log("검색어: ", inputVal)
        console.log("카테고리: ", checkedCategories);
        console.log("지역: ", checkedRegions);
        console.log("중고여부: ", checkedStatus);

        const params = { 
            key: inputVal, 
            cat: checkedCategories.map(item => item.code), 
            reg: checkedRegions.map(item => item.code), 
            status: checkedStatus.map(item => item.code),
            page: 1
        }

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        });
    }

    return (
        <nav className={`navbar ${style.Nav}`}>
            <div className={`container-fluid ${style.Nav__InputBar}`}>
                <img className={style.Nav__InputBar__Logo} src="/bm_logo.png" alt="logo"
                    onClick={() => navigate("/")} />
                <form className={`d-flex`} role="search">
                    <input
                        className={`form-control me-2 ${style.Nav__InputBar__Input}`}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setInputVal(e.target.value)}
                        ref={searchInput}
                    />
                    <button
                        className={`btn btn-outline-dark ${style.Nav__SearchBtn}`}
                        type="submit"
                        onClick={onSearchClick}
                    >
                        검색
                    </button>
                </form>
            </div>

            {/* 상세검색 */}
            <div
                className={`accordion accordion-flush ${style.Nav__DetailDrop}`}
                id="accordionFlushExample"
            >
                <div className={`accordion-item`}>
                    <h2 className={`accordion-header`} id="flush-headingOne">
                        <button
                            className={`accordion-button collapsed ${style.Nav__DetailDrop__Btn}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            상세조건
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className={`accordion-body ${style.Nav__body__section__wrapper}`}>
                            {/* 카테고리 설정 */}
                            <section className={`accordion-body-section ${style.Nav__body__section}`}>
                                <div className={style.Nav__body__section__title}>
                                    카테고리
                                    <span className={style.Nav__body__section__refresh}
                                        onClick={() => checkAll(setCheckedCategories, categories[0])}
                                    >
                                        <i className={`bi bi-arrow-counterclockwise`}></i>
                                    </span>
                                </div>
                                <div className={`form-check ${style.Nav__body__section__formcheck}`}>
                                    {
                                        categories.map((item, i) => (
                                            <div key={`category-${i}`}>
                                                <input className={`form-check-input`} type="checkbox" value="" id={item.id}
                                                    onChange={(e) => {
                                                        console.log(checkedCategories)
                                                        changeHandler(e.currentTarget.checked, item, checkedCategories, setCheckedCategories)
                                                    }}
                                                    checked={checkedCategories.some((el) => el.id === item.id)}
                                                    ref={item.id === 'search_cat_all' ? allBtns.catAll : null}
                                                    disabled={item.id === 'search_cat_all' && isCatAllDisabled}
                                                />
                                                <label className={`form-check-label`} htmlFor={item.id}>
                                                    {item.name}
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>

                            </section>

                            <div>
                                {/* 지역 설정 */}
                                <section className={`accordion-body-section ${style.Nav__body__section}`}>
                                    <div className={style.Nav__body__section__title}>
                                        지역
                                        <span className={style.Nav__body__section__refresh}
                                            onClick={() => checkAll(setCheckedRegions, regions[0])}
                                        >
                                            <i className={`bi bi-arrow-counterclockwise`}></i>
                                        </span>
                                    </div>
                                    <div className={`form-check ${style.Nav__body__section__formcheck}`}>
                                        {
                                            regions.map((item, i) => (
                                                <div key={`category-${i}`}>
                                                    <input className={`form-check-input`} type="checkbox" value="" id={item.id}
                                                        onChange={(e) => {
                                                            changeHandler(e.currentTarget.checked, item, checkedRegions, setCheckedRegions)
                                                        }}
                                                        checked={checkedRegions.some((el) => el.id === item.id)}
                                                        ref={item.id === 'search_region_all' ? allBtns.regionAll : null}
                                                        disabled={item.id === 'search_region_all' && isRegionAllDisabled}
                                                    />
                                                    <label className={`form-check-label`} htmlFor={item.id}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </section>

                                {/* 중고여부 설정 */}
                                <section className={`accordion-body-section ${style.Nav__body__section}`}>
                                    <div className={style.Nav__body__section__title}>
                                        중고여부
                                        <span className={style.Nav__body__section__refresh}
                                            onClick={() => checkAll(setCheckedStatus, status[0])}
                                        >
                                            <i className={`bi bi-arrow-counterclockwise`}></i>
                                        </span>
                                    </div>
                                    <div className={`form-check ${style.Nav__body__section__formcheck}`}>
                                        {
                                            status.map((item, i) => (
                                                <div key={`category-${i}`}>
                                                    <input className={`form-check-input`} type="checkbox" value="" id={item.id}
                                                        onChange={(e) => {
                                                            changeHandler(e.currentTarget.checked, item, checkedStatus, setCheckedStatus)
                                                        }}
                                                        checked={checkedStatus.some((el) => el.id === item.id)}
                                                        ref={item.id === 'search_status_all' ? allBtns.statusAll : null}
                                                        disabled={item.id === 'search_status_all' && isStatusAllDisabled}
                                                    />
                                                    <label className={`form-check-label`} htmlFor={item.id}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SearchBar;
