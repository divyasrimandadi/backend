import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { createGeofence, activateAttendance, deactivateAttendance } from "../api/api";
import AppNavbar from "../components/Navbar";

export default function AdminDashboard() {
  const [geo, setGeo] = useState({ lat: "", lng: "", radius: "" });
  const [status, setStatus] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          ...geo,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => alert("Unable to fetch location.")
    );
  };

  const handleGeofence = async () => {
    const res = await createGeofence({
      name: "Campus Boundary",
      lat: geo.lat,
      lng: geo.lng,
      radius_meters: parseFloat(geo.radius),
    });
    setStatus(res.data.message || "Geofence created!");
  };

  const handleActivate = async () => {
    await activateAttendance({ geofence_id: prompt("Enter Geofence ID:") });
    setStatus("Attendance Activated ✅");
  };

  const handleDeactivate = async () => {
    await deactivateAttendance({ geofence_id: prompt("Enter Geofence ID:") });
    setStatus("Attendance Deactivated ⛔");
  };

  return (
    <>
      <AppNavbar onLogout={() => localStorage.clear()} />
      <Container className="mt-4">
        <Card className="p-4 shadow-lg border-0">
          <h3>Admin Dashboard 🧭</h3>
          <p>Manage campus boundaries and attendance sessions</p>

          {status && <Alert variant="info">{status}</Alert>}

          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                value={geo.lat}
                placeholder="Auto-detected"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                value={geo.lng}
                placeholder="Auto-detected"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Radius (meters)</Form.Label>
              <Form.Control
                type="number"
                value={geo.radius}
                onChange={(e) => setGeo({ ...geo, radius: e.target.value })}
              />
            </Form.Group>

            <Button variant="secondary" onClick={getLocation}>
              📍 Get My Location
            </Button>{" "}
            <Button variant="success" onClick={handleGeofence}>
              🗺️ Create Geofence
            </Button>{" "}
            <Button variant="primary" onClick={handleActivate}>
              ✅ Activate Attendance
            </Button>{" "}
            <Button variant="danger" onClick={handleDeactivate}>
              ⛔ Deactivate
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
