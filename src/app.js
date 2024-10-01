import { buscarNombre, quicksort } from "./utilities.mjs";

const agregarCarrito = document.querySelectorAll('.agregar-carrito');


class Producto{

    constructor(nombre, description, code, precio, imagen){
        this.nombre = nombre;
        this.descripcion = description;
        this.codigo = code;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

let carrito = []

agregarCarrito.forEach(element => {
    element.addEventListener('click', function(event) {

        event.preventDefault();
        const target = event.target;

        // Encuentra el contenedor padre más cercano
        const productCard = target.closest('.w-full');

        const img = productCard.querySelector('img').src;
        const title = productCard.querySelector('h5').textContent;
        let price = productCard.querySelector('.precio').textContent;
        price = price.slice(1)
        price = parseFloat(price)
        let code = productCard.querySelector('span').textContent;
        code = code.slice(8)
        const description = productCard.querySelector('p').textContent;


        const objetoEncontrado = carrito.find(item => item.nombre == title);

        if (objetoEncontrado) {
            objetoEncontrado.cantidad += 1;
        } else {
        let producto = new Producto(title, description, code, price, img)
        carrito.push(producto)
        }

        console.log(carrito)

        actualizarCantidadCarrito();
        imprimirCarrito();
        ReporteVentas(carrito);

    });

   
});

function actualizarCantidadCarrito(){
    const cantidadCarrito = document.getElementById('cantidad-carrito');

    let cantidad = carrito.length;

    // Actualiza el contenido del span con la cantidad
    cantidadCarrito.textContent = cantidad;
}

document.getElementById('boton-carrito').addEventListener('click', function() {
    const recuadroCarrito = document.getElementById('recuadro-carrito');
    // Alternar la clase para mostrar/ocultar
    recuadroCarrito.classList.toggle('show');
});


function imprimirCarrito(){
    const recuadroCarrito = document.getElementById('recuadro-carrito');


    recuadroCarrito.innerHTML = '';

    // Iterar sobre cada producto en el array
    carrito.forEach(producto => {

        // Crear el contenedor del producto
        let productoAgregado = document.createElement('div');
        productoAgregado.className = 'flex items-center border border-gray-200 rounded-lg p-4 mb-2'; // Estilos del contenedor

        // Crear el recuadro de la imagen
        let imagenRecuadro = document.createElement('div');
        imagenRecuadro.className = 'w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden';

        // Crear la imagen del producto
        let img = document.createElement('img');
        img.src = producto.imagen; 
        img.alt = 'Imagen del producto';
        img.className = 'object-cover w-full h-full';

        // Añadir la imagen al recuadro
        imagenRecuadro.appendChild(img);

        // Crear el contenedor para la información del producto
        let infoProducto = document.createElement('div');
        infoProducto.className = 'ml-4'; // Margen a la izquierda

        // Crear el nombre del producto
        let nombreProducto = document.createElement('h5');
        nombreProducto.className = 'text-lg font-semibold text-gray-900';
        nombreProducto.innerText = producto.nombre; // Nombre del producto

        // Crear la cantidad
        let cantidad = document.createElement('p');
        cantidad.className = 'text-sm text-gray-600';
        cantidad.innerText = 'Cantidad: ' + producto.cantidad; // Cantidad del producto

        // Crear el código del producto
        let codigo = document.createElement('p');
        codigo.className = 'text-sm text-gray-600';
        codigo.innerText = 'Código: ' + producto.codigo; // Código del producto

        // Añadir la información al contenedor de información
        infoProducto.appendChild(nombreProducto);
        infoProducto.appendChild(cantidad);
        infoProducto.appendChild(codigo);

        // Añadir el recuadro de imagen y la información al producto agregado
        productoAgregado.appendChild(imagenRecuadro);
        productoAgregado.appendChild(infoProducto);

        // Añadir el producto agregado al recuadro del carrito
        recuadroCarrito.appendChild(productoAgregado);
        
    });


}


document.getElementById('Ordenamiento').addEventListener('change', function(event) {
    let atributo = event.target.value;

    let datosOrdenados = quicksort(carrito, atributo);

    ReporteVentas(datosOrdenados)
});


function ReporteVentas(lista) {
    const tabla = document.getElementById('table');
    tabla.className ="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"


    // Limpiar el contenido anterior de la tabla
    tabla.innerHTML = '';

    // Crear el encabezado de la tabla
    const thead = document.createElement('thead');
    thead.className = 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400';

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th scope="col" class="px-6 py-3">Clave del producto</th>
        <th scope="col" class="px-6 py-3">Nombre</th>
        <th scope="col" class="px-6 py-3">Descripción</th>
        <th scope="col" class="px-6 py-3">Precio</th>
        <th scope="col" class="px-6 py-3">Cantidad</th>
        <th scope="col" class="px-6 py-3">Total</th>
    `;

    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tableBody = document.createElement('tbody');

    // Agregar las filas con los datos usando forEach
    lista.forEach(item => {
    
        const row = document.createElement('tr');
        row.className = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600';

        row.innerHTML = `
            <td class="px-6 py-3">${item.codigo}</td>
            <td class="px-6 py-3">${item.nombre}</td>
            <td class="px-6 py-3">${item.descripcion}</td>
            <td class="px-6 py-3">${item.precio}</td>
            <td class="px-6 py-3">${item.cantidad}</td>
            <td class="px-6 py-3">${(item.cantidad * item.precio)}</td>
        `;

        tableBody.appendChild(row);
    });

    tabla.appendChild(tableBody);
}

// busqueda de productos por nombres

document.getElementById('search').addEventListener('input', () => {
    let objetivo = document.getElementById('search').value;

    let listaObjetivos = buscarNombre(carrito, objetivo);

    ReporteVentas(listaObjetivos)

})


