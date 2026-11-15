import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

function ImageWithFilter({ disable, src, rotation, initialRender }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        // const alpha = data[i + 3];

        // Check if the pixel is yellow
        if (red > 200 && green > 200 && blue < 100) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };
  }, [src]);

  // Define variants for scaling animation
  const variants = {
    hidden: {
      scale: 0.5,
      transition: { delay: 0, ease: 'easeOut' },
    },
    show: {
      scale: disable ? 0.4 : 1,
      transition: { delay: initialRender.current ? 1 : 0.4, type: 'spring' },
    },
    exit: { scale: 1, opacity: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants} // Use the defined variants
        initial="hidden"
        animate="show"
        exit="exit"
        className="h-full w-full"
        style={{
          overflow: 'hidden',
          transformOrigin: 'center',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* <img src={src} alt="" className="h-full w-full object-contain"/> */}
        <canvas ref={canvasRef} className="h-full w-full object-contain" />
      </motion.div>
    </AnimatePresence>
  );
}

export default ImageWithFilter;
