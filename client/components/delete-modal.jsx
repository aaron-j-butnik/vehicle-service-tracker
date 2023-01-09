import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.deleteServiceId = this.deleteServiceId.bind(this);
  }

  deleteServiceId() {
    fetch(`/api/serviceDataDelete/${this.props.service.serviceId}`, {
      method: 'DELETE',
      headers: {
        'Conent-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.error) {
          this.setState({ error: data.error });
        } else {
          window.location.reload();
        }
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button onClick={this.deleteServiceId}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
