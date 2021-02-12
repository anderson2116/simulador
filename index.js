const getRoutes = require("./routes/getRoutes");
const getItineraries = require("./itineraries/getItineraries");
const ItinerariesC = require("./itineraries/ItinerariesC");
const start = require("./serviceStarted/Start");
const locations = require("./serviceStarted/Location");
async function simulateFlow() {

 const routes = await getRoutes();
 const routeIndex =Math.floor(Math.random() * ((routes.length - 1)- 0));
 const route = routes[routeIndex].id;

 const itineraries = await getItineraries(routes[routeIndex]._id);
 const itinerariesIndex =Math.floor(Math.random() * ((itineraries.length - 1)- 0));
 const itinerarie = itineraries[itinerariesIndex]._id;

 const itinerarieC = await ItinerariesC(itinerarie);

 //Variables para poder iniciar el servicio 
const iniciarS = {
  "id": generateUUID(),
  "routeAuthorityId": route,
  "itineraryAuthorityId": itinerarie,
  "vehiclePlate": "MDL399",
  "driverDocumentId": "123456",
  "scheduleDateTime": Date.now(),
  "latitude": itinerarieC.path[0].coords[1],
  "longitude": itinerarieC.path[0].coords[1],
  "in": 0,
  "out": 0,
};

// CREAR SERVICIO
const services = await start(iniciarS);
console.log(JSON.stringify(services, null, 2));

//En la variable itinerariesC se tiene el itinerario con todas las cordenadas 
 (itinerarieC || {}).path.forEach((element , index) => {

  //se usa la funcion async para poder hacer la await 
  setTimeout(async() => {
    const loc = location(element.coords[1], element.coords[0]);
    const construir = await locations(loc);
   }, 4000 * index);

 });


//Generar ID unico para cada servicio
function generateUUID() {
    let d = new Date().getTime();
    let uuid = "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

//Generar los puntos del itinerario 
 function location (lat , lng){
   return {
    "vehiclePlate": "MDL399",
    "evts": [
      {
          "type": "LOC",
          "ts": Date.now(),
          "lat": lat, 
          "lng": lng,
          "brg": 96,
          "spd": Math.floor(Math.random()*(32 - 1)) + 1
      }
    ]
  }
 }

 
 
}

simulateFlow();