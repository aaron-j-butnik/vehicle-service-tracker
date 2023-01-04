import React from 'react';
// import Button from 'react-bootstrap/Button';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    };
  }

  componentDidMount() {
    fetch('/api/vehicleData')
      .then(res => res.json())
      .then(data =>
        this.setState({
          vehicles: data
        })
      );
  }

  render() {

    return (
      <div className="my-garage-div">
        <div className="my-garage-title">
          <h1>My Garage</h1>
          <a className="btn-add-vehicle" href="#new-vehicle">
            Add Vehicle
          </a>
        </div>
        <div className="empty-garage">
          {this.state.vehicles.length === 0
            ? 'Your garage is currently empty'
            : this.state.vehicles.map(vehicle => (
              <div key={vehicle.vehicleId}>
                {vehicle.year} {vehicle.make} {vehicle.model}
                <a href={'#edit-vehicle?id=' + vehicle.vehicleId}>Edit Vehicle</a>
                {/* <button>Edit Vehicle</button> */}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
