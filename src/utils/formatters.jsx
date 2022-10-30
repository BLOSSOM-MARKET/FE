import moment from 'moment';

const chatTimeformatter = (time) => {
    return moment(time).format('HH:mm')
}

const chatroomTimeformatter = (time) => {
    const isToday = moment(time).isSame(new Date(), "day")
    if (isToday) {
        return moment(time).format('hh:mm')
    } else return moment(time).format('YY-mm-DD HH:mm')
}

const itemTimeFormatter = (time) => {
    // 완성
    return time;
}

// 세자리마다 콤마찍어주기 + 원
const priceFormatter = (price) => {
    if (typeof price === 'number') {
        price = price.toString();
    }

    const result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return result + "원";
}

export {chatTimeformatter, chatroomTimeformatter, itemTimeFormatter, priceFormatter};