import { Tree } from "./02-avl-tree";
/*
{
  "value": 4,
  "left": {
    "left": {
      "left": null,
      "right": null,
      "value": 1,
      "height": 1
    },
    "right": {
      "left": null,
      "right": null,
      "value": 3,
      "height": 1
    },
    "value": 2,
    "height": 2
  },
  "right": {
    "left": {
      "left": {
        "left": null,
        "right": null,
        "value": 5,
        "height": 1
      },
      "right": null,
      "value": 6,
      "height": 2
    },
    "right": {
      "left": {
        "left": null,
        "right": null,
        "value": 8,
        "height": 1
      },
      "right": {
        "left": null,
        "right": null,
        "value": 10,
        "height": 1
      },
      "value": 9,
      "height": 2
    },
    "value": 7,
    "height": 3
  },
  "height": 4
}
*/
describe("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
