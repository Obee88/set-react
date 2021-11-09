import React from 'react';

interface Props {
  timeInMillis: number;
}

const withLeadingZero = (n: number) => {
  if (Math.floor(n / 10) === 0) {
    return `0${n}`;
  }
  return n;
}

const TimeDisplay = ({ timeInMillis }: Props) => {
  const h = Math.floor(timeInMillis / 3600000);
  const mm = Math.floor((timeInMillis % 3600000) / 60000);
  const ss = Math.floor((timeInMillis % 60000) / 1000);
  const t = Math.floor((timeInMillis % 1000) / 100);
  return (
    <span>
        {`${h}:${withLeadingZero(mm)}:${withLeadingZero(ss)}.${t}`}
    </span>
  );
};

export default TimeDisplay;
