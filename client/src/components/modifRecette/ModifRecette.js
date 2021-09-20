import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Form, Button } from "react-bootstrap";
import ErrorPage from "../errorPage/ErrorPage";

function ModifRecette(props) {
  // Même formulaire que celui de la page Ajouter mais avec des valeurs pré-remplies
  //récupérer l'id dans l'url
  const params = useParams();
  const id = params.id;
  const [submitRecipe, setSubmitRecipe] = useState(null); //variable qui va stocker la recette
  const [error, setError] = useState(null); //variable qui va stocker la recette

  useEffect(() => {
    //récupération de la recette correspondante à l'id
    fetch(`http://localhost:9000/api/recipe/${id}`)
      .then((res) => res.json())
      .then((recipes) => {
        setSubmitRecipe(recipes);
      });
  }, []);

  // fonction pour récupérer ce que l'utilisateur met dans les champs du formulaire
  const handleForm = (e, index = null, value = null) => {
    if (e.target.id == "personnes" || e.target.id == "tempsPreparation") {
      setSubmitRecipe({
        ...submitRecipe,
        [e.target.id]: Number(e.target.value),
      });
    } else if (e.target.id == "quantite" && index != null) {
      const newValue = submitRecipe;
      newValue.ingredients[index][0] = e.target.value;
      setSubmitRecipe({ newValue });
    } else if (e.target.id == "ingredient" && index != null) {
      const newValue = submitRecipe;
      newValue.ingredients[index][1] = e.target.value;
      setSubmitRecipe({ newValue });
    } else if (e.target.id == "etape" && index != null) {
      const newValue = submitRecipe;
      newValue.etapes[index] = e.target.value;
      setSubmitRecipe({ newValue });
    } else {
      setSubmitRecipe({
        ...submitRecipe,
        [e.target.id]: e.target.value,
      });
    }
  };

  // ajouter des champs dans Ingrédients ou Étapes
  const addChamps = (option) => {
    if (option == "ingrédient") {
      const recipe = submitRecipe.ingredients;
      recipe.push(["", ""]);
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.ingredients]: recipe,
      });
    } else if (option == "étape") {
      const recipe = submitRecipe.etapes;
      recipe.push("");
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.etapes]: recipe,
      });
    }
  };

  // retirer des champs dans Ingrédients ou Étapes
  const removeFormFields = (option, i) => {
    if (option == "ingrédient") {
      const recipe = submitRecipe.ingredients;
      recipe.splice(i, 1);
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.ingredients]: recipe,
      });
    } else if (option == "étape") {
      const recipe = submitRecipe.etapes;
      recipe.splice(i, 1);
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.etapes]: recipe,
      });
    }
  };

  // Fonction pour valider le formulaire
  function onValidateForm() {
    const requestOptions = {
      method: "PUT", //méthode pour modifier
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitRecipe),
    };
    fetch(`http://localhost:9000/api/recipe/${id}`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setSubmitRecipe(result);
        },
        (error) => {
          setError(error);
        }
      );
  }
  return (
    <div className="my-5 container col-lg-6">
      <h1 className="text-center">Modifier une recette</h1>
      <div className="mt-5">
        {submitRecipe && (
          <div>
            {submitRecipe !== "undifined" ? (
              <Form onChange={handleForm}>
                {" "}
                {/*Receperer toutes manipulatiosn de l'utilisateur (appuyer un bouton , relacher , mouvement)*/}
                <Form.Group className="mb-3" controlId="titre">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    value={submitRecipe.titre}
                    type="text"
                    placeholder="Titre"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={submitRecipe.description}
                    as="textarea"
                    rows={3}
                    placeholder="Ditre"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="niveau">
                  <Form.Label>Sélectionnez le niveau</Form.Label>
                  <Form.Select value={submitRecipe.niveau} aria-label="padawan">
                    <option value="padawan">padawan</option>
                    <option value="jedi">jedi</option>
                    <option value="maitre">maître</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="personnes">
                  <Form.Label>Nombre de personne</Form.Label>
                  <Form.Control
                    value={submitRecipe.personnes}
                    type="number"
                    placeholder="Nombre de personne"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tempsPreparation">
                  <Form.Label>Temps de préparation</Form.Label>
                  <Form.Control
                    value={submitRecipe.tempsPreparation}
                    type="number"
                    placeholder="Temps de préparation"
                  />
                </Form.Group>
                <Form.Label>Ingrédients</Form.Label>
                <Form.Group className="mb-3" controlId="ingredients">
                  {submitRecipe.ingredients.map((value, index) => (
                    <div className="row form-inline col-lg-12" key={index}>
                      <Form.Group
                        className="mb-3 col-lg-6"
                        controlId="quantite"
                        onChange={(e) => handleForm(e, index, value)}
                      >
                        <Form.Control
                          value={value[0]}
                          type="text"
                          placeholder="quantite"
                        />{" "}
                        {/* premier champs de la partie Ingrédients*/}
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-lg-5"
                        controlId="ingredient"
                        onChange={(e) => handleForm(e, index)}
                      >
                        <Form.Control
                          type="text"
                          value={value[1]}
                          placeholder="ingrédient"
                        />{" "}
                        {/* second champs de la partie Ingrédients*/}
                      </Form.Group>
                      {/* bouton pour supprimer un champ ingrédient */}
                      <Button
                        className="mb-3 mr-2 col-1 btn-bg-supp "
                        onClick={() => removeFormFields("ingrédient", index)}
                        variant="none"
                      >
                        <MdDeleteForever />
                      </Button>
                    </div>
                  ))}
                </Form.Group>
                {/* bouton pour ajouter un champ ingrédient */}
                <Button
                  className="btn-bg "
                  onClick={() => addChamps("ingrédient")}
                  variant="none"
                >
                  Ajouter des ingrédients
                </Button>
                <Form.Group className="my-3" controlId="etapes">
                  <Form.Label>Etapes</Form.Label>
                  {submitRecipe.etapes.map((value, index) => (
                    <div className="row col-lg-12 form-inline" key={index}>
                      <Form.Group
                        className="mb-3 col-lg-11"
                        controlId="etape"
                        onChange={(e) => handleForm(e, index, value)}
                      >
                        <Form.Control
                          value={value}
                          as="textarea"
                          rows={3}
                          placeholder="Les étapes de la recette"
                        />
                      </Form.Group>
                      <Button
                        className="col-lg-1 m-auto btn-bg-supp"
                        onClick={() => removeFormFields("étape", index)}
                        variant="none"
                      >
                        <MdDeleteForever />
                      </Button>
                    </div>
                  ))}
                  {/* bouton pour supprimer un champ étape */}
                  <Button
                    className="col-lg-3 mt-3 btn-bg"
                    onClick={() => addChamps("étape")}
                    variant="none"
                  >
                    Ajouter des étapes
                  </Button>
                </Form.Group>
                <Form.Label>Image</Form.Label>
                {/* bouton pour ajouter un champ étape */}
                {/* Champ image */}
                <Form.Group controlId="photo">
                  <Form.Control
                    type="text"
                    placeholder="http:// ou https:// "
                  />
                </Form.Group>
                <a href="/">
                  {/* bouton pour valider le formulaire permettant de modifier la recette */}
                  <Button
                    className="col-lg-3 mt-3 btn-bg"
                    variant="none"
                    onClick={onValidateForm}
                  >
                    Modifier
                  </Button>{" "}
                </a>
              </Form>
            ) : (
              <ErrorPage />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModifRecette;
