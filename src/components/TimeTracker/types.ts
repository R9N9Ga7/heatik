export type TimeTracker = {
  name: string,
  id: string,
  remainingTime: string,
  targetTime: string,
  isRunning: boolean,
  lastRunTime: number,
  isEnabled: boolean,
  stats: TimeStats[],
};

export type TimeStats = {
  createdAt: number,
  lastRemainingTime: string,
  totalElapsedTime: number,
};

export type TimeTrackerViewProps = {
  timeTracker: TimeTracker,
  onChange: (timeTracker: TimeTracker) => void,
};
