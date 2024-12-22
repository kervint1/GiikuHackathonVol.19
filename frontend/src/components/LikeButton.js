import React, { useState } from 'react';

const LikeButton = ({ itemId }) => {
  // 初期値を0に設定
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    // いいね数をインクリメント
    setLikeCount(likeCount + 1);
    
    try {
      const response = await fetch(`http://localhost:8000/like/${itemId}/toggle/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likeCount: likeCount + 1 }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('いいねが送信されました:', data);
        setLikeCount(data.likes_count); // サーバーから受け取った最新のいいね数を設定
      } else {
        console.error('いいねの送信に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      いいね {likeCount}
    </button>
  );
};

export default LikeButton;
