import Piece from "./piece.js";

export default class Board extends Array {
    constructor() {
        super(20);
        this._fillThis();

        //Array of pieces
        this.pieces = [];

        // context of the HTML canvas
        this.ctx = document.getElementById('myCanvas')
            .getContext('2d');
    }

    /**
    * Creates a new piece
    */
    newPiece(pieceType) {
        this.pieces.push(new Piece(this, pieceType));
        this.pieces[this.getCurrentPieceIndex]._setBoardPosition();
    }

    /**
     * Paints the rows and cols of the table
     */
    drawme() {
        this.ctx.clearRect(0, 0, 400, 800);
        this._drawCols();
        this._drawRows();
        this.__drawPieces();
    }

    /**
     * Draws the cols
     * @param {} colNum 
     */
    _drawCols(colNum = 0) {

        if (colNum > 10) {
            return;
        }

        colNum++;
        this.ctx.fillRect(colNum * 40, 0, 1, 800);
        this._drawCols(colNum);
    }

    /**
     * Draws the rows
     * @param {*} rowNum 
     */
    _drawRows(rowNum = 0) {

        if (rowNum > 20) {
            return;
        }

        rowNum++;
        this.ctx.fillRect(0, rowNum * 40, 400, 1);
        this._drawRows(rowNum);
    }

    /**
     * TODO: delete this method
     */
    __drawPieces() {
        this.ctx.fillStyle = "#FF0000";

        this.forEach((row, iRow) => {
            row.forEach((col, iCol) => {

                if (this[iRow][iCol] !== 0){
                    this.ctx.fillRect(
                        (iCol * 40),
                        (iRow * 40),
                        40,
                        40);
                    }
            });
        });

        this.ctx.fillStyle = "#000000";
    }

    /**
    * Fills the array with other arrays inside
    * to create a bidimensional. The 0's represents
    * blank spaces.
    * 
    * TODO: cambiar a un nombre mas descriptivo
    */
    _fillThis() {

        for (let row = 0; row < this.length; row++) {
            this[row] = [];

            for (let newCol = 0; newCol < 10; newCol++) {
                this[row][newCol] = 0;
            }
        }
    }

    get getPieces() {
        return this.pieces;
    }

    get getCurrentPieceIndex() {
        return this.pieces.length - 1;
    }
}