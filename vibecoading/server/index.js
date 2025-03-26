const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');

const app = express();
app.use(cors());

const server = http.createServer(app);

// PeerJS 서버 설정
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/peerjs'
});

app.use('/', peerServer);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// 연결된 피어 ID 저장
const connectedPeers = new Set();

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다:', socket.id);

  socket.on('peer-id', (peerId) => {
    console.log('새로운 피어 ID 등록:', peerId);
    connectedPeers.add(peerId);
    socket.peerId = peerId;
  });

  socket.on('request-peer-id', () => {
    const availablePeers = Array.from(connectedPeers).filter(id => id !== socket.peerId);
    if (availablePeers.length > 0) {
      socket.emit('peer-id', availablePeers[0]);
    }
  });

  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    if (socket.peerId) {
      connectedPeers.delete(socket.peerId);
    }
    console.log('사용자가 연결을 종료했습니다:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
}); 