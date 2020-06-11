import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

import { singleEvent, deleteEvent } from './../../../services/event';

import {
  createRegistration,
  deleteRegistration,
  attendanceRegistration,
  listUsersForEvent
} from './../../../services/attendance';

import NavBar from './../../../components/NavBar';
import ClockCountDown from './../../../components/ClockCountDown';
import LogoBar from './../../../components/LogoBar';

class EventSingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: '',
      going: '',
      attendance: 0
    };
  }

  loadEvent = () => {
    singleEvent(this.props.match.params.id)
      .then((event) => {
        this.setState({
          event
        });
      })
      .catch((error) => console.log('no event received', error));
  };

  changeGoing = () => {
    this.setState({
      going: !this.state.going
    });
  };

  checkUserRegistration = () => {
    const userId = this.props.userId;
    const eventId = this.state.event._id;
    let registered;
    if (eventId && !this.state.going) {
      attendanceRegistration(userId, eventId)
        .then((file) => {
          registered = file;
          return listUsersForEvent(eventId);
        })
        .then((users) => {
          console.log('USERS.LENGTH', users.length);
          if (registered.length) {
            this.setState({
              going: true,
              attendance: users.length
            });
          } else {
            this.setState({
              going: false
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  registerUser = () => {
    const userId = this.props.userId;
    const eventId = this.state.event._id;
    createRegistration(userId, eventId)
      .then((register) => {
        this.changeGoing();
      })
      .catch((error) => console.log('user not registered', error));
  };

  deleteUserRegistration = () => {
    const userId = this.props.userId;
    const eventId = this.state.event._id;
    console.log(eventId);
    deleteRegistration(userId, eventId)
      .then((register) => {
        console.log('am I going', this.state.going);
        console.log('i am the register', register);
        this.changeGoing();
      })
      .catch((error) => console.log('user not registered', error));
  };

  componentDidMount() {
    this.loadEvent();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.event._id !== prevState.event._id) {
      this.checkUserRegistration();
    }
    if (prevProps.going) {
    }
  }

  deleteSpecificEvent = () => {
    const eventId = this.state.event._id;

    deleteEvent(eventId)
      .then((event) => {
        console.log('this was deleted', event);
        this.props.history.push('/');
      })
      .catch((err) => console.log('not deleted'));
  };

  render() {
    const event = this.state.event;
    const userId = this.props.userId;
    return (
      <>
        <LogoBar updateUser={this.props.updateUser} />
        <div className="eventSingle">
          <h1>{event.name}</h1>
          <em>{event.category}</em>
          <img src={event.image} alt={event.name} />
          {userId === event.userId && (
            <section className="eventChangers">
              <Link to={`/event/${event._id}/edit`}>Edit</Link>
              <button onClick={this.deleteSpecificEvent}>Delete</button>
            </section>
          )}
          <div className="location-clock">
            <div className="location">
              <p>Location:</p>
              <em>{event.city}</em>
            </div>
            <div className="time-container">
              <p>Time Left:</p>
              <ClockCountDown date={event.date} />
            </div>
          </div>
          {(this.state.going && (
            <div className="attendanceButtons">
              <p>
                {this.state.attendance} / {event.capacity}
              </p>
              <p>{event.description}</p>
              <button onClick={this.deleteUserRegistration}>I'm Out</button>
            </div>
          )) || <button onClick={this.registerUser}>I'm in</button>}
          <NavBar />
        </div>
      </>
    );
  }
}

export default EventSingleView;
