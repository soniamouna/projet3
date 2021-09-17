import React from 'react';
import {Form} from 'react-bootstrap';

function ModifRecette(props) {
    return (
        <div className="mt-5 container">
          <h1>Modifier une recette</h1> 
          <div className="mt-5">
      <Form >

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" placeholder="titre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Sélectionnez le niveau</Form.Label>
          <Form.Select aria-label="Default select example">
          
            <option value="1">padawan</option>
            <option value="2">jedi</option>
            <option value="3">maître</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nombre de personne</Form.Label>
          <Form.Control type="number" placeholder="Nombre de personne" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Temps de préparation</Form.Label>
          <Form.Control type="number" placeholder="Temps de préparation" />
        </Form.Group>

        <Form.Group
          className="mb-3 row col-lg-12"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Ingrédients</Form.Label>
          <div className="col-lg-4">
            <Form.Control type="number" placeholder="nombre" />
          </div>
          <div className="col-lg-4">
            <Form.Control type="text" placeholder="cl" />
          </div>
          <div className="col-lg-4">
            <Form.Control type="text" placeholder="ingrédient" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Etapes</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form>
    </div> 
        </div>
    );
}

export default ModifRecette;