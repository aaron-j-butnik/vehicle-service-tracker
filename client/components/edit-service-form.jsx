import React from 'react';
import parseRoute from '../lib/parse-route';

export default class EditServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceDate: '',
      servicePerformedBy: '',
      typeOfService: '',
      odometerAtService: '',
      cost: '',
      serviceNotes: '',
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
    const serviceId = this.state.route.params.get('id');

    fetch(`/api/serviceData/${serviceId}`, {
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
          window.location.hash = 'my-service';
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
              Service Date:
              <input
                type="text"
                name="serviceDate"
                onChange={this.handleInput}
                value={this.state.serviceDate}
                className="form-control"
                placeholder="Ex. 12-4-22"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Service Performed By:
              <input
                type="text"
                name="servicePerformedBy"
                onChange={this.handleInput}
                value={this.state.servicePerformedBy}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Service Performed:
              <input
                type="text"
                name="typeOfService"
                onChange={this.handleInput}
                value={this.state.typeOfService}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Odometer at time of service:
              <input
                type="text"
                name="odometerAtService"
                onChange={this.handleInput}
                value={this.state.odometerAtService}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Cost:
              <input
                type="text"
                name="cost"
                onChange={this.handleInput}
                value={this.state.cost}
                className="form-control"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label vehicle-notes-text-area">
              Notes:
              <textarea
                name="serviceNotes"
                id=""
                cols="30"
                rows="10"
                onChange={this.handleInput}
                value={this.state.serviceNotes}
                className="form-control"
                placeholder="Additional notes here..."
              />
            </label>
            <div className="vehicle-cancel-save-btns">
              <a className="btn-cancel-vehicle" href="#my-service">
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
