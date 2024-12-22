import React, { useState, useEffect, useCallback } from 'react';
import Recorder from '../components/Recorder';
import AudioList from '../components/AudioList';
import Navbar from '../components/Navbar';
import './Home.css';

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

  const handleUpload = useCallback(() => {
    fetchAudioList();
  }, []);

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
    <div className="user-container">
      <Navbar />
      <div className="main-content">
        <aside className="sidebar">
          <h2>メニュー</h2>
          <ul>
            <li><a href="/">ホーム</a></li>
            <li><a href="/about">アバウト</a></li>
            <li><a href="/user">マイページ</a></li>
          </ul>
        </aside>
        <section className="content">
          <Recorder onUpload={handleUpload} />
          <AudioList audioList={audioList} setAudioList={setAudioList} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
}

export default Home;
