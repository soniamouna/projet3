import React, {useState} from 'react';
import {Button} from 'react-bootstrap'

function BoutonAdd({ingredients, addChamps}) {
    const[detailsIngredient, setDetailsIngredient]=useState(["",""]);
    
    const add=(e)=>{
        e.preventDefault();
        ingredients.addChamps(...detailsIngredient)
        console.log(ingredients)
    }

    return (
        <Button onClick={add} variant="primary">Go somewhere</Button>

    );
}

export default BoutonAdd;