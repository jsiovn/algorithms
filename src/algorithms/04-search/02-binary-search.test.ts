import { binarySearch, User } from "./02-binary-search";

const lookingFor: User = { id: 23, name: "Brian" };
const users: User[] = [
  { id: 1, name: "Sam" },
  { id: 3, name: "Sarah" },
  { id: 5, name: "John" },
  { id: 6, name: "Burke" },
  { id: 10, name: "Simona" },
  { id: 12, name: "Asim" },
  { id: 13, name: "Niki" },
  { id: 15, name: "Aysegul" },
  { id: 17, name: "Kyle" },
  { id: 18, name: "Jem" },
  { id: 19, name: "Marc" },
  { id: 21, name: "Chris" },
  lookingFor,
  { id: 24, name: "Ben" },
];

describe("binarySearch", () => {
  it("should search and return value correctly", () => {
    expect(binarySearch(23, users)).toBe(lookingFor);
  });

  it("should search and return undefined", () => {
    expect(binarySearch(1000, users)).toBeUndefined();
  });
});
