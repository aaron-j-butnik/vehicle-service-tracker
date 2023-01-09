import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaArrowAltCircleDown } from 'react-icons/fa';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      openVehicleCardId: null
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
              <Card
                  className="garage-card-container "
                  key={vehicle.vehicleId}>
                <div className={'garage-card-div ' + (this.state.openVehicleCardId === vehicle.vehicleId ? '' : 'collapsed')}>
                  <h4 className="garage-card-title">
                    <FaArrowAltCircleDown
                        className="arrow-btn"
                        onClick={() =>
                          this.setState({
                            openVehicleCardId: vehicle.vehicleId
                          })
                        }
                      />
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
                        // TO DO: Add Service Button Functionality
                        className="add-service-btn"
                        href={`#add-service?id=${vehicle.vehicleId}`}>
                      Add Service
                    </a>
                    <a
                        className="edit-vehicle-btn"
                        href={`#edit-vehicle?id=${vehicle.vehicleId}`}>
                      Edit Vehicle
                    </a>
                    <a
                        // TO DO: Delete Vehicle Button Functionality
                        className="delete-vehicle-btn"
                        >
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
