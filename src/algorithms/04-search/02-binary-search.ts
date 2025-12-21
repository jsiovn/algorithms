export type User = { name: string; id: number };

export function binarySearch(targetUserId: number, users: User[]): User {
  let min = 0;
  let max = users.length - 1;
  let index;
  let element: User;

  while (min <= max) {
    index = Math.floor((min + max) / 2);
    element = users[index];

    if (element.id === targetUserId) return element;
    if (element.id < targetUserId) {
      min = index + 1;
    } else {
      min = index - 1;
    }
  }

  return void 0;
}
