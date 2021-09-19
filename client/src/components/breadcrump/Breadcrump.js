import React from 'react';
import { WiMoonAltWaningCrescent5, WiMoonAltWaxingCrescent3 } from 'react-icons/wi';

function Breadcrump(props) {
    return (
        <div className="breadcrump text-center mt-5 py-5">
            <h1 className="pt-5 text-center breadcrump-title"><WiMoonAltWaningCrescent5/> CANTINA <WiMoonAltWaxingCrescent3/></h1>
            <h2 className=" m-auto sous-titre py-4"> Retrouvez, Ajoutez et Modifiez vos recettes</h2>
        </div>
    );
}

export default Breadcrump;