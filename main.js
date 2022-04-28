// main.js

/* 목표
 * 1) p2p 서버 초기화, 사용 (서버1)
 * 2) http 서버 초기화, 사용 (서버2)
 * 3) block.js 내 블록체인 함수 사용
 */

import { initHttpServer } from './httpServer.js'
import { initP2PServer } from './p2pServer.js'

const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;


initHttpServer(httpPort);
initP2PServer(p2pPort);