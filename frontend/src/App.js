import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', 'My Audio File');

    try {
      const response = await fetch('http://localhost:8000/api/upload-audio/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('File uploaded successfully: ' + data.file_id);
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h1>Upload Audio</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
