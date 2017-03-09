import React, { PropTypes } from 'react';

const TimeDisplay = ({ timeInMillis }) => {
  const t = {};
  t.h = Math.floor(timeInMillis / 3600000);
  t.mm = Math.floor((timeInMillis % 3600000) / 60000);
  t.ss = Math.floor((timeInMillis % 60000) / 1000);
  t.t = Math.floor((timeInMillis % 1000) / 100);
  if (Math.floor(t.mm / 10) === 0) {
    t.mm = `0${t.mm}`;
  }
  if (Math.floor(t.ss / 10) === 0) {
    t.ss = `0${t.ss}`;
  }
  return (
    <span>
        {`${t.h}:${t.mm}:${t.ss}.${t.t}`}
    </span>
  );
};

TimeDisplay.propTypes = {
  timeInMillis: PropTypes.number,
};

export default TimeDisplay;
