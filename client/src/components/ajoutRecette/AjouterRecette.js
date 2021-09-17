
import React from "react";
import { useState } from "react";
import { Form,Button } from "react-bootstrap";

function AjouterRecette(props) {
  const data = {
    // Recette vide à remplir
    titre: "",
    description: "",
    niveau: "padawan",
    personnes: 0,
    tempsPreparation: 5,
    ingredients: [["", ""]],
    etapes: [""],
    photo: "http://localhost:9000/images/dustcrepe.jpg",
  };

  const [error, setError] = useState(null); //variable pour gérer les erreurs
  const [submitRecipe, setSubmitRecipe] = useState(data); //variable qui va stocker la recette

  const handleForm = (e, index = null, value = null) => {
    console.log(e.target.value);
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
    } 
    else {
      setSubmitRecipe({
        ...submitRecipe,
        [e.target.id]: e.target.value,
      });
    }
  };
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
  }
  function onValidateForm() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitRecipe),
    };
    console.log(submitRecipe);
    console.log(submitRecipe.ingredients);
    console.log(data.ingredients);
    fetch("http://localhost:9000/api/recipes", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          setError(error);
          console.log(error);
        }
      );
  }

  return (
    <div className="mt-5 container">
      <h1>Ajouter une recette</h1>
      <Form onChange={handleForm}>
        {" "}
        {/*Receperer toutes manipulatiosn de l'utilisateur (appuyer un bouton , relacher , mouvement)*/}
        <Form.Group className="mb-3" controlId="titre">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" placeholder="titre" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="niveau">
          <Form.Label>Sélectionnez le niveau</Form.Label>
          <Form.Select aria-label="padawan">
            <option value="padawan">padawan</option>
            <option value="jedi">jedi</option>
            <option value="maitre">maître</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="personnes">
          <Form.Label>Nombre de personne</Form.Label>
          <Form.Control type="number" placeholder="Nombre de personne" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tempsPreparation">
          <Form.Label>Temps de préparation</Form.Label>
          <Form.Control type="number" placeholder="Temps de préparation" />
        </Form.Group>
        <Form.Label>Ingrédients</Form.Label>
        <Form.Group className="mb-3" controlId="ingredients">
          {submitRecipe.ingredients.map((value, index) => (
            <div className="form-inline" key={index}>
              <Form.Group
                className="mb-3"
                controlId="quantite"
                onChange={(e) => handleForm(e, index, value)}
              >
                <Form.Control type="text" placeholder="quantite" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="ingredient"
                onChange={(e) => handleForm(e, index)}
              >
                <Form.Control type="text" placeholder="ingredient" />
                <Button onClick={() => removeFormFields("ingrédient", index)} variant="primary">X</Button>

              </Form.Group>
            </div>
          ))}
        </Form.Group>
        <Button onClick={() => addChamps("ingrédient")} variant="primary">
          Ajouter des ingrédients
        </Button>

        <Form.Group className="mb-3" controlId="etapes">
          <Form.Label>Etapes</Form.Label>
          {submitRecipe.etapes.map((value, index) => (
            <div className="form-inline" key={index}>
              <Form.Group
                className="mb-3"
                controlId="etape"
                onChange={(e) => handleForm(e, index, value)}
              >
                <Form.Control as="textarea" rows={3} />
                <Button onClick={() => removeFormFields("étape", index)} variant="primary">X</Button>
              </Form.Group>
            </div>
          ))}
          <Button onClick={() => addChamps("étape")} variant="primary">Ajouter des étapes</Button>
        </Form.Group>

        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
        <Button onClick={onValidateForm}>Submit</Button>
      </Form>
    </div>
  );
}

export default AjouterRecette;
