const request = require("request");
module.exports = (lyl) => {
   return new Promise((resolve, reject) => {
       request.post({
           headers: { 'content-type': 'application/json' },
           auth: {
               user: "M2M@NEBULAEPRUEBA", pass: "M2M@NEBULAEPRUEBA"
           },
           url: 'https://fleet.nebulae.com.co/api/external-system-gateway/rest/vehicle-report',
           body: JSON.stringify(lyl)
       }, (error, response, body) => {
           if (error) {
               reject(error);
           }
           resolve(JSON.parse(body));
       });
});
};