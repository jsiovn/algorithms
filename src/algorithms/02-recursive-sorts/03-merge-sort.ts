export function mergeSort(numbers: number[]): number[] {
  //base case, return if length 1 or 0
  const { length } = numbers;
  if (length <= 1) return numbers;

  // break into two smaller arrays
  const middle = Math.floor(length / 2);
  const leftNumbers = numbers.slice(0, middle);
  const rightNumbers = numbers.slice(middle);

  // call mergeSort on left and right
  const sortedLeftNumbers = mergeSort(leftNumbers);
  const sortedRightNumbers = mergeSort(rightNumbers);

  // return the merge of left and right
  return merge(sortedLeftNumbers, sortedRightNumbers);
}

const merge = (left: number[], right: number[]): number[] => {
  const results = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }

  return results.concat(left, right);
};
