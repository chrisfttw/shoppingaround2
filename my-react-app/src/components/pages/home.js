import "../../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { db } from "../../googledatebase/config";
import { useEffect, useState } from "react";

export default function App() {
    const [markers, setMarkers] = useState([]);
  
    const storeIcon = new Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/759/759412.png',
      iconSize: [38, 38],
    });
  
    // Function to add a marker to Firestore
    const addMarkerToFirestore = (marker) => {
      db.collection('markers')
        .add(marker)
        .then((docRef) => {
          console.log('Marker added with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding marker: ', error);
        });
    };
  
    useEffect(() => {
      // Load markers from Firestore when the component mounts
      const fetchMarkers = async () => {
        try {
          const snapshot = await db.collection('markers').get();
          const loadedMarkers = snapshot.docs.map((doc) => doc.data());
          console.log('loaded markers', loadedMarkers);
          setMarkers(loadedMarkers);
        } catch (error) {
          console.error('Error fetching markers: ', error);
        }
      };
  
      fetchMarkers();
    }, []);
  
    return (
      <MapContainer center={[34.0549, -118.2426]} zoom={13}>
        <TileLayer
          attribution="Jawg Maps"
          url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          accessToken="RE1XVr3DBKlZ4QIpHxHmYTT4bCl3p0Fqx9nPExhCc9DtNedjfmEf6ofkgFuX9cz9"
        ></TileLayer>
  
        {markers.map((marker, index) => (
        <Marker key={index} position={[parseFloat(marker.geocode[0]), parseFloat(marker.geocode[1])]} icon={storeIcon}>
            <Popup>{marker.storeName}</Popup>
        </Marker>
        ))}
      </MapContainer>
    );
  }