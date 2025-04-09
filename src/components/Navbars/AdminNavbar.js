import React, { Component, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";
import Cookies from "js-cookie";

function Header() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const location = useLocation();
  const isAuthorized = Cookies.get('isAuthorized');
  const history = useHistory();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  // upon load call get leagues
  useEffect(() => {
    getLeagues();
    getTeams();
}, []);
  
// get the leagues to be able to load into the navbar for selection
  const getLeagues = () => {
    const userId = Cookies.get('id')
    fetch(`http://localhost:8080/api/getleaguesforuser?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setLeagues(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
  };

  // get the teams to be able to load into the navbar for selection
  const getTeams = () => {
    const userId = Cookies.get('id')
    fetch(`http://localhost:8080/api/getteamsforuser?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setTeams(data);
        })
        .catch((error) => {
            console.error('Error fetching data ', error)
        })
  };

  const goToLeaguePage = (leagueId) => {
    const encodedLeagueId = encodeURIComponent(leagueId);
    history.push(`/admin/leaguepage?leagueId=${encodedLeagueId}`)
  }

  const goToTeamPage = (teamId) => {
    const encodedTeamId = encodeURIComponent(teamId);
    history.push(`/admin/teampage?teamId=${encodedTeamId}`)
  }

  // removes the cookies to log out the user
  const handleLogOut = () => {
    Cookies.remove('email');
    Cookies.remove('isAuthorized');
    Cookies.remove('id');
    window.location.href = "/admin/dashboard";
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="mr-2"
          >
           Fantasy Unleashed
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={() => (isAuthorized ? window.location.href = "/admin/createleague" : (window.location.href = "/admin/login"))}
              >
                <span className="no-icon">Start A League</span>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Leagues</span>
              </Dropdown.Toggle>
              {leagues.length > 0 && (
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
              {leagues.map((league) => (
              <Dropdown.Item
              key={league.leagueId}
              onClick={() => goToLeaguePage(league.leagueId)}
              value={league.leagueId}
              >
          {league.leagueName}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
)}
            </Dropdown>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Teams</span>
                </Dropdown.Toggle>
              {teams.length > 0 && (
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
              {teams.map((team) => (
              <Dropdown.Item
              key={team.teamId}
              onClick={() => goToTeamPage(team.teamId)}
              value={team.teamId}
              >
          {team.teamName}
      </Dropdown.Item>
    ))}
              </Dropdown.Menu>
              )}
            </Dropdown>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={() => (isAuthorized ? handleLogOut() : (window.location.href = "/admin/login"))}
              >
                <span className="no-icon">{isAuthorized ? 'Log Out' : 'Log In'}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
