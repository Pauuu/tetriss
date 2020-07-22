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

        for (let i = 0; i < 10; i++) {
            if (i === 4 || i === 5 || i === 6 || i === 7) continue;
            this[19][i] = 1;
            this[18][i] = 1;
        }
    }

    /**
     * Checks if there's any line complete
     */
    checkCompleteLines() {

        // the total blocks on one row
        let blocks;

        // the total lines cleared
        let clearedRows = 0;

        let initialRow = -1;

        for (let row = 19; row >= 0; row--) {

            blocks = 0;

            for (let col = 0; col < 10; col++) {

                // breaks if the row has any space
                if (this[row][col] === 0) break;

                // add one more block
                blocks++;
            }

            // if the current row is complete, it clears it
            if (blocks === 10) {

                console.debug({ initialRow: initialRow });

                // sets the initial row if not already setted
                if (initialRow === -1) initialRow = row;

                console.debug({ initialRow2: initialRow });

                // clears the inital row
                this.clearLine(row);
                clearedRows++;
            }
        }

        if (initialRow !== -1) {

            this.pullDownRows(initialRow, clearedRows);
        }
    }

    /**
     * Clears the specified line
     * @param {Number} row 
     */
    clearLine(row) {
        this[row].fill(0);
    }

    /**
     * Paints the rows and cols of the table
     */
    drawme() {
        this.ctx.clearRect(0, 0, 400, 800);
        this._drawCols();
        this._drawRows();
        this._drawBlocks();
    }

    /**
    * Creates a new piece
    */
    newPiece(pieceType) {
        this.pieces.push(new Piece(this, pieceType));
        this.pieces[this.getCurrentPieceIndex]._setBoardPosition();
    }

    /**
     * Pulls down the rows starting from below
     * @param {number} initialRow the initial row to pull down
     * @param {number} totalRows total of rows to pull down
     */
    pullDownRows(initialRow, totalRows) {

        console.log("holas que tal caca culo pedo pis");

        // index of the row to pull down
        let pullDownRowIndex;

     

        for (let row = initialRow; row >= 0; row--) {

            // pullDownRowIndex = row - totalRows;

            // if (pullDownRowIndex < 0) break;
            if (row < totalRows) break;
            this[row] = this[row - totalRows].slice();

            // hace lo mismo que lo de arriba?
            // this[row] = [...this[row - totalRows]];  
        }
    }

    /**
     * Draws the cols
     * @param {number} colNum 
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
     * @param {number} rowNum 
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
     * draw all the pieces
     */
    _drawBlocks() {

        let block;

        this.forEach((row, iRow) => {
            row.forEach((col, iCol) => {
                block = this[iRow][iCol];

                if (block !== 0) {
                    this.ctx.fillStyle = this._selectColor();

                    this.ctx.fillRect(
                        iCol * 40,
                        iRow * 40,
                        40,
                        40);
                }
            });
        });
    }

    // cuando no habian motos y cuando habian personas?
    // 
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

    _selectColor(pieceType) {
        return "#123456";
    }

    get getPieces() {
        return this.pieces;
    }

    get getCurrentPieceIndex() {
        return this.pieces.length - 1;
    }
}