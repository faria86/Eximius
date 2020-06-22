import React, { Component } from 'react';
import './style.scss';

import { singleEvent, editEvent } from './../../../services/event';

import NavBar from './../../../components/NavBar';
import LogoBar from './../../../components/LogoBar';

class EditEventView extends Component {
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

  loadEvent = () => {
    singleEvent(this.props.match.params.id)
      .then((event) => {
        const newDate = event.date[0].split(',');
        const time = newDate[1];
        const date = newDate[0];
        this.setState({
          ...event,
          time,
          date
        });
      })
      .catch((error) => console.log('no event received', error));
  };

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
    const date = [this.state.date + ',' + this.state.time];

    editEvent(
      { name, image, city, date, description, category, capacity },
      this.props.match.params.id
    )
      .then((event) => {
        // Redirect user to profile page after successful edit
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadEvent();
  }

  render() {
    return (
      <>
      <LogoBar updateUser={this.props.updateUser}/>
      <div className='form edit-event'>
        <h1>Edit Event</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor='name'></label>
          <input
            id='name-input'
            name='name'
            type='text'
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label htmlFor='image-input'></label>
          <input id='image-input' name='image' type='file' onChange={this.handleFileInputChange} />
          <label htmlFor='category-input'></label>
          <input
            id='category-input'
            name='category'
            type='text'
            placeholder='Category'
            value={this.state.category}
            onChange={this.handleInputChange}
          />
          <label htmlFor='capacity-input'></label>
          <input
            id='capacity-input'
            name='capacity'
            type='number'
            placeholder='Capacity'
            value={this.state.capacity}
            onChange={this.handleInputChange}
          />
          <label htmlFor='date-input'></label>
          <input
            id='date-input'
            name='date'
            value={this.state.date}
            type='date'
            onChange={this.handleInputChange}
          />
          <input
            id='time-input'
            name='time'
            type='time'
            placeholder='Time'
            value={this.state.time}
            onChange={this.handleInputChange}
          />
          <label htmlFor='city-input'></label>
          <input
            id='city-input'
            name='city'
            type='text'
            placeholder='City'
            value={this.state.city}
            onChange={this.handleInputChange}
          />
          <label htmlFor='description-input'></label>
          <input
            id='description-input'
            name='description'
            type='text'
            placeholder='Description'
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <button>Edit</button>
        </form>
      </div>
        <NavBar props={this.props} />
    </>
    );
  }
}

export default EditEventView;
