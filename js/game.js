import Board from "./board.js";

export default class {
    constructor() {
        this.board = new Board();
        this.addUserEventListeners();
    }

    addUserEventListeners() {
        document.addEventListener("keydown", event => {

            // object data that contains the infomation about the rotation and wallkick
            let rotation;

            // returns the current piece
            let currentPiece = this.board.getPieces[this.board.getCurrentPieceIndex];

            // TODO: añadir que se puedan usar los caracteres en mayúsculas
            switch (event.keyCode) {
                case 37:
                    if (currentPiece.checkLeftColision()) {
                        currentPiece.movX(-1);
                    }
                    break;

                case 39:
                    if (currentPiece.checkRightColision()) {
                        currentPiece.movX(1);
                    }
                    break;

                case 40:
                    if (currentPiece.checkVerticalColision()) {
                        currentPiece.movY();
                    }
                    break;
                    
                case 65:
                    rotation = currentPiece.checkRotationCollision(-1);
                    if (rotation.rotationDirection !== 0) {
                        currentPiece.rotate(rotation);
                    }
                    break;

                case 68:
                    rotation = currentPiece.checkRotationCollision(1);
                    if (rotation.rotationDirection !== 0) {
                        currentPiece.rotate(rotation);
                    }
                    break;
            }
        });
    }

    /**
     * I think this ends the game or something...
     */
    setUp() {
        this.newPiece(1);
    }

    /**
     * Generates a new Piece which will be used by
     * the player
     */
    newPiece(pieceType) {
        this.board.newPiece(pieceType);
    }

    /**
     * Generates a new bag of pieces already randomized
     */
    generateBag() {

    }

    get getBoard() {
        return this.board;
    }

}