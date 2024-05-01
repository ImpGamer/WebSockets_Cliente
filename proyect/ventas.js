//?Creacion de todas las constantes y recoleccion de elementos del HTML
const invisibleClass = "invisible"
const modalBackground = document.getElementById("modalBackground")
const modal = document.getElementById("modal")
const btnShowModal = document.getElementById("btnShowModal")
const btnCancel = document.getElementById("btnCancel")
const btnSale = document.getElementById("btnSale")
const productId = document.getElementById("productId")
const amount = document.getElementById("amount")
//*Datos de la grafica
const dataChart = [15,5,20,1]

//Funcion que mostrara o ocultara el popUp para agregar ventas
const showModal = show => {
    if(show) {
        modalBackground.classList.remove(invisibleClass)
        modal.classList.remove(invisibleClass)
        return
    }

    modalBackground.classList.add(invisibleClass)
    modal.classList.add(invisibleClass)
}

//!Funcion del boton para mostrar el popUp
btnShowModal.addEventListener("click", evt => {
    evt.preventDefault()
    showModal(true)
})
  
//Funcion del boton que ocultara el popUp
btnCancel.addEventListener("click", evt => {
    evt.preventDefault()
    showModal(false)
})

//Inicializacion del grafico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Zapatos', 'Camisas', 'Pantalones', 'Ropa interior'],
    datasets: [{
      label: '$ Sales',
      data: dataChart, //Arreglo de informacion que se imprimira en la grafica
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//!Creacion y configuracion del websocket
const ws = new WebSocket("ws://localhost:8080") //Servidor que estaremos escuchando con el websocket
ws.addEventListener('open',event => {
    console.log("Conectado al servidor!!!"+event)
})

//Funcion para mandar el objeto "venta" al servidor mediante el websocket
btnSale.addEventListener('click',(event) => {
    event.preventDefault()
    const venta = {
        //Valor que manda cada "option" de la etiqueta <select>
        productId: parseInt(productId.value,10),
        amount: parseInt(amount.value,10)
    }

    ws.send(JSON.stringify(venta))
    showModal(false)
})

//Funcion para recibir inmediatamente que el servidor reciba ese objeto o mensaje que nos devuelva los mismos datos
ws.addEventListener('message',({data}) => {
    const venta = JSON.parse(data)
    let indexProducto = venta.productId -1
    dataChart[indexProducto] += venta.amount
    myChart.update()
})