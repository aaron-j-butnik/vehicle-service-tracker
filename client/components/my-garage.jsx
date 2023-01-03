import React from 'react';
import Button from 'react-bootstrap/Button';

export default function MyGarage(props) {
  return (
    <div className="my-garage-div">
      <div className="my-garage-title">
        <h1>
          My Garage
        </h1>
        <Button variant= "success" className='btn btn-add-vehicle'>Add Vehicle</Button>
      </div>
      <div className="empty-garage">
        Your garage is currently empty
      </div>
    </div>
  );
}
