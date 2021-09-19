import React from "react";
import { Button } from "react-bootstrap";

function BoutonModif(props) {
  const recetteCard = props.recetteCard;
  

  return (
    <>
      {recetteCard && (
        <a href={`/modifier-recette/${recetteCard.id}`}>
          <Button recetteCard={recetteCard} variant="primary">
            Modifier
          </Button>
          </a>
        
      )}
    
    </>
  );
}

export default BoutonModif;
