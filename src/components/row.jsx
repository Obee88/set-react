import React, { PropTypes } from 'react';
import { row as rowStyle } from './styles.css';
import Card from './card.jsx';


const getUniqueKey = (rowIndex, index) => `${rowIndex}${new Date().getTime()}${index}`;
const Row = ({ row, tableWidth, tableHeight, rowIndex }) => (
  <div className={rowStyle}>
    {
      Object.keys(row).map((index) => (<Card card={row[index]} key={row[index] === null ? getUniqueKey(rowIndex, index) : row[index]} tableWidth={tableWidth} tableHeight={tableHeight} />))
    }
  </div>
);

Row.propTypes = {
  row: PropTypes.object,
  tableWidth: PropTypes.number,
  tableHeight: PropTypes.number,
  rowIndex: PropTypes.string,
};


export default Row;
