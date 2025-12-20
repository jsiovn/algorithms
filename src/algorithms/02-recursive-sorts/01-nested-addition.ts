export function nestedAdditionV1(numbers: any[]): number {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] instanceof Array) {
      sum += nestedAdditionV1(numbers[i]);
    } else {
      sum += numbers[i];
    }
  }

  return sum;
}
