import { countingSort } from "./04-counting-sort";

const testCases = [
  {
    id: 1,
    numbers: [11, 12, 12, 14, 13, 13, 11, 11, 17, 12],
    expected: [11, 11, 11, 12, 12, 12, 13, 13, 14, 17],
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

describe("countingSort", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(countingSort(numbers)).toEqual(expected);
    }
  );
});
