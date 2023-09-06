import { carritoVacioAparece } from "./carrito.js";
import { agregarCarrito } from "./carrito.js";
import { carritoLlenoAparece } from "./carrito.js";
import { botonCarritoLlenoCanvas } from "./carrito.js";
import { storage } from "./carrito.js";


export const carritoStorage = sessionStorage.getItem("carrito");
const cartas = document.getElementById("cartas");


//Condición que carga o no el carrito cuando inicia la página
if (carritoStorage) {
    storage();
    carritoLlenoAparece();
    botonCarritoLlenoCanvas();
} else {
    carritoVacioAparece();
}


//Clase constructora para las cartas del index
class Cards {
    constructor(id, nombre, varietal, precio) {
        this.id = id;
        this.nombre = nombre;
        this.varietal = varietal;
        this.precio = precio;
        this.vendido = false;
    }

    vendido() {
        this.vendido = true;
    }
};


//Arreglos para la creación de cada uno de los vinos
export const vinos = [];

const traerBodega = async () => {
    const response = await fetch("../db/productos.json")
    const data = await response.json();

    data.forEach(item => {

        const { id, nombre, varietal, precio } = item;

        vinos.push(new Cards(id, nombre, varietal, precio))
    });
}


//Función que trae los vinos. Tiene un .then por si se conecta correctamente y un .catch por si falla
traerBodega().then(() => {
//Características e información que aparece en cada una de las cartas
    vinos.forEach((item) => {

        const { nombre, varietal, precio, id } = item;

        const div = document.createElement("div");
        div.className = "cartas";
        div.innerHTML = `
        <h2>${nombre}</h2>
        <h3>${varietal}</h3>
        <p>$${precio}</p>
        <img src="https://santicheese.com/cdn/shop/products/COLECCION-CABERNET-MALBEC-LARGE_1024x.jpg?v=1544528772">
        <button id="boton${id}">  <i class="fa-solid fa-cart-plus fa-2xl"></i> Sumar al carrito</button>
        `;
        cartas.append(div);

        let boton = document.getElementById(`boton${id}`);
        boton.addEventListener("click", () => agregarCarrito(id))
    });
}).catch(() => {
    let div = document.createElement("div");
    div.className = "errorServidor"
    div.innerHTML = `
    <h1>Eror al conectarse al servidor</h1>
    <img src="../images/errorServidor.jpg" alt="error del servidor"></img>
    `
    cartas.append(div);
})






