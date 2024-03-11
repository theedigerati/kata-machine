/**
 * Path Finding
 *
 * Using recursion
 *
 * Recursion is a function that calls itself until its problem is solved,
 * which is usually when it reaches its Base Case.
 * A base case is a point in a function where its problem is solved at,
 * which is usually determined by a condition or a series of conditions.
 *
 *
 * For this Maze Solver
 * Base Case:
 *  1. we hit a wall
 *  2. out of the graph
 *  3. we reached the end
 *  4. previously visited
 *
 */

const dir = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
];

function move(
    maze: string[],
    curr: Point,
    wall: string,
    end: Point,
    visited: boolean[][],
    path: Point[],
) {
    // we hit a wall
    if (maze[curr.y][curr.x] === wall) return false;

    // out of graph
    if (maze[curr.y][curr.x] == undefined) return false;

    // we reached the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // previously visited
    if (visited[curr.y][curr.x]) return false;

    visited[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        if (
            move(
                maze,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                wall,
                end,
                visited,
                path,
            )
        ) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const visited: boolean[][] = [];
    const path: Point[] = [];
    for (let i = 0; i < maze.length; ++i) {
        visited.push(new Array(maze[i].length).fill(false));
    }

    move(maze, start, wall, end, visited, path);

    return path;
}
