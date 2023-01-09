import React from 'react';
import DeleteModal from './delete-modal';
import Card from 'react-bootstrap/Card';
import { FaArrowAltCircleDown } from 'react-icons/fa';

export default class VehicleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    const service = this.props.service;
    return (
      <Card className="garage-card-container " key={service.serviceId}>
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
            <p className="vehicle-info">Cost: {service.cost}</p>
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
              // TO DO: Delete Service Button Functionality
              className="delete-vehicle-btn"
              onClick={this.handleOpenModal}>
              Delete Service
            </a>
            <DeleteModal
              service={service}
              show={this.state.modalOpen}
              onHide={this.handleCloseModal}
            />
          </div>
        </div>
      </Card>
    );
  }
}
