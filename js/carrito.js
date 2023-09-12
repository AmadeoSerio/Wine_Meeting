import { vinos } from "./inicio.js"
import { carritoStorage } from "./inicio.js"


const carritoLleno = document.getElementById("carritoLlenoDiv");
const carritoVacio = document.getElementById("carritoVacio");
const botonCarritoCanvasVacio = document.getElementById("botonCarritoCanvasDivVacio");
const botonCarritoCanvasLleno = document.getElementById("botonCarritoCanvasDivLleno");


//Variable del carrito
let carrito = [];

export function storage() { carrito = JSON.parse(carritoStorage); }

// Función para agregar al carrito
export const agregarCarrito = (idVino) => {
    const vino = vinos.find((item) => item.id === idVino);


    const { nombre, precio, id, varietal, img } = vino

    Swal.fire({
        background: "#44021b",
        title: "Agregaste al carrito el producto:",
        text: `${nombre}.
              $${precio}.`,
        imageUrl: `${img}`,
        imageAlt: "botella de vino",
        imageWidth: 240,
        imageHeight: 500,
        imageAlt: "Custom image",
        timer: 3000,
        color: "#eeee",
        timerProgressBar: true,
        confirmButtonColor: "#05121b",

    });

    const vinoCarrito = carrito.find((vino) => vino.id === idVino);

    if (vinoCarrito === undefined) {
        const nuevoVinoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            varietal: varietal,
            cantidad: 1,
        }
        carrito.push(nuevoVinoCarrito);

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    } else {
        const indexVinoCarrito = carrito.findIndex((item) => item.id === idVino)

        carrito[indexVinoCarrito].cantidad++
        carrito[indexVinoCarrito].precio = precio * carrito[indexVinoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }

    limpiaDiv();
    botonCarritoLlenoCanvas();
    carrito.length != 0 && carritoLlenoAparece();
    carrito.length === 0 && carritoVacioAparece();
};


