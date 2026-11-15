import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { animation } from '../helpers/animations';
import ImageWithFilter from './ImageWithFilter';

function ImageCard({
  src,
  position = { x: 0, y: 0 },
  rotation = 0,
  width = 20,
  height = 20,
  disable = false,
  setCurrentCharacterState,
  index,
  animeDelay,
  animeStagger,
  initialRender,
  id,
}) {
  const [unChecked, setUnChecked] = useState(true);

  const animateDirectionX = position.x < 50 ? -1 : 1;
  const animateDirectionY = position.y < 50 ? -1 : 1;
  const animateStartX = 10 * animateDirectionX + 'vw';
  const animateStartY = 10 * animateDirectionY + 'vh';

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: animateStartX,
      y: animateStartY,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ease: 'easeOut',
        type: 'spring',
        duration: 0.4,
        delay: index * animeStagger + animeDelay,
      },
    },
    exit: {
      opacity: 0,
      x: animateStartX,
      y: animateStartY,
      scale: 0.8, // Endskalierung beim Verlassen
      transition: { ease: 'easeIn', duration: 0.4 },
    },
  };

  return (
    <AnimatePresence>
      {unChecked && (
        <motion.div
          key={`image-card-${id}`} // Key, um sicherzustellen, dass jede Instanz eindeutig ist
          variants={cardVariants} // Entsprechende Variants je nach isActive
          initial="hidden"
          animate="show"
          exit="exit"
          custom={index}
          className={clsx('absolute translate-y-1/2', {
            'pointer-events-none': !unChecked,
            '.bg-red-500 pointer-events-none': disable,
            'cursor-pointer': !disable,
          })}
          whileHover={animation.buttonHover}
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: `${typeof width === 'number' ? width + '%' : width}`,
            height: `${typeof height === 'number' ? height + '%' : height}`,
            translateX: '-50%',
            translateY: '-50%',
            rotate: rotation + 'deg',
          }}
          onClick={() => {
            setCurrentCharacterState(id);
            setUnChecked(false);
          }}
        >
          <ImageWithFilter
            initialRender={initialRender}
            disable={disable}
            rotation={rotation}
            src={src}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageCard;
