let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
})

osm.addTo(map)

addGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const heatData = data.features.map(heatDataConvert)
  console.log(heatData)
  const heatMap = L.heatLayer(heatData, { radius: 10 })
  heatMap.addTo(map)
  // const markers = L.geoJson(data)
  // markers.addTo(map)
}

function heatDataConvert(feature) {
  return [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.area,
  ]
}

// default map settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}
