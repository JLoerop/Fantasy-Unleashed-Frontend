import React, {useState, useEffect} from "react";
import { Slider, Typography } from "@mui/material";
import {
    Card,
    Row,
    Col,
    Button,
    Form
  } from "react-bootstrap";
import { CardBody } from 'reactstrap';
import {useLocation, useHistory} from "react-router-dom";

const EditLeagueSettings = () =>{

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const [league, setLeague] = useState([]);

  const queryParams = new URLSearchParams(location.search);

  const encodedLeagueId = queryParams.get("leagueId");

  //upon load calls the get league
  useEffect(() => {
          getLeague();
      }, []);

      // once the league loads assign the values 
      useEffect(() => {
        assignValues();
      }, [league]);

      // calls backend to get the league by id
      const getLeague = () => {
        fetch(`http://localhost:8080/api/getleague?leagueId=${encodedLeagueId}`)
        .then((res) => res.json())
        .then((data) => {
          setLeague(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
    }

    // assigns the existing values to the sliders to be able to load the existing settings to edit
    const assignValues = () => {
      setValue1(league?.settings?.qbTackleValue);
      setValue2(league?.settings?.kickReturnValue);
      setValue3(league?.settings?.nonQbThrowTdValue);
      setValue4(league?.settings?.qbReceivingTdValue);
    }

    // calls backend when the form is submitted to edit the settings of the league
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
              leagueId: encodedLeagueId,
              qbTackleValue: value1,
              kickReturnValue: value2,
              nonQbThrowTdValue: value3,
              qbReceivingTdValue: value4,
            }
            fetch(`http://localhost:8080/api/editleague`, {
              method: 'PUT',
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
                const encodedLeagueId = encodeURIComponent(data.leagueId);
                history.push(`/admin/leaguepage?leagueId=${encodedLeagueId}`)
            })
            .catch((error) => {
                console.error('Error fetching data ', error)
            })
      };

    return(
        <>
        <Row className="justify-content-center">
              <Col md="6">
        <Card className="card-stats">
                <Card.Header className="d-flex flex-column align-items-center text-center">
                    <Card.Title as="h4">Set League Settings</Card.Title>
                    <br></br>
                    <Card.Subtitle as="h5">To Keep a Custom Rule Disabled Leave at 0</Card.Subtitle>
                    </Card.Header>
                    <CardBody className="d-flex flex-column align-items-center text-center">
                    <Form className="w-50" onSubmit={handleSubmit}>
                  <Form.Label as="h5">Points for QB Tackle</Form.Label>
                  <Slider
        value={value1}
        onChange={(e, newValue) => setValue1(newValue)}
        aria-label="QB Tackle Points"
        valueLabelDisplay="off"
      />
      <Typography align="center" sx={{ mt: 1 }}>
        {value1} Points
      </Typography>
                  <Form.Label as="h5">Points for a Kick Return TD</Form.Label>
                  <Slider
        value={value2}
        onChange={(e, newValue) => setValue2(newValue)}
        aria-label="QB Tackle Points"
        valueLabelDisplay="off"
      />
      <Typography align="center" sx={{ mt: 1 }}>
        {value2} Points
      </Typography>
                  <Form.Label as="h5">Points for a Non QB Throwing TD</Form.Label>
                  <Slider
        value={value3}
        onChange={(e, newValue) => setValue3(newValue)}
        aria-label="QB Tackle Points"
        valueLabelDisplay="off"
      />
      <Typography align="center" sx={{ mt: 1 }}>
        {value3} Points
      </Typography>
                  <Form.Label as="h5">Points for a QB Receiving TD</Form.Label>
                  <Slider
        value={value4}
        onChange={(e, newValue) => setValue4(newValue)}
        aria-label="QB Tackle Points"
        valueLabelDisplay="off"
      />
      <Typography align="center" sx={{ mt: 1 }}>
        {value4} Points
      </Typography>
      <Button type="submit" variant="dark">
                      Save Edits
                    </Button>
                  </Form>
                  </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </>
    );
}
export default EditLeagueSettings;