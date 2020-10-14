import React, { Component } from 'react';
import './style.scss';

import { createEvent } from './../../../services/event';

import NavBar from './../../../components/NavBar';
import LogoBar from './../../../components/LogoBar';

class CreateEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      date: '',
      time: '',
      location: '',
      image: null,
      city: '',
      description: '',
      capacity: 0
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, image, city, description, category, capacity } = this.state;
    const userId = this.props.user._id;
    const date = [this.state.date, this.state.time];

    createEvent({ name, image, city, date, description, category, userId, capacity })
      .then((event) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <LogoBar updateUser={this.props.updateUser} />
        <div className='form createEvent'>
          <h1>Create Event</h1>
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor='name-input'></label>
            <input
              required
              id='name-input'
              name='name'
              type='text'
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <label htmlFor='image-input'></label>
            <input
              required
              id='image-input'
              name='image'
              type='file'
              onChange={this.handleFileInputChange}
            />
            <label htmlFor='category-input'></label>
            <input
              required
              id='category-input'
              name='category'
              type='text'
              placeholder='Category'
              value={this.state.category}
              onChange={this.handleInputChange}
            />
            <div className='capacity'>
              <label htmlFor='capacity-input'>
                <small>Capacity</small>
              </label>
              <input
                required
                id='capacity-input'
                name='capacity'
                type='number'
                placeholder='Capacity'
                value={this.state.capacity}
                onChange={this.handleInputChange}
              />
            </div>
            <section className='hourDate'>
              <label htmlFor='date-input'></label>
              <input id='date-input' name='date' type='date' onChange={this.handleInputChange} />
              <input
                required
                id='time-input'
                name='time'
                type='time'
                placeholder='Time'
                value={this.state.time}
                onChange={this.handleInputChange}
              />
            </section>
            <label htmlFor='city-input'></label>
            <input
              required
              id='city-input'
              name='city'
              type='text'
              placeholder='City'
              value={this.state.city}
              onChange={this.handleInputChange}
            />
            <label htmlFor='description-input'></label>
            <input
              required
              id='description-input'
              name='description'
              type='text'
              placeholder='Description'
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            <button>Create</button>
          </form>
          <NavBar props={this.props}/>
        </div>
      </>
    );
  }
}

export default CreateEventView;
