import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { type TimeStats, type TimeTracker } from '../components/TimeTracker/types';
import { DEFAULT_TARGET_TIME, getStartOfDayTimestamp } from '../components/TimeTracker/utils';
import type { StorageBase } from '../shared/storage/StorageBase';
import { LocalStorage } from '../shared/storage/LocalStorage';

const ensureTodayStat = (timeTracker: TimeTracker, todayTimestamp: number): TimeTracker => {
  const hasToday = timeTracker.stats.some(s => s.createdAt === todayTimestamp);
  const stats = hasToday
    ? timeTracker.stats
    : [
        ...timeTracker.stats,
        {
          createdAt: todayTimestamp,
          lastRemainingTime: timeTracker.remainingTime,
          totalElapsedTime: 0,
        } as TimeStats,
      ];

  return { ...timeTracker, stats };
};

const resetIfNewDay = (timeTracker: TimeTracker, todayTimestamp: number): TimeTracker => {
  const isNewDay = timeTracker.lastRunTime < todayTimestamp;
  const base = {
    ...timeTracker,
    isRunning: false,
    ...(isNewDay ? { remainingTime: timeTracker.targetTime } : null),
  };
  return ensureTodayStat(base, todayTimestamp);
};

const useApp = () => {
  const [timeTrackers, setTimeTrackers] = useState<TimeTracker[]>([]);

  const storage: StorageBase = useMemo(() => new LocalStorage(), []);

  const hydratedRef = useRef(false);
  const dayRef = useRef<number>(getStartOfDayTimestamp());

  useEffect(() => {
    const loaded = storage.load();
    const todayTimestamp = getStartOfDayTimestamp();
    dayRef.current = todayTimestamp;

    const normalized = loaded.map(timeTracker => resetIfNewDay(timeTracker, todayTimestamp));
    setTimeTrackers(normalized);
    hydratedRef.current = true;
  }, [storage]);

  useEffect(() => {
    if (!hydratedRef.current)
      return;
    storage.save(timeTrackers);
  }, [storage, timeTrackers]);

  useEffect(() => {
    const id = setInterval(() => {
      const nowStart = getStartOfDayTimestamp();
      if (nowStart !== dayRef.current) {
        dayRef.current = nowStart;
        setTimeTrackers(prev => prev.map(t => resetIfNewDay(t, nowStart)));
      }
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleOnAddTimer = () => {
    const todayTs = dayRef.current;
    const newTimer: TimeTracker = {
      id: uuidv4(),
      isRunning: false,
      name: `Tracker ${timeTrackers.length}`,
      remainingTime: DEFAULT_TARGET_TIME,
      targetTime: DEFAULT_TARGET_TIME,
      lastRunTime: todayTs,
      isEnabled: true,
      stats: [
        {
          createdAt: todayTs,
          lastRemainingTime: DEFAULT_TARGET_TIME,
          totalElapsedTime: 0,
        },
      ],
    };
    setTimeTrackers(prev => [...prev, newTimer]);
  };

  return {
    handleOnAddTimer,
    setTimeTrackers,
    timeTrackers,
  };
};

export default useApp;
