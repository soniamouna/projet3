import React from "react";
import { useRef, useState } from "react";
import Recettes from "../Recettes/Recettes";
import { Form, Row, Col } from "react-bootstrap";

function RechercheBarre(props) {
  const handleForm = props.handleForm;


  return (
    <div className="container">
      <Form onChange={handleForm}>
        <Form.Group className="mb-3" controlId="titre">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" placeholder="titre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="niveau">
          <Form.Label>Sélectionnez le niveau</Form.Label>
          <Form.Select aria-label="padawan">
            <option value="padawan">padawan</option>
            <option value="jedi">jedi</option>
            <option value="maitre">maître</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="personnes">
        <Form.Label>Personnes</Form.Label>

        <Row> 
          <Col>
            <Form.Control type="number" controlId="personnes_min" placeholder="First name" />
          </Col>
          <Col>
            <Form.Control type="number" controlId="personnes_max" placeholder="Last name" />
          </Col>
        </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="temps_preparation">
        <Form.Label>Temps de préparation</Form.Label>

          <Form.Control type="number" placeholder="" />
          </Form.Group>

      </Form>
    </div>
  );
}

export default RechercheBarre;
