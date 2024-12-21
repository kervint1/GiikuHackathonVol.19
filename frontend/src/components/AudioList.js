import React from 'react';

function AudioList({ audioList }) {
  return (
    <div className='container'>
      <h2>Saved Audio Files</h2>
      <ul>
        {audioList.map((audio) => (
          <li key={audio.id}>
            <p>{audio.title}</p>
            <audio controls src={`http://localhost:8000/media/${audio.file}`}></audio>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioList;
