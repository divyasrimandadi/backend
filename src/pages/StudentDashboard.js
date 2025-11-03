import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { markAttendance } from "../api/api";
import AppNavbar from "../components/Navbar";

export default function StudentDashboard() {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => alert("Location permission denied.")
    );
  };

  const handleAttendance = async () => {
    const storedBio = "abcd1234"; // simulated stored biometric
    const res = await markAttendance({
      lat: location.lat,
      lng: location.lng,
      live_biometric: bio,
      stored_biometric: storedBio,
    });
    setMessage(res.data.message || res.data.reason);
  };

  return (
    <>
      <AppNavbar onLogout={() => localStorage.clear()} />
      <Container className="mt-4">
        <Card className="p-4 shadow-lg border-0">
          <h3>Student Dashboard 🎓</h3>
          <p>Mark attendance within active geofence</p>

          {message && <Alert variant="info">{message}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Biometric Scan (simulation)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter fingerprint code"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control value={location.lat} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control value={location.lng} readOnly />
            </Form.Group>

            <Button variant="secondary" onClick={getLocation}>
              📍 Get Location
            </Button>{" "}
            <Button variant="success" onClick={handleAttendance}>
              ✅ Mark Attendance
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
