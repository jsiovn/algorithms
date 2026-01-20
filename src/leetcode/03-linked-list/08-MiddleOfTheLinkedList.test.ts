/**
  Given the head of a singly linked list, return the middle node of the linked list.
  If there are two middle nodes, return the second middle node.

  Example 1:
    Input: head = [1,2,3,4,5]
    Output: [3,4,5]
    Explanation: The middle node of the list is node 3.

  Example 2:
    Input: head = [1,2,3,4,5,6]
    Output: [4,5,6]
    Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

  Constraints:
    The number of nodes in the list is in the range [1, 100].
    1 <= Node.val <= 100
*/

export function solution(head: ListNode | null): ListNode | null {}

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

function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// ------------- Unit Test ------------- //
describe("MiddleOfTheLinkedList", () => {
  // Example 1: head = [1,2,3,4,5] => [3,4,5]
  it("should return middle node for odd length list", () => {
    const head = createLinkedList([1, 2, 3, 4, 5]);
    const result = solution(head);
    expect(linkedListToArray(result)).toEqual([3, 4, 5]);
  });

  // Example 2: head = [1,2,3,4,5,6] => [4,5,6]
  it("should return second middle node for even length list", () => {
    const head = createLinkedList([1, 2, 3, 4, 5, 6]);
    const result = solution(head);
    expect(linkedListToArray(result)).toEqual([4, 5, 6]);
  });

  // Edge case: single node
  it("should return the node itself for single node list", () => {
    const head = createLinkedList([1]);
    const result = solution(head);
    expect(linkedListToArray(result)).toEqual([1]);
  });

  // Edge case: two nodes
  it("should return second node for two node list", () => {
    const head = createLinkedList([1, 2]);
    const result = solution(head);
    expect(linkedListToArray(result)).toEqual([2]);
  });

  // Edge case: three nodes
  it("should return middle node for three node list", () => {
    const head = createLinkedList([1, 2, 3]);
    const result = solution(head);
    expect(linkedListToArray(result)).toEqual([2, 3]);
  });
});
