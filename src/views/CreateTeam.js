import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Button,
    Form
  } from "react-bootstrap";
import { CardBody } from 'reactstrap';
import {useLocation} from "react-router-dom";
import Cookies from 'js-cookie';
import { post } from 'jquery';

const CreateTeam = () => {
  const [team, setTeam] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leagueId = queryParams.get("leagueId");

    // handles the submission of the login form and calls the backend to login the user
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Cookies.get('id');
    fetch(`http://localhost:8080/api/createteam?leagueId=${leagueId}&teamName=${team}&userId=${userId}`,{
      method: 'POST',
    })
    .then((res) => res.json())
    .then((data) => {
        window.location.href = "/admin/dashboard";
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
    })
  };

  return (
    <Row className="justify-content-center">
          <Col md="6">
    <Card className="card-stats">
            <Card.Header className="d-flex flex-column align-items-center text-center">
                <Card.Title as="h4">Create Your Team!</Card.Title>
              </Card.Header>
              <CardBody className="d-flex flex-column align-items-center text-center">
              <Form onSubmit={handleSubmit} className="w-50">
              <Form.Group className="mb-3">
  <Form.Label>Team Name:</Form.Label>
  <Form.Control
    type="username"
    value={team}
    onChange={(e) => setTeam(e.target.value)}
    required
  />
</Form.Group>
          <br></br>
          <div className="d-flex justify-content-center">
          <Button
                    className="btn-fill pull-right d-flex align-items-center justify-content-center"
                    type="submit"
                    variant="info"
                    style={{height: "30px"}}
                  >
                    Create Team
                  </Button>
                  </div>
                  </Form>
        </CardBody>
        <br></br>
    </Card>
    </Col>
    </Row>
  );
};

export default CreateTeam;