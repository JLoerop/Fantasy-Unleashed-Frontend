import React, { useEffect, useState } from "react";
import {ToggleButtonGroup, ToggleButton} from 'react-aria-components';
import {
    Card,
    Row,
    Col,
    Button,
    Form,
    Table,
    Container,
  } from "react-bootstrap";
import { CardBody } from 'reactstrap';
import {useLocation, useHistory} from "react-router-dom";
import TeamModal from "components/TeamModal";

const CreateLineups = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leagueId = queryParams.get("leagueId");
    const [players, setPlayers] = useState([]);
    const [placedPlayers, setPlacedPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTerm2, setSearchTerm2] = useState("");
    const [teams, setTeams] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(0);
    const [showTeamModal, setShowTeamModal] = useState(false);


    useEffect(() => {
        getPlayers();
        getPlacedPlayers();
    }, [leagueId]);

    const getPlayers = () => {
        fetch(`http://localhost:8080/api/getplayerlist?leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setPlayers(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    const getTeams = () => {
        fetch(`http://localhost:8080/api/getteamsinleague?leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setTeams(data);
          setShowTeamModal(true);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    const getPlacedPlayers = () => {
        fetch(`http://localhost:8080/api/getplayersplaced?leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setPlacedPlayers(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredPlacedPlayers = placedPlayers.filter(player =>
        player.name.toLowerCase().includes(searchTerm2.toLowerCase())
      );

    const playersTable = filteredPlayers.map((player, index) => {
        return <tr key={index}>
            <td className="text-left">
                <Button variant="dark"onClick={() => {setSelectedPlayer(player.playerId); getTeams();}}>Place</Button>
            </td>
            <td className="text-left">{player.name}</td>
            <td className="text-left">{player.position}</td>
            <td className="text-left">{player.team}</td>
        </tr>
    })

    const playersPlacedTable = filteredPlacedPlayers.map((player, index) => {
        return <tr key={index}>
            <td className="text-left">
                <Button variant="dark"onClick={() => {setSelectedPlayer(player.playerId); getTeams();}}>Place</Button>
            </td>
            <td className="text-left">{player.name}</td>
            <td className="text-left">{player.position}</td>
            <td className="text-left">{player.team}</td>
        </tr>
    })

    return(
        <>
        <Container fluid>
        <Row>
          <Col md="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Players</Card.Title>
                <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Select</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Position</th>
                      <th className="border-0">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                   {playersTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Placed Players</Card.Title>
                <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm2}
                onChange={(e) => setSearchTerm2(e.target.value)}
                />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Select</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Position</th>
                      <th className="border-0">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                   {playersPlacedTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
          <TeamModal
            show={showTeamModal}
            onClose={() => setShowTeamModal(false)}
            teams={teams}
            player={selectedPlayer}
            />
        </>
    );
};
export default CreateLineups;