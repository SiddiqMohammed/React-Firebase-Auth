import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        You found a QR!
        <br /> Click to learn more and redeem points{" "}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            QR DISCOVERED!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you've caught a QR in the wind! You can collect points by
          clicking on the button below. Make sure to visit{" "}
          0<a href="http://thehanginghouse.com">The hanging house</a> website for
          more info.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Redeem points
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function QRscanner() {
  const { currentUser } = useAuth();
  const [qrscan, setQrscan] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
      console.log(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setQrscan("");
      console.log("Clear Log");
    }, 15000);
    return () => {
      if (qrscan !== "") {
        db.collection("users").doc(currentUser.uid).update({
          link: qrscan,
        });
        console.log("added link to db");

        clearTimeout(timer1);
      }
    };
  }, [qrscan, currentUser]);

  return (
    <>
      <div style={{ marginTop: 0 }}>
        <QrScan
          delay={500}
          onError={handleError}
          onScan={handleScan}
          showViewFinder={false}
          style={{ width: 300, height: 300 }}
        />
      </div>
      <div
        className="text-center my-3"
        // style={{ visibility: qrscan ? "visible" : "hidden" }}
      >
        <Example></Example>
      </div>
    </>
  );
}

export default QRscanner;
