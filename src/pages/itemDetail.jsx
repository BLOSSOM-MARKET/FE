import { useParams } from "react-router-dom";
import style from "./page.module.scss";

const ItemDetail = () => {
    const { itemId } = useParams();
    return (
        <div className={style.Page}>
            ItemDetail {itemId}
        </div>
    )
}

export default ItemDetail;