/**
  Given the heads of two singly linked-lists headA and headB, return the node at which
  the two lists intersect. If the two linked lists have no intersection at all, return null.

  The test cases are generated such that there are no cycles anywhere in the entire linked structure.
  Note that the linked lists must retain their original structure after the function returns.

  Example 1:
    Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
    Output: Intersected at '8'
    Explanation: The intersected node's value is 8.
    From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5].
    There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.

  Example 2:
    Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
    Output: Intersected at '2'
    Explanation: The intersected node's value is 2.
    From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4].
    There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.

  Example 3:
    Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
    Output: No intersection
    Explanation: The two lists do not intersect, so return null.

  Constraints:
    The number of nodes of listA is in the m.
    The number of nodes of listB is in the n.
    1 <= m, n <= 3 * 10^4
    1 <= Node.val <= 10^5
    0 <= skipA <= m
    0 <= skipB <= n
    intersectVal is 0 if listA and listB do not intersect.
    intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.

  Follow up: Could you write a solution that runs in O(m + n) time and use only O(1) memory?
*/

export function solution(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  if (!headA || !headB) return null;

  // get length of headA, headB
  const m = getLength(headA);
  const n = getLength(headB);

  // prepare pointers A, B with the same length from tail to head
  let ptrA = headA;
  let ptrB = headB;
  if (m - n > 0) {
    for (let i = 0; i < m - n; i++) {
      ptrA = ptrA.next;
    }
  } else if (n - m > 0) {
    for (let i = 0; i < n - m; i++) {
      ptrB = ptrB.next;
    }
  }

  // find intersection
  while (ptrA !== ptrB) {
    ptrA = ptrA.next;
    ptrB = ptrB.next;
  }

  return ptrA;
}

function getLength(head: ListNode): number {
  let counter = 1;
  let current = head;

  while (current.next) {
    counter++;
    current = current.next;
  }

  return counter;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Creates two linked lists that intersect at a specific node.
 * @param listAValues - Values for list A (before intersection)
 * @param listBValues - Values for list B (before intersection)
 * @param intersectionValues - Values for the shared intersection part
 * @returns Object containing headA, headB, and the intersection node
 */
function createIntersectingLists(
  listAValues: number[],
  listBValues: number[],
  intersectionValues: number[],
): {
  headA: ListNode | null;
  headB: ListNode | null;
  intersection: ListNode | null;
} {
  // Create intersection part
  let intersection: ListNode | null = null;
  let intersectionTail: ListNode | null = null;

  for (const val of intersectionValues) {
    const newNode = new ListNode(val);
    if (!intersection) {
      intersection = newNode;
      intersectionTail = newNode;
    } else {
      intersectionTail!.next = newNode;
      intersectionTail = newNode;
    }
  }

  // Create list A
  let headA: ListNode | null = null;
  let tailA: ListNode | null = null;

  for (const val of listAValues) {
    const newNode = new ListNode(val);
    if (!headA) {
      headA = newNode;
      tailA = newNode;
    } else {
      tailA!.next = newNode;
      tailA = newNode;
    }
  }

  // Connect list A to intersection
  if (tailA) {
    tailA.next = intersection;
  } else {
    headA = intersection;
  }

  // Create list B
  let headB: ListNode | null = null;
  let tailB: ListNode | null = null;

  for (const val of listBValues) {
    const newNode = new ListNode(val);
    if (!headB) {
      headB = newNode;
      tailB = newNode;
    } else {
      tailB!.next = newNode;
      tailB = newNode;
    }
  }

  // Connect list B to intersection
  if (tailB) {
    tailB.next = intersection;
  } else {
    headB = intersection;
  }

  return { headA, headB, intersection };
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
describe("IntersectionOfTwoLinkedLists", () => {
  // Example 1: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
  it("should find intersection at node with value 8", () => {
    const { headA, headB, intersection } = createIntersectingLists(
      [4, 1], // listA before intersection
      [5, 6, 1], // listB before intersection
      [8, 4, 5], // shared intersection part
    );
    const result = solution(headA, headB);
    expect(result).toBe(intersection);
    expect(result?.val).toBe(8);
  });

  // Example 2: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
  it("should find intersection at node with value 2", () => {
    const { headA, headB, intersection } = createIntersectingLists(
      [1, 9, 1], // listA before intersection
      [3], // listB before intersection
      [2, 4], // shared intersection part
    );
    const result = solution(headA, headB);
    expect(result).toBe(intersection);
    expect(result?.val).toBe(2);
  });

  // Example 3: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
  it("should return null when lists do not intersect", () => {
    const headA = createLinkedList([2, 6, 4, 2]);
    const headB = createLinkedList([1, 5, 4, 2]);
    const result = solution(headA, headB);
    expect(result).toBeNull();
  });

  // Edge case: one list is null
  it("should return null when one list is null", () => {
    const headA = createLinkedList([1, 2, 3]);
    const result = solution(headA, null);
    expect(result).toBeNull();
  });

  // Edge case: both lists are null
  it("should return null when both lists are null", () => {
    const result = solution(null, null);
    expect(result).toBeNull();
  });

  // Edge case: intersection at head of both lists
  it("should find intersection when both lists share the same head", () => {
    const { headA, headB, intersection } = createIntersectingLists(
      [], // listA before intersection (empty)
      [], // listB before intersection (empty)
      [1, 2, 3], // shared intersection part
    );
    const result = solution(headA, headB);
    expect(result).toBe(intersection);
    expect(result?.val).toBe(1);
  });

  // Edge case: lists of different lengths with intersection
  it("should find intersection with lists of different lengths", () => {
    const { headA, headB, intersection } = createIntersectingLists(
      [1], // listA before intersection
      [10, 20, 30, 40], // listB before intersection
      [5, 6, 7], // shared intersection part
    );
    const result = solution(headA, headB);
    expect(result).toBe(intersection);
    expect(result?.val).toBe(5);
  });
});
