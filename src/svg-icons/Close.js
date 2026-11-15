import React from 'react';

function Close({ color }) {
  return (
    <svg viewBox="0 0 47 46">
      <path
        d="M3.94971 4.00001L42 42.0503M4.99996 42.0503L43.0502 4"
        stroke={color ? color : 'black'}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Close;
