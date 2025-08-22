import type { TimeTracker } from "../TimeTracker/types";

const useStatistics = () => {
  const getTotalElapsedTime = (timeTracker: TimeTracker): number => {
    const totalElapsedTimes = timeTracker.stats.map(value => value.totalElapsedTime);
    if (totalElapsedTimes.length > 0) {
      return totalElapsedTimes.reduce((prev, current) => prev + current);
    }
    return 0;
  };

  return {
    getTotalElapsedTime,
  };
};

export default useStatistics;
