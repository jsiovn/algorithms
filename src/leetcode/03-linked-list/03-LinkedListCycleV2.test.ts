/**
  Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
  There is a cycle in a linked list if there is some node in the list that can be reached again by
  continuously following the next pointer. Internally, pos is used to denote the index of the node
  that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle.
  Note that pos is not passed as a parameter.
  Do not modify the linked list.

  Example 1:
    Input: head = [3,2,0,-4], pos = 1
    Output: tail connects to node index 1
    Explanation: There is a cycle in the linked list, where tail connects to the second node.

  Example 2:
    Input: head = [1,2], pos = 0
    Output: tail connects to node index 0
    Explanation: There is a cycle in the linked list, where tail connects to the first node.

  Example 3:
    Input: head = [1], pos = -1
    Output: no cycle
    Explanation: There is no cycle in the linked list.

  Constraints:
    The number of the nodes in the list is in the range [0, 104].
    -105 <= Node.val <= 105
    pos is -1 or a valid index in the linked-list.


  Follow up: Can you solve it using O(1) (i.e. constant) memory?
*/

export function solution(head: ListNode): ListNode | null {
  let slow = head;
  let fast = head;

  // Phase 1: Using Tortoise and Hare
  while (fast && fast.next) {
    fast = fast.next.next; // move 2 steps
    slow = slow.next; // move 1 step
    if (slow === fast) {
      // Phase 2: Find cycle start
      // Distance from head to cycle start is same with distance from meeting point to cycle start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }

  return null;
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
): { head: ListNode; cycleNode: ListNode | null } {
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

  return { head: listNode, cycleNode: tailToNode };
}

// ------------- Unit Test ------------- //
describe("LinkedListCyclev2", () => {
  it("should return cycle node at index 1", () => {
    const { head, cycleNode } = convertArrayListToLinkedList([3, 2, 0, -4], 1);
    expect(solution(head)).toBe(cycleNode);
  });

  // it("should return cycle node at index 0", () => {
  //   const { head, cycleNode } = convertArrayListToLinkedList([1, 2], 0);
  //   expect(solution(head)).toBe(cycleNode);
  // });

  // it("should return null when no cycle", () => {
  //   const { head } = convertArrayListToLinkedList([1], -1);
  //   expect(solution(head)).toBeNull();
  // });

  // it("should return cycle node at last index", () => {
  //   const { head, cycleNode } = convertArrayListToLinkedList(
  //     [1, 2, 3, 4, 5],
  //     4,
  //   );
  //   expect(solution(head)).toBe(cycleNode);
  // });

  // it("should return cycle node at index 6", () => {
  //   const { head, cycleNode } = convertArrayListToLinkedList(
  //     [-1, -7, 7, -4, 19, 6, -9, -5, -2, -5],
  //     6,
  //   );
  //   expect(solution(head)).toBe(cycleNode);
  // });
});
