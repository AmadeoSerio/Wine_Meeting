let cartas = document.getElementById("cartas");

class Cards {
    constructor(nombre, varietal, precio) {
        this.nombre = nombre;
        this.varietal = varietal;
        this.precio = precio;
        this.ocupado = false;
    }

    fechaOcupada() {
        this.ocupado = true;
    }
}

const vinos = [];

vinos.push(new Cards("Bodega Piedra Negra Chacayes Los Chacayes","Malbec", 20000));
vinos.push(new Cards("Bodegas Borsao Syrah Campo de Borja Zarihs","Syrah", 20000));
vinos.push(new Cards("Bodegas Juan Gil Jumilla Blue Label","Malbec", 10000));
vinos.push(new Cards("Clos de la Grange Sauvignon Touraine","Cabernet sauvignon", 18000));
vinos.push(new Cards("Albert Morot Beaune Cent-Vignes","Malbec", 12000));
vinos.push(new Cards("Klinker Brick Grenache Blanc Lodi","Malbec", 18000));
vinos.push(new Cards("Ken Wright Pinot Noir Willamette Valley","Syrah", 18000));
vinos.push(new Cards("Bodegas Juan Gil Jumilla Blue Label","Malbec", 18000));
vinos.push(new Cards("Moric Burgenland Hausmarke","Malbec", 18000));
vinos.push(new Cards("Trimbach Riesling Alsace","Malbec", 18000));
vinos.push(new Cards("Boscarelli Vino Nobile di Montepulciano","Malbec", 18000));
vinos.push(new Cards("Vietti Barbera d’Asti Tre Vigne","Malbec", 18000));



vinos.forEach((item) => {
    let div = document.createElement("div");
    div.className = "cartas";
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <h3>${item.varietal}</h3>
    <p>$${item.precio}</p>
    <img src="https://santicheese.com/cdn/shop/products/COLECCION-CABERNET-MALBEC-LARGE_1024x.jpg?v=1544528772">
    `;
    cartas.append(div);
});

