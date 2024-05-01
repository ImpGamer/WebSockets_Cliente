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
    console.log(`Recibiendo del servidor: ${event.data}`)
})

const btnSend = document.getElementById("btnSend")
//Mandar informacion al servidor
btnSend.addEventListener('click',(event) => {
    event.preventDefault()
    ws.send(inputMessage.value)
})

btnClose.addEventListener('click',(event) => {
    console.log('Se a cerrado la conexion')
    ws.close()
})