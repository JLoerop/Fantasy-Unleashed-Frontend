import React, { useState } from "react";
import {ToggleButtonGroup, ToggleButton} from 'react-aria-components';
import {
    Card,
    Row,
    Col,
    Button,
    Form
  } from "react-bootstrap";
import { CardBody } from 'reactstrap';
import { useHistory } from "react-router-dom";

const CreateLeague = () => {

const [leagueName, setLeagueName] = useState('');
const [teamSize, setTeamSize] = useState('');
const [nameLengthError, setNameLengthError] = useState(false);
const history = useHistory();

// upon submission of the form it passes the values to the next page through the url and onto the settings page
const handleSubmit = (e) => {
    e.preventDefault();

    const encodedLeagueName = encodeURIComponent(leagueName);
    const encodedTeamSize = encodeURIComponent(teamSize);

  history.push(`/admin/leaguesettings?leagueName=${encodedLeagueName}&teamSize=${encodedTeamSize}`);
  };


return(
    <>
    <Row className="justify-content-center">
          <Col md="6">
    <Card className="card-stats">
            <Card.Header className="d-flex flex-column align-items-center text-center">
                <Card.Title as="h4">Create a League</Card.Title>
                </Card.Header>
                <CardBody className="d-flex flex-column align-items-center text-center">
                <Form className="w-50" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
            <Form.Label>League Name</Form.Label>
            <Form.Control
            type="name"
            value={leagueName}
            onChange={(e) => {setLeagueName(e.target.value); setNameLengthError(e.target.value.length > 25)}}
            required
  />
  {nameLengthError && (
    <p className="text-danger mt-2">League Name Must be Less than 25 Characters</p>
  )}
</Form.Group>
<div className="mb-3">
                <Form.Label>Number of Teams</Form.Label>
                <ToggleButtonGroup selectionMode="single" aria-label="Select Team Size" className="d-flex justify-content-center gap-2">
  {[6, 8, 10, 12, 14, 16, 18].map((size) => (
    <ToggleButton
      key={size}
      value={size.toString()}
      onPress={() => {
        setTeamSize(size.toString());
      }}
      className={`btn ${teamSize === size.toString() ? "btn-primary" : "btn-outline-primary"}`}
    >
      {size}
    </ToggleButton>
  ))}
                </ToggleButtonGroup>
              </div>

              <Button type="submit" variant="dark" disabled={!leagueName || !teamSize || nameLengthError}>
                League Settings
              </Button>
</Form>
</CardBody>
                </Card>
                </Col>
                </Row>
                </>
);
}
export default CreateLeague;
