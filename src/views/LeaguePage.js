import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {useLocation, useHistory} from "react-router-dom";
import { CardHeader } from "reactstrap";
import Cookies from "js-cookie";

const LeaguePage = () => {

    const [league, setLeague] = useState([]);
    const [commissioner, setCommissioner] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leagueId = queryParams.get("leagueId");
    const history = useHistory();
    

    // upon load and league id changes get the league by id and get if the user is the commissioner
    useEffect(() => {
        getLeague();
        getIsCommissioner();
    }, [leagueId]);

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

    // when the settings wheel is clicked bring the user to the edit settings page
    const goToSettings = () => {
      const encodedLeagueId = encodeURIComponent(leagueId);
      history.push(`/admin/editleaguesettings?leagueId=${encodedLeagueId}`)
    }

    return(
    <Container fluid>
        <Row>
          <Col md="4">
            <Card style={{height: "300px"}}>
                <Card.Title as="h4">Your Team Goes Here</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
    );
};
export default LeaguePage;