// i pulled code from the last api asignment
// remember to use let instead of const

const users = {};

const respond = (request, response, status, object) => {
  let responseContent = '';
  let contentType = 'application/json';
  if (request.headers.accept && request.headers.accept.includes('text/xml')) {
    contentType = 'text/xml';
  } else {
    responseContent = JSON.stringify(object);
  }
  const headers = {
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(responseContent, 'utf8'),
  };
  response.writeHead(status, headers);
  if (request.method !== 'HEAD') { // check for head reques
    response.write(responseContent);
  }
  response.end();
};

// GET /getUsers
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  respond(request, response, 200, responseJSON);
};

// POST /addUser
const addUser = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });
  request.on('end', () => {
    const bodyParams = new URLSearchParams(body); // parse the body cotent
    const name = bodyParams.get('name');
    const age = bodyParams.get('age');

    // make sure both name and age are provided 
    if (!name || !age) {
      const responseJSON = {
        id: 'missingParams',
        message: 'Name and age are both required!',
      };
      return respond(request, response, 400, responseJSON);
    }

    // update user if it already exists
    if (users[name]) {
      users[name].age = age;
      response.writeHead(204, { 'Content-Type': 'application/json' });
      return response.end();
    }

    // create a new user if it doesn
    users[name] = { name, age };
    const responseJSON = {
      message: 'Created Successfully',
    };
    return respond(request, response, 201, responseJSON);
  });
};

// GET /notReal
const notFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };
  if (request.method === 'HEAD') {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
  } else {
    respond(request, response, 404, responseJSON);
  }
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};