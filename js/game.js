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
            let currentPiece = this.board.getFallingPiece;

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
     * Generates a new Piece wich will be used by the player
     * and sets the piece to the board
     */
    setUp(bag) {
        bag = this.generateBag().slice();
        this.board.newPiece(bag[0])
    }

    /**
     * Generates a new bag of pieces already randomized
     */
    generateBag() {
        let bag = [1, 2, 3, 4, 5, 6, 7];

        // randomized the bag of pieces
        bag.sort(() => Math.random() - 0.5);

        // returns the bag randomized
        return bag;
    }

    get getBoard() {
        return this.board;
    }

}