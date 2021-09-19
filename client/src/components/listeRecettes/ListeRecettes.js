import React from "react";
import { useState, useEffect } from "react";
import Breadcrump from '../breadcrump/Breadcrump';

import Recettes from "../recettes/Recettes";
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
    if (e.target.id == "temps_preparation" || e.target.id == "personnes_min" || e.target.id  == "personnes_max") {
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

   useEffect(() => {
     if (recettes !== null) {
       console.log(recettes, "recette");
       console.log(searchResults, "searchRecette");
     const search = recettes.filter(recette => functionTri(recette));
       console.log(searchResults, "final");
       setSearchResults(search);
     }
   }, [searchTerm])

  useEffect(() => {
    //GET
    getRecipes();
  }, []);

  const functionTri = (recette = null) => {
    if (recette.titre.toLowerCase().includes(searchTerm.titre.toLowerCase()) || searchTerm.titre == "") {
      if (recette.tempsPreparation <= searchTerm.temps_preparation || searchTerm.temps_preparation == 0) {
          if (recette.niveau == searchTerm.niveau || searchTerm.niveau == "") {
            if (recette.personnes >= searchTerm.personnes_min || searchTerm.personnes_min == 0) {
              if (recette.personnes <= searchTerm.personnes_max || searchTerm.personnes_max == 0) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

  const getRecipes = () =>{
    //GET
      fetch("http://localhost:9000/api/recipes")
        .then((res) => res.json())
        .then((recipes) => {
          setSearchResults(recipes);
          setRecettes(recipes);
        });
  }

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
          getRecipes();

        },
        (error) => {
          setError(error);
          console.log(error);
        }
      );}

    
  } 


  return (
    <>
    <div className="">
      
      <Breadcrump/>
      </div>
    <div className="mt-5 container">
      <h1>Liste des recettes</h1>
      <RechercheBarre handleForm={handleForm}/>
      {searchResults && (
         <div className="row col-lg-12 g-4">
           {searchResults.map((recette, i) => ( //foreach recette in searchResults
             <div className="col-lg-4 " key={i}>
              <Recettes recetteState={recette} removeRecipe={removeRecipe} />  {/* function afficher une recette (recette, métohde enleveRecette) */}
             </div>
           ))}
         </div>
      )}

    </div> 
    </>
  );
 
}

export default ListeRecettes;
