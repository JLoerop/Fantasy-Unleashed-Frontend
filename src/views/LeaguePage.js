import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import {useLocation, useHistory} from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import Cookies from "js-cookie";

const LeaguePage = () => {

    const [league, setLeague] = useState([]);
    const [leagueMatches, setLeagueMatches] = useState([]);
    const [team, setTeam] = useState([]);
    const [commissioner, setCommissioner] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leagueId = queryParams.get("leagueId");
    const history = useHistory();
    

    // upon load and league id changes get the league by id and get if the user is the commissioner
    useEffect(() => {
        getLeague();
        getIsCommissioner();
        getTeam();
        getIsFull();
        getMatchesByLeague();
    }, [leagueId]);

    // when the create team button is pressed set the league id to the url and send the user there
    const createTeam = () => {
      const encodedLeagueId = encodeURIComponent(leagueId);
      history.push(`/admin/createteam?leagueId=${encodedLeagueId}`)
    }

    // calls the backend to verify if the league is full
    const getIsFull = () => {
        fetch(`http://localhost:8080/api/validateleaguesize?leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setIsFull(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    // calls the backend to get the league information
    const getLeague = () => {
        fetch(`http://localhost:8080/api/getleague?leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setLeague(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    // calls the backend to get the matches 
    const getMatchesByLeague = () => {
      fetch(`http://localhost:8080/api/getmatchesbyleagueid?leagueId=${leagueId}`)
      .then((res) => res.json())
      .then((data) => {
        setLeagueMatches(data);
      })
      .catch((error) => {
          console.error('Error fetching data ', error)
      })
  }

    // calls the backend to get the team the user has
    const getTeam = () => {
      const userId = Cookies.get('id');
      fetch(`http://localhost:8080/api/getteam?leagueId=${leagueId}&userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
      })
      .catch((error) => {
          setTeam([]);
          console.error('Error fetching data ', error)
      })
  }

    // calls the backend to see if the user is the commissioner of the league so that only the settings are shown to the commissioner
    const getIsCommissioner = () => {
        const userId = Cookies.get('id');
        fetch(`http://localhost:8080/api/isusercommissioner?userId=${userId}&leagueId=${leagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setCommissioner(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    // when the create lineups button is pressed it sets the league id to the url and sends the user to the create lineup page
    const createLineups = () => {
      const encodedLeagueId = encodeURIComponent(leagueId);
      history.push(`/admin/createlineups?leagueId=${encodedLeagueId}`)
    }

    // when the settings wheel is clicked bring the user to the edit settings page
    const goToSettings = () => {
      const encodedLeagueId = encodeURIComponent(leagueId);
      history.push(`/admin/editleaguesettings?leagueId=${encodedLeagueId}`)
    }

    // sets the url to have the match id and sends the user to the match page
    const viewMatchPage = (matchId) => {
      const encodedMatchId = encodeURIComponent(matchId);
      history.push(`/admin/matchpage?matchId=${encodedMatchId}`)
  }

    // dynamic user match cards to be able to display all of the matches that are happening around the league by mapping each match to the card
    // and filling the data dynamically
    const userMatches = leagueMatches.length > 0 ? leagueMatches.filter((match) => match !== null && match !== undefined).map((match) => (
        <Col lg="3" sm="6" key={match.matchId}>
      <Card className="card-stats" style={{ height: '140px' }}>
        <CardHeader>
          <h7>Week {match.week}</h7>
        </CardHeader>
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="5">
              <div className="text-center">
                <h6>{match.homeTeam.teamName}</h6>
                <p style={{ fontSize: '0.8rem' }}>Score: {match.homeScore}</p>
              </div>
            </Col>
            <Col xs="2" className="text-center">
              <div>
                <h6>VS</h6>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => viewMatchPage(match.matchId)}
                  style={{ fontSize: '0.7rem', padding: '2px 6px' }}
                >
                  View
                </Button>
              </div>
            </Col>
            <Col xs="5">
              <div className="text-center">
                <h6>{match.awayTeam.teamName}</h6>
                <p style={{ fontSize: '0.8rem' }}>Score: {match.awayScore}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  ))
  : null;

    return(
    <Container fluid>
        <Row>
          <Col md="4">
            <Card style={{height: "300px"}}>
                <Card.Title as="h4">Your Team</Card.Title>
                <br></br>
                {team && team.teamName ? (
                <div>{team.teamName}</div>) : (
                <Button variant="dark" onClick={() => createTeam()}>
                Create
                </Button>
                )}
            </Card>
          </Col>
          <Col md="8">
            <Card style={{height: "300px"}}>
              <Card.Header>
                <Card.Title as="h4" className="d-flex justify-content-between align-items-center">
                    {league.leagueName} 
                    {commissioner && (
                    <div className="font-icon-detail ml-auto" onClick={goToSettings} style={{ cursor: "pointer" }}>
                    <i className="nc-icon nc-settings-gear-64"></i>
                    </div>
                    )}
                    </Card.Title>
              </Card.Header>
              <Card.Body>
                <h5>Join League Link: http://localhost:3000/admin/joinleague?leagueId={leagueId}</h5>
                {isFull && commissioner && (<Button variant="dark" onClick={() => createLineups()}>
                Set Lineups
                </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {userMatches}
        </Row>
    </Container>
    );
};
export default LeaguePage;