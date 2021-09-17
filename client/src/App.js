import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListeRecettes from './components/listeRecettes/ListeRecettes';
import DetailsRecette from './components/detailsRecette/DetailsRecette';
import AjouterRecette from './components/ajoutRecette/AjouterRecette';
import ModifRecette from './components/modifRecette/ModifRecette';
import Header from './components/header/Header';

function App() {
  
  


  return (
    <BrowserRouter>
      {/*** Menu Navbar ***/}
      <Header />
      <main>
        {/*** Route vers les différentes pages ***/}
        {/* Accueil */}
        <Switch>
          <Route exact path="/" component={ListeRecettes} />
          {/* Rechercher */}
          <Route exact path="/recette/:id" component={DetailsRecette} />
          {/* /Favoris */}
          <Route exact path="/ajouter-recette" component={AjouterRecette} />
          {/* Evenement */}
          <Route exact path="/modifier-recette" component={ModifRecette} />

          {/* Error page */}
          <Route component={Error} />
        </Switch>{" "}
      </main>
    </BrowserRouter>
  );
}

export default App;