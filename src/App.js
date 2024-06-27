import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./style.scss";

import locationIcon from "./assets/icon-location.svg";

function App() {
  const icon = L.icon({
    iconUrl: locationIcon,
    iconSize: [46, 56],
    iconAnchor: [23, 56],
    popupAnchor: [0, -56],
  });

  const [data, setData] = useState(null);
  const [ipAddress, setIpAdress] = useState("");

  const [request, setRequest] = useState(false);
  const [center, setCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(13);

  const onSubmit = (e) => {
    e.preventDefault();
    setRequest(true);
  };

  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_aModRTcllN4XfvFd4F30XKIGidxmn&ipAddress=${ipAddress}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setRequest(false);
      });
  }, [request, ipAddress]);

  useEffect(() => {
    if (data && data.location) {
      setCenter([data.location.lat, data.location.lng]);
      setZoom(13);
    }
  }, [data]);

  return (
    <>
      <header className="header">
        <h1 className="header__title">IP Address Tracker</h1>

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
      </header>

      <main className="header__map">
        {" "}
        <MapContainer
          key={`${center[0]}-${center[1]}`}
          center={center}
          zoom={zoom}
          style={{ height: "640px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data && data.location && (
            <Marker
              icon={icon}
              position={[data.location.lat, data.location.lng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </main>
    </>
  );
}

export default App;
