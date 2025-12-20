export function factorials(num: number): number {
  if (num <= 1) return 1;
  return num * factorials(num - 1);
}
