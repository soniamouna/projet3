// import {Button } from "react-bootstrap";
// import React from "react";
// import { useParams } from "react-router-dom";

// function BoutonSupp(props) {
//     const params = useParams();
//   const id = params.id;
//   const suppRecette=props.recetteCard;
  
//   function toSupp() {
//     const requestOptions = {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(submitRecipe),
//     };
//     fetch(`http://localhost:9000/api/recipe/${id}`,requestOptions)
//     .then((res) => res.json())
//     .then(onClick={remove(id));
//   }
//   return (
//       <>
//      {/* <a href="/modifier-recette"> */}
//         <Button variant="primary">Modifier</Button>
//          {/* </a> bouton supprimer */}

//       <Button onClick={(e) => remove(id, e)} variant="primary">Supprimer</Button>
//       </>
//   );
// }

// export default BoutonSupp;
