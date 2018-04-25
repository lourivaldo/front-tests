const request = require('request');
let i = 1;
const req = () => { 
    request.get('http://ip-api.com/json/185.194.141.58?fields=200', function (error, response, body) {
 
        if (error) {
            console.log(error)
            return; 
        }

        if (response) {
            if (response.statusCode) {
                console.log(i, body);
                i++;
                req();
            }
        }
    })
};

req();