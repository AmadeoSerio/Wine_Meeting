import { cartas } from "./inicio.js"
import { restablecerFiltro } from "./inicio.js"


const quienesSomos = document.getElementById("quienesSomos");


//funcion que dibuja el quines somos
const dibujarQuienesSomos = () => {

    let div = document.createElement("div");
    cartas.innerHTML = "";
    div.className = "quienesSomos container"
    div.innerHTML = `
<div class="cami container">
<div>
<h2>Cami Barrionuevo</h2>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure deserunt libero voluptatum inventore labore quasi itaque unde pariatur perspiciatis deleniti aliquid mollitia, dolor saepe molestiae. Repellendus adipisci corrupti ratione, tempore nam reiciendis! Suscipit tempore, temporibus distinctio quibusdam at ex ipsa magnam! Animi, doloremque debitis sunt maxime tempore vero autem atque at optio culpa rem, quae deserunt et ab repellendus. Natus vero ab, laudantium saepe in, quo ut, odio a corrupti ad quibusdam provident non. Pariatur alias nesciunt porro libero! Excepturi saepe sed unde quidem nemo quisquam aliquam beatae qui numquam ipsa in modi optio fugiat provident illo ex, adipisci sunt maiores ab? Perspiciatis deserunt officia asperiores aut inventore, debitis cumque odio? Praesentium autem fugiat fugit sapiente? Consequuntur cum obcaecati libero, laborum placeat cupiditate, expedita praesentium, qui esse quo at quod delectus molestiae aperiam dignissimos quam fuga quaerat velit iure. Eius quasi illo a, consectetur magnam soluta inventore porro recusandae temporibus dolor quos est mollitia cum, hic tempora, nulla.</p>
</div>
<img src="./images/cami.jpg" alt="error del servidor"></img>
</div>

<div class="estefi container">
<img src="./images/estefi.jpg" alt="error del servidor"></img>
<div>
<h2>Estefi Valenzuela</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem fuga debitis voluptatum nam corrupti, ea, autem error consequatur quo saepe odit placeat odio eius ut reiciendis sapiente fugiat asperiores eum? Similique quidem sit quod et quisquam tempore odio molestiae accusantium nostrum aspernatur, animi dolorum facilis placeat illum. Asperiores doloremque voluptatum nam ullam quos, voluptatibus sint magni deleniti neque mollitia blanditiis fuga voluptate nulla, nemo velit eveniet inventore corrupti ipsum eaque, ut porro molestias quisquam odio facilis. Assumenda, debitis officiis dicta a sunt dolor tempora error temporibus amet. Velit ducimus deserunt, repellendus amet aspernatur impedit non nulla sapiente tempore dolor molestias. Ipsam repellendus incidunt necessitatibus consequatur minima tempore vitae? Officiis quaerat at repellat esse reprehenderit magnam quasi tempora perferendis ipsam praesentium rerum, debitis, tenetur, itaque alias molestias. Voluptatum eum eveniet minima asperiores nostrum natus consequuntur neque at quia esse? Beatae doloribus harum quibusdam rem omnis consectetur ipsam officiis veniam autem quis.</p>
</div>
</div>

`
    cartas.append(div);
};

//evento que se genera con el click y dibuja quienes somos
quienesSomos.addEventListener("click", () => {
    dibujarQuienesSomos()
    //esto quita la posibilidad de darle click a "restableces filtros" y que se recargue la página
    restablecerFiltro.removeAttribute("href");
});