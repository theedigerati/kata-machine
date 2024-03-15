/**
 * Quick sort is a sorting algothm that implements the divide
 * and conquer algorithm strategy.
 *
 * It partitions an array of elements into smaller chunks until
 * each chunk contains 0 or 1 element.
 *
 * It uses a partition element(pivot) to determine where to divide.
 *
 * Elements less than the pivot are swapped to the left side of
 * the pivot leaving ones higher than the pivot on the righ side.
 *
 * This operation is performed in-place recursively.
 *
 * Best case runtime -> O(nlogn)
 * Worst case runtime -> n ** 2 e.g
 * ...when the array is reverse sorted and we're
 * using the last element as our pivot.
 */

function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const partitionIdx = partition(arr, lo, hi);
    qs(arr, lo, partitionIdx - 1);
    qs(arr, partitionIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;

    for (let i = lo; i < hi; ++i) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
