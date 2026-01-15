/**
  Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
  We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
  You must solve this problem without using the library's sort function.

  Example 1:
    Input: nums = [2,0,2,1,1,0]
    Output: [0,0,1,1,2,2]

  Example 2:
    Input: nums = [2,0,1]
    Output: [0,1,2]

  Constraints:
    n == nums.length
    1 <= n <= 300
    nums[i] is either 0, 1, or 2.

  Follow up: Could you come up with a one-pass algorithm using only constant extra space?
*/

export function solution(numbers: number[]) {
  const n = numbers.length;
  if (n <= 1) return;

  const buckets = Array.from({ length: 3 }).map(() => []);
  for (let num of numbers) {
    buckets[num].push(num);
  }

  let i = 0;
  for (let bucketColors of buckets) {
    while (bucketColors.length > 0) {
      numbers[i] = bucketColors.pop();
      i++;
    }
  }
}

// ------------- Unit Test ------------- //
describe("SortColors", () => {
  const testCases = [
    {
      id: 1,
      numbers: [2, 0, 2, 1, 1, 0],
      expected: [0, 0, 1, 1, 2, 2]
    },
    {
      id: 2,
      numbers: [2, 0, 1],
      expected: [0, 1, 2]
    }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      solution(numbers);
      expect(numbers).toEqual(expected);
    }
  );
});
