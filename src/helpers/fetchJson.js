const fetchJsonData = async () => {
  try {
    const response = await fetch('/config.txt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return null; // Rückgabe von null oder einem Standardwert bei einem Fehler
  }
};

export default fetchJsonData;
