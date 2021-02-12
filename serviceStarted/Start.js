const request = require("request");
module.exports = (service) => {
   return new Promise((resolve, reject) => {
       request.post({
           headers: { 'content-type': 'application/json' },
           auth: {
               user: "M2M@NEBULAEPRUEBA", pass: "M2M@NEBULAEPRUEBA"
           },
           url: 'https://fleet.nebulae.com.co/api/external-system-gateway/rest/service',
           body: JSON.stringify(service)
       }, (error, response, body) => {
           if (error) {
               reject(error);
           }
           resolve(JSON.parse(body));
       });
});
};
