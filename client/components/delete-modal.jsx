import React from 'react';
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
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-container">
        <div className="modal-title">
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure?
          </Modal.Title>
        </div>
        <div className="modal-text">
          <p>Would you like to delete this entry?</p>
          <p>This process cannot be undone.</p>
        </div>
        <Modal.Footer className="modal-footer">
          <a className="modal-cancel-btn" onClick={this.props.onHide}>Cancel</a>
          <a className ="modal-delete-btn" onClick={this.deleteServiceId}>Delete</a>
        </Modal.Footer>
      </Modal>
    );
  }
}
