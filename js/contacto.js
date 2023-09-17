import { cartas } from "./inicio.js"
import { restablecerFiltro } from "./inicio.js"


const contacto = document.getElementById("contacto");


//Esta función dibuja el formulario del contacto para enviar un mail (funcionando)
const dibujarContacto = () => {

    let div = document.createElement("div");
    cartas.innerHTML = "";
    div.className = "contacto"
    div.innerHTML = `
    <div class="formulario">
    <h2>Escribinos</h2>
    <form id="form" class="container" action="https://formspree.io/f/mgejzzar" method="POST">
        <label class="formName" for="name">Nombre</label>
        <input class="formNameLabel" required type="text" name="name" id="name">

        <label class="formSubject" for="number">Teléfono</label>
        <input class="formSubjectLabel" required type="tel" name="number" id="number">

        <label class="formMail" for="email">Correo electrónico</label>
        <input class="formMailLabel" required type="text" name="email" id="email">
        
        <label class="formText" for="comments">Comentarios</label>
        <textarea placeholder="Escribe aquí..." class="formTextLabel" required name="message" id="message" cols="15" rows="5"></textarea>

        <input id="enviarMail" class="formEnviar" type="submit" value="Enviar">
    </form>
    </div>
    <div class="contactoFooter container">
    <p>Seguinos en nuestras redes sociales: <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-instagram"></i></a> <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-tiktok"></i></a> <a href="https://www.youtube.com/shorts/96GnOB1iZQI" target="_blank"><i class="fa-brands fa-facebook"></i></a>  </p>
    </div>b
    `

    cartas.append(div);
};


//Este evento hace que con el click sobre "contacto" se active la función de dibujar el formulario
contacto.addEventListener("click", () => {
    dibujarContacto()
    //esto quita la posibilidad de darle click a "restableces filtros" y que se recargue la página
    restablecerFiltro.removeAttribute("href");
    //variables para que funcione el envío de los mails
    const enviarMail3 = document.getElementById("enviarMail");
    const $form = document.querySelector("#form")


    //función para enviar el mail y que no se recargue la página, ni que te redireccione a formspree.io
    enviarMail3.addEventListener("click", () => {
        $form.addEventListener("submit", handleSubmit)
        async function handleSubmit(event) {
            event.preventDefault()
            const form = new FormData($form)
            const response = await fetch($form.action, {
                method: $form.method,
                body: form,
                headers: {
                    "Accept": "application/json"
                }
            })
            //mensaje que sale cuando se presiona enviar
            if (response.ok) {
                $form.reset();
                Swal.fire({
                    customClass: {
                        popup: 'popup-class'},
                    title: 'Gracias por escribirme. Pronto me pondré en contacto',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancelar',
                    background: "#44021b",
                    color: "#eeee",
                    confirmButtonColor: "#05121b",
                })
            }
        }
    })
});