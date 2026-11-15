import React from 'react';
import { motion } from 'framer-motion';
import { animation } from '../helpers/animations';
import Close from '../svg-icons/Close';
import Share from '../svg-icons/Share';

function IconButton({ type = 'close', action, customClasses }) {
  return (
    <motion.div
      className={`cursor-pointer pointer-events-auto h-6 sm:h-8 aspect-square ${customClasses}`}
      onClick={action}
      whileTap={animation.buttonTap}
      whileHover={animation.buttonHover}
    >
      {type === 'close' && <Close color="white" />}
      {type === 'share' && <Share color="black" />}
    </motion.div>
  );
}

export default IconButton;
