
export function countingSort(numbers: number[]) {
  // find min, max
  let n = numbers.length;
  let min = numbers[0];
  let max = numbers[0];

  for (let i = 1; i < n; i++) {
    min = numbers[i] < min ? numbers[i] : min;
    max = numbers[i] > max ? numbers[i] : max;
  }

  // calculate total count array size
  // define count array and fill key and frequency
  // calculate frequency
  const countArrSize = max - min + 1;
  const countArray = Array.from<number>({ length: countArrSize }).fill(0);

  for (let num of numbers) {
    countArray[num - min] += 1;
  }

  // countArray[i] = countArray[i] + countArray[i-1]
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i - 1];
  }

  // sorting based on count array
  const output = Array.from<number>({ length: n }).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let countArrayIndex = numbers[i] - min;// 17 - 11 = 6
    let outputArrayIndex = countArray[countArrayIndex] - 1;// countArray[6] = 10 => 10 - 1 = 9
    output[outputArrayIndex] = numbers[i];
    countArray[countArrayIndex] -= 1;
  }

  return output;
}
