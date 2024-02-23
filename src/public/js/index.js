const socket = io()
socket.emit("message", "Comunicación desde WebSockets")



const newProduct = document.getElementById('newProduct')

newProduct.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value

    const newProductData = {
        title,
        description,
        category,
        price: parseInt(price),
        thumbnail,
        code,
        stock: parseInt(stock),
        status: true
    }

    socket.emit('addProduct', newProductData)
})

socket.on('productAdded', (result) => {
    const resultElement = document.getElementById('resultAdd')
    if (resultElement) {
        resultElement.innerHTML = result
    }})