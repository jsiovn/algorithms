/**
  Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
  You must write an algorithm that runs in O(n) time and without using the division operation.

  Example 1:
    Input: nums = [1,2,3,4]
    Output: [24,12,8,6]

  Example 2:
    Input: nums = [-1,1,0,-3,3]
    Output: [0,0,9,0,0]

  Constraints:
    2 <= nums.length <= 105
    -30 <= nums[i] <= 30
    The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.
*/

export function solution(numbers: number[]): number[] {
  let n = numbers.length;
  let answer: number[] = new Array(n);

  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= numbers[i];
  }

  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= numbers[i];
  }

  return answer;
}

export function solution2(numbers: number[]): number[] {
  let N = numbers.length;
  let left: number[] = Array.from({ length: N });
  let right: number[] = Array.from({ length: N });
  let result: number[] = Array.from({ length: N });

  left[0] = 1;
  right[N - 1] = 1;

  for (let i = 1; i <= N - 1; i++) {
    left[i] = numbers[i - 1] * left[i - 1];
  }

  for (let i = N - 2; i >= 0; i--) {
    right[i] = numbers[i + 1] * right[i + 1];
  }

  for (let i = 0; i < N; i++) {
    const value = left[i] * right[i];
    result[i] = value === 0 ? 0 : value; // normalize -0 to +0
  }

  return result;
}

// ------------- Unit Test ------------- //
describe("ProductExceptSelf", () => {
  const testCases = [
    {
      id: 1,
      numbers: [1, 2, 3, 4],
      expected: [24, 12, 8, 6],
    },
    {
      id: 2,
      numbers: [-1, 1, 0, -3, 3],
      expected: [0, 0, 9, 0, 0]
    },
    {
      id: 3,
      numbers: [1, -1],
      expected: [-1, 1]
    },
    // {
    //   id: 4,
    //   numbers: [3, 2, 6, 5, 0, 3],
    //   expected: 4
    // },
    // {
    //   id: 5,
    //   numbers: [3, 2, 6, 5, 0, 3, 1, 9],
    //   expected: 9
    // }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(solution([...numbers])).toEqual(expected);
    }
  );
});
