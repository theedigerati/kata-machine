export default function two_crystal_balls(breaks: boolean[]): number {
    let lo = 0;
    let hi = breaks.length;

    while (lo < hi) {
        const jump = Math.floor(lo + Math.sqrt(hi - lo));

        if (breaks[jump]) {
            for (let i = lo; i < jump; ++i) {
                if (breaks[i]) {
                    return i;
                }
            }
            return jump;
        }
        lo = jump;
    }
    return -1;
}
