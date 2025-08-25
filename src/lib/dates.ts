const MONTHS: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const dateParse = (date: string | Date): Date => {
    if (date instanceof Date) {
        return date;
    }
    return new Date(date);
};

export const dateFormatYearMonth = (date: Date): string => {
    return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const dateDelta = (from: Date, to: Date): string => {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    if (years == 0) {
        return `${months} mos`;
    } else if (months == 0) {
        return `${years} yr`;
    }
    return `${years} yr ${months} mos`;
};
