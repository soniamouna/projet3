import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

function AjouterRecette(props) {
  const data = {
    // Recette initiale (vide)
    titre: "",
    description: "",
    niveau: "padawan",
    personnes: 0,
    tempsPreparation: 0,
    ingredients: [["", ""]],
    etapes: [""],
    photo:
      "https://www.kindpng.com/picc/m/306-3061452_chibi-star-wars-bb-8-png-download-transparent.png",
  };

  const [error, setError] = useState(null); //variable pour gérer les erreurs
  const [submitRecipe, setSubmitRecipe] = useState(data); //variable qui va stocker la recette qu'on va rajouter et qui a comme valeur par défaut la const data

  // méthode pour changer la valeur des champs
  const handleForm = (e, index = null, value = null) => {
    // si l'id correspond à "personnes" ou "tempsPreparation"
    // alors on modifie les données du state par la valeur que l'utilisateur a rentré (récupéré sous forme de String et modifier en Number pour le mettre dabs le state)
    if (e.target.id == "personnes" || e.target.id == "tempsPreparation") {
      setSubmitRecipe({
        ...submitRecipe,
        [e.target.id]: Number(e.target.value),
      });
    } else if (e.target.id == "quantite" && index != null) {
      // si l'id correspond à "quantite" et que l'index n'est pas null
      const newValue = submitRecipe; // création d'une const temporaire contenant le state
      newValue.ingredients[index][0] = e.target.value; // affecter la valeur entrée par l'utilisateur dans le champs correspondant à l'index 0 qui correspond au champ quantité de l'ingrédient
      setSubmitRecipe({ newValue }); // modifier le state par la variable temporaire
    } else if (e.target.id == "ingredient" && index != null) {
      // si l'id correspond à "ingredient" et que l'index n'est pas null
      const newValue = submitRecipe; // création d'une const temporaire contenant le state
      newValue.ingredients[index][1] = e.target.value; // affecter la valeur entrée par l'utilisateur dans le champs correspondant à l'index 1 qui correspond au champ ingrédient
      setSubmitRecipe({ newValue }); // modifier le state par la variable temporaire
    } else if (e.target.id == "etape" && index != null) {
      // si l'id correspond à "etape" et que l'index n'est pas null
      const newValue = submitRecipe; // création d'une const temporaire contenant le state
      newValue.etapes[index] = e.target.value; // affecter la valeur entrée par l'utilisateur dans le champs correspondant à l'index de l'étape
      setSubmitRecipe({ newValue }); // modifier le state par la variable temporaire
    } else {
      //sinon pour les autres id
      setSubmitRecipe({
        // modifier le state à l'id correspondant par la valeur entrée par l'utilisateur
        ...submitRecipe,
        [e.target.id]: e.target.value,
      });
    }
  };

  // méthode pour ajouter un champ en plus soit pour la partie Ingrédients soit pour la partie Étapes
  const addChamps = (option) => {
    if (option == "ingrédient") {
      //si l'option correspond à "ingrédient"
      const recipe = submitRecipe.ingredients; //On stocke la liste des recettes dans une variable local pour pouvoir modifier la liste des ingredients
      recipe.push(["", ""]); //ajouter un nouveau tableau de deux string vide
      setSubmitRecipe({
        // modifier le state au niveau d'ingrédients avec recipe
        ...submitRecipe,
        [submitRecipe.ingredients]: recipe,
      });
    } else if (option == "étape") {
      //si l'option correspond à "étape"
      const recipe = submitRecipe.etapes; //On stocke la liste des recettes dans une variable local pour pouvoir modifier la liste des ingredients
      recipe.push(""); //ajouter un nouveau string vide
      setSubmitRecipe({
        // modifier le state au niveau d'étapes avec recipe
        ...submitRecipe,
        [submitRecipe.etapes]: recipe,
      });
    }
  };

  // méthode pour supprimer un des champs des ingrédients ou des étapes
  const removeFormFields = (option, i) => {
    if (option == "ingrédient") {
      const recipe = submitRecipe.ingredients;
      recipe.splice(i, 1); // supprime un seul élément à la place i
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.ingredients]: recipe,
      });
    } else if (option == "étape") {
      const recipe = submitRecipe.etapes;
      recipe.splice(i, 1); // supprime un seul élément à la place i
      setSubmitRecipe({
        ...submitRecipe,
        [submitRecipe.etapes]: recipe,
      });
    }
  };

  // fonction de validation du formulaire
  function onValidateForm() {
    // option de la requête
    const requestOptions = {
      method: "POST", // méthode pour ajouter dans le serveur
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitRecipe), //transformer la donnée qu'on souhaite intégrer en format JSON
    };
    fetch("http://localhost:9000/api/recipes", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          props.history.push("/"); // renvoyer vers la page d'accueil
        },
        (error) => {
          setError(error);
        }
      );
  }

  return (
    <div className="my-5 container col-lg-6">
      <h1 className="text-center">Ajouter une recette</h1>
      {/* Si submitRecipe n'est pas vide */}
      {submitRecipe && (
        <Form className="mt-5" onChange={handleForm}>
          {/*Récupérer toutes manipulations de l'utilisateur (appuyer un bouton , relâcher , écriture dans les champs)*/}

          {/* Champ Titre */}
          <Form.Group className="mb-3" controlId="titre">
            <Form.Label>Titre</Form.Label>
            <Form.Control type="text" placeholder="Titre" />
          </Form.Group>

          {/* Champ Description */}
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Description" />
          </Form.Group>

          {/* Champ Niveau sous forme de sélection */}
          <Form.Group className="mb-3" controlId="niveau">
            <Form.Label>Sélectionnez le niveau</Form.Label>
            <Form.Select>
              <option value="padawan">padawan</option>
              <option value="jedi">jedi</option>
              <option value="maitre">maître</option>
            </Form.Select>
          </Form.Group>

          {/* Champ Personnes */}
          <Form.Group className="mb-3" controlId="personnes">
            <Form.Label>Nombre de personne</Form.Label>
            <Form.Control type="number" placeholder="Nombre de personne" />
          </Form.Group>

          {/* Champ Teamps de préparation */}
          <Form.Group className="mb-3" controlId="tempsPreparation">
            <Form.Label>Temps de préparation</Form.Label>
            <Form.Control type="number" placeholder="Temps de préparation" />
          </Form.Group>

          {/* Champ Ingrédients */}
          <Form.Label>Ingrédients</Form.Label>
          <Form.Group className="mb-3" controlId="ingredients">
            {submitRecipe.ingredients.map((value, index) => (
              <div className="row form-inline col-lg-12" key={index}>
                {/* Champ quantité dans "Ingrédients" */}
                <Form.Group
                  className="mb-3 col-lg-6 "
                  controlId="quantite"
                  onChange={(e) => handleForm(e, index, value)}
                >
                  <Form.Control type="text" placeholder="Quantité" />
                </Form.Group>
                {/* Champ ingrédient dans "Ingrédients" */}
                <Form.Group
                  className="mb-3 col-lg-5"
                  controlId="ingredient"
                  onChange={(e) => handleForm(e, index, value)}
                >
                  <Form.Control type="text" placeholder="Ingrédient" />
                </Form.Group>
                {/*Bouton pour supprimer un champ dans Ingrédients*/}
                <Button
                  className="mb-3 mr-2 col-1 btn-bg-supp "
                  onClick={() => removeFormFields("ingrédient", index)}
                  variant="none"
                >
                  <MdDeleteForever /> {/* icon poubelle*/}
                </Button>
              </div>
            ))}
          </Form.Group>
          {/* Bouton pour ajouter un nouveau champ dans les ingrédients */}
          <Button
            className="btn-bg "
            onClick={() => addChamps("ingrédient")}
            variant="none"
          >
            Ajouter des ingrédients
          </Button>

          {/* Champ Étapes */}
          <Form.Group className="my-3" controlId="etapes">
            <Form.Label>Étapes</Form.Label>
            {submitRecipe.etapes.map((value, index) => (
              <div className="row col-lg-12 form-inline" key={index}>
                <Form.Group
                  className="mb-3 col-lg-11  "
                  controlId="etape"
                  onChange={(e) => handleForm(e, index, value)}
                >
                  {/* Champ d'une étape des Étapes */}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Les étapes de la recette"
                  />
                </Form.Group>
                {/*Bouton pour supprimer un champ dans Étapes*/}
                <Button
                  className="col-lg-1 m-auto btn-bg-supp"
                  onClick={() => removeFormFields("étape", index)}
                  variant="none"
                >
                  <MdDeleteForever /> {/*icon poubelle*/}
                </Button>
              </div>
            ))}
            {/*Bouton pour ajouter un champ dans Étapes*/}
            <Button
              className="col-lg-3 mt-3 btn-bg"
              onClick={() => addChamps("étape")}
              variant="none"
            >
              Ajouter des étapes
            </Button>

            {/* Champ Image */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="photo">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          {/* Bouton pour valider le formulaire (pour l'ajouter) */}
          <Button
            className="col-lg-3 mt-3 btn-bg"
            variant="none"
            onClick={onValidateForm}
          >
            Ajouter
          </Button>
        </Form>
      )}
    </div>
  );
}

export default AjouterRecette;
