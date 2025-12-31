/**
  Given an integer array nums, find a subarray that has the largest product, and return the product.
  The test cases are generated so that the answer will fit in a 32-bit integer.
  Note that the product of an array with a single element is the value of that element.

  Example 1:
    Input: nums = [2,3,-2,4]
    Output: 6
    Explanation: [2,3] has the largest product 6.

  Example 2:
    Input: nums = [-2,0,-1]
    Output: 0
    Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

  Constraints:
    1 <= nums.length <= 2 * 104
    -10 <= nums[i] <= 10
    The product of any subarray of nums is guaranteed to fit in a 32-bit integer.
*/

export function solution(numbers: number[]): number {
  let n = numbers.length;
  if (n === 1) return numbers[0];

  let answer = 0;
  let currentProduct = 1;

  for (let i = 0; i < n; i++) {
    if (numbers[i] != 0) {
      currentProduct *= numbers[i];
      answer = Math.max(answer, currentProduct);
    }
    else {
      currentProduct = 1;
    }
  }

  currentProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    if (numbers[i] != 0) {
      currentProduct *= numbers[i];
      answer = Math.max(answer, currentProduct);
    }
    else {
      currentProduct = 1;
    }
  }

  return answer;
}

// ------------- Unit Test ------------- //
describe("ProductExceptSelf", () => {
  const testCases = [
    {
      id: 1,
      numbers: [2, 3, -2, 4],
      expected: 6,
    },
    {
      id: 2,
      numbers: [-2, 0, -1],
      expected: 0
    },
    {
      id: 3,
      numbers: [0, 2],
      expected: 2
    },
    {
      id: 4,
      numbers: [-2, 3, -4],
      expected: 24
    },
    {
      id: 5,
      numbers: [3, -1, 4],
      expected: 4
    },
    {
      id: 6,
      numbers: [3, 0, -1, 4, 5],
      expected: 20
    },
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(solution([...numbers])).toEqual(expected);
    }
  );
});
