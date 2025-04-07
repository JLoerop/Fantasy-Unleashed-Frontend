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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // for handling the submission of the form to register contains handling for an error in registering
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    }
    fetch(`http://localhost:8080/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((errorMessage) => { throw new Error(errorMessage); });
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
        setError(true);
    })
  };

  return (
    <Row className="justify-content-center">
          <Col md="6">
    <Card className="card-stats">
            <Card.Header className="d-flex flex-column align-items-center text-center">
                <Card.Title as="h4">Welcome!</Card.Title>
                {error && <p className="text-danger mt-2">Username or Email is a Duplicate</p>}
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
  <Form.Label>Username:</Form.Label>
  <Form.Control
    type="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>First Name:</Form.Label>
  <Form.Control
    type="firstName"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Last Name:</Form.Label>
  <Form.Control
    type="lastName"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Password:</Form.Label>
  <Form.Control
    type="password"
    value={password}
    onChange={(e) => {setPassword(e.target.value); setPasswordError(e.target.value.length < 8);}}
    required
  />
  {passwordError && (
    <p className="text-danger mt-2">Password must be at least 8 characters long.</p>
  )}
</Form.Group>
          <br></br>
          <div className="d-flex justify-content-center">
          <Button
                    className="btn-fill pull-right d-flex align-items-center justify-content-center"
                    type="submit"
                    variant="info"
                    style={{height: "30px"}}
                  >
                    Register
                  </Button>
                  </div>
                  </Form>
                  <br></br>
        </CardBody>
    </Card>
    </Col>
    </Row>
  );
};

export default Register;