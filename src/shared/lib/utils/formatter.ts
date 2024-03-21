export const startFromZero = (number: string | number, count = 2) => {
    return number.toString().padStart(count, '0');
}