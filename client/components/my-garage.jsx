import React from 'react';
// import Button from 'react-bootstrap/Button';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVehicleFormOpen: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ isVehicleFormOpen: true });
  }

  render() {
    return (
      <div className="my-garage-div">
        <div className="my-garage-title">
          <h1>
            My Garage
          </h1>
          <a className='btn btn-add-vehicle' href='#new-vehicle'>Add Vehicle</a>
        </div>
        <div className="empty-garage">
          Your garage is currently empty
        </div>
      </div>
    );
  }

}
