import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import QRCode from "qrcode.react";
import qrcode from "qrcode.react";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div
        className="text-center"
        style={{ display: currentUser.emailVerified ? "none" : "block" }}
      >
        <h2>
          <b>Verify your email address</b>
        </h2>
        <p>
          We've sent an email to <b>{currentUser.email}</b> to verify. Please
          click the link in the email and then click continue below.
          <button
            className="btn btn-primary w-50 mt-3"
            onClick={() => window.location.reload()}
          >
            Continue
          </button>
        </p>
        <button className="btn btn-primary w-50" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div style={{ display: currentUser.emailVerified ? "block" : "none" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
 
            <div className="row">
              <div className="mx-auto HpQrcode">
                <QRCode
                  value={currentUser.uid}
                  includeMargin
                  size="300"
                  renderAs="svg"
                />
              </div>
            </div>
            <div className="text-center">
              <p>
                Head over to the activations on our stand and scan this QR code
                to interact.
              </p>
            </div>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
            <button className="btn btn-primary w-100 mt-2" onClick={handleLogout}>
              Log Out
            </button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
