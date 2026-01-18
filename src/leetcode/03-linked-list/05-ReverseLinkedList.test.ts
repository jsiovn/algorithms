/**
  Given the head of a singly linked list, reverse the list, and return the reversed list.

  Example 1:
    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]

  Example 2:
    Input: head = [1,2]
    Output: [2,1]

  Example 3:
    Input: head = []
    Output: []

  Constraints:
    The number of nodes in the list is the range [0, 5000].
    -5000 <= Node.val <= 5000

  Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
*/

// Solution by recursively
export function solution(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let newHead = null;

  // 1-2-3-4-5-null
  function reverse(node) {
    // base case
    // this is tail node
    if (node.next === null) {
      newHead = node;
      return node;
    } else {
      // last node's next points to previous node by using call stack order
      // top is tail
      // bottom is head
      let last = reverse(node.next);
      last.next = node;
      return node;
    }
  }

  reverse(head);
  head.next = null;
  return newHead;
}

// Solution by iteratively
export function solution1(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let slow = null; // n+0
  let fast = head; // n+1

  // 1-2-3-4-5-null
  while (fast !== null) {
    const tempFastNext = fast.next;
    fast.next = slow;
    slow = fast;
    fast = tempFastNext;
  }

  return slow;
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
describe("ReverseLinkedList", () => {
  // Example 1: head = [1,2,3,4,5] => [5,4,3,2,1]
  it("should reverse a linked list with 5 nodes", () => {
    const head = createLinkedList([1, 2, 3, 4, 5]);
    const expected = createLinkedList([5, 4, 3, 2, 1]);
    const result = solution(head);
    expect(result).toEqual(expected);
  });

  // Example 2: head = [1,2] => [2,1]
  it("should reverse a linked list with 2 nodes", () => {
    const head = createLinkedList([1, 2]);
    const expected = createLinkedList([2, 1]);
    const result = solution(head);
    expect(result).toEqual(expected);
  });

  // Example 3: head = [] => []
  it("should return null for empty list", () => {
    const result = solution(null);
    expect(result).toBeNull();
  });
});
