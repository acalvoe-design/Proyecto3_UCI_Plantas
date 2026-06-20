import "./style.css";

export const EstadoProceso = () => {
  return (
    <div className="estado-proceso" data-model-id="36:854">
      <div className="container">
        <div className="planta-view-wrapper">
          <div className="planta-view">
            <div className="div">
              <div className="container-2">
                <div className="paragraph">
                  <div className="label">DISPOSITIVO</div>
                </div>
                <div className="paragraph">
                  <div className="title">UCI para Plantas</div>
                </div>
              </div>
              <div className="container-3">
                <img className="img" alt="Container" src="/img/container.svg" />
                <div className="container-4">
                  <img className="button" alt="Button" src="/img/button.svg" />
                  <div className="text-wrapper">
                    <div className="text">
                      <div className="notification-count">2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="plant-name-wrapper">
              <div className="plant-name">Albahaca Romina</div>
            </div>
            <div className="container-5">
              <div className="container-6">
                <div className="icon-transform">
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
                <div className="icon-wrapper">
                  <div className="icon-2">
                    <img
                      className="vector-3"
                      alt="Vector"
                      src="/img/vector-2.svg"
                    />
                    <img
                      className="vector-4"
                      alt="Vector"
                      src="/img/vector-3.svg"
                    />
                  </div>
                </div>
                <div className="progress-wrapper">
                  <div className="progress">25%</div>
                </div>
                <div className="paragraph-margin">
                  <div className="subtitle-wrapper">
                    <div className="subtitle">Avance</div>
                  </div>
                </div>
              </div>
              <div className="time-remaining-wrapper">
                <p className="time-remaining">
                  <span className="span">Tiempo restante: </span>
                  <span className="text-wrapper-2">04:29:34</span>
                </p>
              </div>
            </div>
            <div className="container-7">
              <div className="container-8">
                <div className="icon-3">
                  <img
                    className="vector-5"
                    alt="Vector"
                    src="/img/vector-4.svg"
                  />
                </div>
                <div className="temperature-value-wrapper">
                  <div className="text-wrapper-3">24°C</div>
                </div>
                <div className="temperature-label-wrapper">
                  <div className="text-wrapper-4">Temperatura</div>
                </div>
              </div>
              <div className="container-9">
                <div className="icon-3">
                  <img
                    className="vector-6"
                    alt="Vector"
                    src="/img/vector-5.svg"
                  />
                  <img
                    className="vector-7"
                    alt="Vector"
                    src="/img/vector-6.svg"
                  />
                </div>
                <div className="humidity-value-wrapper">
                  <div className="text-wrapper-3">72%</div>
                </div>
                <div className="humidity-label-wrapper">
                  <div className="text-wrapper-4">Humedad</div>
                </div>
              </div>
              <div className="container-10">
                <img className="icon-3" alt="Icon" src="/img/icon.svg" />
                <div className="light-value-wrapper">
                  <div className="text-wrapper-3">640</div>
                </div>
                <div className="light-label-wrapper">
                  <div className="text-wrapper-4">lux</div>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <button className="button-label-wrapper">
                <div className="button-label">Detener cuidados</div>
              </button>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="container-11">
            <button className="button-2">
              <div className="container-4">
                <div className="icon-3">
                  <img
                    className="vector-3"
                    alt="Vector"
                    src="/img/vector-7.svg"
                  />
                  <img
                    className="vector-4"
                    alt="Vector"
                    src="/img/vector-8.svg"
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
                <div className="icon-3">
                  <img
                    className="vector-8"
                    alt="Vector"
                    src="/img/vector-9.svg"
                  />
                  <img
                    className="vector-9"
                    alt="Vector"
                    src="/img/vector-10.svg"
                  />
                  <img
                    className="vector-10"
                    alt="Vector"
                    src="/img/vector-11.svg"
                  />
                </div>
              </div>
              <div className="div-wrapper">
                <div className="navigation-label-2">Ambiente</div>
              </div>
            </button>
            <div className="button-3">
              <div className="container-4">
                <div className="icon-3">
                  <img
                    className="vector-11"
                    alt="Vector"
                    src="/img/vector-12.svg"
                  />
                  <img
                    className="vector-12"
                    alt="Vector"
                    src="/img/vector-13.svg"
                  />
                </div>
                <div className="alert-count-wrapper">
                  <div className="alert-count">2</div>
                </div>
              </div>
              <div className="text-3">
                <div className="navigation-label-2">Alertas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
