type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; i < idx && curr; ++i) {
            curr = curr.next;
        }
        return curr;
    }

    private unlinkNode(node: Node<T>): void {
        this.length--;
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        node.prev = node.next = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Invalid insert index");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        let nodeAtIdx = this.getNodeAt(idx);
        if (!nodeAtIdx) {
            throw new Error("This should not happen!");
        }
        this.length++;
        const nodeToInsert: Node<T> = { value: item };
        nodeToInsert.next = nodeAtIdx;
        nodeToInsert.prev = nodeAtIdx.prev;
        if (nodeAtIdx.prev) {
            nodeAtIdx.prev.next = nodeToInsert;
            nodeAtIdx.prev = nodeToInsert;
        }
    }
    append(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let nodeToRemove = this.head;
        for (let i = 0; i < this.length; ++i) {
            if (nodeToRemove?.value === item) {
                break;
            }
            nodeToRemove = nodeToRemove?.next;
        }

        if (!nodeToRemove) {
            return;
        }

        this.unlinkNode(nodeToRemove);
        return nodeToRemove.value;
    }
    get(idx: number): T | undefined {
        let curr = this.getNodeAt(idx);
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        let nodeToRemove = this.getNodeAt(idx);
        if (!nodeToRemove) {
            return;
        }

        this.unlinkNode(nodeToRemove);
        return nodeToRemove.value;
    }
}
