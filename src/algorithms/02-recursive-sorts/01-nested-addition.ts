export function nestedAddition(numbers: any[]): number {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] instanceof Array) {
      sum += nestedAddition(numbers[i]);
    } else {
      sum += numbers[i];
    }
  }

  return sum;
}
