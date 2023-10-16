import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCW7EhKHiCxb8kfaK4xNWxNlIiXZZimazg"
    });


    if(!isLoaded) return <div>Loading....</div>;
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({lat: 34.049279, lng: -118.242343}), [])

    return (
        <GoogleMap 
            zoom={11} 
            center={center} 
            mapContainerClassName="map-container"
        ></GoogleMap>
    );
}