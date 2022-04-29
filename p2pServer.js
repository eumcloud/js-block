// p2pServer.js

// 다른 노드와 통신을 위한 서버

import WebSocket from 'ws';
import { WebSocketServer } from 'ws'



const sockets = []; // initconnection에서 받을 sockets 자료들을 담을 자료구조

const initP2PServer = (p2pPort) =>{

    const server = new WebSocketServer({port : p2pPort});
    
    //웹소켓 연결이 발생하면 호출되는 함수
    // connection, close 등과 같은 on 내의 웹소켓 이벤트들은 이미 예약 돼있다. 우리는 갖다 쓰기만 하면 됨
    server.on('connection', () =>{
        initConnection(ws);
    }); 

    console.log('P2P Server Port : ', p2pPort);
    const initConnection = (ws) => {
        sockets.push(ws);
    }
    
}



/* 다른 사람의 정보를 가지고 접속할 수 있는 기능 */
/**
 * 
 * @param {*} newPeer 
 */
const connectionToPeer = (newPeer) => {
    //웹소켓 생성
    const ws = new WebSocket(newPeer);
    ws.on('open', () => { initConnection(ws);    })
    ws.on('error', () => { console.log('failed to connect peer : ', ws.remoteAddress ); return false })
}


export { initP2PServer, connectionToPeer };