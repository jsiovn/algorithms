/*
  ArrayList

  We are going to approximate an implementation of ArrayList. In JavaScript terms, that means we are
  going to implement an array using objects. You should not use arrays at all in this exercise, just
  objects. Make a class (or constructor function; something you can call new on) called ArrayList.
  ArrayList should have the following properties (in addition to whatever properties you create):

  length - integer  - How many elements in the array
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses,
                      and returns removed value

*/

export class ArrayList<T> {
  public data: {};
  public length: number;

  constructor() {
    this.data = {};
    this.length = 0;
  }

  push(value: T) {
    this.data[this.length] = value;
    this.length++;
  }

  pop(): T {
    return this.delete(this.length - 1);
  }

  get(index: number): T {
    return this.data[index];
  }

  delete(index: number): T {
    const response = this.data[index];
    this.collapseTo(index);
    return response;
  }

  private collapseTo(index: number) {
    for (let i = index; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}
