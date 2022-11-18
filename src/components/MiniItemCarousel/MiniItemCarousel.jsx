import { useRef, useState } from "react";
import { Button, Carousel, CarouselItem, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { shortenTitle } from "../../utils/formatters";
import Card from "../Card/Card";
import style from "./MiniItemCarousel.module.scss";

const MiniItemCarousel = ({ title, itemList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    let targetRef = useRef();


    const onPageBtnClick = (d) => {
        if ((d === -1 && currentPage === 1) || (d === 1 && currentPage === itemList.length)) return;
        setCurrentPage(prev => prev + d);
        if (d === -1) {
            targetRef.current.prev();
        } else {
            targetRef.current.next();
        }
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
                    <button className={`carousel-control-prev ${style.MiniItemCarousel__btn}`}
                        onClick={() => onPageBtnClick(-1)}
                    >
                        <span className={style.MiniItemCarousel__btn__icon}>
                            <i className="bi bi-caret-left"></i>
                        </span>
                    </button>
                    <label className={style.MiniItemCarousel__btn__label}>
                        {currentPage} / {itemList.length}
                    </label>
                    <button className={`carousel-control-next ${style.MiniItemCarousel__btn}`}
                        onClick={() => onPageBtnClick(1)}
                    >
                        <span className={style.MiniItemCarousel__btn__icon}>
                            <i className="bi bi-caret-right"></i>
                        </span>
                    </button>
                </div>
            </div>
            <Carousel className={style.MiniItemCarousel__carousel} controls={false} indicators={false} ref={targetRef}>
                {
                    itemList.map((itemInnerList, idx) => (
                        <Carousel.Item key={`carousel_item_${idx}`}>
                            <div key={`item-pic-${idx}`}>
                                <div className={`${style.MiniItemCarousel__inner__itemWrapper}`}>
                                    {
                                        itemInnerList.map((item, idx2) => (
                                                <div key={idx2} onClick={() => navigate(`/item/${item.productId}`)}>
                                                    <Card item={{
                                                        ...item,
                                                        productName: shortenTitle(item.productName, 8)
                                                    }} size={"sm"} />
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel>

        </div >
    )
}

export default MiniItemCarousel;