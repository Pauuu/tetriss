export default class Piece extends Array {
    constructor(board, pieceType) {
        super(4);
        this._fillThis();
        this.board = board;

        //type of the piece
        this.pieceType = pieceType;

        // context of the HTML canvas
        this.ctx = document.getElementById('myCanvas')
            .getContext('2d');

        // type of piece to be created
        this._selectPiece(1);

        // pivote: X, Y
        this.pivote = { x: 0, y: 0 };

        console.log(this);
    }

    /**
     * Draws the blocks of the piece
     */
    drawme() {
        this.forEach((arr, rowIndex) => {
            arr.forEach((block, colIndex) => {

                // si no hay bloque no pinta nada
                if (block === 0) return; //=== no bloque =>>>

                this.ctx.fillRect(
                    (this.pivote.x + colIndex) * 40,
                    (this.pivote.y + rowIndex) * 40,
                    40,
                    40);

            });
        });
    }

    /**
     * Moves the piece horizontally.
     * @param {*} direction the direction of the piece: 1 -> right; -1 -> left
     */
    movX(direction) {
        this.pivote.x += direction;
        this.__updateBoardPosition({ x: direction, y: 0 });
    }

    /**
     * Moves the piece vertically (+1 on the Y axis)
     */
    movY() {
        // this._deleteLastPosition();
        this.pivote.y++;
        this.__updateBoardPosition({ x: 0, y: 1 });

    }

    __updateBoardPosition(move) {
        this.forEach((_, rowIndex) => {
            _.forEach((block, colIndex) => {

                if (block === 0) return;

                let absPos = this._getAbsolutePosition(colIndex, rowIndex);

                // sets to 0 the last tiles occuped by the blocks
                this.board[absPos.y - move.y][absPos.x - move.x] = 0;

                // sets the tiles occuped by the blocks with the corresponding number
                // of the piece
                this.board[absPos.y][absPos.x] = this.pieceType;
            });
        });
    }

    /**
    * Fills the array with other arrays inside
    * to create a bidimensional. The 0's represents
    * blank spaces.
    * 
    * TODO: cambiar a un nombre mas descriptivo
    */
    _fillThis() {

        for (let i = 0; i < this.length; i++) {
            this[i] = [];

            for (let j = 0; j < 4; j++) {
                this[i][j] = 0;
            }
        }
    }

    /**
     * Makes a piece shape
     * @param {*} piece The type of the piece to be displayed
     */
    _selectPiece(piece) {

        const content = [1, 1, 1, 1];

        switch (piece) {
            case 1: // I piece
                return [
                    this[0][0],
                    this[0][1],
                    this[0][2],
                    this[0][3]
                ] = content;
        }
    }

    /**
     * Updates the positon of the piece inside the board
     */
    _updateBoardPosition() {

        this.forEach((arr, rowIndex) => {
            arr.forEach((block, colIndex) => {

                if (block === 0) return;

                let absPos = this._getAbsolutePosition(colIndex, rowIndex);

                this.board[absPos.y][absPos.x] = this.pieceType;
            });
        });

    }


    // getters & setters

    /**
     * Returns an object with the absolute values of the piece's position
     * @param {*} relativeX 
     * @param {*} relativeY 
     */
    _getAbsolutePosition(relativeX, relativeY) {
        return {
            x: this.pivote.x + relativeX,
            y: this.pivote.y + relativeY
        }
    }

    __iterateBlocks(func) {
        this.forEach((arr, rowIndex) => {
            arr.forEach((block, colIndex) => {

                // si no hay bloque no pinta nada
                if (block === 0) return; //===== no bloque =>>>

                func();
            });
        });
    }
}
