import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { animation } from '../helpers/animations';

function Character({ character, currentCharacterState, cards, startGame }) {
  const [characterSrc, setCharacterSrc] = useState('');
  const [textContent, setTextContent] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (currentCharacterState < cards.length) {
      setCharacterSrc(
        character.states.find((state) => state.id === currentCharacterState).src
      );
    } else {
      setCharacterSrc(character.happy);
    }
  }, [currentCharacterState, character, cards]);

  useEffect(() => {
    if (currentCharacterState < cards.length) {
      setTextContent(
        cards.find((card) => card.id === currentCharacterState + 1).text.content
      );
    } else {
      setTextContent('');
    }
  }, [currentCharacterState, cards]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    img.src = characterSrc;
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
  }, [characterSrc]);

  return (
    <AnimatePresence>
      {animation.character && (
        <motion.div
          variants={animation.character}
          initial="hidden"
          animate="show"
          exit="exit"
          className={clsx(
            'z-[1] flex justify-center items-center w-[100vw] relative'
          )}
        >
          <motion.canvas
            ref={canvasRef}
            className="h-[30vh] sm:h-[50vh]"
            animate={
              startGame && currentCharacterState < cards.length
                ? { scale: 0.8, y: '-10%', x: '-10%' }
                : { scale: 1, y: 0, x: 0 }
            }
            initial={{ scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
      <motion.div
        key={textContent}
        animate={
          startGame && currentCharacterState < cards.length
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 0 }
        }
        initial={{ opacity: 0, y: '50px' }}
        exit={{ opacity: 0, y: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-12 flex items-center justify-center max-w-[60vw] w-full sm:max-w-[80vw]"
      >
        <p className="font-ws_bold rounded-md absolute top-0 text-center">
          {textContent}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default Character;
