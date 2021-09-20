import React from 'react';

function ErrorPage() {
    return (
            // Component Page erreur 404 
            <div className="container">
                <h1 className="text-center error-text "> ERROR 404 Page inexsistante</h1>
                <h1 className="text-center">Retour vers <a className="lien-retour " href="/">l'accueil</a></h1>
            </div>
       
    );
}

export default ErrorPage;