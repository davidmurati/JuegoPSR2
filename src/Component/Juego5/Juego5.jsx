import React, { useReducer, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';


// Función para generar un número entero aleatorio entre un mínimo y un máximo
const generarEnteroAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Estado inicial del juego
const initialState = {
  recursos: {
    anticuerpos: 20,
    globulosBlancos: 10,
    energia: generarEnteroAleatorio(40, 100), // Energía inicial aleatoria entre 40 y 100
  },
  salud: 100,
  oleada: 1,
  virusActivos: [],
  puntuacion: 0,
  medicinaUsada: false, // Estado para rastrear si la medicina ya fue usada
};

// Reducer para manejar las acciones del juego
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ATACAR_VIRUS':
      const { virusIndex, recursoUsado } = action.payload;
      const virus = state.virusActivos[virusIndex];
      let recursosActualizados = { ...state.recursos };
      let saludActualizada = state.salud;
      let virusActualizados = [...state.virusActivos];
      let puntuacionActualizada = state.puntuacion;

      // Calcular el costo del ataque según el tipo de enemigo
      let costoRecurso = 0;
      if (virus.tipo === 'virus') {
        // Los virus son más débiles contra anticuerpos
        costoRecurso =
          recursoUsado === 'anticuerpos'
            ? virus.fuerza
            : virus.fuerza + virus.resistenciaBase;
      } else if (virus.tipo === 'bacteria') {
        // Las bacterias son más débiles contra glóbulos blancos
        costoRecurso =
          recursoUsado === 'globulosBlancos'
            ? virus.fuerza
            : virus.fuerza + virus.resistenciaBase;
      }

      // Verificar si el recurso usado es suficiente
      if (recursosActualizados[recursoUsado] >= costoRecurso) {
        recursosActualizados[recursoUsado] -= costoRecurso;
        virusActualizados.splice(virusIndex, 1); // Eliminar enemigo derrotado
        puntuacionActualizada += 1;
      } else {
        saludActualizada -= virus.fuerza; // El cuerpo sufre daño
        recursosActualizados.globulosBlancos += 5; // Incrementar glóbulos blancos al recibir daño
      }

      // Recompensa si se vence la oleada
      if (virusActualizados.length === 0) {
        recursosActualizados.anticuerpos += 5;
        recursosActualizados.globulosBlancos += 3;
        recursosActualizados.energia += 10;
      }

      return {
        ...state,
        recursos: recursosActualizados,
        salud: saludActualizada,
        virusActivos: virusActualizados,
        puntuacion: puntuacionActualizada,
      };

    case 'GENERAR_ANTICUERPOS':
      if (state.recursos.energia >= 5) {
        return {
          ...state,
          recursos: {
            ...state.recursos,
            anticuerpos: state.recursos.anticuerpos + 5,
            energia: state.recursos.energia - 5,
          },
        };
      } else {
        alert('No tienes suficiente energía para generar anticuerpos.');
        return state;
      }

    case 'GENERAR_GLOBULOS_BLANCOS':
      if (state.recursos.energia >= 5) {
        return {
          ...state,
          recursos: {
            ...state.recursos,
            globulosBlancos: state.recursos.globulosBlancos + 2,
            energia: state.recursos.energia - 5,
          },
        };
      } else {
        alert('No tienes suficiente energía para generar glóbulos blancos.');
        return state;
      }

    case 'TOMAR_MEDICINA':
      if (!state.medicinaUsada && state.recursos.energia >= 5) {
        return {
          ...state,
          recursos: {
            ...state.recursos,
            energia: state.recursos.energia - 5,
          },
          salud: Math.min(state.salud + 10, 100), // Aumentar salud sin exceder 100
          medicinaUsada: true, // Marcar la medicina como usada
        };
      } else if (state.medicinaUsada) {
        alert('Ya usaste la medicina en esta partida.');
        return state;
      } else {
        alert('No tienes suficiente energía para tomar medicina.');
        return state;
      }

    case 'NUEVA_OLEADA':
      const nuevosVirus = generarEnemigos(state.oleada);
      return {
        ...state,
        oleada: state.oleada + 1,
        virusActivos: nuevosVirus,
      };

    case 'REINICIAR_JUEGO':
      return {
        ...initialState,
        recursos: {
          ...initialState.recursos,
          energia: generarEnteroAleatorio(40, 100), // Nueva energía aleatoria al reiniciar
        },
      };

    default:
      return state;
  }
};

// Función para generar enemigos en cada oleada
const generarEnemigos = (oleada) => {
  const enemigos = [];
  const tiposEnemigos = ['Virus A', 'Virus C', 'Bacteria B'];
  const resistenciaBase = 5; // Resistencia base para los enemigos

  for (let i = 0; i < oleada; i++) {
    const tipoAleatorio =
      tiposEnemigos[Math.floor(Math.random() * tiposEnemigos.length)];
    const fuerza = Math.min(Math.floor(Math.random() * 5) + 1 + oleada, 10); // Fuerza máxima de 10
    enemigos.push({
      nombre: `${tipoAleatorio} ${i + 1}`,
      tipo: tipoAleatorio.includes('Virus') ? 'virus' : 'bacteria',
      fuerza: fuerza,
      resistenciaBase: resistenciaBase,
    });
  }
  return enemigos;
};

