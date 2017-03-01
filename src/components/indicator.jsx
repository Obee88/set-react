import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { indicator as indicatorStyle } from './styles.css';
import { clearIndicatorValue } from '../state/cards/actions';

const Indicator = ({ indicatorValue, hideIndicator }) => (
  <div className={indicatorStyle} >
    <ReactCSSTransitionGroup
      transitionName="indicator"
      transitionLeaveTimeout={300}
      transitionEnterTimeout={300}
    >
      {
        (indicatorValue === true) &&
          <img
            style={{ width: '100%', height: '100%' }}
            alt="successImg"
            key="successImg"
            src="http://185.53.129.19/cards/successIndicator.png"
          />
      }
      {
        (indicatorValue === false) &&
          <img
            style={{ width: '100%', height: '100%' }}
            alt="failImg"
            key="failImg"
            src="http://185.53.129.19/cards/failIndicator.png"
          />
      }
    </ReactCSSTransitionGroup>
      {(indicatorValue !== null) && setTimeout(hideIndicator, 300) && false}
  </div>
);

Indicator.propTypes = {
  indicatorValue: PropTypes.bool,
  hideIndicator: PropTypes.func,
};

const mapStateToProps = (state) => ({
  indicatorValue: state.cards.indicatorValue,
});

const mapDispatchToProps = (dispatch) => ({
  hideIndicator() {
    dispatch(clearIndicatorValue());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Indicator);
