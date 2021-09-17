import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import {NavLink} from "react-router-dom";



function Header(props) {
    return (
        <header className="pb-5">
            <Navbar
                fixed="top"
                className="mb-4 py-4 bgnav-gradient col-lg-12 col-md-12 col-sm-12"
                expand="lg"
            >
                <Container>
                <Navbar.Toggle
                    className="mb-3  "
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {/* Logo */}
                    <Navbar.Brand
                        className="px-2 bg-light logo-paris-event"
                        href="/"
                    >
                        CANTINA
                    </Navbar.Brand>
                    <NavLink
                        className="navbar text-decoration-none mx-lg-5 "
                        exact
                        to="/"
                        activeClassName="selected"
                    >
                        Accueil
                    </NavLink>
                    <NavLink
                        className="navbar text-decoration-none mx-lg-5"
                        exact
                        to="/ajouter-recette"
                        activeClassName="selected"
                    >
                        Ajouter une recette
                    </NavLink>
                    <NavLink
                        className="navbar text-decoration-none "
                        exact
                        to="/modifier-recette"
                        activeClassName="selected"
                    >
                        Modifier une recette 
                    </NavLink>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;