// httpServer.js

// 앱에 명령어를 입력해서 내 노드를 제어하는 서버

import express from "express";  //필요한 것만 불러와준다.
//const express = require("express"); // js common.js에서 다긁어오기때문에 속도가 저하될 수 있음.
import bodyParser from "body-parser";
import { getBlocks, createBlock } from './block.js';

/** 0429 */
import { connectionToPeer, getPeers, sendMessage } from './p2pServer.js';
/**/

//초기화 함수
const initHttpServer = (myHttpPort) => {
	const app = express();
	app.use(bodyParser.json());


    app.get("/", (req, res)=>{
        res.send(getBlocks());
    })

    app.get("/blocks", (req, res)=>{
        res.send(getBlocks());
    })

    app.post("/createblock", (req, res)=>{
        let blockData = req.body.data;
        createBlock(blockData);

        res.send(getBlocks());
    })

    
    /*0429*/
    app.post("/getPeers", (req, res) => {
        res.send(getPeers());
    })
    
    /* 0429 */
    app.post("/addPeer", (req, res)=>{
        if (connectionToPeer(req.body.data)){
            res.send('success connect to peer');
        }else {
            res.send("error connecting to peer");
        }
    })

    /* 0429 */
    app.post("/sendMessage", (req, res) => {
        res.send(sendMessage(req.body.data));
    })

	app.listen(myHttpPort, ()=>{
		console.log(`app is running Port : `, myHttpPort)
	})

    
}

export { initHttpServer };