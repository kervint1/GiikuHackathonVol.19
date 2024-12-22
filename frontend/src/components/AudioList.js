import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AudioList({ audioList, setAudioList, onDelete }) {
  const handleLike = (id) => {
    fetch(`http://localhost:8000/api/like-audio/${id}/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.likes !== undefined) {
          const updatedList = audioList.map((audio) =>
            audio.id === id ? { ...audio, likes: data.likes } : audio
          );
          setAudioList(updatedList); // 修正済み：状態を更新
        } else {
          console.error('Failed to like audio');
        }
      })
      .catch((error) => console.error('Error liking audio:', error));
  };

  return (
    <div className='container'>
      <h2>すべての録音</h2>
      <ul>
        {audioList.map((audio) => (
          <li key={audio.id} className="mb-3">
            <p>{audio.title} (by {audio.user__username})</p>
            <audio controls src={`http://localhost:8000/media/${audio.file}`}></audio>
            <div className="d-flex align-items-center">
            
              <button className="btn btn-light me-2" onClick={() => handleLike(audio.id)}>
              <span>{audio.likes}</span>Like
              </button>
              <button className="btn btn-danger ms-auto" onClick={() => onDelete(audio.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioList;
