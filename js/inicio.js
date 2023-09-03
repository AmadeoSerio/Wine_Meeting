import {carritoVacioAparece} from "./carrito.js";
import {agregarCarrito} from "./carrito.js";
import {carritoLlenoAparece} from "./carrito.js";
import {botonCarritoLlenoCanvas} from "./carrito.js";
import {storage} from "./carrito.js";


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
    constructor(id, nombre, varietal, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.varietal = varietal;
        this.precio = precio;
        this.stock = stock;
        this.vendido = false;
    }

    vendido() {
        this.vendido = true;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Arreglos para la creación de cada uno de los vinos
export const vinos = [];

vinos.push(new Cards(1, "Bodega Piedra Negra Chacayes Los Chacayes", "Malbec", 20000, 20));
vinos.push(new Cards(2, "Bodegas Borsao Syrah Campo de Borja Zarihs", "Syrah", 20000, 20));
vinos.push(new Cards(3, "Bodegas Juan Gil Jumilla Blue Label", "Malbec", 10000, 20));
vinos.push(new Cards(4, "Clos de la Grange Sauvignon Touraine", "Cabernet sauvignon", 18000, 20));
vinos.push(new Cards(5, "Albert Morot Beaune Cent-Vignes", "Malbec", 12000, 20));
vinos.push(new Cards(6, "Klinker Brick Grenache Blanc Lodi", "Malbec", 18000, 20));
vinos.push(new Cards(7, "Ken Wright Pinot Noir Willamette Valley", "Syrah", 18000, 20));
vinos.push(new Cards(8, "Bodegas Juan Gil Jumilla Blue Label", "Malbec", 18000, 20));
vinos.push(new Cards(9, "Moric Burgenland Hausmarke", "Malbec", 18000, 20));
vinos.push(new Cards(10, "Trimbach Riesling Alsace", "Malbec", 18000, 20));
vinos.push(new Cards(11, "Boscarelli Vino Nobile di Montepulciano", "Malbec", 18000, 20));
vinos.push(new Cards(12, "Vietti Barbera d’Asti Tre Vigne", "Malbec", 18000, 20));
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

