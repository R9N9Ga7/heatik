import { useEffect, useMemo, useRef, useState } from "react";
import { type TimeTrackerViewProps, type TimeTracker } from "./types";
import { formatHMS, formatHMSFromSeconds, getStartOfDayTimestamp, parseAndNormalizeHMS, parseHMS } from "./utils";

const useTimeTracker = ({
  timeTracker,
  onChange,
}: TimeTrackerViewProps) => {
  const [remaining, setRemaining] = useState<number>(
    () => parseAndNormalizeHMS(timeTracker.remainingTime).seconds,
  );

  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const formatted = useMemo(() => formatHMSFromSeconds(remaining), [remaining]);

  useEffect(() => {
    const next: TimeTracker = {
      ...timeTracker,
      remainingTime: formatted,
      isRunning: timeTracker.isRunning ? remaining > 0 : false
    };

    onChange(next);
  }, [formatted, remaining]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const startTicking = () => {
    if (intervalRef.current)
      return;

    const id = window.setInterval(() => {
      if (!endTimeRef.current)
        return;

      const msLeft = endTimeRef.current - Date.now();
      const remainingLocal = Math.max(0, Math.ceil(msLeft / 1000));
      setRemaining(remainingLocal);

      if (remaining <= 0) {
        clearInterval(id);
        intervalRef.current = null;
        endTimeRef.current = null;
      }
    }, 250);

    intervalRef.current = id;
  };

  const stopTicking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    endTimeRef.current = null;
  };

  const handleOnStart = () => {
    const seconds = getRemainingTime();
    if (seconds <= 0)
      return;

    setRemaining(seconds);

    endTimeRef.current = Date.now() + seconds * 1000;
    startTicking();
    onChange({ ...timeTracker, isRunning: true, lastRunTime: getStartOfDayTimestamp() });
  };

  const handleOnStop = () => {
    stopTicking();
    onChange({ ...timeTracker, isRunning: false });
  };

  const handleOnReset = () => {
    stopTicking();
    const { seconds, normalized } = parseAndNormalizeHMS(timeTracker.targetTime);
    setRemaining(seconds);
    onChange({ ...timeTracker, isRunning: false, remainingTime: normalized });
  };

  const handlOnChangeTargetTime = (value: string) => {
    const [h, m, s, isValid] = parseHMS(value);
    if (!isValid)
      return;

    const updatedTimeTracker = { ...timeTracker };
    updatedTimeTracker.targetTime = [h, m, s].join(':');
    onChange(updatedTimeTracker);
  };

  const handleOnBlurTargetName = () => {
    const [h, m, s] = parseHMS(timeTracker.targetTime);
    const updatedTimeTracker = { ...timeTracker };
    updatedTimeTracker.targetTime = formatHMS([h, m, s]);
    onChange(updatedTimeTracker);
  };

  const handleOnChangeName = (value: string) => {
    onChange({ ...timeTracker, name: value })
  };

  const handleOnRemove = () => {
    const updatedTimeTracker = { ...timeTracker };
    updatedTimeTracker.isEnabled = false;
    onChange(updatedTimeTracker);
  };

  const getRemainingTime = (): number => {
    const { seconds: remainingTimeSeconds } = parseAndNormalizeHMS(timeTracker.remainingTime);
    if (remainingTimeSeconds > 0) {
      return remainingTimeSeconds;
    }
    const { seconds: targetTimeSeconds } = parseAndNormalizeHMS(timeTracker.targetTime);
    return targetTimeSeconds;
  };

  return {
    handleOnStart,
    handleOnStop,
    handlOnChangeTargetTime,
    handleOnReset,
    handleOnChangeName,
    handleOnRemove,
    handleOnBlurTargetName,
  };
};

export default useTimeTracker;
