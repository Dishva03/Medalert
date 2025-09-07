import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once and add resize listener
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Medical-themed particles
    const particles: Particle[] = [];
    const particleCount = 30;

    // Define particle types
    const particleTypes = [
      { shape: 'pill', color: 'rgba(138, 43, 226, 0.6)' }, // Purple pill
      { shape: 'cross', color: 'rgba(65, 105, 225, 0.6)' }, // Blue cross
      { shape: 'heart', color: 'rgba(220, 20, 60, 0.6)' }, // Red heart
      { shape: 'circle', color: 'rgba(0, 191, 255, 0.6)' }, // Blue circle
      { shape: 'hexagon', color: 'rgba(50, 205, 50, 0.6)' } // Green hexagon
    ];

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      type: typeof particleTypes[number];
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.type.color;

        switch (this.type.shape) {
          case 'pill':
            // Draw pill shape
            ctx.beginPath();
            ctx.roundRect(-this.size / 2, -this.size / 4, this.size, this.size / 2, this.size / 4);
            ctx.fill();
            break;
          case 'cross':
            // Draw medical cross
            const width = this.size / 3;
            ctx.fillRect(-width / 2, -this.size / 2, width, this.size);
            ctx.fillRect(-this.size / 2, -width / 2, this.size, width);
            break;
          case 'heart':
            // Draw heart
            ctx.beginPath();
            const s = this.size / 2;
            ctx.moveTo(0, -s / 2);
            ctx.bezierCurveTo(s / 2, -s, s, -s / 4, 0, s);
            ctx.bezierCurveTo(-s, -s / 4, -s / 2, -s, 0, -s / 2);
            ctx.fill();
            break;
          case 'circle':
            // Draw circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'hexagon':
            // Draw hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const x = (this.size / 2) * Math.cos(angle);
              const y = (this.size / 2) * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    />
  );
};

export default BackgroundAnimation;