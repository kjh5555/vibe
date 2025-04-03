const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

// JSON 파싱 미들웨어
app.use(express.json());

const server = http.createServer(app);

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 임시 사용자 저장소 (실제로는 데이터베이스를 사용해야 함)
const users = new Map();

// 로컬스토리지에서 사용자 데이터 불러오기
app.post('/init-users', (req, res) => {
  try {
    const localUsers = req.body.users;
    if (localUsers && Array.isArray(localUsers)) {
      localUsers.forEach(user => {
        users.set(user.id, user);
      });
      console.log('로컬스토리지에서 사용자 데이터를 불러왔습니다.');
      res.status(200).json({ message: '사용자 데이터 초기화 완료' });
    } else {
      res.status(400).json({ message: '유효하지 않은 사용자 데이터' });
    }
  } catch (error) {
    console.error('사용자 데이터 초기화 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 인증 라우트
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 이메일 중복 체크
    if (Array.from(users.values()).some(user => user.email === email)) {
      return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const userId = uuidv4();
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      name
    };

    // 사용자 저장
    users.set(userId, user);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId, email, name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    console.log('req.body',req.body);
    console.log('req.users', users);
    const { email, password } = req.body;

    // 사용자 찾기
    const user = Array.from(users.values()).find(u => u.email === email);
    
    console.log('user',user);

    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 검증
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: '로그인이 완료되었습니다.',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
};

// 사용자 정보 조회
app.get('/auth/me', authenticateToken, (req, res) => {
  const user = users.get(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Socket.IO 서버 설정
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// PeerJS 서버 설정
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',
  proxied: true,
  allow_discovery: true,
  alive_timeout: 60000,
  key: 'peerjs',
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }
});

app.use('/', peerServer);

// 채팅방과 사용자 관리
const rooms = new Map();
const connectedUsers = new Map();

// PeerJS 이벤트 처리
peerServer.on('connection', (client) => {
  console.log('PeerJS 클라이언트 연결됨:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('PeerJS 클라이언트 연결 해제:', client.getId());
});

// Socket.IO 이벤트 처리
io.on('connection', (socket) => {
  console.log('새로운 사용자 연결:', socket.id);

  // 채팅방 목록 요청 처리
  socket.on('get-rooms', () => {
    const roomsList = Array.from(rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      participants: room.participants.size,
      isPrivate: room.isPrivate,
      createdAt: room.createdAt
    }));
    socket.emit('rooms-list', roomsList);
  });

  // 채팅방 생성 처리
  socket.on('create-room', (roomData, callback) => {
    const roomId = uuidv4();
    const room = {
      id: roomId,
      name: roomData.name,
      description: roomData.description,
      isPrivate: roomData.isPrivate,
      password: roomData.password,
      participants: new Set(),
      createdAt: new Date().toISOString()
    };
    rooms.set(roomId, room);

    // 모든 클라이언트에게 새 채팅방 알림
    io.emit('room-created', {
      id: room.id,
      name: room.name,
      description: room.description,
      participants: 0,
      isPrivate: room.isPrivate,
      createdAt: room.createdAt
    });

    callback(roomId);
  });

  // 채팅방 참여 처리
  socket.on('join-room', ({ roomId, password }, callback) => {
    const room = rooms.get(roomId);
    if (!room) {
      callback(false);
      return;
    }

    if (room.isPrivate && room.password !== password) {
      callback(false);
      return;
    }

    // 이전 채팅방에서 나가기
    const currentRoom = Array.from(socket.rooms).find(room => room !== socket.id);
    if (currentRoom) {
      socket.leave(currentRoom);
      const oldRoom = rooms.get(currentRoom);
      if (oldRoom) {
        oldRoom.participants.delete(socket.id);
        io.emit('room-updated', {
          id: oldRoom.id,
          participants: oldRoom.participants.size
        });
      }
    }

    // 새 채팅방 참여
    socket.join(roomId);
    room.participants.add(socket.id);

    // 참여자 수 업데이트 알림
    io.emit('room-updated', {
      id: room.id,
      participants: room.participants.size
    });

    callback(true);
  });

  // 피어 ID 등록
  socket.on('peer-id', (peerId) => {
    console.log('피어 ID 등록:', peerId);
    connectedUsers.set(socket.id, {
      peerId,
      socketId: socket.id
    });
    
    // 다른 사용자들에게 새로운 피어 알림
    socket.broadcast.emit('peer-joined', peerId);
  });

  // 채팅 메시지 처리
  socket.on('chat-message', ({ type, message, timestamp }) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      if (type === 'file') {
        // 파일 메시지인 경우 모든 데이터를 포함하여 전송
        socket.broadcast.emit('chat-message', {
          type: 'file',
          message: {
            ...message,  // 파일의 모든 데이터를 포함
            senderId: user.peerId
          },
          senderId: user.peerId,
          senderName: `참가자 ${socket.id.slice(0, 4)}`,
          timestamp
        });
      } else {
        // 일반 텍스트 메시지 처리
        socket.broadcast.emit('chat-message', {
          type: 'text',
          message: message,
          senderId: user.peerId,
          senderName: `참가자 ${socket.id.slice(0, 4)}`,
          timestamp
        });
      }
    }
  });

  // 파일 요청 처리
  socket.on('request-file', ({ fileId, requesterId }) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('file-requested', {
        fileId,
        requesterId,
        senderId: user.peerId
      });
    }
  });

  // 파일 데이터 전송
  socket.on('file-data', ({ fileId, fileData, requesterId }) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('file-data', {
        fileId,
        fileData,
        senderId: user.peerId,
        requesterId
      });
    }
  });

  // 연결 해제 처리
  socket.on('disconnect', () => {
    console.log('사용자 연결 해제:', socket.id);
    
    // 채팅방에서 참가자 제거
    const currentRoom = Array.from(socket.rooms).find(room => room !== socket.id);
    if (currentRoom) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.participants.delete(socket.id);
        io.emit('room-updated', {
          id: room.id,
          participants: room.participants.size
        });
      }
    }

    const user = connectedUsers.get(socket.id);
    if (user) {
      // 다른 사용자들에게 피어 퇴장 알림
      socket.broadcast.emit('peer-left', user.peerId);
      connectedUsers.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
}); 