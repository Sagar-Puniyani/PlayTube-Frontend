const timeAgo = (createdAt )    => {
    
    const now = new Date();
    const difference = Math.abs(now - new Date(createdAt));

    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const years = weeks / 52;

    if (seconds < 60) {
        return `${Math.round(seconds)} second${Math.round(seconds) !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
        return `${Math.round(minutes)} minute${Math.round(minutes) !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${Math.round(hours)} hour${Math.round(hours) !== 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `${Math.round(days)} day${Math.round(days) !== 1 ? 's' : ''} ago`;
    } else if (weeks < 52) {
        return `${Math.round(weeks)} week${Math.round(weeks) !== 1 ? 's' : ''} ago`;
    } else {
        return `${Math.round(years)} year${Math.round(years) !== 1 ? 's' : ''} ago`;
    }
   
}

export {timeAgo}