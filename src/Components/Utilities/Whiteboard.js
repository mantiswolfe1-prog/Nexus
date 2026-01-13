import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Eraser, Trash2, Download, Minus, Plus } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';

export default function Whiteboard({ accentColor = '#f368e0' }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(3);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a2e' : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setLastPos(pos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = ['#ffffff', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#a55eea', '#ff6b9d'];

  return (
    <GlassCard className="p-4" accentColor={accentColor} hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Whiteboard</h3>
        <div className="flex gap-2">
          <NeonButton variant="ghost" size="icon" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4" />
          </NeonButton>
          <NeonButton variant="ghost" size="icon" onClick={downloadCanvas}>
            <Download className="w-4 h-4" />
          </NeonButton>
        </div>
      </div>

      {/* Tools */}
      <div className="flex items-center gap-2 mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTool('pen')}
          className={`p-2 rounded-lg transition-colors ${tool === 'pen' ? 'bg-white/20' : 'bg-white/5'}`}
        >
          <Pencil className="w-4 h-4 text-white" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTool('eraser')}
          className={`p-2 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-white/20' : 'bg-white/5'}`}
        >
          <Eraser className="w-4 h-4 text-white" />
        </motion.button>

        <div className="h-6 w-px bg-white/20 mx-2" />

        {/* Colors */}
        {colors.map((c) => (
          <motion.button
            key={c}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
            style={{ backgroundColor: c }}
          />
        ))}

        <div className="h-6 w-px bg-white/20 mx-2" />

        {/* Brush Size */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
            className="p-1 rounded bg-white/5 text-white/50"
          >
            <Minus className="w-3 h-3" />
          </motion.button>
          <span className="text-xs text-white/50 w-4 text-center">{brushSize}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setBrushSize(Math.min(20, brushSize + 1))}
            className="p-1 rounded bg-white/5 text-white/50"
          >
            <Plus className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </GlassCard>
  );
}