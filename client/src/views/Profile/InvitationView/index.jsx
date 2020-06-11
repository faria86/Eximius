import React, { Component } from 'react';

class InvitationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const { email, message } = this.state;

    console.log('submitted invitation form', email, message);
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className='form'>
        <h1>Invite a Friend</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor='email-input'></label>
          <input
            id='email-input'
            name='email'
            type='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <h3>Message</h3>
          <textarea
            id='message-input'
            value={this.state.message}
            onChange={this.handleInputChange}
          />

          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default InvitationView;
