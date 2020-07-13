import Board from "./board.js";

export default class {
    constructor(){
        this.board = new Board();

    }

    /**
     * I think this ends the game or something...
     */
    setUp(){
       
        this.newPiece(2);
        
    }

    /**
     * Generates a new Piece which will be used by
     * the player
     */
    newPiece(pieceType){
       this.board.newPiece(pieceType);
    }

    /**
     * Generates a new bag of pieces already randomized
     */
    generateBag(){

    }

    get getBoard(){
        return this.board;
    }
    
}