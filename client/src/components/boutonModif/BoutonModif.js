import React from "react";
import { Button } from "react-bootstrap";

function BoutonModif(props) {
  const recetteCard = props.recetteCard; // récupération des props de la recette

  return (
    <>
      {/* Component du bouton permettant d'aller vers la page de modificaiton d'une recette en fonction de son id */}
      {recetteCard && (
        <a href={`/modifier-recette/${recetteCard.id}`}>
          <Button
            className="btn-bg mr-2"
            recetteCard={recetteCard}
            variant="none"
          >
            Modifier
          </Button>
        </a>
      )}
    </>
  );
}

export default BoutonModif;
