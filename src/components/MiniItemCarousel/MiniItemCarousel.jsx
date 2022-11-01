import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import style from "./MiniItemCarousel.module.scss";

const MiniItemCarousel = ({ code, title, itemList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    console.log(itemList)
    // onClick={() => navigate(`/item/${item.itemId}`)}
    

    const onPageBtnClick = (d) => {
        if ((d === -1 && currentPage === 1) || (d === 1 && currentPage === itemList.length)) return;
        setCurrentPage(prev => prev + d);
    }

    return (
        <div className={style.MiniItemCarousel}>
            <div className={style.MiniItemCarousel__header}>
                <div className={style.MiniItemCarousel__title}>
                    {
                        title.map((str, idx) => (
                            <div key={`str-${idx}`}>{str}</div>
                        ))
                    }
                </div>
                <div className={style.MiniItemCarousel__btn__wrapper}>
                    <button className={`carousel-control-prev ${style.MiniItemCarousel__btn}`} type="button" 
                        data-bs-target={`#carouselExampleControls${code}`} data-bs-slide="prev"
                        onClick={() => onPageBtnClick(-1)}
                    >
                        <span className={`carousel-control-prev-icon ${style.MiniItemCarousel__btn__icon}`} aria-hidden="true">
                            <i className="bi bi-caret-left"></i>
                        </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <label className={style.MiniItemCarousel__btn__label}>
                        {currentPage} / {itemList.length}
                    </label>
                    <button className={`carousel-control-next ${style.MiniItemCarousel__btn}`} type="button" 
                        data-bs-target={`#carouselExampleControls${code}`} data-bs-slide="next"
                        onClick={() => onPageBtnClick(1)}
                    >
                        <span className={`carousel-control-next-icon ${style.MiniItemCarousel__btn__icon}`} aria-hidden="true">
                        <i className="bi bi-caret-right"></i>
                        </span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <div className={style.MiniItemCarousel__carousel}>
                <div id={`#carouselExampleControls${code}`} className={`carousel slide ${style.MiniItemCarousel__inner__wrapper}`} data-bs-ride="carousel">
                    <div className={`carousel-inner ${style.MiniItemCarousel__inner}`}>
                        {
                            itemList.map((itemInnerList, idx) => (
                                <div className={`carousel-item ${idx === 0 ? 'active' : undefined}`} key={`item-pic-${idx}`}>
                                    <div className={`${style.MiniItemCarousel__inner__itemWrapper}`}>
                                        {
                                            itemInnerList.map((item, idx2) => {
                                                // console.log(item)
                                                return (
                                                    <div key = { idx2 } onClick={() => navigate(`/item/${item.itemId}`)}>
                                                        <Card item={item} size={"sm"} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    
                                </div>
                    ))
                        }
                </div>
            </div>
        </div>

        </div >
    )
}

export default MiniItemCarousel;