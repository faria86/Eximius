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
    let event;
    singleEvent(this.props.match.params.id)
      .then((doc) => {
        event = doc;
        return listUsersForEvent(this.props.match.params.id);
      })
      .then((users) => {
        this.setState({
          event,
          attendance: users.length
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
    if (eventId && !this.state.going) {
      attendanceRegistration(userId, eventId)
        .then((file) => {
          if (file.length) {
            this.setState({
              going: true
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
    let registered;
    createRegistration(userId, eventId)
      .then((register) => {
        registered = register;
        return listUsersForEvent(eventId);
      })
      .then((users) => {
        if (registered) {
          this.setState({
            attendance: users.length,
            going: true
          });
        }
      })
      .catch((error) => console.log('user not registered', error));
  };

  deleteUserRegistration = () => {
    const userId = this.props.userId;
    const eventId = this.state.event._id;
    deleteRegistration(userId, eventId)
      .then((register) => {
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
        <div className='eventSingle'>
          <h1>{event.name}</h1>
          <em>{event.category}</em>
          <img src={event.image} alt={event.name} />
          {userId === event.userId && (
            <section className='eventChangers'>
              <Link to={`/event/${event._id}/edit`}>Edit</Link>
              <button onClick={this.deleteSpecificEvent}>Delete</button>
            </section>
          )}
          <div className='location-clock'>
            <div className='location'>
              <p>Location:</p>
              <em>{event.city}</em>
            </div>
            <div className='time-container'>
              <p>Time Left:</p>
              <ClockCountDown date={event.date} />
            </div>
          </div>
          {(this.state.going && (
            <div className='attendanceButtons'>
              <p>
                <strong>Going: </strong> {this.state.attendance}/{event.capacity}
              </p>
              <div className='description'>
                <p>{event.description}</p>
              </div>
              <button onClick={this.deleteUserRegistration}>I'm Out</button>
            </div>
          )) || (
            <div className='attendanceButtons'>
              <button onClick={this.registerUser}>I'm in</button>
            </div>
          )}
        </div>
        <NavBar props={this.props}/>
      </>
    );
  }
}

export default EventSingleView;
