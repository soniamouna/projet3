import React from "react";
import Recettes from "../Recettes/Recettes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function DetailsRecette(props) {
  const params = useParams();
  const id = params.id;
  const [detailsState, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/api/recipe/${id}`)
      .then((res) => res.json())
      .then((recipes) => {
        setDetails(recipes);
      });
     
  }, []);

  // const tempsFonction = ((t)=>{
  //   const heure = Math.floor(t/60);
  //   const minutes = t % 60;
  
  
  return (
    <div className="container pt-5 mt-3">
      {detailsState && (
        <div>
          {/* titre */}
          <p>{detailsState.titre}</p>

          {/* photo */}
          <img src={detailsState.photo} />

          {/* description */}
          <p>{detailsState.description}</p>

          {/* niveau */}
          <p>{detailsState.niveau}</p>

          {/* personnes */}
          <p>{detailsState.personnes} {detailsState.personnes > 1 ? "personnes" : "personne"}</p>

          {/* tempsPrepation */}
          <p>{detailsState.tempsPreparation} min</p>{/* {detailsState.tempsPreparation} */}
          
          {/* ingredients */}
          {detailsState && (
            <div className="row col-lg-12 g-4">
              {detailsState.ingredients.map((value, i) => (
                <div className="col-lg-4 ">
                  {value[0]} {value[1]}
                </div>
              ))}
            </div>
          )}
          {/* étapes */}
          <p className="mt-3"> {detailsState.etapes}</p>
          <a href="/modifier-recette"><Button variant="primary">Modifier</Button></a> {/* bouton supprimer */}
          <Button variant="primary">Supprimer</Button>{" "}
        </div>
      )}

      {/* titre */}
    </div>
  );
}

export default DetailsRecette;
