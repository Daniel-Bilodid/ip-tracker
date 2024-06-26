import "./style.scss";
import React, { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState(null);
  const [ipAddress, setIpAdress] = useState("");

  const [request, setRequest] = useState(false);

  const onSubmit = () => {
    setRequest(!request);
  };

  useEffect(() => {
    if (request) {
      fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_aModRTcllN4XfvFd4F30XKIGidxmn&ipAddress=${ipAddress}`
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          console.log(json); // Выводим полученные данные
        })
        .catch((error) => console.error(error));
    }
  }, [request]);

  return (
    <>
      <div className="header">
        <div className="header__title">IP Ardess Tracker</div>

        <div className="header__input">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAdress(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          <button onClick={onSubmit} className="header__input-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </div>
        <div className="header__result">
          <div className="header__result-wrapper">
            <div className="header__result-title">IP Address</div>
            <div className="header__result-sub">
              {data && data.ip ? data.ip : ""}
            </div>
          </div>

          <div className="header__result-hr"></div>

          <div className="header__result-wrapper">
            <div className="header__result-title">Location</div>
            <div className="header__result-sub header__result-location">
              {data && data.location
                ? `${data.location.region}, ${data.location.city}`
                : "Enter IP adress to check"}
              {data && data.location && data.location.postalCode
                ? `, ${data.location.postalCode}`
                : ""}
            </div>
          </div>

          <div className="header__result-hr"></div>

          <div className="header__result-wrapper">
            <div className="header__result-title">Timezone</div>
            <div className="header__result-sub">
              {data && data.location && data.location.timezone
                ? `UTC ${data.location.timezone}`
                : "Enter IP adress"}
            </div>
          </div>

          <div className="header__result-hr"></div>

          <div className="header__result-wrapper">
            <div className="header__result-title">ISP</div>
            <div className="header__result-sub">
              {data && data.isp ? data.isp : "No ISP data found"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
