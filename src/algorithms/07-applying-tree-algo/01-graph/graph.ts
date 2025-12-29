// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

import { getUser } from "./jobs";

/**
 *
 * @param myId the id of the user who is the root node
 * @param degreesOfSeparation how many degrees of separation away to look on the graph
 */
export const findMostCommonTitle = (
  myId: number,
  degreesOfSeparation: number
): string => {
  let queue = [myId];
  const seen = new Set(queue);
  const jobs = {};

  for (let i = 0; i <= degreesOfSeparation; i++) {
    const newQueue = [];

    while (queue.length) {
      const user = getUser(queue.shift());

      // queue up the next iteration
      for (let j = 0; j < user.connections.length; j++) {
        const connection = user.connections[j];
        if (!seen.has(connection)) {
          newQueue.push(connection);
          seen.add(connection);
        }
      }

      jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
    }

    queue = newQueue;
  }

  let jobName = "";
  let biggestNumber = 0;

  for (const currentJob in jobs) {
    if (jobs[currentJob] > biggestNumber) {
      jobName = currentJob;
      biggestNumber = jobs[currentJob];
    }
  }

  // see all job titles, sorted
  // const jobKeys = Object.keys(jobs);
  // jobKeys
  //   .map((id) => [id, jobs[id]])
  //   .sort((a, b) => b[1] - a[1])
  //   .slice(0, 10)
  //   .forEach(([id, num]) => console.log(`${id}: ${num}`));

  return jobName;
};
