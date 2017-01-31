import React, { PropTypes } from 'react';
import { table as tableStyle } from './styles.css';
import Row from './row.jsx';
import { connect } from 'react-redux';

const Table = ({ table }) => (
  <div className={tableStyle} >
    {
      Object.keys(table).map(
        (key) => (
          <Row row={table[key]} key={key} tableWidth={700} tableHeight={900} />
        )
      )
    }
  </div>
);

Table.propTypes = {
  table: PropTypes.object,
};

const mapStateToProps = (state) => ({
  table: state.cards.table,
});


export default connect(mapStateToProps)(Table);
