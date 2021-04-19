import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import QRscan from "../components/QRScanner";

export default function ScanQr(...props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  if (currentUser === null) {
    window.location.href = "/login";
  }

  if (userInfo === "") {
    setUserInfo(props[0].location.state);
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
            <p>
              Hello <b>{userInfo.name}</b>,
            </p>
            <div className="row">
              <div className="mx-auto my-2">
                <QRscan />
              </div>
            </div>
            <div className="text-center">
              <p>
                Head over to the activations on our stand and scan this QR code
                to interact.
              </p>
            </div>
            <Link
              to={{
                pathname: "/",
                state: userInfo,
              }}
              className="btn btn-primary w-100 mt-3"
            >
              Go To Dashboard
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
