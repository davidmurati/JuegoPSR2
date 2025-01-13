import { useState, useEffect  } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Menu from "./Component/Menu/Menu";
import Juego1 from "./Component/Juego1/Juego1";
import Juego2 from "./Component/Juego1/Juego2";
import Juego3 from "./Component/Juego1/Juego3";

function App() {

  
  return (
    <div className="container">
    <Router>
     <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route exact path="/Menu">
          <Menu />
        </Route>
        <Route exact path="/Juego1">
          <Juego1 />
        </Route>
        <Route exact path="/Juego2">
          <Juego2 />
        </Route>
        <Route exact path="/Juego3">
          <Juego3 />
        </Route>
     </Switch>
     </Router>
    </div>
  )
}

export default App
