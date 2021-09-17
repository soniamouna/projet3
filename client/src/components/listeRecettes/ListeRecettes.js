import React from "react";
import { useState, useEffect } from "react";

import Recettes from "../Recettes/Recettes";
import RechercheBarre from "../rechercheBarre/RechercheBarre";

function ListeRecettes(props) {
  const [recettes, setRecettes] = useState(null);
  const [btnSupp, setBtnSupp] = useState(false);

  const [error, setError] = useState(null);

  const recetteSearch = {
    titre: "",
    niveau: "",
    personnes_min: 0,
    personnes_max: 0,
    temps_preparation: 0
  };

  const [searchTerm, setSearchTerm] = useState(recetteSearch);
  const [searchResults, setSearchResults] = useState(null);

  const handleForm = (e) => {
    if (e.target.id == "niveau" || e.target.id == "personnes_min" || e.target.id  == "personnes_min") {
      setSearchTerm({
        ...searchTerm,
        [e.target.id]: Number(e.target.value),
      });
    } else {
      setSearchTerm({
        ...searchTerm,
        [e.target.id]: e.target.value,
      });
    }
  }

  // useEffect(() => {
  //   const searchResults = recettes.filter(recette =>
  //     recette.titre == searchTerm.titre
  //     );
  //     setSearchResults(searchResults);
  // }, [searchTerm])

  useEffect(() => {
    //GET
    getRecipes();
  }, []);

  const getRecipes = () =>{
    fetch("http://localhost:9000/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setRecettes(recipes);
        //setSearchResults(recipes);
      });
  }

  const removeRecipe = (btnSupp, id) => {

    console.log(id);
    console.log("supp",btnSupp);
    if(btnSupp===true){
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
          getRecipes();

        },
        (error) => {
          setError(error);
          console.log(error);
        }
      );}

    
  }


  return (
    <div className="mt-5 container">
      <h1>Liste des recettes</h1>
      <RechercheBarre handleForm={handleForm}/>
      {recettes && (
         <div className="row col-lg-12 g-4">
           {recettes.map((recette, i) => (
             <div className="col-lg-4 " key={i}>
               <Recettes recetteState={recette} removeRecipe={removeRecipe} />
             </div>
           ))}
         </div>
      )}

    </div>
  );
}

export default ListeRecettes;
