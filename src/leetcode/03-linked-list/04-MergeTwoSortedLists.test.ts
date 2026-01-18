/**
  You are given the heads of two sorted linked lists list1 and list2.
  Merge the two lists into one sorted list. The list should be made by splicing together the nodes
  of the first two lists.
  Return the head of the merged linked list.

  Example 1:
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]

  Example 2:
    Input: list1 = [], list2 = []
    Output: []

  Example 3:
    Input: list1 = [], list2 = [0]
    Output: [0]

  Constraints:
    The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order.
*/

export function solution(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let left = list1;
  let right = list2;

  let head = null;
  let tail = null;

  while (left || right) {
    let nodeValueToAdd = null;
    let leftVal = left?.val ?? null;
    let rightVal = right?.val ?? null;

    if (leftVal !== null && rightVal !== null) {
      if (leftVal <= rightVal) {
        nodeValueToAdd = leftVal;
        left = left.next;
      } else {
        nodeValueToAdd = rightVal;
        right = right.next;
      }
    } else {
      if (leftVal !== null) {
        nodeValueToAdd = leftVal;
        left = left.next;
      } else {
        nodeValueToAdd = rightVal;
        right = right.next;
      }
    }

    let temp = addToList(head, tail, nodeValueToAdd);
    head = temp.head;
    tail = temp.tail;
  }

  return head;
}

function addToList(head: ListNode, tail: ListNode, nodeValue: number) {
  const newNode = new ListNode(nodeValue);

  if (!head) {
    head = newNode;
    tail = newNode;
  } else {
    tail.next = newNode;
    tail = newNode;
  }

  return { head, tail };
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function createLinkedList(numbers: number[]): ListNode | null {
  if (numbers.length === 0) return null;

  let head = new ListNode(numbers[0]);
  let current = head;

  for (let i = 1; i < numbers.length; i++) {
    current.next = new ListNode(numbers[i]);
    current = current.next;
  }

  return head;
}

// ------------- Unit Test ------------- //
describe("MergeTwoSortedLists", () => {
  // Example 1: list1 = [1,2,4], list2 = [1,3,4] => [1,1,2,3,4,4]
  it("should merge two sorted lists", () => {
    const list1 = createLinkedList([1, 2, 4]);
    const list2 = createLinkedList([1, 3, 4]);
    const expected = createLinkedList([1, 1, 2, 3, 4, 4]);
    const result = solution(list1, list2);
    expect(result).toEqual(expected);
  });

  // Example 2: list1 = [], list2 = [] => []
  it("should return null when both lists are empty", () => {
    const result = solution(null, null);
    expect(result).toBeNull();
  });

  // Example 3: list1 = [], list2 = [0] => [0]
  it("should return list2 when list1 is empty", () => {
    const list1: ListNode | null = null;
    const list2 = createLinkedList([0]);
    const expected = createLinkedList([0]);
    const result = solution(list1, list2);
    expect(result).toEqual(expected);
  });
});
