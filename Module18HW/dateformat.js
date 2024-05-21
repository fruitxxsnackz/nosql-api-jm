const adddates = date => {
    const datesuf = date.toString();
    const finisher = datesuf.charAt(datesuf.length - 1);
    const endsuf = datesuf.slice(-2);

    if (endsuf === '11' || endsuf === '12' || endsuf === '13') {
        return `${datesuf}th`;
    }

    switch (finisher) {
        case '1':
            return `${datesuf}st`;
        case '2':
            return `${datesuf}nd`;
        case '3':
            return `${datesuf}rd`;
        default:
            return `${datesuf}th`;
    }
};

const createtime = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    const months = monthLength === 'short'
        ? { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' }
        : { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };

    const dating = new Date(timestamp);
    const monthformat = months[dating.getMonth()];

    const monthday = dateSuffix ? adddates(dating.getDate()) : dating.getDate();
    const year = dating.getFullYear();
    let hour = dating.getHours();
    const minutes = dating.getMinutes().toString().padStart(2, '0');
    const timestamps = hour >= 12 ? 'pm' : 'am';

    hour = hour % 12 || 12;

    return `${monthformat} ${monthday}, ${year} at ${hour}:${minutes} ${timestamps}`;
};

module.exports = createtime;