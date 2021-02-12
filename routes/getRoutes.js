// const arrayError = [400,401,403,404,412,500,503 ];
const request = require("request");
module.exports = () => {
   return new Promise((resolve, reject) => {
       request.get(
           {
               auth: {
                   user: "M2M@NEBULAEPRUEBA", pass: "M2M@NEBULAEPRUEBA"
               },
               url: "https://fleet.nebulae.com.co/api/external-system-gateway/rest/routes",
 
           }
           , (error, response, body) => {
               if (error) {
                   reject(error);
               }
            //    if(arrayError.includes(response.statusCode)){
            //        console.log(statusCode);
            //    }
               resolve(JSON.parse(body));
           });
   });
};
