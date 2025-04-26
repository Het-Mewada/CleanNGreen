import React, { useState, useEffect } from 'react';
import './FuturisticCursor.css'; 

const FuturisticCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsHidden(true);
    const handleMouseOver = () => setIsHidden(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [data-cursor-hover]'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (isHidden) return null;

  return (
<div 
  className='futuristic-cursor transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 scale-100 brightness-100'
  style={{
    left: `${position.x}px`,
    top: `${position.y}px`,
  }}
>
      <div className="cursor-pointer"></div>
      <div className="cursor-trail"></div>
</div>
  );
};

export default FuturisticCursor;