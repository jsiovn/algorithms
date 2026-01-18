/**
  Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

  Example 1:
    Input: head = [1,2,2,1]
    Output: true

  Example 2:
    Input: head = [1,2]
    Output: false

  Constraints:
    The number of nodes in the list is in the range [1, 105].
    0 <= Node.val <= 9

  Follow up: Could you do it in O(n) time and O(1) space?
*/

export function solution(head: ListNode | null): boolean {
  if (!head) return false;

  // find length
  let current = head;
  let n = 0;
  while (current) {
    n++;
    current = current.next;
  }

  // Edge case
  if (n == 1) return true;

  // reverse right side
  const nodeMiddleIndex = Math.floor(n / 2);

  // find middle node
  let middleNode = head;
  for (let i = 0; i < nodeMiddleIndex; i++) {
    middleNode = middleNode.next;
  }

  // reverse middle node to tail
  let slow = middleNode;
  let fast = middleNode.next;
  while (fast) {
    const temp = fast.next;
    fast.next = slow;
    slow = fast;
    fast = temp;
  }
  middleNode.next = null;

  // use merge sort to compare
  let left = head;
  let right = slow;
  while (left != middleNode) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }

  return true;
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
describe("PalindromeLinkedList", () => {
  // Example 1: head = [1,2,2,1] => true
  it("should return true for palindrome [1,2,2,1]", () => {
    const head = createLinkedList([1, 2, 2, 1]);
    expect(solution(head)).toBe(true);
  });

  // Example 2: head = [1,2] => false
  it("should return false for non-palindrome [1,2]", () => {
    const head = createLinkedList([1, 2]);
    expect(solution(head)).toBe(false);
  });

  // Example 3: head = [1,2,3,2,1] => true
  it("should return true for palindrome [1,2,3,2,1]", () => {
    const head = createLinkedList([1, 2, 3, 2, 1]);
    expect(solution(head)).toBe(true);
  });

  it("should return true for single element [0]", () => {
    const head = createLinkedList([0]);
    expect(solution(head)).toBe(true);
  });

  it("should return true for palindrome [1,6,6,1]", () => {
    const head = createLinkedList([1, 6, 6, 1]);
    expect(solution(head)).toBe(true);
  });

  it("should return false for non-palindrome [1,1,6,1]", () => {
    const head = createLinkedList([1, 1, 6, 1]);
    expect(solution(head)).toBe(false);
  });

  it("should return false for non-palindrome [1,6,1,1]", () => {
    const head = createLinkedList([1, 6, 1, 1]);
    expect(solution(head)).toBe(false);
  });

  it("should return false for non-palindrome [6,1,1,1]", () => {
    const head = createLinkedList([6, 1, 1, 1]);
    expect(solution(head)).toBe(false);
  });

  it("should return false for non-palindrome [1,1,1,6]", () => {
    const head = createLinkedList([1, 1, 1, 6]);
    expect(solution(head)).toBe(false);
  });

  it("should return false for non-palindrome [1,6,1,6]", () => {
    const head = createLinkedList([1, 6, 1, 6]);
    expect(solution(head)).toBe(false);
  });

  it("should return true for palindrome [1,6,6,6,1]", () => {
    const head = createLinkedList([1, 6, 6, 6, 1]);
    expect(solution(head)).toBe(true);
  });
});
