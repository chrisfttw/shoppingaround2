import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "../styles.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { db } from '../googledatebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  //---STORE ICON ON MAP---
  const storeIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/759/759412.png',
    iconSize: [38, 38],
  });

  //---CALL TO DB---
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const markerCollectionRef = collection(db, 'markers');
        const markersSnapshot = await getDocs(markerCollectionRef);

        const markersData = [];

        for (const markerDoc of markersSnapshot.docs) {
          const marker = markerDoc.data();
          const subcollectionRef = collection(markerDoc.ref, 'filters');
          const subcollectionSnapshot = await getDocs(subcollectionRef);
          const subcollectionData = subcollectionSnapshot.docs.map(doc => doc.data());
          marker.subcollection = subcollectionData;
          marker.id = markerDoc.id;

          markersData.push(marker);
        }

        setMarkers(markersData);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, []);

  //---STYLE OPTIONS---
  const styleOptions = [
    { value: 'japanese', label: 'Japanese' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'sustainable', label: 'Sustainable' },
    { value: 'designer', label: 'Designer' },
    { value: 'menswear', label: 'Menswear' },
    { value: 'avante-garde', label: 'Avante-garde' },
    { value: 'techwear', label: 'Techwear' },
    { value: 'gorp', label: 'Gorp' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'americana', label: 'Americana' },
    { value: 'independent', label: 'Independent' },
    { value: 'casual', label: 'Casual' },
    { value: 'skate', label: 'Skate' },
    { value: 'denim', label: 'Denim' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'sneakers', label: 'Sneakers' },
  ];

  //---TYPE OPTIONS---
  const typeOptions = [
    { value: 'brand', label: 'Brand' },
    { value: 'store', label: 'Store' },
  ];

  //---MAP HOME---
  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Price Filter</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
        <div className="searchFilters">
          <Select
            placeholder="Style Filter"
            isMulti
            value={styleOptions.filter(option => styleFilter.includes(option.value))}
            onChange={(selectedOptions) => setStyleFilter(selectedOptions.map(option => option.value))}
            options={styleOptions}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                borderRadius: 20,
                marginRight: 10,
              }),
              control: (provided, state) => ({
                ...provided,
                borderRadius: 20,
              }),
              multiValue: (provided, state) => ({
                ...provided,
                borderRadius: 15,
              }),
            }}
          />
          <Select
            placeholder="Type Filter"
            isMulti
            value={typeOptions.filter(option => typeFilter.includes(option.value))}
            onChange={(selectedOptions) => setTypeFilter(selectedOptions.map(option => option.value))}
            options={typeOptions}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                borderRadius: 20,
              }),
              control: (provided, state) => ({
                ...provided,
                borderRadius: 20,
              }),
              multiValue: (provided, state) => ({
                ...provided,
                borderRadius: 15,
              }),
            }}
          />
        </div>
        <div className="place-list">
          {markers
            .filter((marker) =>
              marker.popUp.toLowerCase().includes(searchQuery.toLowerCase()) &&
              (!priceFilter || marker.subcollection.some(item => item.price === priceFilter)) &&
              (styleFilter.length === 0 || marker.subcollection.flatMap(item => item.style).some(style => styleFilter.includes(style))) &&
              (typeFilter.length === 0 || marker.subcollection.flatMap(item => item.type).some(type => typeFilter.includes(type)))
            )
            .map((marker, index) => (
              <a key={marker.id} href={`review/${marker.id}`} className='map-card'>
              <div key={index} className="place-card">
                <h3>{marker.popUp}</h3>
                {marker.subcollection.map((item, subIndex) => (
                  <h4 key={subIndex} className='typeCard'>({item.type.charAt(0).toUpperCase() + item.type.slice(1)})</h4>
                ))}
                <p>{marker.address}</p>
                <p className='styleCard'>Style(s): {marker.subcollection.flatMap(item => item.style).map(style => style.charAt(0).toUpperCase() + style.slice(1)).join(', ')}</p>
                {marker.subcollection.map((item, subIndex) => (
                  <p key={subIndex} className='priceCard'>{item.price}</p>
                ))}
              </div>
              </a>
            ))}
        </div>
      </div>
      <div className="right-panel">
        <MapContainer center={[34.0549, -118.2426]} zoom={13}>
          <TileLayer
            attribution="Jawg Maps"
            url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
            accessToken="RE1XVr3DBKlZ4QIpHxHmYTT4bCl3p0Fqx9nPExhCc9DtNedjfmEf6ofkgFuX9cz9"
          ></TileLayer>
          {markers
            .filter((marker) =>
              marker.popUp.toLowerCase().includes(searchQuery.toLowerCase()) &&
              (!priceFilter || marker.subcollection.some(item => item.price === priceFilter)) &&
              (styleFilter.length === 0 || marker.subcollection.flatMap(item => item.style).some(style => styleFilter.includes(style))) &&
              (typeFilter.length === 0 || marker.subcollection.flatMap(item => item.type).some(type => typeFilter.includes(type)))
            )
            .map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={storeIcon}>
                <Popup>
                  <div>
                    <h3>{marker.popUp}</h3>
                    <img src={marker.imageUrl} alt="Marker" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                    <p>{marker.phoneNumber}</p>
                    <p>{marker.address}</p>
                    <a href={marker.website} target="_blank">{marker.website}</a>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
