import { nestedAddition } from "./01-nested-addition";

const testCases = [
  {
    id: 1,
    numbers: [1, 2, 3],
    expected: 6,
  },
  {
    id: 2,
    numbers: [1, [2], 3],
    expected: 6,
  },
  {
    id: 3,
    numbers: [[[[[[[[[[5]]]]]]]]]],
    expected: 5,
  },
  {
    id: 4,
    numbers: [10, [12, 14, [1], [16, [20]]], 10, 11],
    expected: 94,
  },
];

describe("nestedAddition", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(nestedAddition([...numbers])).toStrictEqual(expected);
    }
  );
});
