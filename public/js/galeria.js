// Galería mejorada con efectos adicionales

function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    const img = element.querySelector('img');
    const title = element.querySelector('h3').textContent;
    const description = element.querySelector('.gallery-overlay p').textContent;
    
    modal.classList.add('active');
    modalImg.src = img.src;
    caption.textContent = title;
    
    document.body.style.overflow = 'hidden';
    
    // Sonido sutil de click (opcional, puedes comentar si no quieres)
    playClickSound();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Navegación con flechas en el modal
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (!modal.classList.contains('active')) return;
    
    if (event.key === 'ArrowRight') {
        navigateImage(1);
    } else if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    }
});

function navigateImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryItems.length - 1;
    } else if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = 0;
    }
    
    const item = galleryItems[currentImageIndex];
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    // Efecto de transición
    modalImg.style.opacity = '0';
    setTimeout(() => {
        modalImg.src = item.querySelector('img').src;
        caption.textContent = item.querySelector('h3').textContent;
        modalImg.style.opacity = '1';
    }, 200);
}

// Actualizar índice cuando se abre el modal
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', function() {
        currentImageIndex = index;
    });
});

// Efecto de paralaje suave en scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header h1');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = 1 - (scrolled * 0.001);
    }
});

// Efecto de sonido sutil (opcional)
function playClickSound() {
    // Puedes agregar un sonido aquí si tienes un archivo de audio
    // const audio = new Audio('assets/click.mp3');
    // audio.volume = 0.3;
    // audio.play();
}

// Lazy loading para las imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Simular carga
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Animación de entrada del título
window.addEventListener('load', function() {
    const title = document.querySelector('header h1');
    if (title) {
        title.style.animation = 'fadeInDown 1s ease-out';
    }
});

// Prevenir scroll del body cuando el modal está abierto
const modal = document.getElementById('imageModal');
modal.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });