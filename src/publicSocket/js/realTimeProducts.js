const socket = io();


socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = `${product.title} - Precio: $${product.price}`;
    productList.appendChild(listItem);
});


socket.on('productDeleted', (productId) => {
    const productList = document.getElementById('productList');
    const listItem = Array.from(productList.children).find((li) => {
        const productData = li.textContent.split(' - Precio: $');
        return productData[0] && productData[0].includes(productId.toString());
    });

    if (listItem) {
        productList.removeChild(listItem);
    }
});
