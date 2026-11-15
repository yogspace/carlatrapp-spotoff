import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { animation } from '../helpers/animations';
import IconButton from './IconButton';

function Popup({ children, closePopup, showPopup }) {
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial="hidden"
          animate={showPopup ? 'show' : 'exit'}
          exit="exit"
          variants={animation.popup}
          className="z-[3] h-full w-full fixed top-0 left-0 flex items-end justify-center"
        >
          {/* <motion.div
            className="absolute z-[- 1] top-0 left-0 w-full h-full backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          /> */}

          <div className="w-full h-fit max-w-[1200px] bg-[#0D182F] text-white py-10 sm:px-10 px-8 sm:rounded-t-[80px] rounded-t-[40px] flex gap-5 flex-col">
            <div className="w-full flex items-end flex-col">
              <IconButton action={closePopup} />
            </div>
            <div className="landscape:mr-20 font-ws_regular text-sm sm:text-lg max-h-[50vh] overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;
