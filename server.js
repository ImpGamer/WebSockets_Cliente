const WebSocketServer = require('websocket').server;
const http = require('http');

//Se crea una instancia de servidor, y cada vez que responda a una peticion dira que no lo encuentra (404 NOT_FOUND)
const server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
//Le decimos que ese servidor estara escuchando en el puerto 8080 (localhost)
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

//!Creamos una nueva instancia de WebSocket (desde el servidor)
wsServer = new WebSocketServer({
    httpServer: server,
    //Le decimos que no aceptara cualquier conexion, se validara antes de conectarse
    autoAcceptConnections: false
});

//No importa desde que puerto entremos siempre retornara "true"
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    //Preguna si la peticion viene de una fuente confiable, en este caso siempre retornara si, ya que asi lo marca la funcion "originIsAllowed"
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    //?Cuando alguien haga la peticion a este servidor, la permitira
    const connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    //*Cuando se reciba un mensaje del cliente
    connection.on('message', function(message) {
        //!Si el mensaje es tipo 'utf8' a ese mismo cliente se le retornara el mensaje en 'utf8'
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        /*Pero si se envian datos en binario (tambien se pueden mandar mensajes de esa manera) le retornara al usuario el mensaje
        en binario*/
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    //?Cuando se cierre la conexion con el cliente, se le hara saber al cliente
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});