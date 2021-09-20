import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function RechercheBarre(props) {
  // Formulaire de filtres
  // réucpérer la méthode via les props
  const handleForm = props.handleForm;

  return (
    <div className=" container">
      <Form className="row" onChange={handleForm}>
        <Form.Group className="mb-3 col-lg-2" controlId="titre">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" placeholder="Titre" />
        </Form.Group>

        <Form.Group className="mb-3 col-lg-2" controlId="niveau">
          <Form.Label>Sélectionnez le niveau</Form.Label>
          <Form.Select aria-label="padawan">
            <option value="">Aucun niveau suggéré</option>
            <option value="padawan">padawan</option>
            <option value="jedi">jedi</option>
            <option value="maitre">maître</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-lg-2">
          <Form.Label>Nombre de personnes</Form.Label>

          <Row>
            <Col>
              <Form.Group className="mb-3 " controlId="personnes_min">
                <Form.Control type="number" placeholder="De" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3 " controlId="personnes_max">
                <Form.Control type="number" placeholder="À" />
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3 col-lg-2" controlId="temps_preparation">
          <Form.Label>Temps de préparation</Form.Label>

          <Form.Control type="number" placeholder="Temps" />
        </Form.Group>
      </Form>
    </div>
  );
}

export default RechercheBarre;
