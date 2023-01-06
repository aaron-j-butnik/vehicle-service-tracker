import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaArrowAltCircleDown } from 'react-icons/fa';

export default class MyServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      openServiceCardId: null
    };
  }

  componentDidMount() {
    fetch('/api/serviceData')
      .then(res => res.json())
      .then(data =>
        this.setState({
          services: data
        })
      )
      .catch(err => console.error('Error:', err));
  }

  render() {
    return (
      <div className="my-garage-div">
        <div className="my-garage-title">
          <h1>My Services</h1>
        </div>
        <div className="empty-garage">
          {this.state.services.length === 0
            ? 'Currently no services on vehicles'
            : this.state.services.map(service => (
              <Card
                  className="garage-card-container "
                  key={service.serviceId}>
                <div
                    className={
                      'garage-card-div ' +
                      (this.state.openServiceCardId === service.serviceId
                        ? ''
                        : 'collapsed')
                    }>
                  <h6>Service Date: {service.serviceDate}</h6>
                  <h4 className="garage-card-title">
                    <FaArrowAltCircleDown
                        className="arrow-btn"
                        onClick={() =>
                          this.setState({
                            openServiceCardId: service.serviceId
                          })
                        }
                      />
                    {service.year} {service.make} {service.model}
                  </h4>
                  <div className="vehicle-details">
                    <h6 className="vehicle-info">Service Info:</h6>
                    <p className="vehicle-info">
                      Service Performed by: {service.servicePerformedBy}
                    </p>
                    <p className="vehicle-info">
                      Service Performed: {service.typeOfService}
                    </p>
                    <p className="vehicle-info">
                      Odometer at time of service: {service.odometerAtService}
                    </p>
                    <p className="vehicle-info">
                      Cost: {service.cost}
                    </p>
                    <p className="vehicle-info">
                      Additional Notes: {service.serviceNotes}
                    </p>
                  </div>
                  <div className="garage-card-btns">
                    <a
                        className="edit-vehicle-btn"
                        href={`#edit-service?id=${service.serviceId}`}>
                      Edit Service
                    </a>
                    <a
                        // TO DO: Delete Vehicle Button Functionality
                        className="delete-vehicle-btn"
                        href={`#delete-service?id=${service.serviceId}`}>
                      Delete Service
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
