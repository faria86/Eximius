import React, { Component } from 'react';

import msToHMS from './../../helpers/msToHMS';

class ClockCoundDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: '',
      displayTime: false,
      pastEvent: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const now = Date.now();
    const eventTimeInMs = new Date(this.props.date).getTime();
    const timeLeftInMs = eventTimeInMs - now;
    const timeLeft = msToHMS(timeLeftInMs);
    let displayTime;
    let pastEvent;
    if (timeLeft.split(':')[0] < 24 && timeLeftInMs > 0) displayTime = true;
    if (timeLeftInMs < 0) pastEvent = true;
    this.setState({
      timeLeft,
      displayTime,
      pastEvent
    });
  }

  render() {
    return (
      <div>
        {(this.state.displayTime && <h3>{this.state.timeLeft}</h3>) ||
          (this.state.pastEvent && <h3>You missed this one!</h3>) || <h3>Coming Soon</h3>}
      </div>
    );
  }
}

export default ClockCoundDown;
