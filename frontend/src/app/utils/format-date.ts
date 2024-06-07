export const formatDate = (date: Date): string => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return `${months[monthIndex]} ${day}, ${year}`
}

export const periodCalc = (oldDate: Date): string => {
    oldDate = new Date(oldDate)
    const currentDate = new Date()
    let diff = currentDate.getTime() - oldDate.getTime()
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    diff -= years * (1000 * 60 * 60 * 24 * 365)
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44))
    diff -= months * (1000 * 60 * 60 * 24 * 30.44)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    return `(${years}y - ${months}m - ${days}d)`
}
