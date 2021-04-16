import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import QRCode from "qrcode.react";
import { db } from "../firebase";

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

  const [username, setUsername] = useState("");
  db.collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      setUsername(doc.data().name);
    });

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
          <br />
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
            <h2 className="text-center mb-3">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* <strong>Email:</strong> {currentUser.email} */}
            <p>
              Hello <b>{username}</b>,
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="row">
              <div className="mx-auto">
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
            <Link to="/Scan-Qr" className="btn btn-primary w-100 mt-3">
              Scan QR
            </Link>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-2">
              Update Profile
            </Link>
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
