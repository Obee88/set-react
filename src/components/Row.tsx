import React from 'react';
import { toPairs } from 'lodash';
import Card from './Card';
import { Row } from '../services/table';
import styles from './Row.module.css';

interface Props {
  row: Row,
  rowIndex: string,
}

const getUniqueKey = (rowIndex: string, index: string) => `${rowIndex}${new Date().getTime()}${index}`;
const RowComponent = ({ row, rowIndex }: Props) => (
  <div className={styles.row}>
    {
      toPairs(row).map(
        ([index, card]) => (
          <Card card={card}
            key={card === null ? getUniqueKey(rowIndex, index) : card}
          />
        )
      )
    }
  </div>
);

export default RowComponent;
