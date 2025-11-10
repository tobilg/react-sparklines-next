export default (data: number[]): number =>
    data.reduce((a, b) => a + b) / data.length;
