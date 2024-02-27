export const formatNumber = (num, size) => {
    return '#' + String(num).padStart(size, '0');
}
