'use client';

import React from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown, Container } from 'react-bootstrap';
import { FaBell, FaSearch } from 'react-icons/fa';

const DashboardHeader = () => {
  return (
    <Navbar bg="transparent" className="d-flex justify-content-between w-100">
      <Container className="d-flex justify-content-between align-items-center">
        <Form className="d-flex mx-auto w-30 position-relative">
          <FormControl
            type="search"
            placeholder="Search anything..."
            className="me-2 search"
            aria-label="Search"
          />
          <FaSearch
            size={20}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}
          />
        </Form>
        <div className="d-flex align-items-center">
          <Nav.Link href="#notifications">
            <FaBell size={40} style={{ padding: '10px', background: '#fff' }} />
          </Nav.Link>
          <span className="mx-3" style={{ color: '#000' }}>Shankar</span> {/* Replace 'John Doe' with dynamic user name */}
          <NavDropdown
            title={<img src="/logo.jpg" alt="Avatar" className="rounded-circle" width="30" height="30" />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;
