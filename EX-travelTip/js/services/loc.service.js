import {utilService} from "./util.service.js";
import {storageService} from "./async-storage.service.js";
export const locService = {
    getLocs
}
{id, name, lat, lng, weather, createdAt, updatedAt}
var places;
const STORAGE_KEY_PLACES = 'places'
const locs = [
    {id:utilService.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    {id:utilService.makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


function getLocs() {
    return storageService.query(STORAGE_KEY_PLACES).then(storageLocs => {
        if(!storageLocs.length){
            utilService.saveToStorage(STORAGE_KEY_PLACES, locs)
            return locs
        }
        return storageLocs
    }) 
}


function removePlace(placeId) {
    places = places.filter(p => p.id !== placeId)
    _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    places.unshift(_createPlace(name, lat, lng, zoom))
    _savePlacesToStorage()
}

function getPlaceById(placeId) {
    return places.find(p => p.id === placeId)
}

function getPlacesAsCSV() {
    if (!places.length) return 'No Places'
    const csvLines = places.map(({ id, lat, lng, name }) => `${id},${lat},${lng},${name}\n`)
    csvLines.unshift('Id,Lat,Long,Name\n')
    console.log('csvLines', csvLines.join(''));
    return csvLines.join('')
}

function _createPlace(name, lat, lng, zoom) {
    //{id: '1p2', lat: 32.1416, lng: 34.831213, name: 'Pukis house'}
    return { id: makeId(), lat, lng, name, zoom }
}

function _createPlaces() {
    const places = loadFromStorage(STORAGE_KEY_KEY_PLACES) || []
    if (!places || !places.length) {
        for (let i = 0; i < 3; i++) {
            const placeName = 'Puki' + makeId()
            places.push(_createPlace(placeName, 33 + i, 35 + i, 10))
        }
    }
    _savePlacesToStorage()

}

function _savePlacesToStorage() {
    saveToStorage(STORAGE_KEY_PLACES, places)
}


