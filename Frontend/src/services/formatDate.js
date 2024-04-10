const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);

    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTime.getDate()).slice(-2);

    const hours = dateTime.getHours();
    const minutes = ('0' + dateTime.getMinutes()).slice(-2);
    const seconds = ('0' + dateTime.getSeconds()).slice(-2);

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    const formattedDateTime = `${year}-${month}-${day} | ${displayHours}:${minutes}:${seconds} ${period}`;

    return formattedDateTime;
}


export default formatDateTime;