
export function selectionSort(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    let smallestIndex = i;

    // find smallest index from i+1 -> n
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[smallestIndex] > numbers[j]) {
        smallestIndex = j;
      }
    }

    // swap
    let temp = numbers[i];
    numbers[i] = numbers[smallestIndex];
    numbers[smallestIndex] = temp;
  }
}
