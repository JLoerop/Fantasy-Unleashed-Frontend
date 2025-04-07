import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import RostersModal from "./RostersModal";

const TeamModal = ({ show, onClose, teams, player}) => {
    const [showRostersModal, setShowRostersModal] = useState(false);
    const [roster, setRoster] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(0)
    const [teamId, setTeamId] = useState(0);

    const viewRoster = (selectedRoster, playerId, teamId) => {
        setRoster(selectedRoster);
        setSelectedPlayer(playerId);
        setTeamId(teamId);
        setShowRostersModal(true);
      };
  return (
    <>
    <Modal show={show} onHide={onClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th>Select</th>
              <th>Team Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.teamId}>
                <td><Button variant="dark"onClick={() => viewRoster(team.rosters, player, team.teamId)}>Place</Button></td>
                <td>{team.teamName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <RostersModal
        show={showRostersModal}
        onClose={() => setShowRostersModal(false)}
        roster={roster}
        selectedPlayer={selectedPlayer}
        teamId={teamId}
      />
    </>
  );
};

export default TeamModal;