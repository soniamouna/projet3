import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function Recettes(props) {
  const recetteCard= props.recetteState;
  const removeRecipe=props.removeRecipe;
  const heure = Math.floor(recetteCard.tempsPreparation / 60);
  const minutes = recetteCard.tempsPreparation % 60;
  const btnSupp=props.btnSupp;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <div>
      {/* Card pour chaque recette */}
      <Card>
        {/* image */}
        <a href={`/recette/${recetteCard.id}`}>
          <Card.Img variant="top" src={recetteCard.photo} />
          <Card.Body>
            {/* titre */}
            <Card.Title>{recetteCard.titre}</Card.Title>
            {/* description */}
            <Card.Text>{recetteCard.description}</Card.Text>
            {/* difficulté */}
            <Card.Text>{recetteCard.niveau}</Card.Text>
            {/* nombre de personne */}
            <Card.Text>
              {recetteCard.personnes}{" "}
              {recetteCard.personnes > 1 ? "personnes" : "personne"}
            </Card.Text>
            {/* temps de préparation */}
            <Card.Text>
              {heure > 0 ? heure + "h" : ""} {minutes} min
            </Card.Text>
          </Card.Body>
        </a>
        <Card.Footer>
          {/* bouton modifier */}
          {/* <a href="/modifier-recette"> */}
          <Button variant="primary">Modifier</Button>
          {/* </a> bouton supprimer */}
          <Button onClick={handleShow}  variant="primary">Supprimer</Button>
            <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Êtes-vous sûr de vouloir supprimer cette recette?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>removeRecipe(true,recetteCard.id)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </Card.Footer>
      </Card>   
    </div>
  );
}

export default Recettes;
