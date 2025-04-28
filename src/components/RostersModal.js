import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const RostersModal = ({ show, onClose, roster, selectedPlayer, teamId}) => {
  // when the player that is selected it placed it creates the json body for the request and calls the backend to save it and finally closes
  // and refreshes the page to show the effect
  const placePlayer = () => {
    const data = {
      playerId: selectedPlayer,
      teamId: teamId,
    }
    fetch(`http://localhost:8080/api/placeplayer`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((errorMessage) => { throw new Error(errorMessage); });
          }
          return res.json();
        })
        .then((data) => {
            onClose();
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
  }
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Place Player?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
          {Object.entries(roster).filter(([position]) => position !== 'rosterId').map(([position, player], index) => (
              <tr key={index}>
                <td>{position.toUpperCase()}</td>
                <td>{player ? player.name : "Empty"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={placePlayer}>
          Place
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RostersModal;