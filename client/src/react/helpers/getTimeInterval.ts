

export default function getTimeInterval(value: string) {
    let result = {
        start: new Date(),
        end: new Date()
    }

    if(value === 'week') result.start = new Date(result.start.setDate(result.start.getDate() - 7));
    if(value === 'month') result.start = new Date(result.start.setMonth(result.start.getMonth() - 1));
    if(value === 'year') result.start = new Date(result.start.setFullYear(result.start.getFullYear() - 1));

    return {start: result.start.toDateString(), end: result.end.toDateString()};
}