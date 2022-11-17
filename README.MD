# 🖤 BLOSSOM MARKET
사내 중고거래 플랫폼 <br/>
블라썸 마켓
<br/>
<br/>

## 💻 FE REPOSITORY
프론트엔드 소스
<br/>

└ 📡 [BE REPOSITORY](https://github.com/BLOSSOM-MARKET/BE)

└ 💬 [BE-CHAT REPOSITORY](https://github.com/BLOSSOM-MARKET/BE-CHAT)

<br/>

### 🔧 CONFIG

.env
```
# BE 
REACT_APP_SERVER_URL = "http://localhost:8080"  // YOUR BackEnd URL

# Firebase Config (이미지 업로드용)
REACT_APP_FIREBASE_APIKEY = "YOUR_API_KEY"
REACT_APP_AUTH_DOMAIN = "YOUR_AUTH_DOMAIN"
REACT_APP_PROJECT_ID = "YOUR_PROJECT_ID"
REACT_APP_STORAGE_BUCKET = "YOUR_STORAGE_BUCKET"
REACT_APP_MESSAGING_SENDER_ID = "YOUR_MESSAGING_SENDER_ID"
REACT_APP_APP_ID = "YOUR_APP_ID"
REACT_APP_MEASUREMENT_ID = "YOUR_MEASUREMENT_ID"
```
firebase 프로젝트, Cloud Firestore, Storage 생성 후 루트 폴더의 firebase.js 파일에 config 설정
([참고](https://romeoh.tistory.com/140))