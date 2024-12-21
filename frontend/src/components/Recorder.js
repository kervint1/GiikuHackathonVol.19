import React, { useState, useRef } from 'react';
import './audio.css';

function Recorder({ onUpload }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [message, setMessage] = useState('');
  const mediaRecorderRef = useRef(null);

  const [elapsedTime, setElapsedTime] = useState(0);  // 録音時間の管理
  const intervalRef = useRef(null);
  const [title, setTitle] = useState('');  // 録音タイトル

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
        setMessage('Recording complete.');
      };

      mediaRecorder.start();
      setElapsedTime(0);  //録音時間の初期化
      setIsRecording(true);
      setMessage('Recording...');

      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMessage('Error accessing microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setMessage('Recording stoped.');
      clearInterval(intervalRef.current);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      setMessage('No audio to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    formData.append('title', 'Recorded Audio');

    try {
      const response = await fetch('http://localhost:8000/api/upload-audio/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Audio uploaded successfully: ' + data.file_id);
        onUpload(); // データ更新のトリガー
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      setMessage('Error uploading audio.');
    }
  };

  return (
    <div>
      {!isRecording ? (
        <button onClick={startRecording} className='recording-button-stop'>録音開始</button>
      ) : (
        <button onClick={stopRecording} className='recording-button'>停止</button>
      )}
      <div>
        {elapsedTime > 0 && isRecording && <p>録音時間: {elapsedTime}秒</p>} {/* 録音時間の表示 */}
      </div>
      {audioBlob && (
        <div>
          <p>Recording ready to upload or play.</p>
          <label>
            Title:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter a title for the audio'
            />
          </label>
          <button onClick={uploadAudio} className='upload-button'>Upload Recording</button>
          <audio controls src={audioURL}></audio>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Recorder;
