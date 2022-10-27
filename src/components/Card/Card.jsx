import { useNavigate } from "react-router-dom";
import { itemTimeFormatter, priceFormatter } from "../../utils/formatters";
import style from "./Card.module.scss";

const Card = ({item, size}) => {
    const navigate = useNavigate();

    return (
        <div className={`card ${style.Card} ${style[size]}`} onClick={() => navigate(`/item/${item.id}`)}>
            <img src={item.imgSrc} className="card-img-top" alt="item_image" />
            <div className={`card-body ${style.Card__body}`}>
                <div className="card-text">
                    <div className={style.Card__title}>{item.title}</div>
                    <div className={style.Card__price}>{priceFormatter(item.price)}</div>
                    {
                        size !== 'sm'
                        &&
                        <div className={style.Card__time}>{itemTimeFormatter(item.time)}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card;