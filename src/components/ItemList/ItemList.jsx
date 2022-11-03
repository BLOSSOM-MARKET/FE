import style from "./ItemList.module.scss";
import Card from "../Card/Card";
import PaginationItem from "../Pagination/Pagination";

const ItemList = ({items, size, pagination}) => {

    return (
        <>
            <div className={style.ItemList__wrapper}>
                <div className={`${style.ItemList} ${style[size]}`}>
                    {
                        items.map((item, idx) => (
                            <Card item={item} size={size} key={`item-${idx}`}/>
                        ))
                    }
                </div>
            </div>
            <div className={style.ItemList__pagination}>
                {
                    pagination
                    &&
                    <PaginationItem pagination={pagination} />
                }
            </div>
        </>
    )
}

export default ItemList;