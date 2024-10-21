import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStyles, clearStyles } from './store/stylesSlice';
import axios from 'axios';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import SwitchView from './components/SwitchView';
import ResultView from './components/ResultView';
import { Container } from '@mui/material';
import { RootState } from './store/store'; // Import your RootState type

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [showJson, setShowJson] = useState(true);
  const dispatch = useDispatch();
  const styles = useSelector((state: RootState) => state.styles); // Use RootState here

  const handleScrap = async () => {
    if (!url) return;
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      dispatch(setStyles(response.data));
    } catch (error) {
      console.error('Error fetching styles:', error);
      dispatch(clearStyles());
    }
  };

  return (
    <Container>
      <Header />
      <UrlInput url={url} setUrl={setUrl} handleScrap={handleScrap} />
      <SwitchView showJson={showJson} setShowJson={setShowJson} />
      <ResultView
        fonts={styles.fonts} // Type assertion for fonts
        primaryButton={styles.primaryButton ?? {}} // Fallback for null primaryButton
        showJson={showJson}
      />
    </Container>
  );
};

export default App;
