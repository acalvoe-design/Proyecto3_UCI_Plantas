import "./style.css";

export const ConfiguracinProceso = () => {
  return (
    <div className="configuracin-proceso" data-model-id="24:703">
      <div className="interfaz-de-gestin">
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
                <img className="img" alt="Container" src="/img/container.svg" />
              </div>
              <div className="container-3">
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
                  <div className="text-wrapper">Nuevo proceso de cuidado</div>
                </div>
                <div className="paragraph-margin">
                  <p className="configura-el-nombre">
                    Configura el nombre de tu planta y el tiempo de cuidado para
                    que el dispositivo UCI empiece a trabajar.
                  </p>
                </div>
              </div>
              <div className="container-4">
                <div className="div-2">
                  <div className="label-margin">
                    <div className="div-2">
                      <div className="label-2">Nombre de la planta</div>
                    </div>
                  </div>
                  <div className="text-input">
                    <div className="text-wrapper-2">Albahaca Romina</div>
                  </div>
                  <div className="asigna-un-nombre-wrapper">
                    <p className="asigna-un-nombre">
                      Asigna un nombre personalizado para identificar esta
                      planta.
                    </p>
                  </div>
                </div>
                <div className="div-2">
                  <div className="div-2">
                    <div className="label-2">Duración del proceso</div>
                  </div>
                  <div className="container-wrapper">
                    <div className="container-5">
                      <button className="button">
                        <div className="button-text">Por horas</div>
                      </button>
                      <button className="button-text-wrapper">
                        <div className="button-text-2">Indefinido</div>
                      </button>
                    </div>
                  </div>
                  <div className="div-wrapper">
                    <div className="container-6">
                      <div className="container-margin-2">
                        <div className="container-7">
                          <div className="text">
                            <div className="icon-2">∞</div>
                          </div>
                        </div>
                      </div>
                      <div className="container-8">
                        <div className="div-2">
                          <div className="title-2">Proceso continuo</div>
                        </div>
                        <div className="el-dispositivo-wrapper">
                          <p className="el-dispositivo">
                            El dispositivo mantendrá los cuidados activos hasta
                            que lo detengas manualmente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button-2">
                  <div className="button-text-3">Iniciar cuidados</div>
                </button>
              </div>
            </div>
          </div>
          <div className="navigation">
            <div className="container-9">
              <button className="button-3">
                <div className="container-10">
                  <div className="icon-3">
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
                <div className="text-2">
                  <div className="button-text-4">Planta</div>
                </div>
                <div className="text-3" />
              </button>
              <button className="button-3">
                <div className="container-10">
                  <div className="icon-3">
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
                <div className="text-4">
                  <div className="button-text-5">Ambiente</div>
                </div>
              </button>
              <div className="button-4">
                <div className="container-10">
                  <div className="icon-3">
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
                  <div className="notification-count-wrapper">
                    <div className="notification-count">2</div>
                  </div>
                </div>
                <div className="text-5">
                  <div className="button-text-5">Alertas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
