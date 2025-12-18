/**
 * A simple calculator utility with basic arithmetic operations
 */
export class Calculator {
  /**
   * Adds two numbers
   * @param a - First number
   * @param b - Second number
   * @returns The sum of a and b
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts two numbers
   * @param a - First number
   * @param b - Second number
   * @returns The difference of a and b
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers
   * @param a - First number
   * @param b - Second number
   * @returns The product of a and b
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides two numbers
   * @param a - First number (dividend)
   * @param b - Second number (divisor)
   * @returns The quotient of a and b
   * @throws Error if divisor is zero
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}
