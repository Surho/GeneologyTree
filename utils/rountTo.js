export default (number, digits) => {
    digits = Math.pow(10, digits);
    return Math.floor(number * digits) / digits;
}