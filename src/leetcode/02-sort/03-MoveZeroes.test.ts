/**
  Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
  Note that you must do this in-place without making a copy of the array.

  Example 1:
    Input: nums = [0,1,0,3,12]
    Output: [1,3,12,0,0]

  Example 2:
    Input: nums = [0]
    Output: [0]

  Constraints:
    1 <= nums.length <= 104
    -231 <= nums[i] <= 231 - 1+


  Follow up: Could you minimize the total number of operations done?
*/

export function solution(numbers: number[]): void {
  const n = numbers.length;
  if (n <= 1) return;

  // put pivot at the zero index
  // if the current item in the iteration is not zero, swap with the pivot
  // then increase pivot by one step
  // by that way, we can move item > 0 to left side, zeros stand on right side

  let pivot = 0;
  for (let i = 0; i < n; i++) {
    if (numbers[i] !== 0) {
      // swap it
      const temp = numbers[i];
      numbers[i] = numbers[pivot];
      numbers[pivot] = temp;

      // move pivot to the right side by one step
      pivot++;
    }
  }
}

// ------------- Unit Test ------------- //
describe("MoveZeroes", () => {
  const testCases = [
    {
      id: 1,
      numbers: [0, 1, 0, 3, 12],
      expected: [1, 3, 12, 0, 0],
    },
    {
      id: 2,
      numbers: [0],
      expected: [0],
    },
    {
      id: 3,
      numbers: [1, 0, 0, 3, 12],
      expected: [1, 3, 12, 0, 0],
    },
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      solution(numbers);
      expect(numbers).toEqual(expected);
    },
  );
});
