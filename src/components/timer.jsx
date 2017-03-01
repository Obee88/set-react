import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().getTime(),
    };
  }

  componentDidMount() {
    setTimeout(this.thick.bind(this), 1000);
  }

  componentDidUpdate() {
    setTimeout(this.thick.bind(this), 1000);
  }

  thick() {
    this.setState({ currentTime: new Date().getTime() });
  }

  render() {
    const milis = this.state.currentTime - this.props.startTime;
    const t = {};
    t.h = Math.floor(milis / 3600000);
    t.mm = Math.floor((milis % 3600000) / 60000);
    t.ss = Math.floor((milis % 60000) / 1000);
    t.t = Math.floor((milis % 1000) / 100);
    if (Math.floor(t.mm / 10) === 0) {
      t.mm = `0${t.mm}`;
    }
    if (Math.floor(t.ss / 10) === 0) {
      t.ss = `0${t.ss}`;
    }
    return (
      <span>
          {`${t.h}:${t.mm}:${t.ss}`}
      </span>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number,
};

const mapStateToProps = (state) => ({
  startTime: state.game.startTime,
});

export default connect(
  mapStateToProps
)(Timer);
