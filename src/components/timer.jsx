import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TimeDisplay from './timeDisplay.jsx';

let interval = null;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().getTime(),
    };
  }

  componentDidMount() {
    interval = setInterval(this.thick.bind(this), 100);
  }

  componentWillUnmount() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  thick() {
    if (interval) {
      this.setState({ currentTime: new Date().getTime() });
    }
  }

  render() {
    return <TimeDisplay timeInMillis={this.state.currentTime - this.props.startTime} />;
  }
}

Timer.propTypes = {
  startTime: PropTypes.number,
};

const mapStateToProps = (state) => ({
  startTime: state.startTime,
});

export default connect(
  mapStateToProps
)(Timer);
