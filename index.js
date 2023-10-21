const contacto = document.getElementById('contacto');
contacto.addEventListener('click', () => {
    Swal.fire({
        title: 'MMMMMM algo salio mal, intentelo mas tarde ¿)',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/multimedia/homer.gif")
          center top
          no-repeat
        `
      })
});

function generarTarjetas(datos, id_tarjetas,familia) {
    const contenedorTarjetas = document.getElementById(id_tarjetas);

    for (let i = 1; i <= datos.length; i++) {
        const tarjeta = datos[i - 1];

        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.classList.add('tarjeta');
        nuevaTarjeta.id = id_tarjetas + `${i}`;

        nuevaTarjeta.innerHTML = `
            <img src="${tarjeta.imagen}" alt="${tarjeta.nombre}">
            <div class="datos_tarjeta1">
                <h3>${tarjeta.nombre}</h3>
                <p>Precio : $${tarjeta.precio}</p>
            </div>
            <div class="datos_tarjeta2">
                <label for="cant_${familia}${i}">cant:</label>
                <input type="number" id="cant_${familia}${i}" class="selector">
                <button type="button" class="btn" id="${familia}${i}">Agregar</button>
            </div>
        `;

        contenedorTarjetas.appendChild(nuevaTarjeta);

        // Agregar evento clic al boton "Agregar" de la tarjeta actual
        const botonAgregar = document.getElementById(`${familia}${i}`);
        botonAgregar.addEventListener('click',  () => {
            const cantidad = parseInt(document.getElementById(`cant_${familia}${i}`).value);
            const producto = { nombre: tarjeta.nombre, imagen: tarjeta.imagen, precio: tarjeta.precio, cantidad };
                 
            if (cantidad > 0 ){
                // Agregar el producto al carrito
                agregarAlCarrito(producto);
                 //alerta de agregar objeto al carrito
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se agrego correctamente al carrito',
                    showConfirmButton: false,
                    timer: 1500,
                    width : 250,
                    
                  })
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ingrese una cantidad Valida',
                    showConfirmButton: false,
                    timer: 2500,
                    width : 250,
                    
                  })
            }
           
        });
    }
}
// Función para borrar la Local Storage
function borrarLocalStorage() {
    localStorage.clear(); 

    //alert('El carrito ah sido borrado.'); 
    location.reload();
}
function sumarPreciosCarrito() {
    // se obtiene el carrito desde el localstorage y se convierte de JSON a obj
    const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

    // inicializacion del total,(se utiliza como sumador)
    let total = 0;

    
    carrito.forEach(producto => {
        total += parseInt(producto.precio) * producto.cantidad;
    });

    //  se devuelve el total
    return total;
}

// funcion para agregar productos al carrito
function agregarAlCarrito(producto) {
    // Verificar si el carrito ya existe en localStorage
    const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

    // Agregar el nuevo producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en localStorage como JSON
    localStorage.carrito = JSON.stringify(carrito);

}

// Datos y llamada para zapatillas
const datos_zapatilla = [
    { nombre: "Vans", imagen: "./multimedia/zapatillaVans.webp", precio: "9500" },
    { nombre: "DC", imagen: "./multimedia/zapatillasDC.webp", precio: "10000" },
    { nombre: "Element", imagen: "./multimedia/zapatillasElement", precio: "10500" }
];

generarTarjetas(datos_zapatilla, 'contenedorZapatillas','zapatillas');

// Datos y llamada para Pantalones
const datos_pantalones = [
    { nombre: "Jeans", imagen: "./multimedia/pantalonesJeans", precio: "6000" },
    { nombre: "Joggis", imagen: "./multimedia/pantalonesJoggings", precio: "4000" },
    { nombre: "Bermudas", imagen: "./multimedia/bermuda", precio: "5760" }
];

generarTarjetas(datos_pantalones, 'contenedorPantalones','pantalones');

// Datos y llamada para buzos
const datos_Buzos = [
    { nombre: "Canguro", imagen: "./multimedia/canguro", precio: "13250" },
    { nombre: "Deportivo", imagen: "./multimedia/deportivo", precio: "18000" },
    { nombre: "Buzo Campera", imagen: "./multimedia/buzoCampera", precio: "23598" }
];

generarTarjetas(datos_Buzos, 'contenedorBuzos', 'buzos');


//  funcion para bbtener el carrito desde el almacenamiento local y convertirlo de JSON a objeto
function mostrarCarrito() {
    
    const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

    // Construir una cadena de texto con los elementos del carrito
    let carritoHTML = '<ul>';
    carrito.forEach(producto => {
        carritoHTML += `<li>${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</li>`;
    });
    carritoHTML += '</ul>';

    // Mostrar la cadena de texto en el elemento con el id "carrito"
    const carritoElemento = document.getElementById('carritoContenedor');
    carritoElemento.innerHTML = carritoHTML;
}
    //REaccion del evento 'click' del boton
document.getElementById('botonCarrito').addEventListener('click', () => {
    // se obtiene el elemento con el id "carrito"
    const carritoElemento = document.getElementById('carritoContenedor');

        // aca se verifica si el carrito tiene la clase "activado"
    if (carritoElemento.classList.contains('activado')) {
        // Si tiene la clase 'activado', se le  cambia a "desactivado"

        carritoElemento.classList.remove('activado');
        carritoElemento.classList.add('desactivado');
    } else {
        // Si no tiene la clase "activado", se lo cambia a "activado"
        carritoElemento.classList.remove('desactivado');
        carritoElemento.classList.add('activado');
        mostrarCarrito()

        // funcion para obtener la suma de precios del carrito
        const totalCarrito = sumarPreciosCarrito();

        // Se muestra el total del carrito por consola
        console.log(`Total del carrito: $${totalCarrito}`);
    }
});

const botonBorrarLocalStorage = document.getElementById('botonBorrarLocalStorage');


botonBorrarLocalStorage.addEventListener('click', () => {
             
            //consulta por borrar carrito
             Swal.fire({
                title: 'Estas Segur@?',
                text: "Se Borraran todos los elementos del carrito",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Quiero'
              }).then((result) => {
                if (result.isConfirmed) {
                    //alerta para borrar carrito. 
                    Swal.fire(
                        'Perfecto!',
                        'Los elementos fueron borrados con exito!',
                        'success'
                    )
                    setTimeout ( function () {borrarLocalStorage();}, 1500);
                }
              })
        }   
    );

var reseñasVisible = false; // Variable para rastrear si las reseñas estan visibles o no

document.getElementById('mostrarReseña').addEventListener('click', function() {
    var boton = document.getElementById('mostrarReseña');

    if (!reseñasVisible) {
        fetch('comentarios.json') 
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // se recorren las reseñas y se crean tarjetas
                data.productos.pantalones.forEach(function(pantalon) {
                    pantalon.reseñas.forEach(function(reseña) {
                        // tarjeta con el comentario y calificación
                        var tarjeta = `<div class="tarjetaReseña">
                                        <h3>${reseña.usuario}</h3>
                                        <p><strong>Calificación:</strong> ${reseña.calificacion}</p>
                                        <p>${reseña.comentario}</p>
                                      </div>`;
                        // se agrega la tarjeta al contenedor de reseñas
                        document.getElementById('reseñasContainer').insertAdjacentHTML('beforeend', tarjeta);
                    });
                });
                reseñasVisible = true; // marcar las reseñas como visibles
                boton.textContent = 'Esconder Reseñas'; // cambiar el texto del botn
            })
            .catch(function(error) {
                console.log('Error al cargar las reseñas:', error);
            });
    } else {
        // ocultar reseñas
        document.getElementById('reseñasContainer').innerHTML = '';
        reseñasVisible = false; // marcar las reseñas como no visibles
        boton.textContent = 'Ver Reseñas'; // cambiar el texto del botomn
    }
});
