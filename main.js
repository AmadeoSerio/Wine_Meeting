let cartas = document.getElementById("cartas");

//Clase constructora para las cartas del index
class Cards {
    constructor(id, nombre, varietal, precio) {
        this.id = id;
        this.nombre = nombre;
        this.varietal = varietal;
        this.precio = precio;
        this.ocupado = false;
    }

    fechaOcupada() {
        this.ocupado = true;
    }
}

//Arreglos para la creación de cada uno de los vinos
const vinos = [];

vinos.push(new Cards(1, "Bodega Piedra Negra Chacayes Los Chacayes", "Malbec", 20000));
vinos.push(new Cards(2, "Bodegas Borsao Syrah Campo de Borja Zarihs", "Syrah", 20000));
vinos.push(new Cards(3, "Bodegas Juan Gil Jumilla Blue Label", "Malbec", 10000));
vinos.push(new Cards(4, "Clos de la Grange Sauvignon Touraine", "Cabernet sauvignon", 18000));
vinos.push(new Cards(5, "Albert Morot Beaune Cent-Vignes", "Malbec", 12000));
vinos.push(new Cards(6, "Klinker Brick Grenache Blanc Lodi", "Malbec", 18000));
vinos.push(new Cards(7, "Ken Wright Pinot Noir Willamette Valley", "Syrah", 18000));
vinos.push(new Cards(8, "Bodegas Juan Gil Jumilla Blue Label", "Malbec", 18000));
vinos.push(new Cards(9, "Moric Burgenland Hausmarke", "Malbec", 18000));
vinos.push(new Cards(10, "Trimbach Riesling Alsace", "Malbec", 18000));
vinos.push(new Cards(11, "Boscarelli Vino Nobile di Montepulciano", "Malbec", 18000));
vinos.push(new Cards(12, "Vietti Barbera d’Asti Tre Vigne", "Malbec", 18000));

const carrito = [];

//
const agregarCarrito = (id) => {
    let vino = vinos.find((item) => item.id === id);
    let mensaje = `
    Agregaste al carrito el producto:
    ${vino.nombre}
    Precio ${vino.precio}
    `;
    alert(mensaje);
    carrito.push(vino);
    console.log(carrito);
};
//

//Características e información que aparece en cada una de las cartas
vinos.forEach((item) => {
    let div = document.createElement("div");
    div.className = "cartas";
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <h3>${item.varietal}</h3>
    <p>$${item.precio}</p>
    <img src="https://santicheese.com/cdn/shop/products/COLECCION-CABERNET-MALBEC-LARGE_1024x.jpg?v=1544528772">
    <button id="boton${item.id}">Agregar al carrito</button>
    `;
    cartas.append(div);
    
    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => agregarCarrito(item.id))
});



let carritoStorage = sessionStorage.getItem("carrito");

if (carritoStorage) {
    carritoSave = JSON.parse(carritoStorage);
}else{
    let div = document.createElement("div");
    div.className = "carritoVacio";
    div.innerHTML = `
    <h1>Carrito vacío</h1>
    `;

    carritoVacio.append(div)
}

sessionStorage.setItem("carrito", JSON.stringify(carrito));

carrito.forEach(item => {
    let div = document.createElement("div");
    // let button = document.createElement("button");
    div.className = "carritoLleno";
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <h3>${item.varietal}</h3>
    <p>$${item.precio}</p>
    `;
    // button.innerHTML = `
    // "vaciar carrito"
    // `;
    // button.addEventListener("click", () => {
        // sessionStorage.clear();
        // location.reload();
    // })
    carritoLleno.append(div);
    // carritoLleno.append(button);
});
