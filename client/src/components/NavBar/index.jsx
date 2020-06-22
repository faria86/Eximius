import React from 'react';

import { Link } from 'react-router-dom';

import './index.scss';

function NavBar(props) {
  //create a variable path to check where the user is, to render the correct image
  let path = props.props.match.path;

  return (
    <div className="navbar">
      <Link to="/">
        {(path === '/' && <img src="/icon/home-pressed.png" alt="home logo painted" />) || (
          <img src="/icon/home.png" alt="home page" />
        )}
      </Link>
      <Link to="/event/create">
        {(path === '/event/create' && (
          <img src="/icon/addEvent-pressed.png" alt="create event logo painted" />
        )) || <img src="/icon/addEvent.png" alt="add event" />}
      </Link>
      <Link to="/my-events">
        {(path === '/my-events' && (
          <img src="/icon/eventList-pressed.png" alt="home logo painted" />
        )) || <img src="/icon/eventList.png" alt=" my event List" />}
      </Link>
      <Link to="/profile">
        {(path === '/profile' && (
          <img src="/icon/profile-pressed.png" alt="profile logo painted" />
        )) || <img src="/icon/profile.png" alt="profile page" />}
      </Link>
    </div>
  );
}

export default NavBar;
