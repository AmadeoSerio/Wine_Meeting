//Variables establecidas
let cartas = document.getElementById("cartas");
let carritoLleno = document.getElementById("carritoLlenoDiv");
let carritoStorage = sessionStorage.getItem("carrito");
let carritoVacio = document.getElementById("carritoVacio");
let botonCarritoCanvasVacio = document.getElementById("botonCarritoCanvasDivVacio");
let botonCarritoCanvasLleno = document.getElementById("botonCarritoCanvasDivLleno");


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
        text: `${vino.nombre}.
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
    botonCarritoLlenoCanvas();
    carrito.length != 0 && carritoLlenoAparece();
    carritoVacio.innerHTML = "";
    botonCarritoCanvasVacio.innerHTML = "";
};


//Función que hace que aparezca el DIV del carrito vacío
function carritoVacioAparece() {
    if (carrito.length === 0) {
        let div = document.createElement("div");
        div.className = "carritoVacio container";
        div.innerHTML = `
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"> <i class="fa-solid fa-cart-shopping"></i> Carrito vacío</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
        </div>
      </div>
        `;

        carritoVacio.append(div);
        botonCarritoVacioCanvas();
    }
}


//Función que hace que aparezca el DIV del carrito lleno
function carritoLlenoAparece() {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"> <i class="fa-solid fa-cart-shopping"></i> Carrito</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div id="carritoCanvas" class="offcanvas-body">
      </div>
    </div>

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
        carritoCanvas.append(div);
    });
    crearBotones();
};


//Función que crea el ícono del carrito vacío
function botonCarritoVacioCanvas() {
    let carritoCanvasVacio = document.createElement("div");
    carritoCanvasVacio.className = "carritoTitulo container";
    carritoCanvasVacio.innerHTML = `
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <i class="fa-solid fa-cart-shopping"></i> </button>
`
    botonCarritoCanvasVacio.append(carritoCanvasVacio);
};


//Función que crea el ícono del carrito lleno
function botonCarritoLlenoCanvas() {
    let carritoCanvasLleno = document.createElement("div");
    carritoCanvasLleno.className = "carritoTitulo container";
    carritoCanvasLleno.innerHTML = `
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <i class="fa-solid fa-cart-shopping"></i> </button>
`
    botonCarritoCanvasLleno.append(carritoCanvasLleno);
};


//Función que agrega al sessionStorage
function agregarAlCarrito() {
    carritoLleno.innerHTML = "";
    botonCarritoCanvasLleno.innerHTML = "";
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};


//Botones que se crean para vaciar el carrito y comprar
function crearBotones() {
    let divBotones = document.createElement("div");
    divBotones.className = "botonesDiv";
    divBotones.innerHTML = "";

    carritoLleno.append(divBotones);

    let botonComprar = document.createElement("button");
    botonComprar.className = "botonComprar";
    botonComprar.innerHTML = `
    Comprar <i class="fa-regular fa-credit-card"></i>
    `;
    botonComprar.addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si!',
            cancelButtonText: 'Cancelar',
            background: "#44021b",
            color: "#eeee",
            confirmButtonColor: "#05121b",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                location.reload();
            }
        })
    });

    let botonVaciar = document.createElement("button");
    botonVaciar.className = "botonVaciar";
    botonVaciar.innerHTML = `
    Vaciar carrito <i class="fa-solid fa-trash"></i>
    `;
    botonVaciar.addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, vacialo!',
            cancelButtonText: 'Cancelar',
            background: "#44021b",
            color: "#eeee",
            confirmButtonColor: "#05121b",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Vaciando',
                    html: 'Esta ventana se cierra en <b></b> milisegundos.',
                    background: "#44021b",
                    color: "#eeee",        
                    timer: 1000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                });
                setTimeout(() => {
                    sessionStorage.clear();
                    location.reload();
                }, 1000);
            }
        })
    });
    carritoCanvas.append(botonComprar);
    carritoCanvas.append(botonVaciar);
};


//Condición que carga o no el carrito cuando inicia la página
if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    carritoLlenoAparece();
    botonCarritoLlenoCanvas();
} else {
    carritoVacioAparece();
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