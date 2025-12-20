export function quickSort(numbers: number[]): number[] {
  // base case, return if length 1 or 0
  if (numbers.length < 2) return numbers;

  // choose pivot
  const pivot = numbers[numbers.length - 1];

  // separate into left and right arrays
  const left = [];
  const right = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < pivot) {
      left.push(numbers[i]);
    } else {
      right.push(numbers[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
