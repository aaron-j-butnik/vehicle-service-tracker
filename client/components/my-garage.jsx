import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaArrowAltCircleDown } from 'react-icons/fa';

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
      )
      .catch(err => console.error('Error:', err));
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
              <Card className="garage-card-container" key={vehicle.vehicleId}>
                <div className="garage-card-div">
                  <h4 className="garage-card-title">
                    <FaArrowAltCircleDown className='arrow-btn'/>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h4>
                  <div className="vehicle-details">
                    <h6 className="vehicle-info">Vehicle Info:</h6>
                    <p className="vehicle-info">
                      License Plate: {vehicle.licensePlate}
                    </p>
                    <p className="vehicle-info">
                      Odometer: {vehicle.odometer}
                    </p>
                    <p className="vehicle-info">
                      Additional Notes: {vehicle.notes}
                    </p>
                  </div>
                  <div className="service-details">
                    <h6>Service Info:</h6>
                    <p className="service-info">Milage at time of service:</p>
                    <p className="service-info">Service Performed:</p>
                  </div>
                  <div className="garage-card-btns">
                    <a
                        className="add-service-btn"
                        href={`#edit-vehicle?id=${vehicle.vehicleId}`}>
                      Add Service
                    </a>
                    <a
                        className="edit-vehicle-btn"
                        href={`#edit-vehicle?id=${vehicle.vehicleId}`}>
                      Edit Vehicle
                    </a>
                    <a
                        className="delete-vehicle-btn"
                        href={`#edit-vehicle?id=${vehicle.vehicleId}`}>
                      Delete Vehicle
                    </a>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}
