//Creacion del websocket desde el lado del cliente
//!Al tratarse del protocolo WS (websocket) ya no lo haremos mediante http o https
const ws = new WebSocket("ws://localhost:8080") //ENDPOINT al que nos conectaremos
const btnClose = document.getElementById('btnClose')
const inputMessage = document.getElementById('message')

ws.addEventListener('open', (evt) => {
    console.log("Estoy conectado")
})

ws.addEventListener('message',(event) => {
    //Paramatro "event" que sera aquella informacion que me dara el servidor
    //?Como podemos recibir ese JSON como JSON y no como String para manipularlo
    //*Pues convirtiendolo a un objeto JSON
    console.log("Recibiendo del servidor: ")
    console.log(JSON.parse(event.data)) //Convertimos el objeto mandado como String por parte del usuario a JSON
})

const btnSend = document.getElementById("btnSend")
//Mandar informacion al servidor
btnSend.addEventListener('click',(event) => {
    event.preventDefault()

    //!Ahora deseamos enviar objetos, como se realiza pues no podemos enviar objetos javaScript
    //En realidad si se puede pero lo enviara de una manera ilegible

    //Creacion del objeto JS
    const person = {
        name: "David",
        lastname:"Ateno",
        age:18,
        isOlder:true
    }

    //Solo convertiremos este objeto JS en un String
    ws.send(JSON.stringify(person)) //De esta manera podemos enviar JSON
})

btnClose.addEventListener('click',(event) => {
    console.log('Se a cerrado la conexion')
    ws.close()
})