import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import { AiFillCar } from 'react-icons/ai';
import { GiHomeGarage } from 'react-icons/gi';
import { FaTools } from 'react-icons/fa';

export default class Navaigation extends React.Component {
  render() {
    return (
      <header>
        <Navbar>
          <Nav.Link className="px-0 mt-0 fs-2 icon-logo" href="#my-garage">
            <AiFillCar />
          </Nav.Link>
          <Nav className="justify-content-between align-items-center w-100 ms-2">
            <Col>
              <Navbar.Brand className="brand mb-0 logo" href="#my-garage">
                Vehicle Maintenance Tracker
              </Navbar.Brand>
            </Col>
            <Col className="icon-links">
              <Nav.Link className="px-0 mt-0 fs-2 icon" href="#my-garage">
                <GiHomeGarage />
              </Nav.Link>
              <Nav.Link className="px-0 mt-0 fs-2 icon" href="#my-service">
                <FaTools />
              </Nav.Link>
            </Col>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
