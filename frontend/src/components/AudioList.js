import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AudioList({ audioList, setAudioList, onDelete }) {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const fetchComments = (audioId) => {
    fetch(`http://localhost:8000/api/audio/${audioId}/comments/`)
      .then((response) => response.json())
      .then((data) => setComments((prev) => ({ ...prev, [audioId]: data })))
      .catch((error) => console.error('Error fetching comments:', error));
  };

  const handleAddComment = (audioId) => {
    fetch(`http://localhost:8000/api/audio/${audioId}/add-comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || 'Failed to add comment');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.id) {
          setComments((prev) => ({
            ...prev,
            [audioId]: [...(prev[audioId] || []), data],
          }));
          setNewComment("");
        }
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

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
              <button className="btn btn-light me-2" onClick={() => fetchComments(audio.id)}>
                コメントを見る
              </button>
              <button className="btn btn-light me-2" onClick={() => handleLike(audio.id)}>
              <span>{audio.likes}</span>Like
              </button>
              <button className="btn btn-danger ms-auto" onClick={() => onDelete(audio.id)}>
                Delete
              </button>
            </div>
            <div className="mt-3">
              {comments[audio.id] && (
                <ul>
                  {comments[audio.id].map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.user}</strong>: {comment.text}
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを追加"
              />
              <button onClick={() => handleAddComment(audio.id)}>コメント追加</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioList;
