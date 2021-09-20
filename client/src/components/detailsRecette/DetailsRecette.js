import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import BoutonModif from "../boutonModif/BoutonModif";
import { BsFillPeopleFill, BsDot } from "react-icons/bs";
import { CgTimelapse } from "react-icons/cg";
import { GiLevelTwoAdvanced } from "react-icons/gi";
import ErrorPage from "../errorPage/ErrorPage";

function DetailsRecette(props) {
  // Récupération de l'id dans l'url
  const params = useParams();
  const id = params.id;
  // Création du state de la recette
  const [detailsState, setDetails] = useState(null);
  // Création du state pour le bouton supprimer une recette
  const [btnSupp, setBtnSupp] = useState(false);
  // Création du stata et des méthode pour la pop-up qui s'affiche quand on clique sur le bouton pour supprimer une recette
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Création du state pour les erreurs
  const [error, setError] = useState(null);
  const timePrep = () => {
    const heure = Math.floor(detailsState.tempsPreparation / 60);
    const minutes = detailsState.tempsPreparation % 60;
    const heuretime = heure > 0 ? heure + "h" : "";
    const time = heuretime + minutes;
    return time;
  };
  // Lors du chargement de la page une requête vers l'url pour récupérer les données d'une recette en fonction de son id
  useEffect(() => {
    fetch(`http://localhost:9000/api/recipe/${id}`)
      .then((res) => res.json())
      .then((recipes) => {
        setDetails(recipes); // modifier le state par les données,récupérées, de la recette
      });
  }, []);

  // Méthode pour supprimer une recette
  const removeRecipe = (btnSupp, id) => {
    if (btnSupp === true) {
      //Verifie que l'utilisateur a appuyer sur le bouton pour supprimer

      const requestOptions = {
        method: "DELETE", //méthode pour supprimer
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(`http://localhost:9000/api/recipe/${id}`, requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            setBtnSupp(false);
            props.history.push("/"); //envoye vers la page d'accueil
          },
          (error) => {
            setError(error);
          }
        );
    }
  };

  return (
    <div className="container mt-5 my-5 ">
      <div className="mt-5 ">
        {detailsState && (
          <div>
            {detailsState !== "undifined" ? (
              <div className="row  container col-lg-12 card-body  m-auto">
                <div className="col-lg-6">
                  {/* photo */}
                  <img className="w-100" src={detailsState.photo} />
                </div>
                <div className="py-3 col-lg-6">
                  {/* titre */}
                  <h1 className="title-recette">{detailsState.titre}</h1>

                  {/* description */}

                  <h4 className="card-text">{detailsState.description}</h4>
                  <div className="row col-lg-12">
                    {/* niveau */}
                    <p className="card-text col-lg-4">
                      <GiLevelTwoAdvanced /> {detailsState.niveau}
                    </p>

                    {/* personnes */}
                    <p className="card-text col-lg-4">
                      <BsFillPeopleFill /> {detailsState.personnes}{" "}
                      {detailsState.personnes > 1 ? "personnes" : "personne"}
                    </p>

                    {/* tempsPrepation */}
                    <p className="card-text col-lg-4">
                      <CgTimelapse /> {timePrep()} min
                    </p>
                  </div>
                  {/* ingredients */}
                  {detailsState && (
                    <div className="row col-lg-12 g-4">
                      <h2 className="title">Ingrédients</h2>
                      {detailsState.ingredients.map((value, i) => (
                        <ul className=" col-lg-6 list-group text-left  ">
                          <li className=" card-text text-left list-style">
                            <BsDot /> {value[0]} {value[1]}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                  {/* étapes */}

                  <div className=" pt-3">
                    {detailsState && (
                      <div className="row col-lg-12 g-4">
                        <h2 className="title">Étapes</h2>
                        {detailsState.etapes.map((value, i) => (
                          <ul className="row col-lg-12 ">
                            <li className="card-text">{value}</li>
                          </ul>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Bouton pour modifier la recette */}
                  <BoutonModif recetteCard={detailsState} />
                  {/* Bouton pour supprimer la recette */}
                  <Button
                    className="btn-bg-supp mx-3"
                    onClick={handleShow}
                    variant="none"
                  >
                    Supprimer
                  </Button>
                  {/* Pop-up qui s'affiche quand on clique sur le bouton Supprimer */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>
                        Êtes-vous sûr de vouloir supprimer cette recette?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button
                        className="btn-bg"
                        variant="none"
                        onClick={handleClose}
                      >
                        Non
                      </Button>
                      {/* Si on clique sur oui alors la recette sera supprimée  */}
                      <Button
                        className="btn-bg-supp"
                        variant="none"
                        onClick={() => removeRecipe(true, detailsState.id)}
                      >
                        Oui
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ) : (
              // si la page n'existe pas (url invalide) alors il nous renvoit vers la page d'erreur
              <ErrorPage />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsRecette;
