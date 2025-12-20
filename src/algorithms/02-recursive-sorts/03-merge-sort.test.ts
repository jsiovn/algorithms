import { mergeSort } from "./03-merge-sort";

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

describe("mergeSort", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(mergeSort(numbers)).toStrictEqual(expected);
    }
  );
});
