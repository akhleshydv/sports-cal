import React from 'react';

// Mock Icon component for web
const Icon = ({ name, size = 24, color = '#000', style, ...props }) => {
  const iconMap = {
    'schedule': '🕒',
    'location-on': '📍',
    'keyboard-arrow-down': '▼',
    'sports': '🏆',
    'calendar-today': '📅',
  };

  return (
    <span
      style={{
        fontSize: size,
        color,
        display: 'inline-block',
        lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      {iconMap[name] || '🏆'}
    </span>
  );
};

export default Icon;