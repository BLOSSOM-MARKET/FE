import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createQueryObj } from "../../utils/searchutils";
import style from "./SearchBar.module.scss";

const SearchBar = () => {
    const [checkedCategories, setCheckedCategories] = useState(['search_cat_all']);
    const [checkedRegions, setCheckedRegions] = useState(['search_region_all']);

    const [isCatAllDisabled, setIsCatAllDisabled] = useState(true);
    const [isRegionAllDisabled, setIsRegionAllDisabled] = useState(true);

    const [inputVal, setInputVal] = useState("");

    const navigate = useNavigate();
    const loc = useLocation();

    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];

    const searchInput = useRef();

    // const setDefaultCategories = () => {
    //     setCheckedCategories
    // }

    useEffect(() => {
        console.log(loc.pathname)
        if (loc.pathname === '/search') {
            const q = createQueryObj(queryList);

            const { key } = q;
            if (key) {

                setInputVal(key);
                searchInput.current.value = key;
            }
            
            if ('cat' in q && 'reg' in q) {
                const {cat, reg} = q;

                setCheckedCategories(cat);
                setCheckedRegions(reg);

                setIsCatAllDisabled('search_cat_all' in cat);
                setIsRegionAllDisabled('search_region_all' in reg);
            }
        } else if (loc.pathname === '/') {
            // main오면 리셋
            setInputVal("");
            searchInput.current.value = '';

            if (!('search_cat_all' in checkedCategories)) {
                setCheckedCategories(['search_cat_all']);
                setIsCatAllDisabled(true);
            }

            if(!('search_region_all' in checkedRegions)) {
                setCheckedRegions(['search_region_all']);
                setIsRegionAllDisabled(true);
            }
        }

    }, [loc.pathname]);

    const allBtns = {
        catAll: useRef(),
        regionAll: useRef()
    }

    const setDisabled = (code, b) => {
        allBtns[`${code}All`].checked = true;
        if (code === 'cat') {
            setIsCatAllDisabled(b);
        } else if (code === 'region') {
            setIsRegionAllDisabled(b);
        }
    }

    const checkAll = (setTargetList, code) => {
        setTargetList([`search_${code}_all`]);
        setDisabled(code, true);
    }

    const changeHandler = (checked, id, targetList, setTargetList) => {
        const targetCode = id.split('_')[1];

        // 전체선택 O 비활성화상태로 변경
        // 1. 처음 default
        // 2. 모든 체크박스 해제됐을 때 || 3. 전체선택 박스 체크했을 때
        if ((targetList.length <= 1 && !id.includes('all') && !checked)
            || (checked && id.includes('all'))) {
            console.log("모든 체크박스 해제! 전체선택 on");
            checkAll(setTargetList, targetCode);
            return
        }

        // 전체선택 X 활성화 상태로 변경
        // 1. 전체선택 상태일 때 다른 박스 체크
        if (checked && targetList.length <= 1 && !id.includes('all')) {
            console.log("전체선택 해제!")
            setTargetList([...targetList.filter((el) => !el.includes('all')), id]);
            setDisabled(targetCode, false);
            return
        }

        // 선택 토글
        if (checked) {
            // 추가
            setTargetList([...targetList, id]);
        } else {
            // 삭제
            setTargetList(targetList.filter((el) => el !== id));
        }
       
    };


    const categories = [
        {
            name: "전체",
            id: "search_cat_all"
        },
        {
            name: "생활/주방/가구/건강",
            id: "search_cat_health"
        },
        {
            name: "가전/IT",
            id: "search_cat_it"
        },
        {
            name: "의류/잡화",
            id: "search_cat_clothes"
        },
        {
            name: "스포츠/레저/자동차",
            id: "search_cat_sports"
        },
        {
            name: "화장품/미용",
            id: "search_cat_beauty"
        },
        {
            name: "유아동/도서/문구",
            id: "search_cat_kids"
        },
        {
            name: "식품",
            id: "search_cat_food"
        },
        {
            name: "청소/생활용품",
            id: "search_cat_life"
        },
        {
            name: "기타",
            id: "search_cat_etc"
        }
    ]

    const regions = [
        {
            name: "전체",
            id: "search_region_all"
        },
        {
            name: "명동",
            id: "search_region_myungdong"
        },
        {
            name: "성수",
            id: "search_region_sungsoo"
        },
        {
            name: "김포",
            id: "search_region_kimpo"
        },
        {
            name: "경기",
            id: "search_region_gyeongki"
        },
        {
            name: "부산",
            id: "search_region_busan"
        }
    ]

    // 검색!
    const onSearchClick = (e) => {
        e.preventDefault();
                
        if (!inputVal || inputVal.length <= 0) {
            return
        }

        console.log("검색어: ", inputVal)
        console.log("카테고리: ", checkedCategories);
        console.log("지역: ", checkedRegions);

        const params = {key: inputVal, cat: checkedCategories, reg: checkedRegions}
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
                            onClick={() => checkAll(setCheckedCategories, "cat")}
                        >
                            <i className={`bi bi-arrow-counterclockwise`}></i>
                        </span>
                    </div>
                    <div className={`form-check ${style.Nav__body__section__formcheck}`}>
                        {
                            categories.map((item, i) => (
                                <div key={`category-${i}`}>
                                    <input className={`form-check-input`} type="checkbox" value="" id={item.id}
                                        onChange={(e)=>{
                                            console.log(checkedCategories)
                                            changeHandler(e.currentTarget.checked, item.id, checkedCategories, setCheckedCategories)
                                        }}
                                        checked={checkedCategories.includes(item.id) ? true : false}
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

              {/* 지역 설정 */}
              <section className={`accordion-body-section ${style.Nav__body__section}`}>
                    <div className={style.Nav__body__section__title}>
                        지역
                        <span className={style.Nav__body__section__refresh}
                            onClick={() => checkAll(setCheckedRegions, "region")}
                        >
                            <i className={`bi bi-arrow-counterclockwise`}></i>
                        </span>
                    </div>
                    <div className={`form-check ${style.Nav__body__section__formcheck}`}>
                        {
                            regions.map((item, i) => (
                                <div key={`category-${i}`}>
                                    <input className={`form-check-input`} type="checkbox" value="" id={item.id}
                                        onChange={(e)=>{
                                            changeHandler(e.currentTarget.checked, item.id, checkedRegions, setCheckedRegions)
                                        }}
                                        checked={checkedRegions.includes(item.id) ? true : false}
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
