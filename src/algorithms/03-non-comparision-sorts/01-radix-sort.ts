function getDigit(number: number, place: number, longestNumber: number) {
  const string = number.toString();
  const size = string.length;
  const offset = longestNumber - size;

  return string[place - offset] || 0;
}

function getLongestNumber(array) {
  let longest = 0;

  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }

  return longest;
}

export function radixSort(numbers: number[]): number[] {
  // find longest number
  const longestNumber = getLongestNumber(numbers);

  // create how many buckets you need
  // an array of 10 arrays
  const buckets = Array.from({ length: 10 }).map(() => []);

  // for loop for how many iterations you need to do
  //  while loop
  //  enqueue the numbers into their buckets

  //  for loop for each buckets
  //  dequeue all of the items out of the bucket
  for (let i = longestNumber - 1; i >= 0; i--) {
    while (numbers.length) {
      const current = numbers.shift();
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    for (let j = 0; j < 10; j++) {
      while (buckets[j].length) {
        numbers.push(buckets[j].shift());
      }
    }
  }

  return numbers;
}
