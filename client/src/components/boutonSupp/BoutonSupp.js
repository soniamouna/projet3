// import React, {useState} from 'react';

// import { Button, Modal } from "react-bootstrap";

// function BoutonSupp(props) {
//     const recetteCard = props.recetteState;

//     const removeRecipe = props.removeRecipe;
//     const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//     return (
//         <div>
//             <Button onClick={handleShow} variant="primary">
//             Supprimer
//           </Button>
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header>
//               <Modal.Title>
//                 Êtes-vous sûr de vouloir supprimer cette recette? 
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Non
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={() => removeRecipe(true, recetteCard.id)}
//               >
//                 Oui
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//     );
// }

// export default BoutonSupp;