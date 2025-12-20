import { solutionV1, solutionV2 } from "./01-bubble-sort";

const testCases = [
  {
    id: 1,
    numbers: [10, 5, 3, 8, 2, 6, 4, 7, 9, 1],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 2,
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 3,
    numbers: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

describe("solutionV1", () => {
  it.each(testCases)(
    `should return correct values for test case #$id`,
    ({ numbers, expected }) => {
      expect(solutionV1([...numbers])).toStrictEqual(expected);
    }
  );
});

describe("solutionV2", () => {
  it.each(testCases)(
    `should return correct values for test case #$id`,
    ({ numbers, expected }) => {
      expect(solutionV2([...numbers])).toStrictEqual(expected);
    }
  );
});
