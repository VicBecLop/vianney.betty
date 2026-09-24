document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    // Crear la clase Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5; // Tamaños variados
            this.speedX = Math.random() * 0.8 - 0.4; // Movimiento horizontal muy lento
            this.speedY = Math.random() * 0.8 - 0.4; // Movimiento vertical muy lento
            this.opacity = Math.random() * 0.5 + 0.1; // Sutiles destellos blancos
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Rebote suave en los bordes
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Inicializar el arreglo
    function init() {
        particlesArray = [];
        // Densidad de partículas adaptada al tamaño de la pantalla
        let numberOfParticles = (canvas.width * canvas.height) / 8000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Bucle de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    
    // Redimensionar si el usuario cambia el tamaño de la ventana (o gira el celular)
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Arrancar efectos
    init();
    animate();
});