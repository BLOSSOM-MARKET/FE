import style from "./ItemList.module.scss";
import Card from "../Card/Card";
import PaginationItem from "../Pagination/Pagination";

const ItemList = ({items, size, pagination}) => {

    return (
        <>
        {
            items.length > 0
            ?
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
            :
            <div className={`${style.ItemList__wrapper} ${style.ItemList__noResult}`}>
                검색 결과가 없습니다. 검색어 및 검색 조건을 바꿔 다시 검색해보세요!
            </div>
        }
        </>
    )
}

export default ItemList;