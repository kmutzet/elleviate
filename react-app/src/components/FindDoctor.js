import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from './Navbar';
// import InteractiveMap from './InteractiveMap';
import { fetchAllData, fetchProvidersCoverage, fetchInsuranceIssuers } from './NetworkManager';

let mapCenter;
let mapZoom;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const geocodeMapCenter = (location) => {
  const locationDelimited = encodeURIComponent(location);
  
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + locationDelimited + '&key=AIzaSyAj58aXFyUyskZtQImgWDkJEMgv9HmTDfE')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('API request failed: ' + location + ' could not be geocoded');
    }
  })
  .then(data => {
    if (data.results[0]) {
      if (location === 'Washington') {
        mapZoom = 7;
      } else {
        mapZoom = 12;
      }
      const coordinates = data.results[0].geometry.location;
      mapCenter = { lat: coordinates.lat, lng: coordinates.lng };
    } else {
      console.log('No results found for user address: ' + locationDelimited);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

async function updatePage (insurance, location, setDoctors, setCoordinates, setInsurance, setLocation, navigate) {
  let doctorData = [];

  if (location) {
    const locationData = await fetchAllData(location); 
    doctorData = locationData || [];

    // populate filter bar with previous value searched:
    setLocation(location);
  }

  if (insurance && doctorData.length > 0) {
    const providerIds = doctorData.map(doctor => doctor[0]); 
    const coverageData = await fetchProvidersCoverage(providerIds, insurance);

    if (Array.isArray(coverageData)) {
      doctorData = doctorData.filter(doctor => coverageData.includes(doctor[0])); 
    } else {
      console.error('Coverage data is not an array or is undefined:', coverageData);
    }
    
    // populate filter bar with previous value searched:
    setInsurance(insurance);
  }

  setDoctors(doctorData);

  if (doctorData.length > 0) {
    let addresses = [];

    let doctorsDisplayed;
    if (doctorData.length <= 10) {
      doctorsDisplayed = doctorData.length;
    } else {
      doctorsDisplayed = 10;
    }

    for (let i = 0; i < doctorsDisplayed; i++) {
      let address = doctorData[i][5];
      let addressDelimited = encodeURIComponent(address.slice(0, -6));

      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressDelimited + '&key=AIzaSyAj58aXFyUyskZtQImgWDkJEMgv9HmTDfE')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API request failed: ' + address + ' could not be geocoded');
        }
      })
      .then(data => {
        if (data.results && data.results[0]) {
          const coordinates = data.results[0].geometry.location;
          addresses.push({ key: i, location: coordinates });
        
          if (addresses.length === doctorsDisplayed) {
            setCoordinates(addresses);
          }
        } else {
          console.log('No results found for address: ' + address);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }

    navigate(`/find-doctor?insurance=${insurance}&location=${location}`);
  }
};

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [insuranceIssuers, setInsuranceIssuers] = useState([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const containerStyle = { width: '100%', height: '100%' };
  const navigate = useNavigate(); 

  const query = useQuery();
  let insurance = query.get('insurance');
  let location = query.get('location');
  
  if (!location) {
    // populate location filter with 'Washington' and populate doctors list if location was searched previously
    location = 'Washington';
    mapCenter = { lat: 47.7511, lng: -120.7401 };
    mapZoom = 7;
  } else {
    // navigate(`/find-doctor?insurance=${insurance}&location=${newLocation}`);
    geocodeMapCenter(location);
  }

  let insuranceDropdown;
  if (insurance) {
    insuranceDropdown = insurance;
  } else {
    // populate insurance filter with 'Select Insurance' if no insurance was searched previously
    insuranceDropdown = 'Select Insurance';
  }

  useEffect(() => {
    const loadInsuranceIssuers = async () => {
      try {
        const issuers = await fetchInsuranceIssuers();
        setInsuranceIssuers(issuers);
      } catch (error) {
        console.error('Error fetching insurance issuers:', error);
      }
    };

    loadInsuranceIssuers();
  }, []);

  useEffect(() => {
    updatePage (insurance, location, setDoctors, setCoordinates, setInsurance, setLocation, navigate);
  }, [location, insurance, navigate]);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3wyBA25RlI0KUkRUdQz1geUY2Jk1AB_0`;
        script.async = true;
        script.onload = () => {
          setIsApiLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load Google Maps API');
        };

        document.body.appendChild(script);
      } else {
        setIsApiLoaded(true);
      }
    };

    loadGoogleMapsApi();
  }, []);

  const [newInsurance, setInsurance] = useState('');
  const [newLocation, setLocation] = useState('');

  useEffect(() => {
    if (newInsurance || newLocation) {
      updatePage (newInsurance, newLocation, setDoctors, setCoordinates, setInsurance, setLocation, navigate);
    }
    // navigate(`/find-doctor?insurance=${newInsurance}&location=${newLocation}`);
    geocodeMapCenter(newLocation);
  }, [newInsurance, newLocation, navigate]);

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="filter-container d-flex justify-content-end">
        <div className="search-box map-filter">
          <select 
            value={newInsurance} 
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="Select insurance..."
          >
            <option value="">{insuranceDropdown}</option>
            {insuranceIssuers.map((issuer, index) => (
              <option key={index} value={issuer.name}>
                {issuer.name}
              </option>
            ))}
          </select>
          <input 
            id="location-filter"
            type="text" 
            placeholder="Enter city, state, or zip" 
            value={newLocation} 
            onChange={(e) =>
              setLocation(e.target.value)} 
          />
        </div>
      </div>

      <div className="fluid-container">
        <div className="map-container">
          <div style={{ height: '100vh', width: '100%' }}>
            {isApiLoaded ? (
              <APIProvider apiKey={process.env.AIzaSyD3wyBA25RlI0KUkRUdQz1geUY2Jk1AB_0}>
                <Map 
                  mapId='93379d636e515f6e'
                  mapContainerStyle={containerStyle}
                  zoom={mapZoom}
                  center={mapCenter}
                >
                  {coordinates.map((location) => (
                    <AdvancedMarker 
                      key={location.key}
                      position={{
                        lat: location.location.lat,
                        lng: location.location.lng
                      }} 
                    />
                  ))}
                </Map>
              </APIProvider>
            ) : (
              <div>Loading Map...</div>
            )}
          </div>
        </div>
        <div className="cards-container">
          <div id='cards-title'>
            <h3>Ob/Gyn near you</h3>
            <p># found near you</p>
          </div>
          {Array.isArray(doctors) && doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              // Inside FindDoctor.js

            <Link 
              to={`/doctor-profile?name=${doctor[2]}&credential=${doctor[1]}&gender=${doctor[3]}&type=${doctor[4]}&address=${doctor[5]}&phone=${doctor[6]}&insurance=${insurance}`} 
              key={index}
            >
              <div className="doctor-card">
                <h3>DR. {doctor[2]}</h3> {/* name */}
                <p>{doctor[1]}</p> {/* credential */}
                <p>{doctor[3]}</p> {/* gender */}
                <p>{doctor[4]}</p> {/* type */}
                <p>Address: {doctor[5]}</p> {/* address */}
                <p>Insurance: {newInsurance}</p> {/* insurance */}
                <p>Phone: {doctor[6]}</p> {/* phone */}
              </div>
            </Link>

            ))
          ) : (
            <p>No doctors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;