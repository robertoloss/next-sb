'use client';

import React from 'react';

interface GeometricPatternProps {
  className?: string;
}

export function GeometricPattern({ className = '' }: GeometricPatternProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="geometric-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Square */}
            <rect
              className="stroke-primary/10 fill-primary/5"
              x="25"
              y="25"
              width="20"
              height="20"
            />
            {/* Top-right circle */}
            <circle
              className="fill-primary/10"
              cx="45"
              cy="25"
              r="6"
            />
            {/* Bottom-left circle */}
            <circle
              className="fill-primary/10"
              cx="25"
              cy="45"
              r="6"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#geometric-pattern)"
        />
      </svg>
    </div>
  );
}
