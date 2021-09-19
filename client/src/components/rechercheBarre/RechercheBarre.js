import React from "react";
import { useRef, useState } from "react";
import Recettes from "../recettes/Recettes";
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
            <option value="">aucun niveau suggere</option>
            <option value="padawan">padawan</option>
            <option value="jedi">jedi</option>
            <option value="maitre">maître</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Personnes</Form.Label>

        <Row> 
          <Col>
          <Form.Group className="mb-3" controlId="personnes_min">
            <Form.Control type="number"  placeholder="First name" />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="personnes_max">
            <Form.Control type="number"  placeholder="First name" />
            </Form.Group>
          </Col>
        </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="temps_preparation">
        <Form.Label>Temps de préparation</Form.Label>

          <Form.Control type="number" placeholder="Temps de préparation" />
          </Form.Group>

      </Form>
    </div>
  );
}

export default RechercheBarre;
