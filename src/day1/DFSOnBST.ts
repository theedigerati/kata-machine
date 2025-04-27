export default function dfs(head: BinaryNode<number> | null, needle: number): boolean {
    if (head === null){
        return false
    }
    if (needle === head.value){
        return true
    }
    if (needle <= head.value){
        return dfs(head.left, needle)
    }else{
        return dfs(head.right, needle)
    }
}
