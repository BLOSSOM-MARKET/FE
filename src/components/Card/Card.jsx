import { useNavigate } from "react-router-dom";
import { itemTimeFormatterShort, priceFormatter } from "../../utils/formatters";
import style from "./Card.module.scss";

const Card = ({item, size}) => {
    const navigate = useNavigate();

    return (
        <div className={`card ${style.Card} ${style[size]}`} onClick={() => navigate(`/item/${item.productId}`)}>
            <div className={`card-img-top ${style.Card__img__wrapper}`}>
                <img src={item.image1} className={style.Card__img} alt="item_image" />
            </div>
            <div className={`card-body ${style.Card__body}`}>
                <div className="card-text">
                    <div className={style.Card__title}>{item.productName}</div>
                    {
                        size !== 'sm'
                        &&
                        <>
                            <div className={style.Card__price}>{priceFormatter(item.price)}</div>
                            <div className={style.Card__time}>{itemTimeFormatterShort(item.createDate)}</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card;