'use client';

import React from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown, Container } from 'react-bootstrap';
import { FaBell, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import profilePic from "../../../public/logo.jpg"

const DashboardHeader = ({isPanelHovered} : any) => {
  return (
    <Navbar bg="transparent" className="d-flex justify-content-between w-100">
      <Container className="d-flex justify-content-between align-items-center">
        <Form style={{
          position: 'relative',
          width: '300px',  // Adjust width as necessary
          transform: isPanelHovered ? 'translateX(150px)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
        }}>
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
        <div className="d-flex align-items-center" style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '10px' }}>
          <div style={{ position: 'relative', marginRight: '15px' }}>
            <FaBell size={30} style={{ color: '#000' }} />
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#ff6600',
              borderRadius: '50%',
              color: '#fff',
              padding: '3px 5px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>7</span>
          </div>
          <div className="d-flex align-items-center">
            <Image
              src={profilePic}
              alt="Profile"
              width={30}
              height={30}
              className=""
              style={{ marginRight: '10px' }}
            />
            <span className="mx-2" style={{ color: '#000', fontWeight: 'bold' }}>Kanika</span>
            <NavDropdown
              title={<span></span>}
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;
