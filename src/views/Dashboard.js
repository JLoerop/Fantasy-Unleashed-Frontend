import React from "react";
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

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{height: '140px'}}>
              <CardHeader>
                <h7>Team Name</h7>
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
                      <Card.Title as="h4">143.50</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
          <Card className="card-stats" style={{height: '140px'}}>
              <CardHeader>
                <h7>Team Name</h7>
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
                      <Card.Title as="h4">137.50</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
          <Card className="card-stats" style={{height: '140px'}}>
              <CardHeader>
                <h7>Team Name</h7>
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
                      <Card.Title as="h4">121.30</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
          <Card className="card-stats" style={{height: '140px'}}>
              <CardHeader>
                <h7>Team Name</h7>
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
                      <Card.Title as="h4">159.50</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
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
                <Card.Title as="h4">Create a League</Card.Title>
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
