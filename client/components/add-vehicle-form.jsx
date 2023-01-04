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
    });
    // .then(res => res.json())
    // .then(data => {

    // });
  }

  render() {
    return (
      <div className="form-container">
        <form className="w-100" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Year
              <input
                type="text"
                name="year"
                onChange={this.handleInput}
                value={this.state.year}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Make
              <input
                type="text"
                name="make"
                onChange={this.handleInput}
                value={this.state.make}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Model
              <input
                type="text"
                name="model"
                onChange={this.handleInput}
                value={this.state.model}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              License Plate
              <input
                type="text"
                name="licensePlate"
                onChange={this.handleInput}
                value={this.state.licensePlate}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Current Odometer
              <input
                type="text"
                name="odometer"
                onChange={this.handleInput}
                value={this.state.odometer}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label vehicle-notes-text-area">
              Notes
              <textarea
                name="notes"
                id=""
                cols="30"
                rows="10"
                onChange={this.handleInput}
                value={this.state.notes}
                className="form-control"
              />
            </label>
            <div className="vehicle-cancel-save-btns">
              <a className="btn-cancel-vehicle" type="submit">
                Cancel
              </a>
              <button className="btn-save-vehicle" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
