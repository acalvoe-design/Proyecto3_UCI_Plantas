import "./style.css";

export const PlantaEstadoVaco = () => {
  return (
    <div className="planta-estado-vaco" data-model-id="21:396">
      <div className="container">
        <div className="setup-process-wrapper">
          <div className="setup-process">
            <div className="div">
              <div className="container-2">
                <div className="div-2">
                  <div className="label">DISPOSITIVO</div>
                </div>
                <div className="div-2">
                  <div className="title">UCI para Plantas</div>
                </div>
              </div>
              <div className="container-3">
                <img className="img" alt="Container" src="/img/container.svg" />
                <div className="container-4">
                  <img className="button" alt="Button" src="/img/button.svg" />
                  <div className="text-wrapper">
                    <div className="text">
                      <div className="alert-count">2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-5">
              <div className="container-margin">
                <div className="icon-wrapper">
                  <div className="icon">
                    <img
                      className="vector"
                      alt="Vector"
                      src="/img/vector.svg"
                    />
                    <img
                      className="vector-2"
                      alt="Vector"
                      src="/img/vector-1.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="paragraph">
                <div className="section-title">Nuevo proceso de cuidado</div>
              </div>
              <div className="paragraph-margin">
                <p className="configura-el-nombre">
                  Configura el nombre de tu planta y el tiempo de cuidado para
                  que el dispositivo UCI empiece a trabajar.
                </p>
              </div>
            </div>
            <div className="container-6">
              <div className="div-2">
                <div className="label-margin">
                  <div className="div-2">
                    <div className="text-wrapper-2">Nombre de la planta</div>
                  </div>
                </div>
                <div className="text-input">
                  <div className="text-wrapper-3">Ej: Albahaca Romina</div>
                </div>
                <div className="asigna-un-nombre-wrapper">
                  <p className="p">
                    Asigna un nombre personalizado para identificar esta planta.
                  </p>
                </div>
              </div>
              <div className="div-2">
                <div className="div-2">
                  <div className="text-wrapper-2">Duración del proceso</div>
                </div>
                <div className="container-wrapper">
                  <div className="container-7">
                    <button className="button-label-wrapper">
                      <div className="button-label">Por horas</div>
                    </button>
                    <button className="div-wrapper">
                      <div className="button-label-2">Indefinido</div>
                    </button>
                  </div>
                </div>
                <div className="container-8">
                  <div className="container-9">
                    <div className="number-input">
                      <div className="text-wrapper-4">0</div>
                    </div>
                    <div className="hours-label-wrapper">
                      <div className="hours-label">horas</div>
                    </div>
                  </div>
                  <div className="container-10">
                    <button className="hours-option-wrapper">
                      <div className="hours-option">6h</div>
                    </button>
                    <button className="hours-option-wrapper">
                      <div className="hours-option">12h</div>
                    </button>
                    <button className="hours-option-wrapper">
                      <div className="hours-option">24h</div>
                    </button>
                    <button className="hours-option-wrapper">
                      <div className="hours-option">48h</div>
                    </button>
                  </div>
                  <div className="el-proceso-se-wrapper">
                    <p className="p">
                      El proceso se detendrá automáticamente al finalizar el
                      tiempo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <button className="start-care-button-wrapper">
                <div className="start-care-button">Iniciar cuidados</div>
              </button>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="container-11">
            <button className="button-2">
              <div className="container-4">
                <div className="icon-2">
                  <img
                    className="vector"
                    alt="Vector"
                    src="/img/vector-2.svg"
                  />
                  <img
                    className="vector-2"
                    alt="Vector"
                    src="/img/vector-3.svg"
                  />
                </div>
              </div>
              <div className="navigation-label-wrapper">
                <div className="navigation-label">Planta</div>
              </div>
              <div className="text-2" />
            </button>
            <button className="button-2">
              <div className="container-4">
                <div className="icon-2">
                  <img
                    className="vector-3"
                    alt="Vector"
                    src="/img/vector-4.svg"
                  />
                  <img
                    className="vector-4"
                    alt="Vector"
                    src="/img/vector-5.svg"
                  />
                  <img
                    className="vector-5"
                    alt="Vector"
                    src="/img/vector-6.svg"
                  />
                </div>
              </div>
              <div className="text-3">
                <div className="navigation-label-2">Ambiente</div>
              </div>
            </button>
            <div className="button-3">
              <div className="container-4">
                <div className="icon-2">
                  <img
                    className="vector-6"
                    alt="Vector"
                    src="/img/vector-7.svg"
                  />
                  <img
                    className="vector-7"
                    alt="Vector"
                    src="/img/vector-8.svg"
                  />
                </div>
                <div className="alert-count-wrapper">
                  <div className="alert-count-2">2</div>
                </div>
              </div>
              <div className="text-4">
                <div className="navigation-label-2">Alertas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
