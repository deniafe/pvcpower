import React from 'react'
import { useState, useMemo, useCallback, useRef } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api'
import {Polls} from './data/Data'
import Distance from './Distance'
import Home from '../styles/Home.module.css'
import { MdHouseSiding } from 'react-icons/md'

type MapOptions = google.maps.MapOptions
type LatLngLiteral = google.maps.LatLngLiteral

console.log('Polls', Polls)

const Map = ({mapStyle, mapRef, office, setDirections, directions, center, pointer}) => {

  center = center || {lat: 6.404736138, lng: 3.393873833}
  const options = useMemo<MapOptions>(() => ({
    mapId: 'a8a3bf08449c920c',
    disableDefaultUI: true, 
    clickableIcons: false,
  }), [])

  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const pollingCenters = useMemo(() => Polls, []);
  // const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div >
      <GoogleMap 
      zoom={10}  
      center={center} 
      mapContainerClassName={mapStyle}
      options={options}
      onLoad={onLoad}
      >

      {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#00CA90",
                  strokeWeight: 5,
                },
              }}
            />
          )}

        {
          office && (
            <>
              <Marker
                position={office}
                icon={pointer}
              />

                  {
                    pollingCenters?.map((centers, i) => {
                      return <MarkerClusterer>
                                {(clusterer) =>
                                      pollingCenters[i].pollingUnits.map((center) => {
                                        const poll =  {lat: parseFloat(center.lat), lng: parseFloat(center.long)}
                                        console.log('Result of mapping pollig centers',)
                                        return <Marker
                                          key={center.name}
                                          position={poll}
                                          clusterer={clusterer}
                                          onClick={() => {
                                            fetchDirections(poll);
                                          }}
                                        />
                                        })
                                }
                              </MarkerClusterer>
                    })
                  }

              {/* {pollingCenters[0].pollingUnits.map((center) => (
                <Marker icon="./MapCircleSmall.png" key={center.number} position={{lat: parseInt(center.lat), lng: parseInt(center.long)}} />
              ))} */}

              <Circle center={office} radius={20000} options={closeOptions} />
              
              </>
              )
              
        }
      </GoogleMap>
    </div>
  )
}

export default Map

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 1,
  strokeColor:  "rgba(0, 202, 144, 0.15)",
  fillColor: "rgba(0, 202, 144, 0.15)"
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

// const generateHouses = (position: LatLngLiteral) => {
//   const _houses: Array<LatLngLiteral> = [];
//   for (let i = 0; i < 100; i++) {
//     const direction = Math.random() < 0.5 ? -2 : 2;
//     _houses.push({
//       lat: position.lat + Math.random() / direction,
//       lng: position.lng + Math.random() / direction,
//     });
//   }
//   return _houses;
// };