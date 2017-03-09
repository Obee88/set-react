import React, { PropTypes } from 'react';
import { table as tableStyle } from './styles.css';
import Row from './row.jsx';
import { connect } from 'react-redux';

const Table = ({ table }) => (
  <div className={`${tableStyle} well`} >
    {
      Object.keys(table).map(
        (key, index) => (
          <Row row={table[key]} rowIndex={`${index}`} key={key} tableWidth={700} tableHeight={900} />
        )
      )
    }
  </div>
);

Table.propTypes = {
  table: PropTypes.object,
};

const mapStateToProps = (state) => ({
  table: state.table,
});


export default connect(mapStateToProps)(Table);
