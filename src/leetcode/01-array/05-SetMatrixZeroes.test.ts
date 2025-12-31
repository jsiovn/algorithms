/**
  Given an m x n integer matrix matrix, if an element is 0,
  set its entire row and column to 0's.
  You must do it in place.

  Example 1:
    Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
    Output: [[1,0,1],[0,0,0],[1,0,1]]

  Example 2:
    Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

  Constraints:
    m == matrix.length
    n == matrix[0].length
    1 <= m, n <= 200
    -231 <= matrix[i][j] <= 231 - 1

  Follow up:
    A straightforward solution using O(mn) space is probably a bad idea.
    A simple improvement uses O(m + n) space, but still not the best solution.
    Could you devise a constant space solution?
*/

export function solution(matrix: number[][]): number[][] {
  let m = matrix.length;
  let n = matrix[0].length;
  let hasZeroInFirstRow = false;
  let hasZeroInFirstCol = false;

  // set first cell of row/column to 0 if current cell is 0
  // that is marker
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;// marker at row
        matrix[0][c] = 0;// marker at column

        // edge case, first row and first column will be mark by flags
        if (r === 0) hasZeroInFirstRow = true;
        if (c === 0) hasZeroInFirstCol = true;
      }
    }
  }

  // set zero to cells if marker is zero (ignore first row and first column)
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  // set zero for first row based on flag
  if (hasZeroInFirstRow) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0;
    }
  }

  // set zero for first column based on flag
  if (hasZeroInFirstCol) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
}

// ------------- Unit Test ------------- //
describe("SetMatrixZeroes", () => {
  const testCases = [
    {
      id: 1,
      matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
      expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
    },
    {
      id: 2,
      matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]],
      expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
    },
    {
      id: 3,
      matrix: [[1, 2, 3, 4], [5, 0, 7, 8], [0, 10, 11, 12], [13, 14, 15, 0]],
      expected: [[0, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    },
    {
      id: 4,
      matrix: [[-4, -2147483648, 6, -7, 0], [-8, 6, -8, -6, 0], [2147483647, 2, -9, -6, -10]],
      expected: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2147483647, 2, -9, -6, 0]]
    }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ matrix, expected }) => {
      expect(solution(matrix)).toEqual(expected);
    }
  );
});
