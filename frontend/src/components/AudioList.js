import React from 'react';
import './audio.css';

function AudioList({ audioList, onDelete }) {
  return (
    <div className='container'>
      <h2>Saved Audio Files</h2>
      <ul>
        {audioList.map((audio) => (
          <li key={audio.id}>
            <p>{audio.title}</p>
            <audio controls src={`http://localhost:8000/media/${audio.file}`}></audio>
            <button className='delete-button' onClick={() => onDelete(audio.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioList;
