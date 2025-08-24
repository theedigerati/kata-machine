export default class MinHeap {
    private data: number[];

    constructor() {
        this.data = [];
    }

    public get length() {
        return this.data.length;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length - 1);
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        if (this.length === 1) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number) {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (lV > rV && v > rV) {
            this.data[rIdx] = v;
            this.data[idx] = rV;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[lIdx] = v;
            this.data[idx] = lV;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number) {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentV = this.data[parentIdx];
        const v = this.data[idx];

        if (v < parentV) {
            this.data[parentIdx] = v;
            this.data[idx] = parentV;
            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }

    _insert(value: number): void {
        this.data[this.length] = value;

        if (this.length === 1) {
            return;
        }

        let i = this.length - 1;
        while (i > 0) {
            const parentIdx = Math.floor((i - 1) / 2);
            const parentV = this.data[parentIdx];

            if (value < parentV) {
                this.data[parentIdx] = value;
                this.data[i] = parentV;
                i = parentIdx;
            } else {
                break;
            }
        }
    }

    _delete(): number {
        const out = this.data[0];
        const tail = this.data.pop();

        if (tail && this.length === 0) {
            return tail;
        }

        if (!tail) {
            return -1;
        }

        this.data[0] = tail;
        let i = 0;
        while (i < this.length) {
            const v = this.data[i];
            const lIdx = 2 * i + 1;
            const rIdx = 2 * i + 2;
            const lV = this.data[lIdx];
            const rV = this.data[rIdx];

            if (lV > rV && v > rV) {
                this.data[rIdx] = v;
                this.data[i] = rV;
                i = rIdx;
                continue;
            }

            if (rV > lV && v > lV) {
                this.data[lIdx] = v;
                this.data[i] = lV;
                i = lIdx;
                continue;
            }
            break;
        }

        return out;
    }
}

