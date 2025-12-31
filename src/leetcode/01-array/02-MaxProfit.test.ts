/**
  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

  Example 1:
    Input: prices = [7,1,5,3,6,4]
    Output: 5
    Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
    Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

  Example 2:
    Input: prices = [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transactions are done and the max profit = 0.

  Constraints:
    1 <= prices.length <= 105
    0 <= prices[i] <= 104
*/

export function solution(prices: number[]): number {
  let min = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const profit = prices[i] - min;
    if (profit > maxProfit) {
      maxProfit = profit;
    }
    if (prices[i] < min) {
      min = prices[i];
    }
  }

  return maxProfit;
}

// ------------- Unit Test ------------- //
describe("MaxConsecutiveOnes", () => {
  const testCases = [
    {
      id: 1,
      numbers: [7, 1, 5, 3, 6, 4],
      expected: 5,
    },
    {
      id: 2,
      numbers: [7, 6, 4, 3, 1],
      expected: 0
    },
    {
      id: 3,
      numbers: [2, 4, 1],
      expected: 2
    },
    {
      id: 4,
      numbers: [3, 2, 6, 5, 0, 3],
      expected: 4
    },
    {
      id: 5,
      numbers: [3, 2, 6, 5, 0, 3, 1, 9],
      expected: 9
    }
  ];

  it.each(testCases)(
    `should return correctly for test case #$id`,
    ({ numbers, expected }) => {
      expect(solution([...numbers])).toEqual(expected);
    }
  );
});
