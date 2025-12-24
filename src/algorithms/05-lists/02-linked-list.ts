/*
  LinkedList

  Name your class / constructor (something you can call new on) LinkedList

  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.

  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses,
                      and returns removed value

  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.
*/

class Node<T> {
  value: T;
  next: Node<T>;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Node<T>;
  tail: Node<T>;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = null;
  }

  push(value) {
    const node = new Node<T>(value);
    this.length++;

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }

  pop(): T {
    return this.delete(this.length - 1);
  }

  private find(index: number) {
    if (index >= this.length || index < 0) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  get(index: number): T {
    return this.find(index).value;
  }

  delete(index: number): T {
    if (index === 0) {
      const head = this.head;
      if (head) {
        this.head = head.next;
      } else {
        this.head = null;
      }
      this.length--;
      return head.value;
    }

    const prev = this.find(index - 1);
    const current = prev.next;
    if (!current) return null;

    prev.next = current.next;
    if (!prev.next?.next) this.tail = prev.next;
    this.length--;
    return current.value;
  }
}
