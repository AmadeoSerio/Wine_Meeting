//Variables establecidas
let cartas = document.getElementById("cartas");
let carritoLleno = document.getElementById("carritoLlenoDiv");
let carritoStorage = sessionStorage.getItem("carrito");


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


//Arreglos para la creación de cada uno de los vinos
const vinos = [];

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


//Variable del carrito
let carrito = [];


// Función para agregar al carrito
const agregarCarrito = (id) => {
    let vino = vinos.find((item) => item.id === id);
    Swal.fire({
        background: "#44021b",
        title: "Agregaste al carrito el producto:",
        text: `${vino.nombre}.,
              $${vino.precio}.`,
        imageUrl: "https://santicheese.com/cdn/shop/products/COLECCION-CABERNET-MALBEC-LARGE_1024x.jpg?v=1544528772",
        imageAlt: "botella de vino",
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: "Custom image",
        timer: 3000,
        color: "#eeee",
        timerProgressBar: true,
        confirmButtonColor: "#05121b",
    });
    carrito.push(vino);
    agregarAlCarrito();
    carrito.length != 0 && carritoLlenoAparece();
};


//Función que hace que aparezca el DIV del carrito vacío
function carritoVacioAparece() {
    if (carrito.length === 0) {
        let div = document.createElement("div");
        div.className = "carritoVacio container";
        div.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <h1>Carrito vacío</h1>
        `;

        carritoVacio.append(div)
    }
}


//Función que hace que aparezca el DIV del carrito lleno
function carritoLlenoAparece() {
    let div = document.createElement("div");
    div.className = "carritoTitulo container";
    div.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
    <h1>Carrito</h1>
    `;
    carritoLleno.append(div);
    carrito.forEach(item => {
        let div = document.createElement("div");
        div.className = "carritoLlenoC";
        div.innerHTML = `
        <h2>${item.nombre}</h2>
        <h3>${item.varietal}</h3>
        <p>$${item.precio}</p>
        <hr/>
        `;
        carritoLleno.append(div);
    });
    //Boton que se crea para vaciar el carrito
    let button = document.createElement("button");
    button.innerHTML = `
    Vaciar carrito <i class="fa-solid fa-trash"></i>
    `;
    button.addEventListener("click", () => {
        sessionStorage.clear();
        location.reload();
    })
    carritoLleno.append(button);
};

///////////////////////////////////////////////////////////
//Condición que carga o no el carrito cuando inicia la página
if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    carritoLlenoAparece();
} else {
    carritoVacioAparece();
};

console.log(carrito.length);//////////////////////
console.log(carritoStorage);//////////////////////


//Función que agrega al sessionStorage
function agregarAlCarrito() {
    carritoLleno.innerHTML = "";
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};


//Características e información que aparece en cada una de las cartas
vinos.forEach((item) => {
    let div = document.createElement("div");
    div.className = "cartas";
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <h3>${item.varietal}</h3>
    <p>$${item.precio}</p>
    <img src="https://santicheese.com/cdn/shop/products/COLECCION-CABERNET-MALBEC-LARGE_1024x.jpg?v=1544528772">
    <button id="boton${item.id}">  <i class="fa-solid fa-cart-plus fa-2xl"></i> Sumar al carrito</button>
    `;
    cartas.append(div);

    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => agregarCarrito(item.id))
});
