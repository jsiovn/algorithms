/**
  Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

  Example 1:
    Input: nums = [1,2,3,4,5,6,7], k = 3
    Output: [5,6,7,1,2,3,4]
    Explanation:
    rotate 1 steps to the right: [7,1,2,3,4,5,6]
    rotate 2 steps to the right: [6,7,1,2,3,4,5]
    rotate 3 steps to the right: [5,6,7,1,2,3,4]

  Example 2:
    Input: nums = [-1,-100,3,99], k = 2
    Output: [3,99,-1,-100]
    Explanation:
    rotate 1 steps to the right: [99,-1,-100,3]
    rotate 2 steps to the right: [3,99,-1,-100]

  Constraints:
    1 <= nums.length <= 105
    -231 <= nums[i] <= 231 - 1
    0 <= k <= 105

  Follow up:
    Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
    Could you do it in-place with O(1) extra space?
*/

export function solution2(numbers: number[], k: number) {
  const n = numbers.length;
  if (n <= 1) return;
  k = k % n;// edge case when k > n, so need to calculate the rotation. e.g. 8 % 3 = 2

  // reverse whole array
  reverseArrayByRange2(numbers, 0, n);

  // reverse 0 -> k
  reverseArrayByRange2(numbers, 0, k);

  // reverse k -> n
  reverseArrayByRange2(numbers, k, n);
}

function reverseArrayByRange2(numbers: number[], start: number, end: number) {
  const middle = Math.floor((end - start) / 2); // (7 - 3) / 2 = 2  ; (7 - 0) / 2 = 2.xxx => 2

  for (let i = start; i < start + middle; i++) {
    const lastIndex = end - i - 1 + start;// 7 - 3 - 1 + start (3) => treat it as zero
    const temp = numbers[i];
    numbers[i] = numbers[lastIndex];
    numbers[lastIndex] = temp;
  }
}

export function solution(numbers: number[], k: number) {
  const n = numbers.length;
  if (n <= 1) return;

  // edge case when k > n, so need to calculate the rotation. e.g. 8 % 3 = 2
  // normal case is 3 % 8 = 3
  k = k % n;

  // reverse whole array
  reverseArrayByRange(numbers, 0, n - 1);

  // reverse 0 -> k
  reverseArrayByRange(numbers, 0, k - 1);

  // reverse k -> n
  reverseArrayByRange(numbers, k, n - 1);
}

function reverseArrayByRange(numbers: number[], start: number, end: number) {
  let i = start, j = end;// end should be last index, should computed at runtime
  while (i < j) {
    let temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
    i++;
    j--;
  }
}

// ------------- Unit Test ------------- //
describe("RotateArray", () => {
  const testCases = [
    {
      id: 1,
      numbers: [1, 2, 3, 4],
      k: 2,
      expected: [3, 4, 1, 2]
    },
    {
      id: 2,
      numbers: [1, 2, 3, 4, 5, 6, 7],
      k: 3,
      expected: [5, 6, 7, 1, 2, 3, 4]
    },
    {
      id: 3,
      numbers: [-1, -100, 3, 99],
      k: 2,
      expected: [3, 99, -1, -100]
    },
    {
      id: 4,
      numbers: [-1],
      k: 2,
      expected: [-1]
    },
    {
      id: 5,
      numbers: [1, 2],
      k: 7,
      expected: [2, 1]
    },
    {
      id: 6,
      numbers: [1, 2, 3],
      k: 8,
      expected: [2, 3, 1]
    },
    {
      id: 7,
      numbers: [1, 2],
      k: 1,
      expected: [2, 1]
    }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, k, expected }) => {
      solution(numbers, k);
      expect(numbers).toEqual(expected);
    }
  );
});
