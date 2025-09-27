"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    updatePosition(e);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isVisible) {
      updatePosition(e);
    }
  };

  const updatePosition = (e: React.MouseEvent) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 384; // w-96 = 384px
    const tooltipHeight = 80; // Estimated height
    const mouseBuffer = 15; // Buffer distance from mouse cursor

    // Use absolute screen coordinates
    let x = e.clientX;
    let y = e.clientY - tooltipHeight - mouseBuffer; // Position above cursor with buffer

    // Adjust horizontal position to prevent overflow
    if (x - tooltipWidth / 2 < 10) {
      // Too close to left edge
      x = tooltipWidth / 2 + 10;
    } else if (x + tooltipWidth / 2 > viewportWidth - 10) {
      // Too close to right edge
      x = viewportWidth - tooltipWidth / 2 - 10;
    }

    // Adjust vertical position to prevent overflow and mouse interference
    if (y < 10) {
      // Too close to top, show below cursor instead
      y = e.clientY + mouseBuffer;
    } else if (y + tooltipHeight > viewportHeight - 10) {
      // Too close to bottom, keep above but adjust
      y = viewportHeight - tooltipHeight - 10;
    }

    // Ensure tooltip doesn't overlap with mouse cursor
    const mouseY = e.clientY;
    if (y <= mouseY && y + tooltipHeight >= mouseY) {
      // Mouse is within tooltip area, move tooltip further away
      if (mouseY < viewportHeight / 2) {
        // Mouse in upper half, place tooltip below
        y = mouseY + mouseBuffer;
      } else {
        // Mouse in lower half, place tooltip above
        y = mouseY - tooltipHeight - mouseBuffer;
      }
    }

    setPosition({ x, y });
  };

  const tooltipContent = isVisible && mounted && (
    <div
      className="fixed z-50 max-w-lg w-96 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="relative">
        <p className="leading-relaxed">{content}</p>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
