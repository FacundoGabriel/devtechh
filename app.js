document.addEventListener('DOMContentLoaded', () => {
    const titulos = document.querySelectorAll('.opciones--tittle');

    titulos.forEach((titulo) => {
        titulo.addEventListener('click', () => {
            const descripcion = titulo.nextElementSibling;
            const todasLasDescripciones = document.querySelectorAll('.opciones--description');
            const todosLosTitulos = document.querySelectorAll('.opciones--tittle');

            // Verifica si la descripción actual está visible
            const isVisible = descripcion.style.display === 'block';

            // Oculta todas las descripciones y remueve fondo-azul de todos los títulos
            todasLasDescripciones.forEach((desc) => {
                desc.style.display = 'none';
            });

            todosLosTitulos.forEach((tit) => {
                tit.classList.remove('fondo-azul');
                // Remueve la rotación de todos los iconos
                // Remueve la rotación de todos los iconos
                const icon = tit.querySelector('i');
                if (icon) {
                    icon.classList.remove('rotated');

                }

            });

            // Si la descripción no estaba visible, la muestra y agrega la clase fondo-azul
            if (!isVisible) {
                descripcion.style.display = 'block';
                titulo.classList.add('fondo-azul');
                // Agrega la rotación al icono
                const icon = titulo.querySelector('i');
                if (icon) {
                    icon.classList.add('rotated');
                }               
            }
        });
    });




    const btnDolares = document.querySelectorAll('.btn-dolares');
    const btnPesos = document.querySelectorAll('.btn-pesos');

    btnDolares.forEach(btn => {
        btn.addEventListener('click', () => {
            const planContainer = btn.closest('.planes--card');
            const dineroPesos = planContainer.querySelector('.plan-precios-container--ar');
            const dineroDolar = planContainer.querySelector('.plan-precios-container--usd');

            dineroPesos.style.display = "none";
            dineroDolar.style.display = "block";
        });
    });

    btnPesos.forEach(btn => {
        btn.addEventListener('click', () => {
            const planContainer = btn.closest('.planes--card');
            const dineroPesos = planContainer.querySelector('.plan-precios-container--ar');
            const dineroDolar = planContainer.querySelector('.plan-precios-container--usd');

            dineroDolar.style.display = "none";
            dineroPesos.style.display = "block";
        });
    });



    const toggles = document.querySelectorAll('.planes-funcionamiento, .planes-descripcion');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetClass = toggle.classList.contains('planes-funcionamiento') ? '.funcionamiento-como-funciona' : '.funcionamiento-beneficio';
            const currentOpen = document.querySelector('.funcionamiento:not([style*="display: none"])');
            const targetElement = toggle.nextElementSibling;

            if (currentOpen && currentOpen !== targetElement) {
                currentOpen.style.display = 'none';

                 // Remueve la rotación del icono del elemento actualmente abierto
                 const currentIcon = currentOpen.previousElementSibling.querySelector('i');
                 if (currentIcon) {
                     currentIcon.classList.remove('rotated');
                 }
            }

            if (targetElement.style.display === 'none' || targetElement.style.display === '') {
                targetElement.style.display = 'block';
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.add('rotated');
                }
            } else {
                targetElement.style.display = 'none';
                 // Remueve la rotación del icono del elemento objetivo
                 const icon = toggle.querySelector('i');
                 if (icon) {
                     icon.classList.remove('rotated');
                 }
            }
        });
    });


    // Validar formulario


    const email = {
        nombre: '',
        correo: '',
        asunto: '',
        mensaje: ''
    }

    const formulario = document.querySelector('#form');
    const inputNombre = document.querySelector('#nombre');
    const inputCorreo = document.querySelector('#correo');
    const inputAsunto = document.querySelector('#asunto');
    const inputPlan = document.querySelector('#plan');
    const inputMensaje= document.querySelector('#mensaje');
    const btnEnviar = document.querySelector('#enviar')
    const spinner = document.querySelector('.spinner')

   

    inputNombre.addEventListener('input', validar)
    inputCorreo.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputPlan.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    formulario.addEventListener('submit', enviarEmail)
    



    function validar(e) {
        e.preventDefault();

        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatoro` ,e.target.parentElement);
            comprobarEmail()
            return;
        }


        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement)
            comprobarEmail()
            return
        }



        limpiarAlerta(e.target.parentElement)

        email[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarEmail()

    }




    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)



        const error = document.createElement('DIV')
        error.textContent = mensaje;
        error.classList.add('error');


        referencia.appendChild(error);


    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.error')

        if(alerta){
            alerta.remove();
        }
    }


    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)

        return resultado;
    }

        
    function enviarEmail(e){

        spinner.style.display = 'flex';
        formulario.appendChild(spinner);
    
        setTimeout(() => {
            spinner.remove();
    
            formulario.reset();
    
            const correcto = document.createElement('DIV');
            correcto.classList.add('correcto');
            correcto.textContent = 'Formulario enviado correctamente'
        
            formulario.appendChild(correcto);
    
            setTimeout(() => {
                correcto.remove();
            }, 3000);
    
        }, 3000);

     
    
    }



    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnEnviar.style.opacity = '0.5';
            btnEnviar.disabled = true;
            return
        }else{
            btnEnviar.style.opacity = '1';
            btnEnviar.disabled = false;
        }
    
    }








    // Scroll para arriba
        document.querySelector('.button-up').addEventListener('click',scrollUp);

        function scrollUp(){
            const currentScroll = document.documentElement.scrollTop;

            if(currentScroll > 0){
                window.requestAnimationFrame(scrollUp)
                window.scrollTo(0, currentScroll - (currentScroll / 30))
            }
        }

        buttonUp = document.querySelector('.button-up');

        window.onscroll = function(){
            const scroll = document.documentElement.scrollTop

            if(scroll > 500){
                buttonUp.style.display = "block";
            }else if(scroll < 500){
                buttonUp.style.display = "none";
            }
        }



        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault()
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });

        });








})