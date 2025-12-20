/*
  To sort a list of numbers using insertion sort:

  1. Start from the second element (first element is considered sorted)

  2. For each element in the unsorted portion:

    a. Pick up the current element (value to insert)

    b. Look backwards through the sorted portion:
        - While there are elements AND they're bigger than the value to insert:
          * Shift the bigger element one position to the right
          * Move to the previous position

    c. Insert the picked value into the gap that was created

  3. Return the sorted list
*/
export function insertionSortV1(numbers: number[]): number[] {
  for (let i = 1; i < numbers.length; i++) {
    let valueToInsert = numbers[i];
    let j;

    for (j = i - 1; j >= 0 && valueToInsert < numbers[j]; j--) {
      numbers[j + 1] = numbers[j];
    }

    numbers[j + 1] = valueToInsert;
  }

  return numbers;
}

/*

*/
export function insertionSortV2(numbers: number[]): number[] {
  for (let i = 1; i < numbers.length; i++) {
    let valueToInsert = numbers[i];
    let j = i - 1;

    while (j >= 0 && valueToInsert < numbers[j]) {
      numbers[j + 1] = numbers[j];
      j--;
    }

    numbers[j + 1] = valueToInsert;
  }

  return numbers;
}
