import React from 'react';
import parseRoute from '../lib/parse-route';

export default class EditVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      licensePlate: '',
      odometer: '',
      notes: '',
      route: parseRoute(window.location.hash)
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    // const vehicle = this.state.route.params;
    // console.log(vehicle);
    const vehicleId = this.state.route.params.get('id');

    fetch(`/api/vehicleData/${vehicleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          window.location.hash = 'my-garage';
        }
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    return (
      <div className="form-container">
        <div className="error-message">{this.state.error}</div>
        <form className="w-100" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Year:
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
              Make:
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
              Model:
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
              License Plate:
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
              Current Odometer:
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
              Notes:
              <textarea
                name="notes"
                id=""
                cols="30"
                rows="10"
                onChange={this.handleInput}
                value={this.state.notes}
                className="form-control"
                placeholder="Additional notes here..."
              />
            </label>
            <div className="vehicle-cancel-save-btns">
              <a className="btn-cancel-vehicle" href="#my-garage">
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
