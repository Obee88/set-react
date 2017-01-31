import React, { PropTypes } from 'react';
import { row as rowStyle } from './styles.css';
import Card from './card.jsx';

const Row = ({ row, tableWidth, tableHeight }) => (
  <div className={rowStyle}>
    {
      Object.keys(row).map((index) => (<Card card={row[index]} key={row[index]} tableWidth={tableWidth} tableHeight={tableHeight} />))
    }
  </div>
);

Row.propTypes = {
  row: PropTypes.object,
  tableWidth: PropTypes.number,
  tableHeight: PropTypes.number,
};


export default Row;
