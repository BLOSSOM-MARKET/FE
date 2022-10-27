import style from "./ItemList.module.scss";
import Card from "../Card/Card";

const ItemList = ({items, size}) => {

    return (
        <div className={style.ItemList__wrapper}>
            <div className={`${style.ItemList} ${style[size]}`}>
                {
                    items.map((item, idx) => (
                        <Card item={item} size={size} key={`item-${idx}`}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ItemList;