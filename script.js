// Sample product data
const products = [
    {
        id: 1,
        name: "Men's Casual Shirt",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "men"
    },
    {
        id: 2,
        name: "Women's Summer Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "women"
    },
    {
        id: 3,
        name: "Kids' Sneakers",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "kids"
    },
    {
        id: 4,
        name: "Smartphone",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f89782902da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "electronics"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    setup3DEffects();
    setupNavigation();
});

// Display featured products
function displayFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Setup 3D effects for category cards
function setup3DEffects() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Setup navigation and smooth scrolling
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-id');
        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Here you would typically add the product to a shopping cart
            alert(`${product.name} added to cart!`);
        }
    }
}); 