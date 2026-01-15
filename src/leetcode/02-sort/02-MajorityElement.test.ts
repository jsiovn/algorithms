/**
  Given an array nums of size n, return the majority element.
  The majority element is the element that appears more than ⌊n / 2⌋ times.
  You may assume that the majority element always exists in the array.

  Example 1:
    Input: nums = [3,2,3]
    Output: 3

  Example 2:
    Input: nums = [2,2,1,1,1,2,2]
    Output: 2

  Constraints:
    n == nums.length
    1 <= n <= 5 * 104
    -109 <= nums[i] <= 109
    The input is generated such that a majority element will exist in the array.

  Follow-up: Could you solve the problem in linear time and in O(1) space?
*/

export function solution(numbers: number[]): number {
  const n = numbers.length;
  if (n <= 1) return numbers[0];

  let majorityElement = numbers[0];
  let count = 1;

  for (let i = 1; i < n; i++) {
    if (numbers[i] === majorityElement) {
      count++;
    }
    else {
      count--;
      if (count === 0) {
        majorityElement = numbers[i];
        count = 1;
      }
    }
  }

  return majorityElement;
}

// ------------- Unit Test ------------- //
describe("SortColors", () => {
  const testCases = [
    {
      id: 1,
      numbers: [3, 2, 3],
      expected: 3
    },
    {
      id: 2,
      numbers: [2, 2, 1, 1, 1, 2, 2],
      expected: 2
    }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(solution(numbers)).toEqual(expected);
    }
  );
});
