const request = require("request");
module.exports = (itinerarieId) => {
   return new Promise((resolve, reject) => {
       request.get({
           headers: { 'content-type': 'application/json' },
           auth: {
               user: "M2M@NEBULAEPRUEBA", pass: "M2M@NEBULAEPRUEBA"
           },
           url: 'https://fleet.nebulae.com.co/api/external-system-gateway/rest/itineraries/' + itinerarieId,
           body: JSON.stringify({ "routeId":itinerarieId })
       }, (error, response, body) => {
           if (error) {
               reject(error);
           }
           resolve(JSON.parse(body));
       });
   });
};
