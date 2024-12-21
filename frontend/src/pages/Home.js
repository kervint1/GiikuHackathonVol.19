import React, { useState, useEffect } from 'react';
import Recorder from '../components/Recorder';
import AudioList from '../components/AudioList';

function Home() {
  const [audioList, setAudioList] = useState([]);

  const fetchAudioList = () => {
    fetch('http://localhost:8000/api/list-audio/')
      .then((response) => response.json())
      .then((data) => setAudioList(data))
      .catch((error) => console.error('Error fetching audio list:', error));
  };

  useEffect(() => {
    fetchAudioList();
  }, []);

  return (
    <div>
      <h1>Voice Recorder</h1>
      <Recorder onUpload={fetchAudioList} />
      <AudioList audioList={audioList} />
    </div>
  );
}

export default Home;
