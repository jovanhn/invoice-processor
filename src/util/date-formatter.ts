export const formatDateTime = (dateTimeStr : string)=> {
    const [date, time] = dateTimeStr.split(' ');
    let [day, month, year] = date.split('.');
    let [hours, minutes, seconds] = time.split(':');

    // Pad the day and month with leading zeros if necessary
    day = day.length === 1 ? '0' + day : day;
    month = month.length === 1 ? '0' + month : month;

    // Pad the hours, minutes, and seconds with leading zeros if necessary
    hours = hours.length === 1 ? '0' + hours : hours;
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    seconds = seconds.length === 1 ? '0' + seconds : seconds;

    // Reformat the date and time and return the full string
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}




