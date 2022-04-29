// p2pServer.js

// 다른 노드와 통신을 위한 서버

import WebSocket from 'ws';
import { WebSocketServer } from 'ws'



/*0429*/
const MessageType = {
    RESPONSE_MESSAGE: 0,
    SENT_MESSAGE: 1,

    //최신 블록 요청

    //모든 블록 요청

    //블록 전달 
}


const sockets = []; // initconnection에서 받을 sockets 자료들을 담을 자료구조

/**0429 */
const getPeers  = () => {
    return sockets;
}


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
        /*0429*/
        initMessageHandler(ws); // 여기에 배치해야 본인과 타인 웹소켓에 추가됨
    }

    
}



/**
 * 
 * @param {*} newPeer 
 * @brief 다른 사람의 정보를 가지고 접속할 수 있는 기능
 */
const connectionToPeer = (newPeer) => {
    //웹소켓 생성
    const ws = new WebSocket(newPeer);
    ws.on('open', () => { initConnection(ws);   console.log("Connect peer :", newPeer); });
    ws.on('error', () => { 
        console.log('failed to connect peer : ', newPeer ); 
    })
}


/*0429*/
const initMessageHandler = (ws) => {
                           //^여기의 ws는 상대방의 ws
    
    ws.on('message', (data)=>{ //message 발생하면 
        const message = JSON.parse(data);

        switch(message.type){
            // case MessageType.RESPONSE_MESSAGE: // 메시지 받았을 때 
            //     break;
            case MessageType.SENT_MESSAGE:  // 메시지 받았을 때          --// 메시지 보낼 때
                write(ws, message);
                console.log(message.message);
                break;
        }
    })
}

/*0429*/
// const responseMessage = () =>{
//     console.log(responseMessage);
// }

/*0429*/
const write = (ws, message) => { /*  */
    console.log("write()", message);
    ws.send(JSON.stringify(message)); //message를 ws로 보낼 예정이다.
}

/*0429*/
const sendMessage = (message) => {
    sockets.forEach((socket)=>{ //broadcast socket
        write(socket, message);
    });
}

export { initP2PServer, connectionToPeer, getPeers, initMessageHandler, sendMessage };