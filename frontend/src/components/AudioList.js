import React from 'react';
import './audio.css';

function AudioList({ audioList, onDelete }) {
  return (
    <div className='container'>
      <h2>すべての録音</h2>
      <ul>
        {audioList.map((audio) => (
          <li key={audio.id}>
            <p>{audio.title} (by {audio.user__username})</p>
            <audio controls src={`http://localhost:8000/media/${audio.file}`}></audio>
            <button className='delete-button' onClick={() => onDelete(audio.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioList;

