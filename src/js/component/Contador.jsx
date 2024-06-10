import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Counter() {
  const [horaUnidad, setHoraUnidad] = useState(0);
  const [horaDecena, setHoraDecena] = useState(0);
  const [minutoUnidad, setMinutoUnidad] = useState(0);
  const [minutoDecena, setMinutoDecena] = useState(0);
  const [segundoUnidad, setSegundoUnidad] = useState(0);
  const [segundoDecena, setSegundoDecena] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  let intervalId = null;

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        if (segundoDecena === 9) {
          setSegundoDecena(0);
          if (segundoUnidad === 5) {
            setSegundoUnidad(0);
            incrementarMinuto();
          } else {
            setSegundoUnidad(segundoUnidad + 1);
          }
        } else {
          setSegundoDecena(segundoDecena + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isPaused, segundoDecena, segundoUnidad]);

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    resetearValores();
    setIsRunning(false);
    setIsPaused(false);
  };

  const resetearValores = () => {
    setHoraUnidad(0);
    setHoraDecena(0);
    setMinutoUnidad(0);
    setMinutoDecena(0);
    setSegundoUnidad(0);
    setSegundoDecena(0);
  };

  const handleResume = () => {
      setIsRunning(true);
      setIsPaused(false);
  };

  function incrementarMinuto() {
    if (minutoDecena === 9) {
      setMinutoDecena(0);
      if (minutoUnidad === 5) {
        setMinutoUnidad(0);
        incrementarHora();
      } else {
        setMinutoUnidad(minutoUnidad + 1);
      }
    } else {
      setMinutoDecena(minutoDecena + 1);
    }
  }

  const incrementarHora = () => {
    if (horaDecena === 2) {
      setHoraDecena(0);
      if (horaUnidad === 9) {
        setHoraUnidad(0);
      } else {
        setHoraUnidad(horaUnidad + 1);
      }
    } else {
      setHoraDecena(horaDecena + 1);
    }
  };

  return (
    <div className="container">
      <div className="reloj">
        <div className="icono-reloj"><i class="bi bi-clock"></i></div>
        <div className="hora">
          <div className="hora-unidad">{horaUnidad}</div>
          <div className="hora-decena">{horaDecena}</div>
        </div>
        <div className="separador-hora">:</div>
        <div className="minuto">
          <div className="minuto-unidad">{minutoUnidad}</div>
          <div className="minuto-decena">{minutoDecena}</div>
        </div>
            <div className="separador-minuto">:</div>
            <div className="segundo">
              <div className="segundo-unidad">{segundoUnidad}</div>
              <div className="segundo-decena">{segundoDecena}</div>
            </div>
          </div>
          <div className="controlbotones">
            <button type="button" class="btn btn-dark m-2" onClick={handlePause}>Pausa</button>
            <button type="button" class="btn btn-dark m-2" onClick={handleReset}>Reiniciar</button>
            <button type="button" class="btn btn-dark m-2" onClick={handleResume}>Play</button>
          </div>
        </div>
      );
    }
    
    function App() {
      return (
        <div>
          <Counter />
        </div>
      );
    }
    
    export default App;