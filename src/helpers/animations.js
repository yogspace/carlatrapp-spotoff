const mainContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 0.8,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};

const header = {
  hidden: { opacity: 0, scale: 0.1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 1 },
  },
  exit: { opacity: 0, scale: 0.1 },
};

const character = {
  hidden: { opacity: 0, scale: 0.1, rotate: -360 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', duration: 2, delay: 0.5 },
  },
  exit: { opacity: 0, scale: 0.1, rotate: -360 },
};

const footer = {
  hidden: { opacity: 0, y: '100vh' },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 1 } },
  exit: { opacity: 0, y: '100vh' },
};

const popup = {
  hidden: { opacity: 0, y: '100vh' },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'easeOut', duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: '100vh',
    transition: { type: 'easeIn', duration: 0.5 },
  },
};

const buttonTap = {
  scale: 0.8,
};

const buttonHover = {
  scale: 1.1,
};

const animation = {
  mainContainer,
  header,
  character,
  footer,
  popup,
  buttonTap,
  buttonHover,
  fade,
};

export { animation };
