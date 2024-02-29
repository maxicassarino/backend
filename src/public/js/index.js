const socket = io()
socket.emit("message", "Comunicación desde WebSockets")



const newProduct = document.getElementById('newProduct')

newProduct.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value

    const newProductData = {
        title,
        category,
        price: parseInt(price),
        stock: parseInt(stock)
    }

    socket.emit('addProduct', newProductData)
})

socket.on('productAdded', (result) => {
    const resultElement = document.getElementById('resultAdd')
    if (resultElement) {
        resultElement.innerHTML = result
    }})