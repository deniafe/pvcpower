import React, { useState, useEffect, useContext, useMemo, useCallback, useRef,  Dispatch, SetStateAction, } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api'
import { distance, distance2 } from '../hooks'
import { AppStateContext } from '../contexts/AppStateContext'
import { useBreakpointValue } from '@chakra-ui/react'

type MapOptions = google.maps.MapOptions
type LatLngLiteral = google.maps.LatLngLiteral
type ChildrenProps = {
  mapStyle?: any
  mapRef?: any
  flattenedPolls?: { lat: number; lng: number; lga: string; }[]
  currentLocation?: LatLngLiteral | undefined
  pollingCenter?: LatLngLiteral | undefined
  setPollingCenter?: any
  setPollingAddress?: any
  center?: any
  pointer?: any
  directions?: google.maps.DirectionsResult | undefined
  setDirections?: Dispatch<SetStateAction<google.maps.DirectionsResult | undefined>>
}

type MarkerType = google.maps.Marker
type MapType = google.maps.Map
type MapMouseEvent = google.maps.MapMouseEvent
type DirectionsType = google.maps.DirectionsRenderer

const Map = ({mapStyle, mapRef, flattenedPolls, currentLocation, pollingCenter, setPollingCenter, setPollingAddress, center, pointer, directions, setDirections}: ChildrenProps) => {

  const { state, dispatch } = useContext(AppStateContext)
  const variant = useBreakpointValue({ 
    base: 'base', 
    md: 'md' 
  }, {
    // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
    // (Defaults to 'base')
    fallback: 'md'
  })


  center = center || {lat: 6.404736138, lng: 3.393873833}

  // Replace this with call to $("#arrow").offset()
  let arrowPos = { top: 300, left: 600 }
  const markerRef = useRef<MarkerType>()
  const directionsRef = useRef<DirectionsType>()

  const getShortestDistance = (flattenedPolls: { lat: number; lng: number; lga: string; }[]) => {
    const center = currentLocation || {lat: 6.404736138, lng: 3.393873833}
    let closest= flattenedPolls[0];
    let closest_distance = distance2(closest, center);
     for(var i = 1; i < flattenedPolls.length;i++){
        if(distance2(flattenedPolls[i], center) < closest_distance) {
            closest_distance=distance2(flattenedPolls[i],center);
            closest=flattenedPolls[i];
        }
    }
    setPollingAddress(closest)
    setPollingCenter({lat: closest.lat, lng: closest.lng})
    dispatch({type: 'SET_POLLING_LOCATION', payload: closest})
    return closest
  }

  const getPixelOffset = (map: MapType, marker: MarkerType) => {
    // Calculate marker position in pixels form upper left corner
    const zoomNum = map.getZoom() || 0
    const lat =  map.getBounds()?.getNorthEast().lat() || 6.404736138
    const lng =  map.getBounds()?.getSouthWest().lng() || 3.393873833
    const scale = (map.getZoom() && Math.pow(2, zoomNum)) || 0
    const nw =  new google.maps.LatLng(
       lat,
       lng
    );
    const worldCoordinateNW =(map.getProjection()?.fromLatLngToPoint(nw)) || {x: 0, y:0}
    const worldCoordinate = (map.getProjection()?.fromLatLngToPoint(marker.getPosition() || {lat: 6.404736138, lng: 3.393873833})) || {x: 0, y:0}
    const pixelOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );
    return pixelOffset;
  };

  const panToRight = () => {
    const pixelOffset = markerRef.current && getPixelOffset(mapRef.current, markerRef.current);
    pixelOffset && mapRef.current.panBy(pixelOffset.x - arrowPos.left,
             pixelOffset.y - arrowPos.top);
  }

  const options = useMemo<MapOptions>(() => ({
    mapId: 'a8a3bf08449c920c',
    disableDefaultUI: true, 
    clickableIcons: false,
  }), [])

  const onMapLoad = useCallback((map: google.maps.Map): void => {mapRef.current = map}, [])

  const onMarkerLoad = useCallback((marker: google.maps.Marker): void => {
    markerRef.current = marker
  }, [])

  const onDirectionsLoad = useCallback((directionRender: google.maps.DirectionsRenderer): void => {
    directionsRef.current = directionRender
  }, [])

  const onDirectionsChange = useCallback((): void => {
    directionsRef.current && directionsRef.current.setMap(null)
  }, [directions])

  const onMarkerClick = useCallback((): void => {
    const pollUnit = flattenedPolls && getShortestDistance(flattenedPolls)
    pollUnit && fetchDirections(pollUnit)

  }, [currentLocation])


  const fetchDirections = (pollCenter: LatLngLiteral) => {
    if (!currentLocation) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: currentLocation,
        destination: pollCenter,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          dispatch({ type: 'SET_DIRECTION', payload: result });
          // setDirections(result)
          const myTimeout = setTimeout(() => {
            variant === 'md' && panToRight()
            myStopFunction()
          }, 500);

          const myStopFunction = () => {
              clearTimeout(myTimeout);
            }
          
        }
      }
    )
  }

  useEffect(() => { 
    // Only call this function if there is no polling location
    currentLocation && onMarkerClick()
  }, [currentLocation])

  useEffect(() => { 
    setDirections && setDirections(state.directions)
  }, [])
  

  return (
    <div >
      <GoogleMap 
      zoom={10}  
      center={center} 
      mapContainerClassName={mapStyle}
      options={options}
      onLoad={onMapLoad}
      >

      {directions && (
            <DirectionsRenderer
              directions={directions}
              onLoad={onDirectionsLoad}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#00CA90",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {/* true below should be office */}

        {
          pollingCenter && ( 
            <>
              <Marker
                position={pollingCenter}
                icon={pointer}
                onLoad={onMarkerLoad}
                // onClick={onMarkerClick}
              />

                  {/* <MarkerClusterer>
                    {(clusterer) =>
                          flattenedPolls.map((center, index) => {
                            const poll =  {lat: center.lat, lng: center.lng}
                            return <Marker
                              key={index}
                              position={poll}
                              clusterer={clusterer}
                              onClick={() => {
                                fetchDirections(poll);
                              }}
                            />
                            })
                    }
                  </MarkerClusterer> */}
                  

              {/* <Circle center={office} radius={200} options={closeOptions} /> */}
              
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