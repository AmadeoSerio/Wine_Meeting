import { cartas } from "./inicio.js"
import { restablecerFiltro } from "./inicio.js"

const contacto = document.getElementById("contacto");

const dibujarContacto = () => {

    let div = document.createElement("div");
    cartas.innerHTML = "";
    div.className = "contacto"
    div.innerHTML = `
    <div class="formulario">
    <h2>Escribinos</h2>
    <form class="container" action="https://formsubmit.co/pachu.sro@gmail.com" method="POST">
        <label class="formName" for="Nombre">Nombre</label>
        <input class="formNameLabel" type="text" name="name">

        <label class="formMail" for="email">Correo electrónico</label>
        <input class="formMailLabel" type="email" name="email">
        
        <label class="formSubject" for="subject">Asunto</label>
        <input class="formSubjectLabel" type="text" name="subject">
        
        <label class="formText" for="comments">Comentarios</label>
        <textarea placeholder="Escribe aquí..." class="formTextLabel" name="comments" cols="15" rows="5"></textarea>

        <input class="formEnviar" type="submit" value="Enviar">
    </form>
    </div>
    <div class="contactoFooter container">
    <p>Seguinos en nuestras redes sociales: <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-instagram"></i></a> <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-tiktok"></i></a> <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-facebook"></i></a>  </p>
    </div>
    `


    cartas.append(div);
    };
    
    contacto.addEventListener("click", () => {
    dibujarContacto()
    restablecerFiltro.removeAttribute("href");
    });