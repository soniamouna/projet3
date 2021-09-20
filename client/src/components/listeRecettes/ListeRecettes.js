import React from "react";
import { useState, useEffect } from "react";
import Breadcrump from "../breadcrump/Breadcrump";
import Recettes from "../recettes/Recettes";
import RechercheBarre from "../rechercheBarre/RechercheBarre";

function ListeRecettes(props) {
  // Création du state pour les recettes
  const [recettes, setRecettes] = useState(null);
  // Création du state pour le bouton supprimé
  const [btnSupp, setBtnSupp] = useState(false);
  // Création du state pour les erreurs
  const [error, setError] = useState(null);
  // Valeur par défaut pour les filtres
  const recetteSearch = {
    titre: "",
    niveau: "",
    personnes_min: 0,
    personnes_max: 0,
    temps_preparation: 0,
  };
  // Création du state pour les recettes filtrées et les filtres
  const [searchTerm, setSearchTerm] = useState(recetteSearch);
  const [searchResults, setSearchResults] = useState(null);

  // méthode pour récupérer les valeurs que l'utilisateur entre dans les champs
  const handleForm = (e) => {
    if (
      e.target.id == "temps_preparation" ||
      e.target.id == "personnes_min" ||
      e.target.id == "personnes_max"
    ) {
      if (e.target.value > 0) {
        setSearchTerm({
          ...searchTerm,
          [e.target.id]: Number(e.target.value), // modifier le state avec la/les valeur(s) récupérée(s) en string et transformée(s) en type number
        });
      }
    } else {
      setSearchTerm({
        ...searchTerm,
        [e.target.id]: e.target.value, // modifier le state avec la/les valeur(s) récupérée(s)
      });
    }
  };

  useEffect(() => {
    //lors du chargement de la page
    if (recettes !== null) {
      //si le state "recettes" n'est pas null alors
      const search = recettes.filter((recette) => functionTri(recette)); // on filtre "recetteds" et on récupère dans "recette" les recettes qui corresponde aux conditions de functionTri(reette)

      setSearchResults(search); // modifier le state par search (recettes filtrées)
    }
  }, [searchTerm]);

  useEffect(() => {
    //récupérer toutes les recettes
    getRecipes();
  }, []);

  // méthode pour les conditions de filtre
  const functionTri = (recette = null) => {
    // si (en minuscule) la valeau récupérer est contenue dans "titre" de recette ou s'il est vide
    if (
      recette.titre.toLowerCase().includes(searchTerm.titre.toLowerCase()) ||
      searchTerm.titre == ""
    ) {
      // si les recettes ont un temps de préparation inférieur à celui entré par l'utilisateur ou égal à 0
      if (
        recette.tempsPreparation <= searchTerm.temps_preparation ||
        searchTerm.temps_preparation == 0
      ) {
        // si le niveau correspond au niveau du filtre sélectionné ou à rien
        if (recette.niveau == searchTerm.niveau || searchTerm.niveau == "") {
          // si le nombre de personnes est compris entre le min et max que l'utilisateur a entré
          if (
            recette.personnes >= searchTerm.personnes_min ||
            searchTerm.personnes_min == 0
          ) {
            if (
              recette.personnes <= searchTerm.personnes_max ||
              searchTerm.personnes_max == 0
            ) {
              return true; // alors on retourne true
            }
          }
        }
      }
    }
    return false; //sinon on retourne false
  };

  const getRecipes = () => {
    //méthode récupérant les données de toutes les recettes et celles filtrées
    fetch("http://localhost:9000/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setSearchResults(recipes);
        setRecettes(recipes);
      });
  };

  // méthode pour supprimer une recette
  const removeRecipe = (btnSupp, id) => {
    if (btnSupp === true) {
      //Verifie que l'utilisateur à appuyer sur le bouton pour supprimer
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
            getRecipes();
          },
          (error) => {
            setError(error);
          }
        );
    }
  };

  return (
    <>
      <div className="">
        <Breadcrump />
      </div>
      <div className="my-5 container">
        <h1>Liste des recettes</h1>
        <RechercheBarre handleForm={handleForm} />
        {searchResults && (
          <div className="row col-lg-12 g-4">
            {searchResults.map(
              (
                recette,
                i //foreach recette in searchResults
              ) => (
                <div className="col-lg-4 " key={i}>
                  <Recettes
                    recetteState={recette}
                    removeRecipe={removeRecipe}
                  />{" "}
                  {/* function afficher une recette (recette, métohde enleveRecette) */}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ListeRecettes;