// Componente para mostrar los recursos
function RecursosDisplay({ recursos }) {
  return (
    <div>
      <h2>Recursos</h2>
      <p>Anticuerpos: {recursos.anticuerpos}</p>
      <p>Glóbulos Blancos: {recursos.globulosBlancos}</p>
      <p>Energía: {recursos.energia}</p>
    </div>
  );
}

// Componente para mostrar los enemigos activos
function EnemigosDisplay({ enemigosActivos, onAtacar }) {
  return (
    <div>
      <h2>Enemigos Activos</h2>
      {enemigosActivos.map((enemigo, index) => {
        // Calcular el daño que puede soportar según el recurso
        const dañoSoportaAnticuerpos =
          enemigo.tipo === 'virus'
            ? enemigo.resistenciaBase
            : enemigo.resistenciaBase + enemigo.fuerza;

        const dañoSoportaGlobulosBlancos =
          enemigo.tipo === 'bacteria'
            ? enemigo.resistenciaBase
            : enemigo.resistenciaBase + enemigo.fuerza;

        return (
          <div key={index}>
            <p>
              {enemigo.nombre} (Fuerza: {enemigo.fuerza})
            </p>
            <p>
              Daño que soporta:
              <ul>
                <li>Anticuerpos: {dañoSoportaAnticuerpos}</li>
                <li>Glóbulos Blancos: {dañoSoportaGlobulosBlancos}</li>
              </ul>
            </p>
            <button onClick={() => onAtacar(index, 'anticuerpos')}>
              Usar Anticuerpos
            </button>
            <button onClick={() => onAtacar(index, 'globulosBlancos')}>
              Usar Glóbulos Blancos
            </button>
          </div>
        );
      })}
    </div>
  );
}

// Componente para mostrar la salud del cuerpo
function SaludDisplay({ salud }) {
  return (
    <div>
      <h2>Salud del Cuerpo</h2>
      <p>{salud}%</p>
    </div>
  );
}

// Componente para mostrar el nivel actual y el progreso
function NivelDisplay({ oleada }) {
  const oleadasParaGanar = 7; // Total de oleadas para ganar el juego
  const oleadasRestantes = oleadasParaGanar - oleada;

  return (
    <div>
      <h2>Nivel Actual: {oleada}</h2>
      <p>Oleadas restantes para ganar: {oleadasRestantes}</p>
    </div>
  );
}

// Componente principal del juego
function JuegoSistemaInmunologico() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [juegoGanado, setJuegoGanado] = useState(false); // Estado para rastrear si el juego fue ganado

  const handleAtacar = (virusIndex, recursoUsado) => {
    dispatch({ type: 'ATACAR_VIRUS', payload: { virusIndex, recursoUsado } });
  };

  const handleGenerarAnticuerpos = () => {
    dispatch({ type: 'GENERAR_ANTICUERPOS' });
  };

  const handleGenerarGlobulosBlancos = () => {
    dispatch({ type: 'GENERAR_GLOBULOS_BLANCOS' });
  };

  const handleTomarMedicina = () => {
    dispatch({ type: 'TOMAR_MEDICINA' });
  };

  const handleNuevaOleada = () => {
    dispatch({ type: 'NUEVA_OLEADA' });
  };

  const handleReiniciarJuego = () => {
    dispatch({ type: 'REINICIAR_JUEGO' });
    setJuegoGanado(false); // Reiniciar el estado de juego ganado
  };

  // Efecto para verificar si el jugador ganó o perdió
  useEffect(() => {
    if (state.salud <= 0) {
      alert('¡El cuerpo colapsó! Perdiste. Reiniciando el juego...');
      dispatch({ type: 'REINICIAR_JUEGO' });
    } else if (state.oleada > 7) {
      setJuegoGanado(true); // Marcar el juego como ganado
    }
  }, [state.salud, state.oleada]);

  return (
    <div>
        <header className="header">
        <Navbar />
      </header>
      <h1>Defiende el Cuerpo</h1>
      {juegoGanado ? (
        <div>
          <h2>¡Felicidades, ganaste el juego!</h2>
          <button onClick={handleReiniciarJuego}>Reiniciar Juego</button>
        </div>
      ) : (
        <>
          <NivelDisplay oleada={state.oleada} />
          <RecursosDisplay recursos={state.recursos} />
          <SaludDisplay salud={state.salud} />
          <EnemigosDisplay
            enemigosActivos={state.virusActivos}
            onAtacar={handleAtacar}
          />
          <button onClick={handleGenerarAnticuerpos}>
            Generar Anticuerpos (Costo: 5 energía)
          </button>
          <button onClick={handleGenerarGlobulosBlancos}>
            Generar Glóbulos Blancos (Costo: 5 energía)
          </button>
          <button onClick={handleTomarMedicina} disabled={state.medicinaUsada}>
            Tomar Medicina (Costo: 5 energía, +10 salud, 1 uso)
          </button>
          <button onClick={handleNuevaOleada}>Nueva Oleada</button>
        </>
      )}
    </div>
  );
}

export default JuegoSistemaInmunologico;