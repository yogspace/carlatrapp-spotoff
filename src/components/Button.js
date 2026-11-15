import React from 'react';
import { motion } from 'framer-motion';
import { animation } from '../helpers/animations';
import clsx from 'clsx';

function Button({ children, action, hide }) {
  return (
    <motion.button
      className={clsx(
        'pointer-events-auto px-3 py-1 sm:px-4 sm:py-2 sm:text-md border-black border-2 rounded-full cursor-pointer',
        { 'opacity-0': hide }
      )}
      onClick={action}
      whileTap={animation.buttonTap}
      whileHover={animation.buttonHover}
    >
      {children}
    </motion.button>
  );
}

export default Button;
