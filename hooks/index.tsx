type MarkerType = google.maps.Marker
type MapType = google.maps.Map
type MapMouseEvent = google.maps.MapMouseEvent
type LatLngLiteral = google.maps.LatLngLiteral

export const distance = (coords1: LatLngLiteral, coords2: LatLngLiteral) => {
  const lat1 = coords1.lat
  const lng1 = coords1.lng
  const lat2 = coords2.lat
  const lng2 = coords2.lng
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const distance = lng1 - lng2
  const radDistance = (Math.PI * distance) / 180

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radDistance)
 
  // if(dist > 1) {
  //   dist = 1
  // }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515

  return dist
}

export function distance2(position1 : LatLngLiteral, position2: LatLngLiteral){
  var lat1=position1.lat;
  var lat2=position2.lat;
  var lon1=position1.lng;
  var lon2=position2.lng;
  var R = 6371000; // metres
  var φ1 = (Math.PI * lat1) / 180
  var φ2 = (Math.PI * lat2) / 180
  var Δφ = (Math.PI * (lat2-lat1)) / 180
  var Δλ = (Math.PI * (lon2-lon1)) / 180

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
}

const getShortestDistance = (flattenedPolls: { lat: number; lng: number; lga: string; }[]) => {
  //  const distanceArray = flattenedPolls.map(coords => {
  //     return distance(center, coords)
  //   })
  //   const closest = Math.min(...distanceArray)
  //   console.log('The closest coords: ', closest)
  //   const closestLocationIndex = distanceArray.indexOf(closest)
  //   return flattenedPolls[closestLocationIndex]

  }


// export const getPixelOffset = (map: MapType, marker: MarkerType) => {
//   // Calculate marker position in pixels form upper left corner
//   const scale = map.getZoom() && Math.pow(2, map.getZoom());
//   const nw = new google.maps.LatLng(
//       map.getBounds().getNorthEast().lat(),
//       map.getBounds().getSouthWest().lng()
//   );
//   const worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
//   const worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
//   const pixelOffset = new google.maps.Point(
//       Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
//       Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
//   );
//   return pixelOffset;
// };





// If browser supports navigator.geolocation, generate Lat/Long else let user know there is an error
export const getPosition = () => {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
  } else {
  alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
  }
}

// Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
const posError = () => {
  if (navigator.permissions) {
  navigator.permissions.query({ name: 'geolocation' }).then(res => {
  if (res.state === 'denied') {
  alert('Enable location permissions for this website in your browser settings.')
  }
  })
  } else {
  alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
  }
}

 // Geolocation success callback fn
 const showPosition = (position: any) => {
  let lat: number = position.coords.latitude // You have obtained latitude coordinate!
  let lng: number = position.coords.longitude // You have obtained longitude coordinate!
  // console.log(' Current usr position', {lat, lng})
  console.log('I am going to call dispatch from index.tsx')
  // setPosition({lat, lng})
  // // router.push('/address')
  // router.push({
  //   pathname: '/address',
  //   query: {lat , lng},
  // }, '/address')
}
