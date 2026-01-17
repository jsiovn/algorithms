/**
  Given the head of a linked list, remove the nth node from the end of the list and return its head.

  Example 1:
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]

  Example 2:
    Input: head = [1], n = 1
    Output: []

  Example 3:
    Input: head = [1,2], n = 1
    Output: [1]

  Constraints:
    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz

  Follow up: Could you do this in one pass?
*/

export function solution(head: ListNode, n: number): ListNode | null {
  // pivot should move forward n + 1 steps
  let pivot = head;
  let current = head;

  // jump pivot pointer to n + 1 step ahead
  for (let i = 0; i < n; i++) {
    pivot = pivot.next;
  }

  if (!pivot) return head.next;

  // iterate to the end of linked list
  while (pivot.next) {
    pivot = pivot.next;
    current = current.next;
  }

  // remove nth node
  current.next = current.next.next;
  return head;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function convertArrayListToLinkedList(numbers: number[]): ListNode {
  let listNode = new ListNode(numbers[0]);
  let current = listNode;

  for (let i = 1; i < numbers.length; i++) {
    current.next = new ListNode(numbers[i]);
    current = current.next;
  }

  return listNode;
}

// ------------- Unit Test ------------- //
describe("RemoveNthFromEnd", () => {
  const testCases = [
    {
      id: 1,
      head: convertArrayListToLinkedList([1, 2, 3, 4, 5]),
      n: 2,
      expected: convertArrayListToLinkedList([1, 2, 3, 5]),
    },
    {
      id: 2,
      head: convertArrayListToLinkedList([1]),
      n: 1,
      expected: null,
    },
    {
      id: 3,
      head: convertArrayListToLinkedList([1, 2]),
      n: 1,
      expected: convertArrayListToLinkedList([1]),
    },
    {
      id: 4,
      head: convertArrayListToLinkedList([1, 2]),
      n: 2,
      expected: convertArrayListToLinkedList([2]),
    },
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ head, n, expected }) => {
      expect(solution(head, n)).toEqual(expected);
    },
  );
});
