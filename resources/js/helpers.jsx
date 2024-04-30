export const formatDate = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    if (isToday(inputDate)){
        return inputDate.toLocaleTimeString([],{
           hour : "2-digit",
           minute : "2-digit"
        });
    }else if (isYesterday(inputDate)){
        return (
            'Yesterday ' +
                inputDate.toLocaleTimeString([],{
            hour : "2-digit",
            minute : "2-digit"
        })
        )
    }else if (inputDate.getFullYear() === now.getFullYear()){
        return inputDate.toLocaleDateString([],{
            day : "2-digit",
            month : "2-digit"
        });
    }else{
        return inputDate.toLocaleDateString();
    }
}


export const formatDateShort = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    if (isToday(inputDate)){
        return inputDate.toLocaleTimeString([],{
            hour : "2-digit",
            minute : "2-digit"
        });
    }else if (isYesterday(inputDate)){
        return (
            'Yesterday ' +
            inputDate.toLocaleTimeString([],{
                hour : "2-digit",
                minute : "short"
            })
        )
    }else{
        return inputDate.toLocaleDateString();
    }
}

export const isToday = (date) => {
    const today = new Date();
    return (
        date.getDay() === today.getDay() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    )
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDay() === yesterday.getDay() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    )
}
