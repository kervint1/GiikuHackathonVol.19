import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('送信されるトークン:', token); // デバッグ用ログ

    if (token) {
      fetch('http://localhost:8000/api/auth/user/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('ユーザー情報:', data);
          if (data.username) {
            setUsername(data.username); // ユーザー名を設定
          }
        })
        .catch((error) => console.error('ユーザー情報取得失敗:', error));
    }
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // トークンを削除
    navigate('/login'); // ログイン画面にリダイレクト
  };

  return (
    <header className='navbar'>
      <div className='navbar-container'>
        <a className='navbar-logo'>録音アプリ</a>
        <nav className='navbar-links'>
          {username ? <span>こんにちは, {username}　</span> : <a href="/login">ログイン</a>}
          <button onClick={handleLogout} className="btn btn-light">ログアウト</button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
