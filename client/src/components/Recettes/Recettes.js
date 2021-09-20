import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import BoutonModif from "../boutonModif/BoutonModif";
import { MdDescription } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgTimelapse } from "react-icons/cg";
import { GiLevelTwoAdvanced } from "react-icons/gi";

function Recettes(props) {
  // récupérer les states via les props
  const recetteCard = props.recetteState;
  const removeRecipe = props.removeRecipe;
  // méthode pour mettre les minutes >60min à 1h
  const timePrep = () => {
    const heure = Math.floor(recetteCard.tempsPreparation / 60);
    const minutes = recetteCard.tempsPreparation % 60;
    const heuretime = heure > 0 ? heure + "h" : "";
    const time = heuretime + minutes;
    return time;
  };
  //  state pour la pop-up qui s'affiche lorsqu'on appuie sur le bouton pour supprimer une recette
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Card pour chaque recette */}
      <Card className="borderCard">
        {/* image */}
        <a href={`/recette/${recetteCard.id}`}>
          <Card.Img variant="top" src={recetteCard.photo} />
          <Card.Body>
            {/* titre */}
            <Card.Title>{recetteCard.titre}</Card.Title>
            {/* description */}
            <Card.Text>
              <MdDescription /> {recetteCard.description}
            </Card.Text>
            {/* difficulté */}

            <Card.Text>
              <GiLevelTwoAdvanced /> {recetteCard.niveau}
            </Card.Text>
            {/* nombre de personne */}
            <Card.Text>
              <BsFillPeopleFill /> {recetteCard.personnes}{" "}
              {recetteCard.personnes > 1 ? "personnes" : "personne"}
            </Card.Text>
            {/* temps de préparation */}
            <Card.Text>
              <CgTimelapse />
              {timePrep()} min
            </Card.Text>
          </Card.Body>
        </a>
        <Card.Footer>
          {/* bouton modifier */}
          <BoutonModif recetteCard={recetteCard} />
          {/* bouton supprimer */}
          <Button
            className="btn-bg-supp mx-2"
            onClick={handleShow}
            variant="none"
          >
            Supprimer
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                Êtes-vous sûr de vouloir supprimer cette recette?
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button className="btn-bg" variant="none" onClick={handleClose}>
                Non
              </Button>
              <Button
                className="btn-bg-supp"
                variant="none"
                onClick={() => removeRecipe(true, recetteCard.id)}
              >
                Oui
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Recettes;
