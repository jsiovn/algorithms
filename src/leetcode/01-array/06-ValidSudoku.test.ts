/**
  Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
    Each row must contain the digits 1-9 without repetition.
    Each column must contain the digits 1-9 without repetition.
    Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

  Note:
    A Sudoku board (partially filled) could be valid but is not necessarily solvable.
    Only the filled cells need to be validated according to the mentioned rules.

  Example 1:
    Input: board =
    [["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
    Output: true

  Example 2:
    Input: board =
    [["8","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
    Output: false
    Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8.
    Since there are two 8's in the top left 3x3 sub-box, it is invalid.

  Constraints:
    board.length == 9
    board[i].length == 9
    board[i][j] is a digit 1-9 or '.'.
*/

export function solution(board: string[][]): boolean {
  const n = board.length;
  const m = board[0].length;

  const rowMap = new Map<number, Set<string>>();//n rows
  const colMap = new Map<number, Set<string>>();// m cols
  const subBoxMap = new Map<number, Set<string>>();//9 boxes

  for (let r = 0; r < n; r++) {
    rowMap.set(r, new Set());

    for (let c = 0; c < m; c++) {
      if (!colMap.has(c)) {
        colMap.set(c, new Set());
      }

      const cell = board[r][c];
      if (cell === '.') continue;

      // validate first, then add cell value to row map
      if (rowMap.get(r)?.has(cell)) return false;
      rowMap.get(r).add(cell);

      // validate first, then add cell value to col map
      if (colMap.get(c)?.has(cell)) return false;
      colMap.get(c).add(cell);

      const boxIndex = getBoxIndex(r, c);
      if (!subBoxMap.has(boxIndex)) {
        subBoxMap.set(boxIndex, new Set());
      }

      // validate first, then add cell value to subBox map
      if (subBoxMap.get(boxIndex)?.has(cell)) return false;
      subBoxMap.get(boxIndex).add(cell);
    }
  }

  return true;
}

function getBoxIndex(row: number, col: number): number {
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  return boxRow * 3 + boxCol;
}

// ------------- Unit Test ------------- //
describe("SetMatrixZeroes", () => {
  const testCases = [
    {
      id: 1,
      matrix: [["5", "3", ".", ".", "7", ".", ".", ".", "."]
        , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
        , [".", "9", "8", ".", ".", ".", ".", "6", "."]
        , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
        , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
        , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
        , [".", "6", ".", ".", ".", ".", "2", "8", "."]
        , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
        , [".", ".", ".", ".", "8", ".", ".", "7", "9"]],
      expected: true
    },
    {
      id: 2,
      matrix: [["8", "3", ".", ".", "7", ".", ".", ".", "."]
        , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
        , [".", "9", "8", ".", ".", ".", ".", "6", "."]
        , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
        , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
        , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
        , [".", "6", ".", ".", ".", ".", "2", "8", "."]
        , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
        , [".", ".", ".", ".", "8", ".", ".", "7", "9"]],
      expected: false
    },
    // {
    //   id: 3,
    //   matrix: [[1, 2, 3, 4], [5, 0, 7, 8], [0, 10, 11, 12], [13, 14, 15, 0]],
    //   expected: [[0, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    // },
    // {
    //   id: 4,
    //   matrix: [[-4, -2147483648, 6, -7, 0], [-8, 6, -8, -6, 0], [2147483647, 2, -9, -6, -10]],
    //   expected: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2147483647, 2, -9, -6, 0]]
    // }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ matrix, expected }) => {
      expect(solution(matrix)).toEqual(expected);
    }
  );
});
