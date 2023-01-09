import React from 'react';
import VehicleCard from './vehicle-card';

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
            ? 'Currently no services for vehicles'
            : this.state.services.map(service => (
              <VehicleCard key={service.serviceId} service={service} />
            ))}
        </div>
      </div>
    );
  }
}
