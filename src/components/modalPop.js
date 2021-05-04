import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import JsonData from "../data/data.json";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Confetti from "react-confetti";

// export const modalPop = (props) => {
function Example(props) {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const [datas, setData] = useState(false);

  const handleShow = () => setShow(true);
  function handleClose() {
    var c = datas.dbData;
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        [c]: 1,
      });
    console.log("added link to db");
    setShow(false);
  }

  useEffect(() => {
    if (props.data !== "") {
      setData(JsonData[props.data]);
    }
  }, [props]);

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
        <Confetti
          width={500}
          height={450}
          numberOfPieces={600}
          recycle={false}
          gravity={0.1}
        />
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {datas.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{datas.paragraph}</Modal.Body>
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
// };
export default Example;
