/**
  Given a binary array nums, return the maximum number of consecutive 1's in the array.

  Example 1:

  Input: nums = [1,1,0,1,1,1]
  Output: 3
  Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

  Example 2:

  Input: nums = [1,0,1,1,0,1]
  Output: 2


  Constraints:

  1 <= nums.length <= 105
  nums[i] is either 0 or 1.
*/

function solution(numbers: number[]): number {
  let ans = 0;
  let count = 0;

  for (let number of numbers) {
    if (number) {
      count++;
      ans = Math.max(ans, count);
    }
    else {
      count = 0;
    }
  }

  return ans;
}








// ------------- Unit Test ------------- //
const testCases = [
  {
    id: 1,
    numbers: [1, 1, 0, 1, 1, 1],
    expected: 3,
  },
  {
    id: 2,
    numbers: [1, 0, 1, 1, 0, 1],
    expected: 2
  },
];

describe("MaxConsecutiveOnes", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(solution([...numbers])).toEqual(expected);
    }
  );
});
