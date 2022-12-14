import React from "react";
import "./map.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

function CreateMap({ data, loading, error }) {
  if (loading) {
    return <div className="loading-msg">A moment please...</div>;
  }
  if (error) {
    return (
      <div className="error-msg">{`There is a problem with fetching data - ${error}`}</div>
    );
  }
  if (!data.hasOwnProperty("features")) {
    return (
      <MapContainer
        center={[45.1, 15.2]}
        zoom={8}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }

  return (
    <div id="map">
      <MapContainer
        center={[45.1, 15.2]}
        zoom={8}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.features.map((place, placeIndex) => (
          <Marker
            key={placeIndex}
            position={[
              place.geometry.coordinates[1],
              place.geometry.coordinates[0],
            ]}
            icon={
              new Icon({
                iconUrl: require("../../assets/cargo-ship.png"),
                iconSize: 24,
              })
            }
          >
            <Popup>
              <div>
                <div>
                  Naziv Objekta: {place.properties.naziv_objekta || "-"}
                </div>
                <div>PS Broj: {place.properties.ps_br || "-"}</div>
                <div>E Broj: {place.properties.e_br || "-"}</div>
                <div>Tip Objekta: {place.properties.tip_objekta || "-"}</div>
                <div>
                  Lu??ka kapetanija: {place.properties.lucka_kapetanija || "-"}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CreateMap;
