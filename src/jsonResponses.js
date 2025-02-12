//Loads the following URLs, both with fetch() when hitting the ‘send’ button and directly
//to the URL (directly to URL will fire a GET request).Client fetch() requests should be
//made to the selected url with the selected method when the “Get User” button is
//pressed.
// /getUsers with GET retrieves 200 success with results.
// /getUsers with HEAD retrieves 200 success without results
// /notReal with GET retrieves a 404 not found with error message
// /notReal with HEAD retrieves a 404 not found without error message

const users = {}; // object to store users

const respond = (request, response, status, object) => { // function to respond to requests
    let responseContent = '';
    let contentType = 'application/json';
    if (request.headers.accept && request.headers.accept.includes('text/xml')) {
      contentType = 'text/xml';
      responseContent = convertObjectToXML(object, status);
    } else {
      responseContent = JSON.stringify(object);
    }
    console.log(responseContent);
    const headers = {
      'Content-Type': contentType,
      'Content-Length': Buffer.byteLength(responseContent, 'utf8'),
    };
    response.writeHead(status, headers);
    if (request.method !== 'HEAD') {
      response.write(responseContent);
    }
    response.end();
  };

  const getUsers = (request, response, params) => { //function to get users with GET request (may need to use json.stringify)
    
  }

