#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "=== CREATING ALL MISSING .JS FILES ==="

# Create AnimatedBackground.js
cat > src/Components/UI/AnimatedBackground.js << 'ANIMATEDBG'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground({ type = 'gradient', accentColor = '#00f0ff', lowEndMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (type !== 'particles' || lowEndMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = accentColor + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = accentColor + Math.floor((1 - dist / 150) * 50).toString(16).padStart(2, '0');
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [type, accentColor, lowEndMode]);

  if (type === 'particles' && !lowEndMode) {
    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)' }}
      />
    );
  }

  if (type === 'gradient') {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            \`linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, \${accentColor}10 50%, #1a1a2e 75%, #0a0a0f 100%)\`,
            \`linear-gradient(225deg, #0a0a0f 0%, #1a1a2e 25%, \${accentColor}15 50%, #1a1a2e 75%, #0a0a0f 100%)\`,
            \`linear-gradient(315deg, #0a0a0f 0%, #1a1a2e 25%, \${accentColor}10 50%, #1a1a2e 75%, #0a0a0f 100%)\`,
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)' }}
    />
  );
}
ANIMATEDBG

echo "✓ Created AnimatedBackground.js"

# Continue in next part...
echo "Part 1 complete. Run part 2 next."
