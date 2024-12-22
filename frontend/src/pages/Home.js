import React, { useState, useEffect, useCallback } from 'react';
import Recorder from '../components/Recorder';
import AudioList from '../components/AudioList';
import Navbar from '../components/Navbar';
import '../components/audio.css';

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

  //音声リスト再取得
  const handleUpload = useCallback(() => {
    fetchAudioList();
  }, []);

  // 投稿削除機能
  const handleDelete = useCallback((id) => {
    fetch(`http://localhost:8000/api/delete-audio/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setAudioList((prevList) => prevList.filter((audio) => audio.id !== id));
        } else {
          console.error('Failed to delete audio.');
        }
      })
      .catch((error) => console.error('Error deleting audio:', error));    
  }, []);

  return (
    <div className='container'>
      <header className='header'>
        <h1>ボイスメモ</h1>
        <main className='main'>
          <Navbar />
          <Recorder onUpload={handleUpload} />
          <AudioList audioList={audioList} onDelete={handleDelete} />
        </main>
      </header>
    </div>
  );
}

export default Home;
