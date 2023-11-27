import "../../styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

export default function App() {

    const markers = [
        {
            geocode: [34.092670, -118.280678],
            popUp: "mohawk general store"
        },
        {
            geocode: [34.037750, -118.231209],
            popUp: "dover street market"
        },
        {
            geocode: [33.998840, -118.472460],
            popUp: "older brother"
        }
    ];

    const storeIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/759/759412.png",
        iconSize: [38, 38]
    })

    return (
        <MapContainer center={[34.0549, -118.2426]} zoom={13}>
            {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}

            <TileLayer
                attribution="Jawg Maps"
                url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
                accessToken="RE1XVr3DBKlZ4QIpHxHmYTT4bCl3p0Fqx9nPExhCc9DtNedjfmEf6ofkgFuX9cz9"
            ></TileLayer>

            {markers.map(marker => (
                <Marker position={marker.geocode} icon={storeIcon}>
                    <Popup>{marker.popUp}</Popup>
                </Marker>
            ))
            
            }

        </MapContainer>
    );
}