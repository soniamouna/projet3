import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import Recettes from "../Recettes/Recettes";
import RechercheBarre from "../rechercheBarre/RechercheBarre";

function ListeRecettes(props) {
  const [recettes, setRecettes] = useState(null);
  const [btnSupp, setBtnSupp] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    //GET
    getRecipes();
  }, []);

  const getRecipes = () =>{
    fetch("http://localhost:9000/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setRecettes(recipes);
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
      <RechercheBarre />
      {recettes && (
         <div className="row col-lg-12 g-4">
           {recettes.map((recette, i) => (
             <div className="col-lg-4 ">
               <Recettes recetteState={recette} removeRecipe={removeRecipe}  btnSupp={btnSupp}/>
             </div>
           ))}
         </div>
      )}

    </div>
  );
}

export default ListeRecettes;
