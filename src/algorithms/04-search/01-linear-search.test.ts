import { linearSearch, User } from "./01-linear-search";

const lookingFor: User = { id: 5, name: "Brian" };
const users: User[] = [
  { id: 1, name: "Sam" },
  { id: 11, name: "Sarah" },
  { id: 21, name: "John" },
  { id: 10, name: "Burke" },
  { id: 13, name: "Simona" },
  { id: 31, name: "Asim" },
  { id: 6, name: "Niki" },
  { id: 19, name: "Aysegul" },
  { id: 25, name: "Kyle" },
  { id: 18, name: "Jem" },
  { id: 2, name: "Marc" },
  { id: 51, name: "Chris" },
  lookingFor,
  { id: 14, name: "Ben" },
];

describe("linearSearch", () => {
  it("should search and return value correctly", () => {
    expect(linearSearch(5, users)).toBe(lookingFor);
  });

  it("should search and return undefined", () => {
    expect(linearSearch(1000, users)).toBeUndefined();
  });
});
