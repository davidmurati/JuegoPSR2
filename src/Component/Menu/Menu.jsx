import React, { useState } from "react";
import "./Menu.css";
import Navbar from '../Navbar/Navbar';

function menu() {
  const [selectedTest, setSelectedTest] = useState(null);

  const handleTestSelection = (test) => {
    setSelectedTest(test);
  };

  return (
    
    <div className="app-container">
      
      <div className="welcome-message">
      
        <h1>¡Bienvenido al programa Pensamiento estrategico!</h1>

        <p>Selecciona la lección que desea realizar. ¡Te deseamos mucho éxito!</p>
        
      </div>

      <button className="boton1" onClick={() => window.location.href = "/Juego1"}>
        Juego Alternativas 
        </button>
        <button className="boton1" onClick={() => window.location.href = "/Juego4"}>
        Juego Desiciones 
        </button>
        <button className="boton1" onClick={() => window.location.href = "/Juego5"}>
        Juego Planificación
        </button>


        
    </div>
    
  );
}

export default menu;