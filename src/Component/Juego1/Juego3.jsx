import React, { useState } from "react";
import imagen1 from '../ImagenJuego/DetectiveDerrota.jpg'; // Imagen de derrota
import imagen2 from '../ImagenJuego/DetectiveGano.jpeg'; // Imagen de victoria
import imagen3 from '../ImagenJuego/DetectivePensando.jpeg'; // Imagen de pensamiento
import imagen4 from '../ImagenJuego/DetectivePensando2.jpeg'; // Imagen de pensamiento 2
import imagen6 from '../ImagenJuego/DetectivePensando3.jpeg'; // Imagen de pensamiento 3
import "./Juego1.css";
import Navbar from '../Navbar/Navbar';

const DetectiveGame3 = ({ onGoToMainMenu }) => { // Recibe una función para ir al menú principal
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


  const alternatives = [
    "El conductor tenía una condición médica preexistente",
    "El conductor sufrió un ataque al corazón (infarto)",
    "El conductor sufrió una picadura de avispa y perdió el control.",
    "El conductor tuvo una reacción alérgica grave",
    "El conductor estaba bajo los efectos de medicamentos o drogas",
    "El conductor fue asesinado primero, y luego fue colocado en el auto estrellado.",
  ];

  // Alternativas posibles
  const hints = {
    "El conductor tenía una condición médica preexistente": [
      "El conductor tenía un historial de problemas cardíacos.",
      "En la guantera del auto había recetas médicas para tratar una condición crónica.",
      "Un familiar menciona que el conductor había estado en tratamiento médico recientemente.",
      "El conductor llevaba una pulsera de alerta médica.",
      "En el teléfono del conductor había recordatorios para tomar medicamentos.",
    ],
    "El conductor sufrió un ataque al corazón (infarto)": [
      "El conductor se quejó de dolor en el pecho antes del incidente.",
      "Un testigo menciona que el conductor se agarraba el pecho antes de perder el control del auto.",
      "En el auto había un botiquín de primeros auxilios con medicamentos para el corazón.",
      "El conductor tenía un historial de presión arterial alta.",
      "El conductor mostraba signos de sudoración excesiva antes del incidente.",
    ],
    "El conductor sufrió una picadura de avispa y perdió el control.": [
      "El conductor sufre de reacciones alerica",
      "El día del incidente el salia de un parque",
      "En el auto tenia mucha plaga",
      "El conductor tiene fobia a los insectos",
      "El conductor le tiene miedo a los insectos",
    ],
    "El conductor tuvo una reacción alérgica grave": [
      "El conductor había comido algo nuevo antes del incidente.",
      "En el auto había un autoinyector de epinefrina (EpiPen).",
      "El conductor tenía un historial de alergias graves.",
      "Un testigo menciona que el conductor tenía dificultad para respirar antes del incidente.",
      "El conductor mostraba signos de hinchazón en la cara o el cuello.",
    ],
    "El conductor estaba bajo los efectos de medicamentos o drogas": [
      "En el auto había frascos de pastillas sin receta médica.",
      "El conductor tenía un historial de abuso de sustancias.",
      "Un testigo menciona que el conductor parecía somnoliento o desorientado.",
      "El conductor había estado en una fiesta o evento social antes del incidente.",
      "En el auto había restos de alcohol o drogas.",
    ],
    "El conductor fue asesinado primero, y luego fue colocado en el auto estrellado.": [
      "El conductor tenía un historial de deudas.",
      "En el auto no corresponde con el que el manejaba",
      "El conductor tiene lesiones no pertenecientes al choque",
      "Un testigo menciona que el conductor dias antes parecía confundido o tembloroso.",
      "El conductor trabajaba en pollos hermanos",
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
      setGameResult("¡Correcto! Has seleccionado la causa correcta. ¡Felicidades!");
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
          <p>Aparece un carro estrellado en el fondo de un barranco y el conductor está muerto. ¿Qué pudo haber sucedido?.</p>
          <button onClick={startGame}>Comenzar Juego</button>
        </div>
      ) : (
        <div>
          <h2>¿Qué crees que está pasando?</h2>
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
                  <p>¡Felicidades! Has resuelto el caso.</p>
                  <button className="button" onClick={() => window.location.href = "/Menu"}>Ir al Menú Principal</button>
                  <button onClick={startGame}>Jugar de nuevo</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetectiveGame3;