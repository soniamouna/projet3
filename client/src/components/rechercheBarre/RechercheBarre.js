import React from 'react';
import { useRef, useState, } from 'react';
import Recettes from '../Recettes/Recettes';

function RechercheBarre(props) {
  const searchRecette=props.recetteState;
    const [searchState, setSeacrh] = useState("");

    const inputRef = useRef();
    // Fonction qui s'effectuera la de submission du formulaire
  // pour passer les données de l'API, récupérées en fonction de la recherche faite, au state
  function onValidateForm (event) {
    event.preventDefault();
    //Récupération de la valeur courante entrée dans le input
    const searchValue = event.target.value;
    setSeacrh(searchValue);
    //Récupération des données dans l'API en fonction de la valeur entrée dans l'input
    // fetch(`http://localhost:9000/api/recipes`)
    //   .then((res) => res.json())
    //   .then((recipes) => {
    //   //Passer les données dans le state
    //   setSeacrh(recipes);
    // });
  }
    return (
        <div className="mb-5">
             <form
        className="mt-4 col-lg-12 text-center search"
        onChange={onValidateForm}
      >
        <input
          ref={inputRef}
          className="col-lg-6 input-search text-center form-search"
          type="text"
          placeholder="Recherche"
        />

        <button className="button-search" type="submit">
          Rechercher
        </button>
      </form>

      {searchRecette && (
        <div className="mt-5 mb-5 col-lg-12 row g-4">
          <h2>Résultat(s) de la recherche:</h2>
          {/* S'il n'y pas de résultat suite à la recherche un message nous l'informera 
          sinon les résultats s'afficheront sous forme de plusieurs card*/}
           {searchRecette && (
         <div className="row col-lg-12 g-4">
          {searchRecette.filter((value)=>{
                return value.titre.indexOf(searchState)>=0;
              }).map((value) => {
                <div className="col-lg-4 " key={value.id}>
                  <p>{value.titre}</p>
                </div>}
              )}
         </div>
      )}

            {/* <div className="row col-lg-12">
              {searchRecette.filter((value)=>{
                return value.includes(searchState);
              }).map((value) => {
                <div className="col-lg-4 " key={value.id}>
                  < Recettes recetteState={value} />
                </div>}
              )}
            </div> */}
          
        </div>
       )} 

     
        </div>
    );
}

export default RechercheBarre;