import moment from 'moment';

const chatTimeformatter = (time) => {
    return moment(time).format('HH:mm')
}

const chatroomTimeformatter = (time) => {
    const isToday = moment(time).isSame(new Date(), "day")
    if (isToday) {
        return moment(time).format('hh:mm')
    } else return moment(time).format('YY-MM-DD HH:mm')
}

// const itemTimeFormatter = (time) => {
//     // 완성
//     console.log(time)
//     moment()
//     return time;
// }

const itemTimeFormatterShort = (time) => {
    const today = new Date();
    const timeValue = new Date(time);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

const itemTimeFormatterLong = (time) => {
    const today = new Date();

    const isSameYear = moment(today).isSame(time, 'year');
    const isSameDay = moment(today).isSame(time, 'day');

    if (isSameDay) {
        return moment(time).format('HH시 mm분');
    } else if (isSameYear) {
        return moment(time).format('MM월 DD일 HH시 mm분');
    } else return moment(time).format('YYYY년 MM월 DD일 HH시 mm분');
}

// 세자리마다 콤마찍어주기 + 원
const priceFormatter = (price) => {
    if (typeof price === 'number') {
        price = price.toString();
    }

    const result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return result + "원";
}

export {chatTimeformatter, chatroomTimeformatter, itemTimeFormatterShort, itemTimeFormatterLong, priceFormatter};