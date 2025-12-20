import { nestedAdditionV1 } from "./01-nested-addition";

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

describe("nestedAdditionV1", () => {
  it.each(testCases)(
    `should return correct values for test case #$id`,
    ({ numbers, expected }) => {
      expect(nestedAdditionV1([...numbers])).toStrictEqual(expected);
    }
  );
});
