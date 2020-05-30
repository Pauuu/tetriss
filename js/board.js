import Piece from "./piece.js";

export default class Board extends Array {
    constructor() {
        super(20);
        this._fillThis();

        //Array of pieces
        this.pieces = [];

        let a = new Piece();

        // context of the HTML canvas
        this.ctx = document.getElementById('myCanvas')
            .getContext('2d');
    }

    /**
    * Creates a new piece
    */
    newPiece(pieceType) {
        this.pieces.push(new Piece(pieceType));
    }

    /**
     * Paints the rows and cols of the table
     */
    drawme() {
        this.ctx.clearRect(0, 0, 400, 800);
        this._drawCols();
        this._drawRows();
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
    * Fills the array with other arrays inside
    * to create a bidimensional. The 0's represents
    * blank spaces.
    * 
    * TODO: cambiar a un nombre mas descriptivo
    */
    _fillThis() {

        for (let i = 0; i < this.length; i++) {
            this[i] = [];

            for (let j = 0; j < 10; j++) {
                this[i][j] = 0;
            }
        }
    }

    get getPieces() {
        return this.pieces;
    }
}