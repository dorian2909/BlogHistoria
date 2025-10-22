   let currentIndex = 0;
        const events = document.querySelectorAll('.timeline-event');
        const totalEvents = events.length;
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');

        // Crear indicadores de progreso
        function createProgressDots() {
            const years = ['1823', '1845', '1846-48', '1855', '1856', 'Mar 1856', 'Abr 1856', '1856-57', '1856-57', '1857', '1860'];
            years.forEach((year, index) => {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                dot.setAttribute('data-year', year);
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToEvent(index));
                progressBar.appendChild(dot);
            });
        }

        function updateProgressDots() {
            const dots = document.querySelectorAll('.progress-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function showEvent(index) {
            events.forEach((event, i) => {
                event.classList.remove('active', 'prev');
                if (i === index) {
                    event.classList.add('active');
                } else if (i < index) {
                    event.classList.add('prev');
                }
            });
            
            currentIndex = index;
            updateNavButtons();
            updateProgressDots();
        }

        function updateNavButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalEvents - 1;
        }

        function goToEvent(index) {
            if (index >= 0 && index < totalEvents) {
                showEvent(index);
            }
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) showEvent(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalEvents - 1) showEvent(currentIndex + 1);
        });

        function toggleDetails(index) {
            const details = document.getElementById(`details${index}`);
            const button = details.nextElementSibling;
            
            details.classList.toggle('visible');
            button.textContent = details.classList.contains('visible') ? 'Ver menos' : 'Ver más detalles';
        }

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });

        // Inicializar
        createProgressDots();
        showEvent(0);