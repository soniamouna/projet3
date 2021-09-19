import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from '../../logo.jpeg'

function Header(props) {
  return (
    <header className=" fixed">
      <Navbar className="mt-5"
        fixed="top"
        className=" header  col-lg-12 col-md-12 col-sm-12"
        expand="lg"
      >
        <Container>
          <Navbar.Toggle className="mb-3 navbarToggle " aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Logo */}
              <Navbar  >
                <Container >
                  <Navbar.Brand className="logo" href="/">
                    <img 
                    height="60"
                      src={logo}
                      className="d-inline-block align-top"
                      alt="cantina-logo"
                    />CANTINA
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <NavLink
                className="navbar text-white mx-lg-5 "
                exact
                to="/"
                activeClassName="selected"
              >
                Accueil
              </NavLink>
              <NavLink
                className="navbar text-white mx-lg-5"
                exact
                to="/ajouter-recette"
                activeClassName="selected"
              >
                Ajouter une recette
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
