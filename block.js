//block.js

// 블록체인 관련 메소드
// 블록 구조 설계


/**
 * index : 블록체인만의 높이
 * data : 블록에 포함된 모든 데이터 (트랜잭션 포함)
 * timestamp : 블록이 생성된 시간
 * hash : 블록 내부 데이터로 생성한 sha256 값 (블록의 유일성)
 * previousHash : 이전 블럭의 해석 (이전 블록을 참조)
 */


 import CryptoJS from 'crypto-js';


 class Block {
     constructor(index, data, timestamp, hash, previousHash){
         this.index = index; //높이
         this.data = data; //외부에서 받음
         this.timestamp = timestamp; // 블럭생성시 생성되는 시간
         this.hash = hash; //**이것만 직접 계산해줘야함
         this.previousHash = previousHash; //이전블럭정보
     }
 
 
 }

    
//해시생성 함수
const calculateHash = (index, data, timestamp, previousHash) =>{ 
    
    return  CryptoJS.SHA256((index + data + timestamp + previousHash).toString()).toString(); //toString() 해줘야 원하는 해시값이 나온다.
    
    //-> 16진수 64자리 유일무이한 값이 나온다.
}
    
 let testHash1 = calculateHash(1, 2, 3, 5);
 let testHash2 = calculateHash(1, 2, 3, 6);
 console.log(">> testHash1 :", testHash1);
 console.log(">> testHash2 :", testHash2);
 
 

 
 //제네시스블럭 생성 메소드
 const createGenesisBlock = () =>{
     const genesisBlock = new Block(0, "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks", new Date().getTime(), 0, 0);
     genesisBlock.hash = calculateHash(genesisBlock.index, genesisBlock.data, genesisBlock.timestamp, genesisBlock.previousHash);
     
     return genesisBlock;
 }
 
//block temp값
const blocks = [createGenesisBlock()];

 
 // 
 const createBlock = (blockData) =>{
     //blockData
     // 거래 또는 계약 등 발생한 정보
     
     //기존블럭
     const previousBlock = blocks[blocks.length - 1];
     //블럭 최신 index넘버 생성
    const nextIndex = previousBlock.index + 1;
    //블럭생성에 사용될 실시간 unixtime
    const nextTimestamp = new Date().getTime() / 1000;
    // 해시생성
    const nextHash = calculateHash(nextIndex, blockData, nextTimestamp, previousBlock);

    //신규블럭 생성
    const newBlock = new Block(nextIndex, blockData, nextTimestamp, nextHash, previousBlock.hash);
    
    blocks.push(newBlock);
    return newBlock;
}



 
 //블럭들 정보 가져오기
 const getBlocks = () =>{
    
       console.log("req getBlocks() --> ", blocks);
       
    return blocks;
}
export { getBlocks, calculateHash, createGenesisBlock, createBlock };