export const DEFAULT_TARGET_TIME = '00:05:00';

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const parseHMS = (value: string): [h: number, m: number, s: number, isValid: boolean] => {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?$/);

  if (!match)
    return [0, 0, 0, false];

  const [, h, m, s] = match;
  return [
    clamp(parseInt(h, 10), 0, 24),
    clamp(parseInt(m, 10), 0, 59),
    clamp(parseInt(s, 10), 0, 59),
    true,
  ];
};

export const parseAndNormalizeHMS = (value: string) : { seconds: number, normalized: string } => {
  const [h, m, s, isValid] = parseHMS(value);
  if (!isValid)
    return { seconds: 0, normalized: '00:00:00' };

  const totalSeconds = h * 3600 + m * 60 + s;
  const normalized = formatHMS([h, m, s]);

  return {
    seconds: totalSeconds,
    normalized,
  };
};

export const formatHMSFromSeconds = (totalSeconds: number): string => {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60)
  const s = seconds % 60;
  return formatHMS([h, m, s]);
}

export const formatHMS = (hms: number[]): string =>
  hms.map(v => `${v}`.padStart(2, '0')).join(':');

export const getStartOfDayTimestamp = (): number => {
  const dt = new Date(Date.now());
  dt.setUTCHours(0, 0, 0, 0);
  return dt.getTime();
};
