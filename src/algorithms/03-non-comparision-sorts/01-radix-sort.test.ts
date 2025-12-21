import { radixSort } from "./01-radix-sort";

const testCases = [
  {
    id: 1,
    numbers: [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ],
    expected: [
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ],
  },
];

describe("radixSort", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(radixSort(numbers)).toStrictEqual(expected);
    }
  );

  it("should sort 99 random numbers correctly", () => {
    const numbers = Array.from({ length: 99 }).map(() =>
      Math.floor(Math.random() * 500000)
    );
    const ans = radixSort(numbers);
    expect(ans).toEqual(numbers.sort());
  });
});
