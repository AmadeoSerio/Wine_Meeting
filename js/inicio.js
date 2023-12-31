import { carritoVacioAparece } from "./carrito.js";
import { agregarCarrito } from "./carrito.js";
import { carritoLlenoAparece } from "./carrito.js";
import { botonCarritoLlenoCanvas } from "./carrito.js";
import { storage } from "./carrito.js";


export const carritoStorage = sessionStorage.getItem("carrito");
export const cartas = document.getElementById("cartas");
const buscador = document.getElementById("buscador");
const varietalesFiltro = document.getElementById("varietalesFiltro");
const precioFiltro = document.getElementById("precioFiltro");
const malbecFooter = document.getElementById("malbecFooter");
const syrahFooter = document.getElementById("syrahFooter");
const cabernetFooter = document.getElementById("cabernetFooter");
export const restablecerFiltro = document.getElementById("restablecerFiltro");
const btnTop = document.getElementById("btnTop");


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
    constructor(id, nombre, varietal, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.varietal = varietal;
        this.precio = precio;
        this.img = img;
    }
};


//Arreglos para la creación de cada uno de los vinos
export let vinos = [];


//Llamado a los vinos que están en la base de datos
const traerBodega = async () => {
    const response = await fetch("./db/productos.json")
    const data = await response.json();

    data.forEach(item => {

        const { id, nombre, varietal, precio, img } = item;

        vinos.push(new Cards(id, nombre, varietal, precio, img))

        localStorage.setItem("vinos", JSON.stringify(vinos))
    });
}


//Características e información que aparece en cada una de las cartas
const crearCards = () => {
    restablecerFiltro.href = "./index.html" //esto se crea para restablecer los filtros, pero desaparece en las pestañas que no sirve
    cartas.innerHTML = ""

    vinos.forEach((item) => {
        const { nombre, varietal, precio, id, img } = item;

        const div = document.createElement("div");
        div.className = "cartas";
        div.innerHTML = `
        <h2>${nombre}</h2>
        <h3>${varietal}</h3>
        <p>$${precio}</p>
        <img src="${img}">
        <button id="boton${id}"> <i class="fa-solid fa-cart-plus fa-2xl"></i> Sumar al carrito</button>
        `;
        cartas.append(div);

        let boton = document.getElementById(`boton${id}`);
        boton.addEventListener("click", () => agregarCarrito(id))
    });
}


//Función que trae los vinos. Tiene un .then por si se conecta correctamente y un .catch por si falla
traerBodega().then(() => {
    crearCards();
}).catch(() => {
    let div = document.createElement("div");
    div.className = "errorServidor"
    div.innerHTML = `
    <h1>Error al conectarse al servidor</h1>
    <img src="./images/errorServidor.jpg" alt="error del servidor"></img>
    `
    cartas.append(div);
})


// Función del buscador
buscador.addEventListener("keyup", (e) => {
    const vinosBuscador = vinos.filter((vino) => vino.nombre.toLowerCase().includes(e.target.value))
    vinos = vinosBuscador

    if (vinosBuscador.length > 0) {
        crearCards(vinosBuscador);
        vinos = JSON.parse(localStorage.getItem("vinos"));
    } else {
        let div = document.createElement("div");
        div.className = "sinVinoEncontrado container";
        div.innerHTML = `
    <h2>Lo sentimos</h2>
    <h3>El nombre del producto no es válido o no contamos con stock.</h3>
    <img src="./images/noSeEncontro.png" alt="error del servidor"></img>
    `;
        cartas.innerHTML = "";
        cartas.append(div);

        vinos = JSON.parse(localStorage.getItem("vinos"));
    }
})


// Función del filtro por varietal
varietalesFiltro.addEventListener("click", (e) => {
    //Parseo el arreglo de vinos para que se suba en el storage y cargue correctamente cada varietal al filtrar varias veces. 
    vinos = JSON.parse(localStorage.getItem("vinos"));
    const vinosVarietal = vinos.filter((vino) => vino.varietal.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
    vinos = vinosVarietal
    //Utilizo los else if porque es la forma en la que encontré que no quedara vacío cuando le daba click al
    //hr. Por eso el else final hace que se vuelva a parsear si miss clickeas 2 o más veces seguidas.
    if (e.target.innerHTML === "Malbec") {
        crearCards(vinosVarietal);
    } else if (e.target.innerHTML === "Syrah") {
        crearCards(vinosVarietal);
    } else if (e.target.innerHTML === "Cabernet") {
        crearCards(vinosVarietal);
    } else if (e.target.innerHTML === "Todos") {
        vinos = JSON.parse(localStorage.getItem("vinos"));
        crearCards(vinos);
    } else {
        vinos = JSON.parse(localStorage.getItem("vinos"));
    }
})


// Función del filtro por precio
//Al no volver a parsear el arreglo vinos al storage este filtro se puede utilizar una vez filtrado por varietal.
precioFiltro.addEventListener("click", (e) => {
    const orden = e.target.innerHTML;
    let vinosFiltradoPrecio;

    if (orden === "Menor precio") {
        vinosFiltradoPrecio = vinos.sort((a, b) => a.precio - b.precio)
    } else if (orden === "Mayor precio") {
        vinosFiltradoPrecio = vinos.sort((a, b) => b.precio - a.precio)
    }
    crearCards(vinosFiltradoPrecio)
});


//Filtros del footer
malbecFooter.addEventListener("click", (e) => {
    vinos = JSON.parse(localStorage.getItem("vinos"));
    const vinosVarietal = vinos.filter((vino) => vino.varietal.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
    vinos = vinosVarietal
    if (e.target.innerHTML === "Malbec") {
        crearCards(vinosVarietal);
    }
});


syrahFooter.addEventListener("click", (e) => {
    vinos = JSON.parse(localStorage.getItem("vinos"));
    const vinosVarietal = vinos.filter((vino) => vino.varietal.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
    vinos = vinosVarietal
    if (e.target.innerHTML === "Syrah") {
        crearCards(vinosVarietal);
    }
});


cabernetFooter.addEventListener("click", (e) => {
    vinos = JSON.parse(localStorage.getItem("vinos"));
    const vinosVarietal = vinos.filter((vino) => vino.varietal.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
    vinos = vinosVarietal
    if (e.target.innerHTML === "Cabernet") {
        crearCards(vinosVarietal);
    }
});


//Botón para subir al top (útil para la versión mobile)
// Función que hace que aparezca cuando se scrollea 20px
window.onscroll = function () { funcionScroll() };

function funcionScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
}

// Función que hace que suba hacia arriba.
function funcionSubir() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}

btnTop.addEventListener("click", () => funcionSubir())