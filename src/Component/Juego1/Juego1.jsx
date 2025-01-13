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
    "El hombre esta herido o tenía un problema médico",
    "El vaso de agua estaba contaminado",
    "El hombre tenía una intención oculta o era amenazante",
    "Era un malentendido o broma",
    "El hombre era un fantasma o una ilusión",
    "La mesera tenia un problema personal",
  ];

  // Pistas para cada alternativa
  const hints = {
    "El hombre tenía un problema médico": [
      "En el suelo cerca del mostrador hay un frasco de pastillas vacío con la etiqueta 'Para el corazón'.",
      "Un testigo menciona que el hombre parecía pálido y sudoroso antes de pedir el agua.",
      "La joven que atendía tenía un manual de primeros auxilios abierto en la barra.",
      "En el vaso de agua hay restos de un polvo blanco (podría ser medicamento disuelto).",
      "Una cámara de seguridad muestra al hombre agarrando su pecho antes de caer al suelo.",
    ],
    "El vaso de agua estaba contaminado": [
      "En el fregadero del bar hay un frasco con una etiqueta de 'Veneno' medio escondido.",
      "La joven tiene marcas de quemaduras químicas en las manos.",
      "Un cliente habitual menciona que la joven estaba discutiendo con alguien en la cocina antes del incidente.",
      "El agua del vaso tiene un olor extraño y un color ligeramente turbio.",
      "En la basura hay un guante de látex manchado con una sustancia desconocida.",
    ],
    "El hombre tenía una intención oculta o era amenazante": [
      "En el bolsillo del hombre hay un arma escondida.",
      "La joven tiene una nota en su bolsillo que dice: 'No te acerques a él'.",
      "Un cliente recuerda que el hombre estaba mirando fijamente a la joven antes de pedir el agua.",
      "En la cámara de seguridad se ve al hombre sacar algo brillante de su chaqueta.",
      "La joven tiene moretones en los brazos, como si hubiera forcejeado con alguien.",
    ],
    "Era un malentendido o broma": [
      "En el mostrador hay un teléfono con un mensaje de texto que dice: 'Es solo una broma, no te asustes'.",
      "La joven tiene una expresión de enojo en las imágenes de la cámara de seguridad.",
      "Un cliente menciona que el hombre estaba riéndose antes de pedir el agua.",
      "En el suelo hay un juguete de broma que parece un ratón falso.",
      "La joven le dice a un compañero: 'No puedo creer que me haya hecho eso otra vez'.",
    ],
    "El hombre era un fantasma o una ilusión": [
      "En la cámara de seguridad, el hombre aparece y desaparece de repente.",
      "La joven tiene un libro abierto sobre historias de fantasmas locales.",
      "El vaso de agua está intacto, como si nadie lo hubiera tocado.",
      "Un cliente menciona que el bar está construido sobre un antiguo cementerio.",
      "La joven tiene una foto antigua en la que aparece un hombre idéntico al que pidió el agua, pero la foto es de hace 100 años.",
    ],
    "La mesera tenia un problema personal": [
        "La chama tenia un fuerte dolor de cabeza.",
        "La joven tiene un papa enfermo",
        "La joven no apago la cocina",
        "La chama tiene dolor corporal",
        "La joven tiene gripe",
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
      if (multipleChoiceAttempts >= 2) {
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
    if (hintsUsed >= 2) {
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
          <p>Un hombre entra en un bar y pide un vaso de agua. La joven que atiende le da un vaso de agua y grita inmediatamente después. ¿Qué explicaciones posibles existen en este caso?</p>
          <button onClick={startGame}>Comenzar Juego</button>
        </div>
      ) : (
        <div>
          <h2>¿Qué crees que pasó?</h2>
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
                  disabled={gameWon || multipleChoiceAttempts >= 3} // Deshabilitar si el usuario ganó o agotó los intentos
                >
                  {alternative}
                </button>
              ))}
              <br />
              <button onClick={showHint} disabled={hintsUsed >= 2}>
                Usar Pista
              </button>
              <p className="attempts-left">Intentos restantes: {3 - multipleChoiceAttempts}</p>
              {gameResult && <p className="game-result">{gameResult}</p>}
              {gameWon && (
                <div className="buttons-container">

                  <button className="button" onClick={() => window.location.href = "/Juego2"}>Siguiente</button>
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