// Función para expandir eventos individuales
function expandEvent(eventIndex) {
    // Redirigir a la página de timeline con el evento específico
    window.location.href = `timeline.html#event-${eventIndex}`;
}

// Animación de entrada para los bloques
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.thematic-block');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    blocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            observer.observe(block);
        }, index * 100);
    });
});

// Animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromLeft {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);