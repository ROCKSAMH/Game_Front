//------------------------------------------ AÑADIR AL CARRITO Y MOSTRAR ----------------------------------------------------------------------------------

let cartItems = [];
let totalPrice = 0;

function guardarCarrito() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toString());
}

function cargarCarrito() {
    let storedCartItems = localStorage.getItem('cartItems');
    let storedTotalPrice = localStorage.getItem('totalPrice');

    if (storedCartItems && storedTotalPrice) {
        cartItems = JSON.parse(storedCartItems);
        totalPrice = parseFloat(storedTotalPrice);
    }
}
cargarCarrito();

function añadirCarrito(juego, precio) {
    cartItems.push({ nombre: juego, precio: precio });
    totalPrice += precio;

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregaste un juego al carrito',
        showConfirmButton: false,
        timer: 2000
    });

    guardarCarrito();
}

function eliminarItemCarrito(index) {
    totalPrice -= cartItems[index].precio;
    cartItems.splice(index, 1);
    mostrarCarrito();
    guardarCarrito();
}

function mostrarCarrito() {
    let cartItemsElement = document.getElementById('cartItems');
    let totalPriceElement = document.getElementById('totalPrice');

    cartItemsElement.innerHTML = '';

    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let listItem = document.createElement('li');
        listItem.innerHTML = `
        ${item.nombre}<br>Precio: ${item.precio} COP
        <button style="position: relative; left: 80%; display: grid;" type="button" class="btn btn-outline-danger">Eliminar</button><hr>
        `;
        cartItemsElement.appendChild(listItem);

        let deleteButton = listItem.querySelector('.btn-outline-danger');
        deleteButton.addEventListener('click', () => {
            eliminarItemCarrito(i);
        });
    }

    totalPriceElement.textContent = `Total: ${totalPrice} COP`;
}
mostrarCarrito();

//------------------------------------------ PAUSAR VIDEOS ---------------------------------------------------------------------------------------------------------

function stopVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach(function(video) {
      video.pause();
      video.currentTime = 0;
    });
  }
  
  let video1 = document.getElementById('exampleInformarcion1');
  let video2 = document.getElementById('exampleInformarcion2');
  let video3 = document.getElementById('exampleInformarcion3');
  let video4 = document.getElementById('exampleInformarcion4');
  
  let reproduccion = [video1, video2, video3, video4];
  
  reproduccion.forEach(function(modal) {
    modal.addEventListener('hidden.bs.modal', function(event) {
      if (event.target === modal) {
        stopVideo();
      }
    });
  });

//------------------------------------------ ALERTAS DE COMPRA Y AÑADIR AL CARRITO ----------------------------------------------------------------------------------

function comprarRealizada() {
    if (cartItems.length === 0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Agrega juegos al carrito',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 2000
        });
        
        while (cartItems.length > 0) {
            eliminarItemCarrito(0);
        }

        totalPrice = 0;
        mostrarCarrito();
    }
}

  
  