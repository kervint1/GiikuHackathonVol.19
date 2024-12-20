# ハッカソンvol.19

---

## 環境構築手順

### 1. プロジェクトをクローン
```
git clone <リポジトリのURL>
cd GiikuHackathonVol.19
```

### 2. Docker Composeでサービスを起動
```
docker-compose up --build -d
```
### 3. npmインストール
```
cd frontend 
npm i 
cd ..
```
### 4. Djangoのデータベースを初期化
```
docker-compose exec backend python manage.py migrate
```
### 5. 管理者ユーザーを作成（必要に応じて）
```
docker-compose exec backend python manage.py createsuperuser
```
### 6. ログ確認（必要に応じて）
```
docker-compose logs
```

- - -
##　アプリ動作
### バックエンド(Django)
[http://localhost:8000](http://localhost:8000) 

### 管理画面
以下のURLでDjangoの管理画面にアクセス出来ます 

[http://localhost:8000/admin/](http://localhost:8000/admin/) 

※ 作成した管理者ユーザーの情報を使用してログインしてください。 

### フロントエンド(React)
[http://localhost:3000](http://localhost:3000)

### サービスの再起動
```
docker-compose down
docker-compose up --build -d
```