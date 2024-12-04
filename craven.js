// Simple cart functionality
let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    alert(${item} added to cart!);
    console.log("Cart:", cart);
}