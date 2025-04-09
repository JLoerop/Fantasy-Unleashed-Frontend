import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
} from "react-bootstrap";
import {useLocation, useHistory} from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import Cookies from "js-cookie";

const TeamPage = () => {

    const [team, setTeam] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const teamId = queryParams.get("teamId");
    const [match, setMatch] = useState([]);
    const [scores, setScores] = useState([]);
    const history = useHistory();
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    

    // upon load and team id get team and matchup
    useEffect(() => {
        getTeam();
        getMatch();
        getPlayerScores();
    }, [teamId]);

    const getTeam = () => {
      fetch(`http://localhost:8080/api/getteambyteamid?teamId=${teamId}`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
      })
      .catch((error) => {
          console.error('Error fetching data ', error)
      })
  }

  const getMatch = () => {
    fetch(`http://localhost:8080/api/getmatch?teamId=${teamId}&week=${17}`)
    .then((res) => res.json())
    .then((data) => {
      setMatch(data);
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
    })
}

    const getPlayerScores = () => {
    fetch(`http://localhost:8080/api/getplayerscores?teamId=${teamId}`)
    .then((res) => res.json())
    .then((data) => {
      setScores(data);
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
    })
    }

const moveSelectedPlayer = (playerId) => {
    if (selectedPlayerId === null) {
        setSelectedPlayerId(playerId);
      } else {
        const body = {
          rosterId: team.rosters.rosterId,
          playerId: selectedPlayerId,
          playerId2: playerId
        };
    
        fetch("http://localhost:8080/api/changeposition", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        .then((res) => {
            if (!res.ok) {
              return res.text().then((errorMessage) => { throw new Error(errorMessage); });
            }
            return res.json();
          })
          .then((data) => {
              setSelectedPlayerId(null);
              window.location.reload();
          })
          .catch((error) => {
              console.error('Error fetching data ', error)
              setSelectedPlayerId(null);
          })
      }
}

    const viewMatchPage = (matchId) => {
        const encodedMatchId = encodeURIComponent(matchId);
        history.push(`/admin/matchpage?matchId=${encodedMatchId}`)
    }

const playersTable = team.rosters ? Object.entries(team.rosters).filter(([position]) => position !== 'rosterId').map(([position, player], index) => {
    const playerScore = scores.find(score => score && score.player && score.player.playerId === player.playerId);
    const fantasyPoints = playerScore ? playerScore.fantasyPoints : 0;
    return (
        <tr key={index}>
            <td className="text-left">
                <Button variant="dark" onClick={() => { moveSelectedPlayer(player.playerId); }}>Move</Button>
            </td>
            <td className="text-left">{position.toUpperCase()}</td>
            <td className="text-left">{player.name}</td>
            <td className="text-left">{player.position}</td>
            <td className="text-left">{player.team}</td>
            <td className="text-left">{fantasyPoints}</td>
        </tr>
    );
}) : null;

    return(
    <Container fluid>
        <Row>
          <Col md="12">
            <Card style={{height: "200px"}}>
                <Card.Title as="h4">{team.teamName}</Card.Title>
                <Card.Body>
              <Row>
                {match && match.homeTeam && match.awayTeam ? (
                  <>
                  <Col xs="7">
                  </Col>
                    <Col xs="2">
                      <div className="text-center">
                        <h4>{match.homeTeam.teamName}</h4>
                        <h5>Score: {match.homeScore}</h5>
                      </div>
                    </Col>
                    <Col xs="1">
                    <div className="text-center">
                    <h4>VS</h4>
                    <Button variant="dark" onClick={() => { viewMatchPage(match.matchId); }}>View</Button>
                    </div>
                    </Col>
                    <Col xs="2">
                      <div className="text-center">
                        <h4>{match.awayTeam.teamName}</h4>
                        <h5>Score: {match.awayScore}</h5>
                      </div>
                    </Col>
                  </>
                ) : (
                  <Col>
                    <p>Loading match</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
                  <Col md="12">
                    <Card className="striped-tabled-with-hover">
                      <Card.Header>
                        <Card.Title as="h4">Roster</Card.Title>
                      </Card.Header>
                      <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                          <thead>
                            <tr>
                              <th className="border-0">Move</th>
                              <th className="border-0">Current Position</th>
                              <th className="border-0">Name</th>
                              <th className="border-0">Position</th>
                              <th className="border-0">Team</th>
                              <th className="border-0">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                           {playersTable}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                  </Row>
    </Container>
    );
};
export default TeamPage;