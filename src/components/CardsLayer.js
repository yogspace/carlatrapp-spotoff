import React, { useEffect, useRef } from 'react';
import ImageCard from './ImageCard';
import { AnimatePresence, motion } from 'framer-motion';

function CardsLayer({
  cards,
  setCurrentCharacterState,
  currentCharacterState,
  checkList,
  // cardsDelayAnime,
}) {
  const initialRender = useRef(true);
  useEffect(() => {
    setTimeout(() => {
      initialRender.current = false;
    }, [1]);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        transition={{ delay: 0 }}
        className="absolute top-0 bottom-0 right-0 left-0"
      >
        {cards.map(
          (card, index) =>
            !checkList.has(card.id) && (
              <ImageCard
                key={'card-' + index}
                disable={
                  (currentCharacterState === 0 && card.id !== 1) ||
                  (currentCharacterState !== 0 &&
                    card.id !== currentCharacterState + 1)
                }
                initialRender={initialRender}
                animeDelay={0.5}
                animeStagger={0}
                setCurrentCharacterState={setCurrentCharacterState}
                currentCharacterState={currentCharacterState}
                index={index}
                {...card}
              />
            )
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default CardsLayer;
