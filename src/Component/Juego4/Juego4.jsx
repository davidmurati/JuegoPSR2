import React, { useState } from "react";
import imagen1 from '../ImagenJuego/EstudianteAsustado.jpeg'; 
import imagen2 from '../ImagenJuego/EstudianteAtento.jpeg'; 
import imagen3 from '../ImagenJuego/EstudianteCurioso.jpeg'; 
import imagen4 from '../ImagenJuego/EstudianteEjercicio.jpeg'; 
import imagen6 from '../ImagenJuego/EstudianteEstudiando.jpeg'; 
import imagen7 from '../ImagenJuego/EstudianteMolesto.jpeg'; 
import imagen8 from '../ImagenJuego/EstudianteNeutro.jpeg'; 
import imagen9 from '../ImagenJuego/EstudianteNeutro2.jpeg'; 
import imagen10 from '../ImagenJuego/EstudiantePensativo.jpeg'; 
import imagen11 from '../ImagenJuego/EstudianteTriste.jpeg'; 
import "./Juego4.css"; 
import Navbar from '../Navbar/Navbar';

const StudentSurvivalGame = () => {
  // Estado del jugador
  const [health, setHealth] = useState(7);
  const [energy, setEnergy] = useState(7);
  const [moral, setMoral] = useState(Math.floor(Math.random() * 10) + 1);
  const [money, setMoney] = useState(Math.floor(Math.random() * 10) + 1);
  const [knowledge, setKnowledge] = useState(Math.floor(Math.random() * 10) + 1);
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("¡Bienvenido a la vida de estudiante! ¿Qué harás hoy?");
  const [neutralEvent, setNeutralEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState(imagen8); // Imagen neutra por defecto

  
  // Eventos positivos, negativos y neutros
  const positiveEvents = [
    {
      name: "Día de pago en el trabajo",
      effect: () => {
        setMoney(money + 3);
        setEnergy(energy - 1);
        setMessage("¡Día de pago! Ganaste $3, pero estás un poco cansado.");
        setCurrentImage(imagen2); // Estudiante atento
      },
    },
    {
      name: "Invitación a una fiesta",
      effect: () => {
        setMoral(moral + 3);
        setEnergy(energy - 2);
        setHealth(health - 1);
        setMessage("¡Fiesta! Tu moral aumentó, pero estás cansado y comiste comida poco saludable.");
        setCurrentImage(imagen3); // Estudiante curioso
      },
    },
    {
      name: "Beca académica",
      effect: () => {
        setMoney(money + 5);
        setKnowledge(knowledge + 2);
        setMessage("¡Ganaste una beca! Dinero +5, Conocimiento +2.");
        setCurrentImage(imagen10); // Estudiante pensativo
      },
    },
    {
      name: "Encuentro con un mentor",
      effect: () => {
        setKnowledge(knowledge + 3);
        setMoral(moral + 1);
        setMessage("¡Encontraste un mentor! Conocimiento +3, Moral +1.");
        setCurrentImage(imagen2); // Estudiante atento
      },
    },
    {
      name: "Comida gratis en la cafetería",
      effect: () => {
        setHealth(health + 2);
        setMoney(money + 1);
        setMessage("¡Comida gratis en la cafetería! Salud +2, Dinero +1.");
        setCurrentImage(imagen8); // Estudiante neutro
      },
    },
    {
      name: "Día de descanso inesperado",
      effect: () => {
        setEnergy(energy + 3);
        setMoral(moral + 1);
        setHealth(health + 2);
        setMessage("¡Día de descanso inesperado! Energía +3, Moral +1, Salud +2.");
        setCurrentImage(imagen9); // Estudiante neutro 2
      },
    },
  ];
  
  // Eventos negativos
  const negativeEvents = [
    {
      name: "Enfermedad",
      effect: () => {
        setHealth(health - 2);
        setEnergy(energy - 2);
        setMoral(moral - 1);
        setMessage("¡Te enfermaste! Salud -2, Energía -2, Moral -1.");
        setCurrentImage(imagen11); // Estudiante triste
      },
    },
    {
      name: "Problemas financieros",
      effect: () => {
        setMoney(money - 2);
        setMoral(moral - 1);
        setMessage("¡Problemas financieros! Dinero -3, Moral -2.");
        setCurrentImage(imagen7); // Estudiante molesto
      },
    },
    {
      name: "Mala nota en un examen",
      effect: () => {
        setMoral(moral - 2);
        setKnowledge(knowledge - 1);
        setMessage("¡Mala nota en un examen! Moral -3, Conocimiento -1.");
        setCurrentImage(imagen10); // Estudiante pensativo
      },
    },
    {
      name: "Discusión con un amigo",
      effect: () => {
        setMoral(moral - 2);
        setEnergy(energy - 1);
        setMessage("¡Discusión con un amigo! Moral -2, Energía -1.");
        setCurrentImage(imagen7); // Estudiante molesto
      },
    },
    {
      name: "Accidente en el laboratorio",
      effect: () => {
        setHealth(health - 2);
        setKnowledge(knowledge - 1);
        setMessage("¡Accidente en el laboratorio! Salud -2, Conocimiento -1.");
        setCurrentImage(imagen1); // Estudiante asustado
      },
    },
    {
      name: "Robo en la residencia",
      effect: () => {
        setMoney(money - 3);
        setMoral(moral - 2);
        setMessage("¡Robo en la residencia! Dinero -3, Moral -2.");
        setCurrentImage(imagen11); // Estudiante triste
      },
    },
  ];

  // Eventos neutros
  const neutralEvents = [
    {
      name: "Oferta de un libro usado",
      options: [
        {
          text: "Comprar el libro",
          effect: () => {
            setMoney(money - 2);
            setKnowledge(knowledge + 3);
            setMessage("Compraste el libro. Dinero -2, Conocimiento +3.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
        {
          text: "No comprar el libro",
          effect: () => {
            setMoney(money + 1);
            setKnowledge(knowledge - 1);
            setMessage("No compraste el libro. Dinero +1, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
      ],
    },
    {
      name: "Invitación a un taller extracurricular",
      options: [
        {
          text: "Asistir al taller",
          effect: () => {
            setKnowledge(knowledge + 2);
            setEnergy(energy - 2);
            setMessage("Asististe al taller. Conocimiento +2, Energía -2.");
            setCurrentImage(imagen2); // Estudiante atento
          },
        },
        {
          text: "No asistir",
          effect: () => {
            setEnergy(energy + 1);
            setKnowledge(knowledge - 1);
            setMessage("No asististe al taller. Energía +1, Conocimiento -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Oportunidad de vender apuntes viejos",
      options: [
        {
          text: "Vender los apuntes",
          effect: () => {
            setMoney(money + 3);
            setKnowledge(knowledge - 1);
            setMessage("Vendiste los apuntes. Dinero +3, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
        {
          text: "Guardar los apuntes",
          effect: () => {
            setKnowledge(knowledge + 1);
            setMoney(money - 1);
            setMessage("Guardaste los apuntes. Conocimiento +1, Dinero -1.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
      ],
    },
    {
      name: "Invitación a unirse a un club estudiantil",
      options: [
        {
          text: "Unirse al club",
          effect: () => {
            setMoral(moral + 2);
            setEnergy(energy - 1);
            setMessage("Te uniste al club. Moral +2, Energía -1.");
            setCurrentImage(imagen3); // Estudiante curioso
          },
        },
        {
          text: "No unirse al club",
          effect: () => {
            setEnergy(energy + 1);
            setMoral(moral - 1);
            setMessage("No te uniste al club. Energía +1, Moral -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Encuentro con un profesor en la cafetería",
      options: [
        {
          text: "Hablar con el profesor",
          effect: () => {
            setKnowledge(knowledge + 2);
            setEnergy(energy - 1);
            setMessage("Hablaste con el profesor. Conocimiento +2, Energía -1.");
            setCurrentImage(imagen2); // Estudiante atento
          },
        },
        {
          text: "Ignorar al profesor",
          effect: () => {
            setEnergy(energy + 1);
            setKnowledge(knowledge - 1);
            setMessage("Ignoraste al profesor. Energía +1, Conocimiento -1.");
            setCurrentImage(imagen7); // Estudiante molesto
          },
        },
      ],
    },
    {
      name: "Oferta de un trabajo de medio tiempo",
      options: [
        {
          text: "Aceptar el trabajo",
          effect: () => {
            setMoney(money + 4);
            setEnergy(energy - 2);
            setMessage("Aceptaste el trabajo. Dinero +4, Energía -3.");
            setCurrentImage(imagen4); // Estudiante haciendo ejercicio (activo)
          },
        },
        {
          text: "Rechazar el trabajo",
          effect: () => {
            setEnergy(energy + 2);
            setMoney(money - 2);
            setMessage("Rechazaste el trabajo. Energía +2, Dinero -2.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Invitación a un viaje de fin de semana",
      options: [
        {
          text: "Ir de viaje",
          effect: () => {
            setMoral(moral + 3);
            setEnergy(energy - 1);
            setMoney(money - 2);
            setHealth(health + 1);
            setMessage("Fuiste de viaje. Moral +3, Energía -1, Dinero -2, Salud +1.");
            setCurrentImage(imagen3); // Estudiante curioso
          },
        },
        {
          text: "No ir de viaje",
          effect: () => {
            setEnergy(energy + 2);
            setMoral(moral - 1);
            setMessage("No fuiste de viaje. Energía +2, Moral -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Oportunidad de tomar un curso en línea gratuito",
      options: [
        {
          text: "Tomar el curso",
          effect: () => {
            setKnowledge(knowledge + 3);
            setEnergy(energy - 2);
            setMessage("Tomaste el curso. Conocimiento +3, Energía -2.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
        {
          text: "No tomar el curso",
          effect: () => {
            setEnergy(energy + 1);
            setKnowledge(knowledge - 1);
            setMessage("No tomaste el curso. Energía +1, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
      ],
    },
    {
      name: "Encuentro con un compañero que necesita ayuda",
      options: [
        {
          text: "Ayudar al compañero",
          effect: () => {
            setMoral(moral + 2);
            setEnergy(energy - 1);
            setMessage("Ayudaste al compañero. Moral +2, Energía -1.");
            setCurrentImage(imagen2); // Estudiante atento
          },
        },
        {
          text: "No ayudar",
          effect: () => {
            setEnergy(energy + 1);
            setMoral(moral - 1);
            setMessage("No ayudaste al compañero. Energía +1, Moral -1.");
            setCurrentImage(imagen7); // Estudiante molesto
          },
        },
      ],
    },
    {
      name: "Jornada de Salud gratis",
      options: [
        {
          text: "Asistir al evento",
          effect: () => {
            setHealth(health + 3);
            setEnergy(energy - 1);
            setMessage("Asististe al evento. Salud +3, Energía -1.");
            setCurrentImage(imagen3); // Estudiante curioso
          },
        },
        {
          text: "No asistir",
          effect: () => {
            setEnergy(energy + 1);
            setHealth(health - 1);
            setMessage("No asististe al evento. Energía +1, Salud -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Invitación a un debate académico",
      options: [
        {
          text: "Participar en el debate",
          effect: () => {
            setKnowledge(knowledge + 3);
            setEnergy(energy - 2);
            setMessage("Participaste en el debate. Conocimiento +3, Energía -2.");
            setCurrentImage(imagen2); // Estudiante atento
          },
        },
        {
          text: "No participar",
          effect: () => {
            setEnergy(energy + 1);
            setKnowledge(knowledge - 1);
            setMessage("No participaste en el debate. Energía +1, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
      ],
    },
    {
      name: "Oportunidad de donar sangre",
      options: [
        {
          text: "Donar sangre",
          effect: () => {
            setMoral(moral + 3);
            setHealth(health - 1);
            setMessage("Donaste sangre. Moral +3, Salud -1.");
            setCurrentImage(imagen4); // Estudiante haciendo ejercicio (activo)
          },
        },
        {
          text: "No donar sangre",
          effect: () => {
            setMoral(moral - 1);
            setMessage("No donaste sangre. Moral -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Invitación a una sesión de estudio grupal",
      options: [
        {
          text: "Unirse al grupo",
          effect: () => {
            setKnowledge(knowledge + 2);
            setEnergy(energy - 1);
            setHealth(health + 1);
            setMessage("Te uniste al grupo de estudio. Conocimiento +2, Energía -1, Salud +1.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
        {
          text: "Estudiar solo",
          effect: () => {
            setEnergy(energy + 1);
            setKnowledge(knowledge - 1);
            setMessage("Estudiaste solo. Energía +1, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
      ],
    },
    {
      name: "Oferta de un descuento en material de estudio",
      options: [
        {
          text: "Aprovechar el descuento",
          effect: () => {
            setMoney(money - 2);
            setKnowledge(knowledge + 2);
            setMessage("Aprovechaste el descuento. Dinero -2, Conocimiento +2.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
        {
          text: "No aprovechar el descuento",
          effect: () => {
            setMoney(money + 1);
            setKnowledge(knowledge - 1);
            setMessage("No aprovechaste el descuento. Dinero +1, Conocimiento -1.");
            setCurrentImage(imagen10); // Estudiante pensativo
          },
        },
      ],
    },
    {
      name: "Invitación a una caminata al aire libre",
      options: [
        {
          text: "Ir de caminata",
          effect: () => {
            setHealth(health + 3);
            setEnergy(energy - 1);
            setMessage("Fuiste de caminata. Salud +3, Energía -1.");
            setCurrentImage(imagen4); // Estudiante haciendo ejercicio (activo)
          },
        },
        {
          text: "No ir de caminata",
          effect: () => {
            setEnergy(energy + 1);
            setHealth(health - 1);
            setMessage("No fuiste de caminata. Energía +1, Salud -1.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Oportunidad de trabajo extra",
      options: [
        {
          text: "Aceptar el trabajo",
          effect: () => {
            setMoney(money + 4);
            setEnergy(energy - 3);
            setMessage("Aceptaste el trabajo extra. Dinero +4, Energía -3.");
            setCurrentImage(imagen4); // Estudiante haciendo ejercicio (activo)
          },
        },
        {
          text: "Rechazar el trabajo",
          effect: () => {
            setEnergy(energy + 2);
            setMoney(money - 2);
            setMessage("Rechazaste el trabajo extra. Energía +2, Dinero -2.");
            setCurrentImage(imagen8); // Estudiante neutro
          },
        },
      ],
    },
    {
      name: "Invitación a un evento social",
      options: [
        {
          text: "Asistir al evento",
          effect: () => {
            setMoral(moral + 3);
            setEnergy(energy - 2);
            setMessage("Asististe al evento social. Moral +3, Energía -2.");
            setCurrentImage(imagen3); // Estudiante curioso
          },
        },
        {
          text: "No asistir y estudiar",
          effect: () => {
            setKnowledge(knowledge + 2);
            setMoral(moral - 1);
            setMessage("No asististe al evento y estudiaste. Conocimiento +2, Moral -1.");
            setCurrentImage(imagen6); // Estudiante estudiando
          },
        },
      ],
    },
    {
      name: "Ayudar a un compañero con su tarea",
      options: [
        {
          text: "Ayudar",
          effect: () => {
            setMoral(moral + 2);
            setEnergy(energy - 1);
            setMessage("Ayudaste a tu compañero. Moral +2, Energía -1.");
            setCurrentImage(imagen2); // Estudiante atento
          },
        },
        {
          text: "No ayudar",
          effect: () => {
            setEnergy(energy + 1);
            setMoral(moral - 1);
            setMessage("No ayudaste a tu compañero. Energía +1, Moral -1.");
            setCurrentImage(imagen7); // Estudiante molesto
          },
        },
      ],
    },
    {
      name: "Comprar comida saludable vs. comida rápida",
      options: [
        {
          text: "Comida saludable",
          effect: () => {
            setHealth(health + 2);
            setMoney(money - 2);
            setMessage("Compraste comida saludable. Salud +2, Dinero -2.");
            setCurrentImage(imagen4); // Estudiante haciendo ejercicio (activo)
          },
        },
        {
          text: "Comida rápida",
          effect: () => {
            setHealth(health - 1);
            setMoney(money - 1);
            setMessage("Compraste comida rápida. Salud -1, Dinero -1.");
            setCurrentImage(imagen7); // Estudiante molesto
          },
        },
      ],
    },
  ];

  // Eventos especiales semanales
  const weeklyEvents = [
    {
      name: "Examen sorpresa",
      requirements: {
        knowledge: 3, // Requiere +3 de conocimiento
      },
      success: {
        knowledge: 2, // Conocimiento +2 si se aprueba
        moral: 2,     // Moral +2 si se aprueba
      },
      failure: {
        knowledge: -1, // Conocimiento -1 si se falla
        moral: -2,     // Moral -2 si se falla
      },
      effect: () => {
        if (knowledge >= 3) {
          setKnowledge(knowledge + 2);
          setMoral(moral + 2);
          setMessage("¡Aprobaste el examen sorpresa! Conocimiento +2, Moral +2.");
          setCurrentImage(imagen2); // Estudiante atento (éxito)
        } else {
          setKnowledge(knowledge - 1);
          setMoral(moral - 2);
          setMessage("¡Fallaste el examen sorpresa! Conocimiento -1, Moral -2.");
          setCurrentImage(imagen1); // Estudiante asustado (fracaso)
        }
      },
    },
    {
      name: "Torneo deportivo",
      requirements: {
        energy: 2, // Requiere +2 de energía
        health: 1, // Requiere +1 de salud
      },
      success: {
        moral: 3,  // Moral +3 si se gana
        health: 1, // Salud +1 si se gana
      },
      failure: {
        energy: -2, // Energía -2 si se pierde
        moral: -1,  // Moral -1 si se pierde
      },
      effect: () => {
        if (energy >= 2 && health >= 1) {
          setMoral(moral + 3);
          setHealth(health + 1);
          setMessage("¡Ganaste el torneo deportivo! Moral +3, Salud +1.");
          setCurrentImage(imagen4); // Estudiante haciendo ejercicio (éxito)
        } else {
          setEnergy(energy - 2);
          setMoral(moral - 1);
          setMessage("¡Perdiste el torneo deportivo! Energía -2, Moral -1.");
          setCurrentImage(imagen11); // Estudiante triste (fracaso)
        }
      },
    },
    {
      name: "Crisis emocional",
      requirements: {
        moral: 2, // Requiere +2 de moral
      },
      success: {
        moral: 3,  // Moral +3 si se supera
        health: 1, // Salud +1 si se supera
      },
      failure: {
        moral: -3, // Moral -3 si no se supera
        energy: -2, // Energía -2 si no se supera
      },
      effect: () => {
        if (moral >= 2) {
          setMoral(moral + 3);
          setHealth(health + 1);
          setMessage("¡Superaste la crisis emocional! Moral +3, Salud +1.");
          setCurrentImage(imagen10); // Estudiante pensativo (éxito)
        } else {
          setMoral(moral - 3);
          setEnergy(energy - 2);
          setMessage("¡No superaste la crisis emocional! Moral -3, Energía -2.");
          setCurrentImage(imagen7); // Estudiante molesto (fracaso)
        }
      },
    },
    {
      name: "Examen final",
      requirements: {
        knowledge: 4, // Requiere +4 de conocimiento
        energy: 2,    // Requiere +2 de energía
      },
      success: {
        knowledge: 4, // Conocimiento +4 si se aprueba
        moral: 3,     // Moral +3 si se aprueba
      },
      failure: {
        knowledge: -2, // Conocimiento -2 si se falla
        moral: -3,     // Moral -3 si se falla
      },
      effect: () => {
        if (knowledge >= 4 && energy >= 2) {
          setKnowledge(knowledge + 4);
          setMoral(moral + 3);
          setMessage("¡Aprobaste el examen final! Conocimiento +4, Moral +3.");
          setCurrentImage(imagen2); // Estudiante atento (éxito)
        } else {
          setKnowledge(knowledge - 2);
          setMoral(moral - 3);
          setMessage("¡Fallaste el examen final! Conocimiento -2, Moral -3.");
          setCurrentImage(imagen1); // Estudiante asustado (fracaso)
        }
      },
    },
  ];

  // Función para manejar el paso del día
  const handleNextDay = () => {
    if (gameOver) return;

    // Verificar si el jugador perdió
    if (health <= 0 || energy <= 0 || moral <= 0 || money <= 0 || knowledge <= 0) {
      setGameOver(true);
      setMessage("¡Perdiste! No lograste sobrevivir como estudiante.");
      setCurrentImage(imagen11); // Estudiante triste
      return;
    }

    // Verificar si el jugador ganó
    if (week > 4) {
      setGameOver(true);
      setMessage("¡Felicidades! Sobreviviste las 4 semanas como estudiante.");
      setCurrentImage(imagen2); // Estudiante atento
      return;
    }

    // Verificar si es el último día de la semana (día 7)
    if (day === 7) {
      const event = weeklyEvents[Math.floor(Math.random() * weeklyEvents.length)];
      event.effect();
      setWeek(week + 1);
      setDay(1);
      return;
    }

    // Seleccionar un evento aleatorio
    const eventType = Math.random();
    if (eventType < 0.25) {
      const event = positiveEvents[Math.floor(Math.random() * positiveEvents.length)];
      event.effect();
    } else if (eventType < 0.5) {
      const event = negativeEvents[Math.floor(Math.random() * negativeEvents.length)];
      event.effect();
    } else {
      const event = neutralEvents[Math.floor(Math.random() * neutralEvents.length)];
      setMessage(event.name);
      setNeutralEvent(event);
      setCurrentImage(imagen10); // Estudiante pensativo
      return;
    }

    // Pasar al siguiente día
    setDay(day + 1);
  };

  return (
    <div className="game-container">
      <header className="header">
        <Navbar />
      </header>
      <h1>Supervivencia Estudiantil</h1>
      <img src={currentImage} alt="Estado del estudiante" style={{ width: '200px', height: '200px' }} />
      <p>{message}</p>
      <div className="stats">
        <p>Semana: {week}/4</p>
        <p>Día: {day}/7</p>
        <p>Salud: {health}</p>
        <p>Energía: {energy}</p>
        <p>Moral: {moral}</p>
        <p>Dinero: {money}</p>
        <p>Conocimiento: {knowledge}</p>
      </div>
      
      {!gameOver ? (
        neutralEvent ? (
          <div className="neutral-event">
            <p>{neutralEvent.name}</p>
            {neutralEvent.options.map((option, index) => (
              <button key={index} onClick={() => { option.effect(); setNeutralEvent(null); }}>
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <button onClick={handleNextDay}>Pasar al siguiente día</button>
        )
      ) : (
        <button onClick={() => window.location.reload()}>Jugar de nuevo</button>
      )}
    </div>
  );
};

export default StudentSurvivalGame;