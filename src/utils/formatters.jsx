import moment from 'moment';

const chatTimeformatter = (time) => {
    return moment(time).format('hh:mm')
}

const chatroomTimeformatter = (time) => {
    const isToday = moment(time).isSame(new Date(), "day")
    if (isToday) {
        return moment(time).format('hh:mm')
    } else return moment(time).format('yyyy-mm-dd hh:mm')
}

export {chatTimeformatter, chatroomTimeformatter};