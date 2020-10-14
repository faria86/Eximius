import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

import { listEvents } from './../../services/event';

import EventList from './../../components/EventList';

import NavBar from './../../components/NavBar';
import LogoBar from './../../components/LogoBar';
import AnimationTitle from './../../components/AnimationTitle';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  loadEvents() {
    listEvents()
      .then((events) => {
        this.setState({
          events
        });
      })
      .catch((error) => console.log('list events did not load', error));
  }

  componentDidMount() {
    this.loadEvents();
  }

  render() {
    const user = this.props.user;
    return (
      <div className='dashboard'>
        {(user && (
          <>
            <LogoBar updateUser={this.props.updateUser} />
            {(!this.state.events && (
              <>
                <p>There are no events at the moment</p>
              </>
            )) || (
              <>
                <h1>What's coming?</h1>
                {this.state.events.map((event) => {
                  return <EventList key={event._id} event={event} />;
                })}
              </>
            )}
            <NavBar props={this.props} />
          </>
        )) || (
          <>
            <section className='home'>
              <AnimationTitle />

              <Link to='/authentication/log-in'>Log In</Link>
            </section>
            <section className='contactUs'>
              <Link to='/contact-us'>Contact Us</Link>
            </section>
          </>
        )}
      </div>
    );
  }
}

export default HomeView;
