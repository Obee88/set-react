import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Timer from './timer.jsx';

const InfoPanel = () => (
  <div>
    Time: <Timer />
  </div>
);

InfoPanel.propTypes = {
  value: PropTypes.string,
  action: PropTypes.func,
};

const mapStateToProps = (state) => ({
  value: state.value,
});

const mapDispatchToProps = (dispatch) => ({
  action() {
    dispatch();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPanel);