//Función que hace que aparezca el DIV del carrito vacío
export function carritoVacioAparece() {
    if (carrito.length === 0) {
        let div = document.createElement("div");
        div.className = "carritoVacio container";
        div.innerHTML = `
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
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
        botonCarritoCanvasLleno.innerHTML = "";
    }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sumarCantidad = (idVino) => {
    const indexVinoCarrito = carrito.findIndex((item) => item.id === idVino)
    const precio = carrito[indexVinoCarrito].precio / carrito[indexVinoCarrito].cantidad
    carrito[indexVinoCarrito].cantidad++
    carrito[indexVinoCarrito].precio = precio * carrito[indexVinoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito();
    crearBotones();
}

const restarCantidad = (idVino) => {
    const indexVinoCarrito = carrito.findIndex((item) => item.id === idVino)
    const precio = carrito[indexVinoCarrito].precio / carrito[indexVinoCarrito].cantidad
    carrito[indexVinoCarrito].cantidad--
    carrito[indexVinoCarrito].precio = precio * carrito[indexVinoCarrito].cantidad
    if (carrito[indexVinoCarrito].cantidad === 0) {
        carrito.splice(indexVinoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito();
    crearBotones();

    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vaciado',
            html: 'Esta ventana se cierra en <b></b> milisegundos.',
            background: "#44021b",
            color: "#eeee",
            timer: 2000,
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
        }, 2000);
    }
}


//Función que hace que aparezca el DIV del carrito lleno
export function carritoLlenoAparece() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"> <i class="fa-solid fa-cart-shopping"></i> Carrito</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div id="carritoCanvas" class="offcanvas-body">
      </div>
    </div>

    `;
    carritoLleno.append(div);

    dibujarCarrito();
    crearBotones();
};





const dibujarCarrito = () => {
    carritoCanvas.innerHTML = "";
    carrito.forEach(item => {
        const { nombre, varietal, precio, cantidad, id } = item;

        const div = document.createElement("div");
        div.className = "carritoLlenoC";
        div.innerHTML = `
        <h2>${nombre}</h2>
        <h3>${varietal}</h3>
        <p>X${cantidad}</p>
        <p>$${precio}</p>
        <div class="botonesAgregarRestar">
        <button id="-${id}" class="boton-"> <i class="fa-regular fa-square-minus"></i> </button>
        <button id="+${id}" class="boton+"> <i class="fa-regular fa-square-plus"></i> </button>
        </div>
        `;
        carritoCanvas.append(div);

        const btnMenos = document.getElementById(`-${id}`);
        const btnMas = document.getElementById(`+${id}`);

        btnMenos.addEventListener("click", () => restarCantidad(id));
        btnMas.addEventListener("click", () => sumarCantidad(id));

    });
}





//Función que crea el ícono del carrito vacío
export function botonCarritoVacioCanvas() {
    const carritoCanvasVacio = document.createElement("div");
    carritoCanvasVacio.className = "carritoTitulo container";
    carritoCanvasVacio.innerHTML = `
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i class="fa-solid fa-cart-shopping"></i> </button>
`
    botonCarritoCanvasVacio.append(carritoCanvasVacio);
};


//Función que crea el ícono del carrito lleno
export function botonCarritoLlenoCanvas() {
    const carritoCanvasLleno = document.createElement("div");
    carritoCanvasLleno.className = "carritoTitulo container";
    carritoCanvasLleno.innerHTML = `
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i class="fa-solid fa-cart-shopping"></i> </button>
`
    botonCarritoCanvasLleno.append(carritoCanvasLleno);
};


//Función que agrega al sessionStorage
function limpiaDiv() {
    carritoLleno.innerHTML = "";
    botonCarritoCanvasLleno.innerHTML = "";
    carritoVacio.innerHTML = "";
    botonCarritoCanvasVacio.innerHTML = "";
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const generarTotales = () => {
    const valorTotal = carrito.reduce((total, { precio }) => total + precio, 0);
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0);

    return {
        valorTotal: valorTotal,
        cantidadTotal: cantidadTotal
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////





//Botones que se crean para vaciar el carrito y comprar
function crearBotones() {
    const totales = document.createElement("div");
    totales.innerHTML = "";
    carritoLleno.append(totales);


    const cantidadesTotales = document.createElement("tr");
    cantidadesTotales.className = "totales container"
    cantidadesTotales.innerHTML = `
    <td>Cantidad de vinos: ${generarTotales().cantidadTotal}</td>
    <td></td>
    <th><b>Total:$${generarTotales().valorTotal}</b></th>
    `


    const divBotones = document.createElement("div");
    divBotones.className = "botonesDiv";
    divBotones.innerHTML = "";

    carritoLleno.append(divBotones);

    const botonComprar = document.createElement("button");
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
                Swal.fire({
                    title: '¿Tienes 18 años o más?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                    background: "#44021b",
                    color: "#eeee",
                    confirmButtonColor: "#05121b"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Gracias por su compra',
                            background: "#44021b",
                            color: "#eeee",
                            timer: 2000,
                            timerProgressBar: true,
                            allowOutsideClick: false,
                            confirmButtonColor: "#05121b",
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
                        }, 2000);
                    } else if (result.isDenied) {
                        Swal.fire({
                            title: 'Tienes que ser mayor de edad para comprar bebidas alcohólicas',
                            allowOutsideClick: false,
                            confirmButtonColor: "#05121b",
                            background: "#44021b",
                            color: "#eeee"
                        }).then((click) => {
                            if (click.isConfirmed) {
                                sessionStorage.clear();
                                window.location.href = `https://www.google.com/`
                            }
                        })
                    }
                })
            }
        })
    });

    const botonVaciar = document.createElement("button");
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
                    timer: 2000,
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
                }, 2000);
            }
        })
    });
    carritoCanvas.append(cantidadesTotales);
    carritoCanvas.append(botonComprar);
    carritoCanvas.append(botonVaciar);
};