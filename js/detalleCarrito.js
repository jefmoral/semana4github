//variables globales

let tablacarrito = document.querySelector(".cart-table tbody");


//agregar evento al nevagador
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProductos();
})
//funcion cargar productos guardados en localStorage
function cargarProductos (){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    
    todosProductos.forEach(producto => {
        //agregar productos
        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td> <img src="${producto.imagen}" width="70px"> </td>
        <td> ${producto.nombre} </td>
        <td> $${producto.precio} </td>
        <td> <span onclick = "borrarProducto()" class="btn-danger"> X </span></td>
    `;
        tablacarrito.appendChild(fila);
    });
    
}