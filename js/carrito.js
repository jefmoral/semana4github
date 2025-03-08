//variables globales

let btnProducts = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro ");
let con = 0;
let listadoCarrito = document.querySelector(".list-cart tbody")

document.addEventListener("DOMContentLoaded",()=>{
    cargarProLocalStorage();
})

btnProducts.forEach((btn,i)=>{
    btn.addEventListener("click", ()=>{
        //contador de productos en el carrito
        con++;
        contadorCarrito.textContent = con;
        //agregar producto al carrito
        infoProducto(i);
    })
})

//agregar producto al carrito

function agregarProducto(producto, con){
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> ${con} </td>
        <td> <img src="${producto.imagen}" width="70px"> </td>
        <td> ${producto.nombre} </td>
        <td> $${producto.precio} </td>
        <td> <span onclick = "borrarProducto(${con})" class="btn-danger"> X </span></td>
    `;
    listadoCarrito.appendChild(fila);
}

//funcion para agregar la informacion del producto al carrito
function infoProducto (pos){
    let producto = btnProducts[pos].parentElement.parentElement.parentElement;
    let infoPro = {
        nombre : producto.querySelector("h3").textContent,
        imagen : producto.querySelector("img").src,
        precio : producto.querySelector("h5").textContent.split("$")[1],
        cantidad : 1
    }
    agregarProducto(infoPro);
    guardarProLocalStorage(infoPro);
}

//funcion para elminar un producto del carrito
function borrarProducto(pos){
    let producto = event.target;
    producto.parentElement.parentElement.remove();
    if (con > 0){
        con --;
        contadorCarrito.textContent = con;
    }
    eliminarProLocalStorage(pos);
}

//guardar los productos en localstorage
function guardarProLocalStorage(producto){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    // let todosProductos = [];
    // let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    // if (todosProductos !=null){
    //     todosProductos = Object.values(productosPrevios);
    // }   
    todosProductos.push(producto);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))
}

//eliminar producto localStorage
function eliminarProLocalStorage(pos){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    todosProductos.splice((pos-1),1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))
}

//cargar productos de localStorage en el carrito
function cargarProLocalStorage(){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    todosProductos.forEach((producto)=>{
      agregarProducto(producto);  

    })
}

contadorCarrito.parentElement.addEventListener("click", ()=>{
    listadoCarrito.parentElement.classList.toggle("ocultar")
});

