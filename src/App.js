import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ShareButton from './components/ShareButton';
import { animation } from './helpers/animations';
import Popup from './components/Popup';
import Button from './components/Button';
import fetchJsonData from './helpers/fetchJson';
import CardsLayer from './components/CardsLayer';
import Character from './components/Character';
import clsx from 'clsx';

function App() {
  const [fileData, setFileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState('<p></p>');
  const [checkList, setCheckList] = useState(new Set());

  const [startGame, setStartGame] = useState(false);

  const [currentCharacterState, setCurrentCharacterState] = useState(0);

  const isInitialMount = useRef(true);
  // const footerRef = useRef(null);
  // const scrollRef = useRef(null);

  useEffect(() => {
    const getLSCheckList = JSON.parse(localStorage.getItem('checkList'));
    const getLSCharacterState = JSON.parse(
      localStorage.getItem('currentCharacterState')
    );

    if (getLSCheckList) {
      setCheckList(new Set(getLSCheckList));
    }
    if (getLSCharacterState) {
      setCurrentCharacterState(getLSCharacterState);
    }

    console.log(
      'diese App wurde von Maximilian Weber entwickelt: https://max-interaction.de'
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCheckList((prev) => {
        return new Set(prev).add(currentCharacterState);
      });
    }, [1000]);
  }, [currentCharacterState, setCheckList]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('checkList', JSON.stringify([...checkList]));
  }, [checkList]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(
      'currentCharacterState',
      JSON.stringify(currentCharacterState)
    );
  }, [currentCharacterState]);

  const popupVisible = () => {
    if (fileData) {
      if (currentCharacterState <= fileData.cards.length - 1) {
        // if (currentCharacterState === 0) {
        setPopupData(fileData.popup.introText);
        // } else {
        //   setPopupData(fileData.popup.infoText);
        // }
      } else {
        setPopupData(fileData.popup.deleteCookiesText);
      }
      setShowPopup(true);
    }
  };

  const showInfo = () => {
    setPopupData(fileData.popup.infoText);
    setShowPopup(true);
  };

  const reset = async () => {
    // setCardsDelayAnime(0);
    // setShowShare(false)
    setCheckList(new Set());
    setCurrentCharacterState(0);
    setStartGame(false);
    setPopupData(fileData.popup.introText);
    setShowPopup(true);

    // scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJsonData();
      if (data) {
        setFileData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fileData) {
      setTimeout(() => {
        popupVisible();
        // setShowPopup(true);
      }, [1500]);
    }
  }, [fileData]);

  const closePopup = () => {
    setShowPopup(false);
    setStartGame(true);
  };

  useEffect(() => {
    if (fileData && currentCharacterState >= fileData.cards.length) {
      // footerRef.current?.scrollIntoView({ behavior: 'smooth' });
      popupVisible();
    }
  }, [fileData, currentCharacterState]);

  return (
    <div className="bg-[#F9E800] text-[#0D182F] h-full w-full font-ws-regular flex justify-center overflow-hidden">
      <AnimatePresence>
        {fileData ? (
          <>
            <motion.div
              // ref={scrollRef}
              variants={animation.mainContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="h-full w-full max-w-[1200px] relative overflow-hidden"
            >
              <div className="z-[0] absolute bottom-0 left-0 right-0 h-[50vh] opacity-30">
                <motion.div
                  animate={
                    startGame && currentCharacterState >= fileData.cards.length
                      ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: 0.3,
                            ease: 'easeOut',
                          },
                        }
                      : { opacity: 0, y: '20vh' }
                  }
                  style={{
                    backgroundImage: `url(${fileData.footer.bgImage})`,
                  }}
                  className="relative h-full w-full bg-cover bg-no-repeat flex justify-center items-end"
                ></motion.div>
              </div>
              <motion.header
                variants={animation.header}
                className={clsx(
                  'absolute left-0 z-[2] right-0 top-[15%] flex flex-col items-center px-5 sm:px-12 pointer-events-none'
                )}
              >
                <motion.div className="flex-1 flex flex-col gap-2">
                  <motion.p
                    animate={
                      startGame && currentCharacterState < fileData.cards.length
                        ? { scale: 0.4 }
                        : { scale: 1 }
                    }
                    initial={{ scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0,
                      ease: 'easeInOut',
                    }}
                    className="text-center sm:text-8xl text-7xl font-ws_bold"
                  >
                    {fileData.title}
                  </motion.p>
                  <motion.p
                    animate={
                      startGame && currentCharacterState < fileData.cards.length
                        ? { y: '-25px' }
                        : { y: 0 }
                    }
                    initial={{ scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: 'easeInOut',
                    }}
                    className="text-center sm:text-xl text-lg font-admiral_cat"
                  >
                    {fileData.subTitle}
                  </motion.p>
                </motion.div>
                <Character
                  {...fileData}
                  startGame={startGame}
                  currentCharacterState={currentCharacterState}
                />
                <motion.div
                  className="w-auto h-auto flex flex-col z-[3]"
                  initial={{ opacity: 0, y: '20vh' }}
                  animate={
                    startGame && currentCharacterState >= fileData.cards.length
                      ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: 0.4,
                            ease: 'easeInOut',
                          },
                        }
                      : {
                          opacity: 0,
                          y: '20vh',
                          transition: { duration: 0.6, ease: 'easeInOut' },
                        }
                  }
                >
                  <p className="text-center sm:text-xl text-lg font-admiral_cat">
                    {fileData.shareButton.buttonLabel}
                  </p>
                  <div className="flex items-center justify-center">
                    <ShareButton
                      sd_url={fileData.shareButton.url}
                      sd_text={fileData.shareButton.text}
                      sd_title={fileData.shareButton.title}
                    />
                  </div>
                </motion.div>
              </motion.header>
              {startGame && (
                <>
                  <CardsLayer
                    checkList={checkList}
                    setCheckList={setCheckList}
                    setCurrentCharacterState={setCurrentCharacterState}
                    currentCharacterState={currentCharacterState}
                    {...fileData}
                  />
                  {startGame &&
                    currentCharacterState >= fileData.cards.length && (
                      <motion.footer
                        // ref={footerRef}
                        variants={animation.footer}
                        className={clsx(
                          'z-[2] absolute left-0 w-full px-4 pb-0 sm:pb-0 sm:px-10 bottom-0'
                        )}
                      >
                        <motion.div
                          className="absolute z-[-1] top-0 left-0 w-full h-full backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                        <div className=" h-fit py-5 w-full border-t-2 flex-wrap border-black flex justify-between items-center gap-2">
                          <Button action={reset}>reset</Button>
                          <div className="flex flex-wrap gap-2">
                            <Button action={showInfo}>
                              {fileData.popup.buttonLabel}
                            </Button>
                          </div>
                        </div>
                      </motion.footer>
                    )}
                </>
              )}
            </motion.div>
            <Popup closePopup={closePopup} showPopup={showPopup}>
              <div dangerouslySetInnerHTML={{ __html: popupData }} />
            </Popup>
          </>
        ) : (
          <motion.p>loading...</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
