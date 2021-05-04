import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Example from "./modalPop";

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
    }, 10000);
    return () => {
      if (qrscan !== "") {
        // db.collection("users").doc(currentUser.uid).update({
        //   link: qrscan,
        // });
        // console.log("added link to db");

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
        style={{ visibility: qrscan ? "visible" : "hidden" }}
      >
        <Example data={qrscan} />
      </div>
    </>
  );
}

export default QRscanner;
