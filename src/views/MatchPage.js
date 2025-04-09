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

const MatchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const matchId = queryParams.get("matchId");
    const [match, setMatch] = useState({});
    const [homeScores, setHomeScores] = useState([]);
    const [awayScores, setAwayScores] = useState([]);


    useEffect(() => {
        getMatch();
    }, [matchId]);

    const getMatch = () => {
        fetch(`http://localhost:8080/api/getmatchbyid?matchId=${matchId}`)
        .then((res) => res.json())
        .then((data) => {
          setMatch(data);
          getPlayerScoresHome(data.homeTeam.teamId);
          getPlayerScoresAway(data.awayTeam.teamId);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    const getPlayerScoresHome = (teamId) => {
        fetch(`http://localhost:8080/api/getplayerscores?teamId=${teamId}`)
        .then((res) => res.json())
        .then((data) => {
          setHomeScores(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
        }

        const getPlayerScoresAway = (teamId) => {
            fetch(`http://localhost:8080/api/getplayerscores?teamId=${teamId}`)
            .then((res) => res.json())
            .then((data) => {
              setAwayScores(data);
            })
            .catch((error) => {
                console.error('Error fetching data ', error)
            })
            }

    const homeTable = match?.homeTeam?.rosters ? Object.entries(match.homeTeam.rosters).filter(([position]) => position !== 'rosterId').map(([position, player], index) => {
        const playerScore = homeScores.find(score => score && score.player && score.player.playerId === player.playerId);
        const fantasyPoints = playerScore ? playerScore.fantasyPoints : 0;
        return (
            <tr key={index}>
                <td className="text-left">{position.toUpperCase()}</td>
                <td className="text-left">{player.name}</td>
                <td className="text-left">{player.position}</td>
                <td className="text-left">{player.team}</td>
                <td className="text-left">{fantasyPoints}</td>
            </tr>
        );
    }) : null;

    const awayTable = match?.awayTeam?.rosters ? Object.entries(match.awayTeam.rosters).filter(([position]) => position !== 'rosterId').map(([position, player], index) => {
        const playerScore = awayScores.find(score => score && score.player && score.player.playerId === player.playerId);
        const fantasyPoints = playerScore ? playerScore.fantasyPoints : 0;
        return (
            <tr key={index}>
                <td className="text-left">{position.toUpperCase()}</td>
                <td className="text-left">{player.name}</td>
                <td className="text-left">{player.position}</td>
                <td className="text-left">{player.team}</td>
                <td className="text-left">{fantasyPoints}</td>
            </tr>
        );
    }) : null;

    

    return(
        <>
        <Container fluid>
        <Row>
          <Col md="6">
            <Card className="striped-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h3" className="text-center">Home Team</Card.Title>
                {match && match.homeTeam && match.awayTeam ? (
                    <div className="text-center">
                    <h4>Score: {match.homeScore}</h4>
                    </div>
                    ) : (
                    <Col>
                    <p>Loading match</p>
                    </Col>
                    )}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                        <th className="border-0">Current Position</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Position</th>
                        <th className="border-0">Team</th>
                        <th className="border-0">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                   {homeTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="striped-tabled-with-hover">
              <Card.Header>
              <Card.Title as="h3" className="text-center">Away Team</Card.Title>
                {match && match.homeTeam && match.awayTeam ? (
                    <div className="text-center">
                    <h4>Score: {match.awayScore}</h4>
                    </div>
                    ) : (
                    <Col>
                    <p>Loading match</p>
                    </Col>
                    )}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                        <th className="border-0">Current Position</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Position</th>
                        <th className="border-0">Team</th>
                        <th className="border-0">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                   {awayTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
        </>
    );
};
export default MatchPage;