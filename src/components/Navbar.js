import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function AppNavbar({ onLogout }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>🎓 GeoLocation Attendance</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={onLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
