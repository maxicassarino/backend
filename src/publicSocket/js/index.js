const socket = io()
socket.emit("message", "Comunicación desde WebSockets")

// function submitProductForm(event) {
//     event.preventDefault();

//     const productName = document.getElementById('productName').value;
//     const productDescription = document.getElementById('productDescription').value;
//     const productPrice = document.getElementById('productPrice').value;
//     const action = document.getElementById('action').value;

//     if (action === 'add') {
//         socket.emit('addProduct', { name: productName, description: productDescription, price: productPrice });
//     } else if (action === 'delete') {
//         socket.emit('deleteProduct', { name: productName, description: productDescription, price: productPrice });
//     }

//     document.getElementById('productName').value = '';
//     document.getElementById('productPrice').value = '';
// }