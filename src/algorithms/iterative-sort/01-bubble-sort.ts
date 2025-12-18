/*
  To sort a list of numbers using optimized bubble sort with reduced range:

  1. Set a flag to track if any swaps happened

  2. Repeat for each position in the list (except the last one):

    a. Mark that no swaps have happened yet this pass

    b. Go through the unsorted portion of the list:
        - Compare each pair of neighboring numbers
        - If the left number is bigger than the right number:
          * Swap them so the smaller one is on the left
          * Mark that a swap happened

    c. If no swaps happened during this pass, stop early (list is sorted)

    d. After this pass, one more number is in its correct position at the end,
        so the next pass checks one fewer element

  3. Return the sorted list
*/
export function solutionV1(numbers: number[]): number[] {
  let count = 0;
  let swapped = false;

  for (let b = 0; b < numbers.length - 1; b++) {
    swapped = false;

    for (let f = 0; f < numbers.length - 1 - b; f++) {
      count++;

      if (numbers[f] > numbers[f + 1]) {
        let temp = numbers[f + 1];
        numbers[f + 1] = numbers[f];
        numbers[f] = temp;
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  console.log("count v1", count);
  return numbers;
}

/*
  To sort a list of numbers using optimized bubble sort:

  1. Set a flag to track if any swaps happened

  2. Repeat until no swaps occur:

    a. Mark that no swaps have happened yet this pass

    b. Go through the entire list:
        - Compare each pair of neighboring numbers
        - If the left number is bigger than the right number:
          * Swap them so the smaller one is on the left
          * Mark that a swap happened

    c. If no swaps happened during this pass, the list is sorted

  3. Return the sorted list
*/
export function solutionV2(numbers: number[]): number[] {
  let count = 0;
  let swapped = false;

  do {
    swapped = false;

    for (let i = 0; i < numbers.length - 1; i++) {
      count++;
      if (numbers[i] > numbers[i + 1]) {
        let temp = numbers[i + 1];
        numbers[i + 1] = numbers[i];
        numbers[i] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  console.log("count v2", count);
  return numbers;
}
