import type { TimeStats, TimeTracker } from "../TimeTracker/types";
import { getStartOfDayTimestamp, parseAndNormalizeHMS } from "../TimeTracker/utils";

const useTimeTrackerList = (
  timeTrackers: TimeTracker[],
  onChange: (timeTrackers: TimeTracker[]) => void,
) => {
  const handleOnChangeTimer = (timeTracker: TimeTracker, index: number) => {
    const changedTimers = [...timeTrackers];
    const timestamp = getStartOfDayTimestamp();
    const findedStatIndex = timeTracker.stats.findIndex((timeStat: TimeStats) => timeStat.createdAt == timestamp);

    if (findedStatIndex == -1) {
      timeTracker.stats.push({
        createdAt: timestamp,
        lastRemainingTime: timeTracker.remainingTime,
        totalElapsedTime: 0,
      });
    }

    const stat = timeTracker.stats[timeTracker.stats.length - 1];
    const prevValue = parseAndNormalizeHMS(stat.lastRemainingTime);
    const newValue = parseAndNormalizeHMS(timeTracker.remainingTime);

    const totalElapsedTime = prevValue.seconds - newValue.seconds;
    stat.totalElapsedTime += totalElapsedTime > 0 ? totalElapsedTime : 0;
    stat.lastRemainingTime = timeTracker.remainingTime;

    changedTimers[index] = timeTracker;

    onChange(changedTimers);
  };

  return {
    handleOnChangeTimer,
  };
};

export default useTimeTrackerList;
