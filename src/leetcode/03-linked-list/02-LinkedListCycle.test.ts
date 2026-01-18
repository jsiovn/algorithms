/**
  Given head, the head of a linked list, determine if the linked list has a cycle in it.
  There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
  Return true if there is a cycle in the linked list. Otherwise, return false.

  Example 1:
    Input: head = [3,2,0,-4], pos = 1
    Output: true
    Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

  Example 2:
    Input: head = [1,2], pos = 0
    Output: true
    Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

  Example 3:
    Input: head = [1], pos = -1
    Output: false
    Explanation: There is no cycle in the linked list.

  Constraints:
    The number of the nodes in the list is in the range [0, 104].
    -105 <= Node.val <= 105
    pos is -1 or a valid index in the linked-list.

  Follow up: Can you solve it using O(1) (i.e. constant) memory?
*/

export function solution(head: ListNode): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next; // move 2 steps
    slow = slow.next; // move 1 step
    if (slow === fast) return true;
  }

  return false;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function convertArrayListToLinkedList(
  numbers: number[],
  cycleAt: number = -1,
): ListNode {
  let listNode = new ListNode(numbers[0]);
  let current = listNode;
  let end = current;
  let tailToNode = cycleAt === 0 ? current : null;

  for (let i = 1; i < numbers.length; i++) {
    current.next = new ListNode(numbers[i]);
    current = current.next;
    end = current;
    if (cycleAt === i) tailToNode = current;
  }

  end.next = tailToNode;

  return listNode;
}

// ------------- Unit Test ------------- //
describe("LinkedListCycle", () => {
  const testCases = [
    {
      id: 1,
      head: convertArrayListToLinkedList([1, 2, 3, 4, 5], 1),
      expected: true,
    },
    {
      id: 2,
      head: convertArrayListToLinkedList([1, 2], 0),
      expected: true,
    },
    {
      id: 3,
      head: convertArrayListToLinkedList([1], -1),
      expected: false,
    },
    {
      id: 4,
      head: convertArrayListToLinkedList([1, 2, 3, 4, 5], 4),
      expected: true,
    },
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ head, expected }) => {
      expect(solution(head)).toEqual(expected);
    },
  );
});
