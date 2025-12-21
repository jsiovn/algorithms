export type User = { name: string; id: number };

export function linearSearch(targetUserId: number, users: User[]): User {
  for (let i = 0; i < users.length; i++) {
    if (targetUserId === users[i].id) {
      return users[i];
    }
  }

  return void 0;
}
