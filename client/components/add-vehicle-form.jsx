import React from 'react';

export default class AddVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      licensePlate: '',
      odometer: '',
      notes: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO: Send the data to the back-end (api)
    fetch('/api/vehicleData', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {

      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Year
          <input
            type="text"
            name="year"
            onChange={this.handleInput}
            value={this.state.year}
          />
        </label>
        <label>
          Make
          <input
            type="text"
            name="make"
            onChange={this.handleInput}
            value={this.state.make}
          />
        </label>
        <label>
          Model
          <input
            type="text"
            name="model"
            onChange={this.handleInput}
            value={this.state.model}
          />
        </label>
        <label>
          License Plate
          <input
            type="text"
            name="licensePlate"
            onChange={this.handleInput}
            value={this.state.licensePlate}
          />
        </label>
        <label>
          Current Odometer
          <input
            type="text"
            name="odometer"
            onChange={this.handleInput}
            value={this.state.odometer}
          />
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            id=""
            cols="30"
            rows="10"
            onChange={this.handleInput}
            value={this.state.notes}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    );
  }
}
