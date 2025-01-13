import React, { useState } from "react";
import imagen1 from '../ImagenJuego/DetectiveDerrota.jpg'; // Imagen de derrota
import imagen2 from '../ImagenJuego/DetectiveGano.jpeg'; // Imagen de victoria
import imagen3 from '../ImagenJuego/DetectivePensando.jpeg'; // Imagen de pensamiento
import imagen4 from '../ImagenJuego/DetectivePensando2.jpeg'; // Imagen de pensamiento 2
import imagen6 from '../ImagenJuego/DetectivePensando3.jpeg'; // Imagen de pensamiento 3
import "./Juego1.css"; 
import Navbar from '../Navbar/Navbar';

const DetectiveGame = () => {
  const [selectedAlternative, setSelectedAlternative] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userCauses, setUserCauses] = useState([]); // Almacenar las causas ingresadas
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintsShown, setHintsShown] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);
  const [userAttempts, setUserAttempts] = useState(0);
  const [multipleChoiceAttempts, setMultipleChoiceAttempts] = useState(0);
  const [currentImage, setCurrentImage] = useState(imagen3); // Imagen actual
  const [gameWon, setGameWon] = useState(false); // Controlar si el usuario ganó

  // Alternativas posibles
  const alternatives = [
    "Ineficiencia en los procesos de producción",
    "Aumento en los costos de materias primas",
    "Problemas de calidad en los productos",
    "Falta de mantenimiento en la maquinaria",
    "Baja productividad del personal",
    "Falta de innovación o tecnología obsoleta",
  ];

  // Pistas para cada alternativa
  const hints = {
    "Ineficiencia en los procesos de producción": [
      "Los informes de producción muestran tiempos de inactividad frecuentes.",
      "Hay un exceso de inventario en proceso, lo que indica cuellos de botella.",
      "Los empleados reportan que las máquinas están desorganizadas y mal sincronizadas.",
      "Los costos de energía son más altos de lo esperado debido a procesos ineficientes.",
      "Los pedidos se retrasan constantemente debido a problemas en la línea de producción.",
    ],
    "Aumento en los costos de materias primas": [
      "Los proveedores han aumentado los precios recientemente.",
      "Hay escasez de materias primas clave en el mercado.",
      "Los informes financieros muestran un aumento significativo en los costos de compra.",
      "La empresa ha tenido que buscar nuevos proveedores debido a problemas de suministro.",
      "Los márgenes de beneficio han disminuido debido al aumento de los costos de materiales.",
    ],
    "Problemas de calidad en los productos": [
      "Los clientes han presentado quejas frecuentes sobre defectos en los productos.",
      "El departamento de control de calidad ha reportado un aumento en los productos rechazados.",
      "Hay un alto índice de devoluciones y reclamaciones.",
      "Los empleados mencionan que los estándares de calidad no se están cumpliendo.",
      "Los informes muestran un aumento en los costos de garantía y reparaciones.",
    ],
    "Falta de mantenimiento en la maquinaria": [
      "Las máquinas se descomponen con frecuencia, causando paradas en la producción.",
      "Los empleados reportan que las máquinas hacen ruidos inusuales.",
      "No hay un programa de mantenimiento preventivo establecido.",
      "Los costos de reparación de maquinaria han aumentado drásticamente.",
      "Hay un retraso en la entrega de piezas de repuesto para las máquinas.",
    ],
    "Baja productividad del personal": [
      "Los informes de recursos humanos muestran un alto índice de absentismo.",
      "Los empleados reportan falta de motivación y descontento laboral.",
      "No hay programas de capacitación o desarrollo para los empleados.",
      "Los supervisores mencionan que los empleados no cumplen con los objetivos de producción.",
      "Hay un alto índice de rotación de personal en la empresa.",
    ],
    "Falta de innovación o tecnología obsoleta": [
      "La competencia ha lanzado productos más avanzados y eficientes.",
      "Los empleados reportan que las máquinas son antiguas y difíciles de operar.",
      "No hay inversión en investigación y desarrollo.",
      "Los procesos de producción no han sido actualizados en los últimos años.",
      "Los clientes prefieren productos de la competencia debido a su mayor innovación.",
    ],
  };

  // Frases motivadoras
  const motivationalPhrases = [
    "¡Sigue así, vas muy bien!",
    "¡Excelente deducción!",
    "¡Esa es una buena causa!",
    "¡Vas por el camino correcto!",
    "¡Genial, sigue pensando!",
    "¡Muy buena observación!",
  ];

  // Seleccionar una alternativa al azar al iniciar el juego
  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * alternatives.length);
    setSelectedAlternative(alternatives[randomIndex]);
    setUserInput("");
    setUserCauses([]);
    setHintsUsed(0);
    setHintsShown([]);
    setGameResult("");
    setGameStarted(true);
    setShowMultipleChoice(false);
    setUserAttempts(0);
    setMultipleChoiceAttempts(0);
    setCurrentImage(imagen3); // Imagen de pensamiento al iniciar
    setGameWon(false); // Reiniciar el estado de victoria
  };

  // Manejar el ingreso de una causa
  const handleAddCause = () => {
    const cause = userInput.trim();

    if (!cause) {
      setGameResult("Por favor, ingresa una causa válida.");
      return;
    }

    // Verificar si la causa ya fue ingresada
    if (userCauses.includes(cause)) {
      setGameResult("Ya has ingresado esa causa. Por favor, ingresa una diferente.");
      return;
    }

    // Agregar la causa a la lista
    setUserCauses([...userCauses, cause]);
    setUserInput("");

    // Mostrar una frase motivadora aleatoria
    const randomPhrase =
      motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    setGameResult(`Causa agregada: ${cause}. ${randomPhrase}`);

    // Cambiar la imagen de pensamiento
    const thinkingImages = [imagen3, imagen4, imagen6];
    const randomThinkingImage =
      thinkingImages[Math.floor(Math.random() * thinkingImages.length)];
    setCurrentImage(randomThinkingImage);

    // Si ya ha ingresado 5 causas, habilitar la selección múltiple
    if (userCauses.length + 1 === 5) {
      setShowMultipleChoice(true);
      setGameResult("¡Has ingresado 5 causas! Ahora selecciona la correcta.");
    }
  };

  // Manejar la selección múltiple
  const handleMultipleChoice = (selectedCause) => {
    if (selectedCause === selectedAlternative) {
      setGameResult("¡Correcto! Has seleccionado la causa correcta.");
      setCurrentImage(imagen2); // Imagen de victoria
      setGameWon(true); // Marcar que el usuario ganó
    } else {
      setMultipleChoiceAttempts(multipleChoiceAttempts + 1);
      if (multipleChoiceAttempts >= 1) {
        setGameResult("¡Fallaste en el tercer intento! Reiniciando el juego...");
        setCurrentImage(imagen1); // Imagen de derrota
        setTimeout(() => {
          startGame(); // Reiniciar el juego después de 3 intentos fallidos
        }, 2000);
      } else {
        setGameResult("Incorrecto. Sigue intentando.");
        setCurrentImage(imagen3); // Volver a la imagen de pensamiento
      }
    }
  };

  // Mostrar una pista al azar
  const showHint = () => {
    if (hintsUsed >= 1) {
      setGameResult("Ya has usado todas las pistas disponibles.");
      return;
    }

    const availableHints = hints[selectedAlternative].filter(
      (hint) => !hintsShown.includes(hint)
    );

    if (availableHints.length === 0) {
      setGameResult("No hay más pistas disponibles.");
      return;
    }

    const randomHint =
      availableHints[Math.floor(Math.random() * availableHints.length)];
    setHintsShown([...hintsShown, randomHint]);
    setHintsUsed(hintsUsed + 1);
    setGameResult(`Pista: ${randomHint}`);
    setCurrentImage(imagen4); // Cambiar a imagen de pista
  };

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>
      <h1>Juego de Detectives</h1>
      {!gameStarted ? (
        <div>
          <p>La empresa de manufactura está perdiendo grandes sumas de dinero. Si usted fuese jefe. ¿Qué alternativas tendría</p>
          <button onClick={startGame}>Comenzar Juego</button>
        </div>
      ) : (
        <div>
          <h2>¿Qué crees esta pasando?</h2>
          <img
            src={currentImage}
            alt="Detective"
            style={{ width: "200px", height: "auto", marginBottom: "20px" }}
          />
          {!showMultipleChoice ? (
            <div>
              <p>Antes de inferir qué pasó, haz una lista de 5 causas (una por una):</p>
              <input
                type="text"
                placeholder="Escribe una causa"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <br />
              <button onClick={handleAddCause}>Agregar Causa</button>
              <p>Causas ingresadas: {userCauses.length}/5</p>
              <ul>
                {userCauses.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
              {gameResult && <p className="game-result">{gameResult}</p>}
            </div>
          ) : (
            <div>
              <h3>Selecciona la causa correcta:</h3>
              {alternatives.map((alternative, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(alternative)}
                  disabled={gameWon || multipleChoiceAttempts >= 2} // Deshabilitar si el usuario ganó o agotó los intentos
                >
                  {alternative}
                </button>
              ))}
              <br />
              <button onClick={showHint} disabled={hintsUsed >= 1}>
                Usar Pista
              </button>
              <p className="attempts-left">Intentos restantes: {2 - multipleChoiceAttempts}</p>
              {gameResult && <p className="game-result">{gameResult}</p>}
              {gameWon && (
                <div className="buttons-container">
                  
                  <button className="button" onClick={() => window.location.href = "/Juego3"}>Siguiente</button>
                  <button onClick={startGame}>Reiniciar</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetectiveGame;