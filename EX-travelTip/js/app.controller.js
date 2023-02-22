import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.renderPlaces = renderPlaces

function onRemovePlace(idToRemove) {
    console.log(idToRemove);
    locService.remove(idToRemove).then(loadLocs)
}


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    renderPlaces()    
}

function renderPlaces() {
     getLocs().then(places =>{

         const elList = document.querySelector('.place-list')
         let strHtmls = places
         .map(({ id, name }) => {
             return `
             <li>
             <h4>${name}</h4>
             <span class="close-btn" onclick="onRemovePlace('${id}')">❌</span>
             <span class="btn-pan" onclick="onPanTo('${id}')">GO</span>
             </li>
             `
            })
            .join('')
            elList.innerHTML = strHtmls
        })
        }

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onDownloadCSV(elLink) {
    const csvContent = getPlacesAsCSV()
    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
  }