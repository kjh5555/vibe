# VIBE CODING - 실시간 화상 채팅 서비스

VIBE CODING은 Vue.js와 Socket.IO를 활용한 실시간 화상 채팅 서비스입니다. 개발자들이 실시간으로 소통하고 코드를 공유할 수 있는 플랫폼을 목표로 합니다.
VIBE CODING은 CURSOR와 LLM으로 작업함
BackEnd를 연결하는건 현재 노트븍 특성상 설치불가하여 FE기준으로 작업함..
추후 AI를 붙여볼 예정

## 주요 기능

### 1. 사용자 인증
- 회원가입 및 로그인 시스템
- JWT 기반 토큰 인증
- 로컬 스토리지를 활용한 로그인 상태 유지
- 인증 라우트 가드를 통한 보안 강화

### 2. 채팅방 관리
- 채팅방 생성 및 참여
  - 공개/비공개 채팅방 옵션
  - 카테고리 선택 (General, Games, Music, Study, Other)
  - 비밀번호 설정 기능
- 채팅방 목록 기능
  - 실시간 검색 및 필터링
  - 참여자 수 기반 정렬
  - 생성 시간 기반 정렬
  - 카테고리별 필터링
- 채팅방 카드 UI
  - 참여자 수 실시간 표시
  - 생성 시간 표시
  - 비공개방 표시 배지
  - 설명 텍스트 2줄 제한

### 3. 실시간 채팅
- Socket.IO 기반 실시간 메시지 송수신
- 사용자 입장/퇴장 알림
- 실시간 참여자 목록 업데이트
- 이모지 지원

## 프로젝트 구조

### 컴포넌트 구성
```
src/
├── components/
│   ├── Nav.vue                 # 네비게이션 바 컴포넌트
│   ├── RoomCard.vue           # 채팅방 카드 컴포넌트
│   └── CreateRoomModal.vue    # 채팅방 생성 모달
├── views/
│   ├── Home.vue              # 메인 페이지
│   ├── Login.vue             # 로그인 페이지
│   ├── Register.vue          # 회원가입 페이지
│   ├── RoomList.vue          # 채팅방 목록 페이지
│   └── ChatRoom.vue          # 채팅방 페이지
└── router/
    └── index.js              # 라우터 설정
```

## 기술 스택

### Frontend
- Vue.js 3 (Composition API)
  - Vue Router
  - Teleport (모달 구현)
  - Computed/Watch (반응형 데이터 처리)
- TailwindCSS
  - 반응형 디자인
  - 커스텀 스크롤바
  - 다크모드 지원
- Socket.IO Client
- PeerJS (WebRTC)

### Backend
- Node.js
- Express
- Socket.IO
- JWT (jsonwebtoken)
- bcrypt (비밀번호 해싱)

## 주요 구현 사항

### UI 컴포넌트
1. **네비게이션 바 (Nav.vue)**
   - 로그인/로그아웃 상태 관리
   - 반응형 디자인
   - 사용자 정보 표시

2. **채팅방 목록 (RoomList.vue)**
   - 그리드 레이아웃
   - 스크롤 최적화
   - 검색 및 필터링 기능
   - 정렬 기능

3. **채팅방 생성 모달 (CreateRoomModal.vue)**
   - Teleport를 활용한 모달 구현
   - 폼 유효성 검사
   - 백드롭 블러 효과
   - 외부 클릭 시 닫기

4. **채팅방 카드 (RoomCard.vue)**
   - 균일한 높이 유지
   - 설명 텍스트 말줄임 처리
   - 호버 효과
   - 실시간 정보 업데이트

### 인증 시스템
- JWT를 활용한 토큰 기반 인증
- 로그인 상태 유지를 위한 로컬 스토리지 활용
- 보안을 위한 비밀번호 해싱 (bcrypt)
- 인증 라우트 가드 구현

### 실시간 통신
- Socket.IO를 활용한 양방향 실시간 통신
- 채팅방 상태 실시간 업데이트
- 사용자 접속 상태 관리
- 이벤트 기반 메시지 처리

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/yourusername/vibecoading.git
cd vibecoading
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 백엔드 서버 실행
```bash
cd server
npm install
node index.js
```

## 향후 계획

- [ ] MongoDB 데이터베이스 연동
- [ ] 채팅 내역 저장 및 불러오기
- [ ] 사용자 프로필 관리
- [ ] 채팅방 즐겨찾기 기능
- [ ] WebRTC를 활용한 화상 채팅
- [ ] 화면 공유 기능
- [ ] 코드 에디터 통합

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
