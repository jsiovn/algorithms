import { factorials } from "./02-factorials";

const testCases = [
  {
    id: 1,
    number: 1,
    expected: 1,
  },
  {
    id: 2,
    number: 2,
    expected: 2,
  },
  {
    id: 3,
    number: 3,
    expected: 6,
  },
  {
    id: 4,
    number: 10,
    expected: 3628800,
  },
];

describe("factorials", () => {
  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ number, expected }) => {
      expect(factorials(number)).toStrictEqual(expected);
    }
  );
});
