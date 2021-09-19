import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import BoutonModif from "../boutonModif/BoutonModif";
import BoutonSupp from "../boutonSupp/BoutonSupp";



function DetailsRecette(props) {
  const params = useParams();
  const id = params.id;
  const [btnSupp, setBtnSupp] = useState(false); 
   const [show, setShow] = useState(false);
   const [error, setError] = useState(null);


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  const [detailsState, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/api/recipe/${id}`)
      .then((res) => res.json())
      .then((recipes) => {
        setDetails(recipes);

      });
     
  }, []);

const removeRecipe = (btnSupp, id) => {

    console.log(id);
    console.log("supp",btnSupp);
    if(btnSupp===true){ //Verifie que l'utilisateur a appuyer sur le bon bouton
      const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:9000/api/recipe/${id}`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBtnSupp(false);
          console.log("btn",btnSupp);
          props.history.push('/');

        },
        (error) => {
          setError(error);
          console.log(error);
        }
      );}

    
  } 
  
  
  return (
    <div className="container pt-5 my-5 ">
      {detailsState && (
        <div>
          {/* titre */}
          <h1>{detailsState.titre}</h1>

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
                <ul className="col-lg-4 ">
                  <li>{value[0]} {value[1]}</li>
                </ul>
              ))}
            </div>
          )}
          {/* étapes */}
          <p className="mt-3"> {detailsState.etapes}</p>
         <BoutonModif recetteCard={detailsState}/>
         <Button onClick={handleShow}  variant="primary">Supprimer</Button>
            <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Êtes-vous sûr de vouloir supprimer cette recette?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>removeRecipe(true,detailsState.id)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      )}

      {/* titre */}
    </div>
  );
}

export default DetailsRecette;
