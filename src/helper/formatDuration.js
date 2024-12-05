const formatDuration = (duration) => {

    const minutes=Math.floor(duration/60);
    const seconds=Math.floor(duration%60);

    const formatedSeconds=seconds<10?`0${seconds}`:seconds;

    return `${minutes}:${formatedSeconds}`;


};

export   {formatDuration} 
