class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = 1;
        this.color = `rgba(212, 175, 55, ${this.opacity})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.opacity > 0.1) {
            this.opacity -= 0.02;
        }
        this.color = `rgba(212, 175, 55, ${this.opacity})`;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup para partículas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const teamSection = document.querySelector('.team-section');
    teamSection.style.position = 'relative';
    teamSection.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = teamSection.offsetWidth;
        canvas.height = teamSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    // Efecto de partículas siguiendo al cursor
    teamSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        if (isHovering) {
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(mouseX, mouseY));
            }
        }
    });

    teamSection.addEventListener('mouseenter', () => isHovering = true);
    teamSection.addEventListener('mouseleave', () => isHovering = false);

    // Animación de las tarjetas de miembros
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        // Animación inicial al cargar
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            member.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, index * 200);

        // Efecto hover avanzado
        member.addEventListener('mouseenter', (e) => {
            const memberContent = member.querySelector('.member-content');
            const memberName = member.querySelector('.member-name');

            memberContent.style.transform = 'scale(1.05)';
            memberName.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.8)';

            // Crear más partículas al hover
            for (let i = 0; i < 10; i++) {
                const rect = member.getBoundingClientRect();
                const x = rect.left + rect.width / 2 - canvas.getBoundingClientRect().left;
                const y = rect.top + rect.height / 2 - canvas.getBoundingClientRect().top;
                particles.push(new Particle(x, y));
            }
        });

        member.addEventListener('mouseleave', (e) => {
            const memberContent = member.querySelector('.member-content');
            const memberName = member.querySelector('.member-name');

            memberContent.style.transform = 'scale(1)';
            memberName.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.8)';
        });

        // Efecto de rotación 3D suave
        member.addEventListener('mousemove', (e) => {
            const rect = member.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            member.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        member.addEventListener('mouseleave', () => {
            member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Título con efecto de brillo
    const title = document.querySelector('.team-title');
    title.addEventListener('mousemove', (e) => {
        const rect = title.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width * 100;
        
        title.style.background = `
            linear-gradient(
                90deg, 
                #d4af37 ${percent - 20}%, 
                #fff ${percent}%, 
                #d4af37 ${percent + 20}%
            )
        `;
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
    });

    // Animación de partículas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(particle => particle.opacity > 0.1);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        requestAnimationFrame(animate);
    }
    animate();
});