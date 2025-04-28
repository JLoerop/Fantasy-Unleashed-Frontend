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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

    // handles the submission of the login form and calls the backend to login the user
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/login?email=${email}&password=${password}`)
    .then((res) => {
      if (!res.ok) {
        setLoginError(true);
        throw new Error('Login failed');
      }
      return res.json();
    })
    .then((data) => {
        console.log(data);
        Cookies.set('isAuthorized', true, {expires: 7});
        Cookies.set('email', data.email, {expires: 7});
        Cookies.set('id', data.userId, {expires: 7});

        window.location.href = "/admin/dashboard";
    })
    .catch((error) => {
        console.error('Error fetching data ', error)
        setLoginError(true);
    })
  };

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

export default Login;