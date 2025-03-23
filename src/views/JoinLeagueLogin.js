import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Button,
    Form
  } from "react-bootstrap";
import { CardBody } from 'reactstrap';
import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom";

const JoinLeagueLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const leagueId = queryParams.get("leagueId");


    // handles the submission of the login form and calls the backend to login the user
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/login?email=${email}&password=${password}`)
    .then((res) => res.json())
    .then((data) => {
        Cookies.set('isAuthorized', true, {expires: 7});
        Cookies.set('email', data.email, {expires: 7});
        Cookies.set('id', data.userId, {expires: 7});

        joinLeague();       
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
        setLoginError(true);
    })
  };

  // after logging in the user then it calls the backend to add the user to the league
  const joinLeague = () => {
                fetch(`http://localhost:8080/api/joinleague?leagueId=${leagueId}&email=${email}&password=${password}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                .then((res) => {
                  if (!res.ok) {
                    return res.text().then((errorMessage) => { throw new Error(errorMessage); });
                  }
                  return res.json();
                })
                .then((data) => {
                    history.push(`/admin/leaguepage?leagueId=${leagueId}`)
                })
                .catch((error) => {
                    console.error('Error fetching data ', error)
                    setError(true);
                })
  }

  return (
    <Row className="justify-content-center">
          <Col md="6">
    <Card className="card-stats">
            <Card.Header className="d-flex flex-column align-items-center text-center">
                <Card.Title as="h4">Welcome Back!</Card.Title>
                {loginError && <p className="text-danger mt-2">Password or Email are Incorrect</p>}
              </Card.Header>
              <CardBody className="d-flex flex-column align-items-center text-center">
              <Form onSubmit={handleSubmit} className="w-50">
              <Form.Group className="mb-3">
  <Form.Label>Email:</Form.Label>
  <Form.Control
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Password:</Form.Label>
  <Form.Control
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
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
                    Login
                  </Button>
                  </div>
                  </Form>
        <br></br>
        <p className="register-link">
          Don't have an account? <a href="/admin/register">Register Here</a>
        </p>
        </CardBody>
    </Card>
    </Col>
    </Row>
  );
};

export default JoinLeagueLogin;