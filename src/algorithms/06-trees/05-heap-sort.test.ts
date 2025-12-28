import { heapSort } from "./05-heap-sort";

test("heap sort", function () {
  const numbers = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(numbers);
  expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
