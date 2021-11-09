import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { toPairs } from 'lodash';
import { getTable } from '../state/selectors';
import RowComponent from './Row';
import styles from './styles.module.css';
import { Row } from '../services/table';


const Table = () => {
  const table = useSelector(getTable);
  return (
    <div className={classNames('well', styles.table)} >
      {
        toPairs(table).map(
          ([key, value] , index) => (
            <RowComponent
              row={value as Row}
              rowIndex={`${index}`}
              key={key}
            />
          )
        )
      }
    </div>
  );
};

export default Table;
