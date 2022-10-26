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

export {chatTimeformatter, chatroomTimeformatter};