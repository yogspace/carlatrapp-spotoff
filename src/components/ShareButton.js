import React from 'react';
import IconButton from './IconButton';

function ShareButton({ sd_title, sd_text, sd_url }) {
  const shareData = {
    title: sd_title,
    text: sd_text,
    url: sd_url,
  };

  async function setClipboard(text) {
    const type = 'text/plain';
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
    alert(`Daten wurden in die Zwischenablage kopiert.`);
  }

  const clicked = async () => {
    if (!navigator.canShare) {
      setClipboard(
        shareData.title + ': \n' + shareData.text + '\n' + shareData.url
      );
    } else if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name && err.name !== 'AbortError') {
          setClipboard(
            shareData.title + ': \n' + shareData.text + '\n' + shareData.url
          );
        }
      }
    }
  };
  return <IconButton type={'share'} action={clicked} customClasses={'h-10'} />;
}

export default ShareButton;
