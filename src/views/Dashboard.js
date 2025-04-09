import React, {useState, useEffect} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CardHeader } from "reactstrap";
import homePageCover from "images/homepagecover.PNG";
import Cookies from "js-cookie";



function Dashboard() {

const [teamScores, setTeamScores] = useState([]);

  const getTeamScores = () => {
    const userId = Cookies.get('id')
    fetch(`http://localhost:8080/api/getmatchesforuser?userId=${userId}&week=${17}`)
    .then((res) => res.json())
    .then((data) => {
      setTeamScores(data);
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
    })
}

useEffect(() => {
        getTeamScores();
    }, []);

    const userId = parseInt(Cookies.get('id'));

    const userTeamCards = Array.isArray(teamScores) && teamScores.length > 0
  ? teamScores
      .filter((match) => {
        return (
          match.homeTeam.leagueUser.user.userId === userId ||
          match.awayTeam.leagueUser.user.userId === userId
        );
      })
      .slice(0, 4)
      .map((match, index) => {
        const isHome = match.homeTeam.leagueUser.user.userId === userId;
        const team = isHome ? match.homeTeam : match.awayTeam;
        const score = isHome ? match.homeScore : match.awayScore;

        return (
          <Col lg="3" sm="6" key={index}>
            <Card className="card-stats" style={{ height: '140px' }}>
              <CardHeader>
                <h7>{team.teamName}</h7>
              </CardHeader>
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total</p>
                      <Card.Title as="h4">{score}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
      })
  : [
    <Col lg="3" sm="6">
    <Card className="card-stats" style={{ height: "140px" }}>
      <CardHeader>
        <h7>No Team Found</h7>
      </CardHeader>
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-alert-circle-i"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">Action Needed</p>
              <Card.Title as="h4">Log in or Create a Team!</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
    ];

  return (
    <>
      <Container fluid>
      <Row>
        {userTeamCards}
      </Row>
        <Row>
          <Col md="8">
            <Card>
                <img src={homePageCover} style={{height: "470px", width: "auto"}}/>
            </Card>
          </Col>
          <Col md="4">
            <Card style={{height: "470px"}}>
              <Card.Header>
                <Card.Title as="h5" style={{alignItems: "center"}}>Create a League Or Join A League To Get Started Today!</Card.Title>
              </Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
