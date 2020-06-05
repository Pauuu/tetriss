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
        this._selectPiece(7);

        // pivote: X, Y
        this.pivote = { x: 0, y: 0 };
    }

    /**
     * Checks if in the adjaccent horizontal axis there's the border or a block
     * 
     * Returns true if ther's colision
     */
    checkHorizontalColision(direction) {

        if (this._checkWallColision(direction) || this._checkHorizontalBlockColision_(direction)) {
            console.log("chc: ");
            return true;
        }

        return false;
    }

    /**
     * Checks if there'll be any vertical colision.
     * 
     * Returns true if there's colision
     */
    checkVerticalColision() {
        if (this._checkBottomColision() || this._checkVerticalBlockColision()) {

            return true;
        }

        return false;
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
     * Rotates the piece clockwise
     */
    rotate(direction) {
        this._deletPosition();

        if (direction === 1) {
            this._transposeMatrix();
            this._reverseCols();

        } else if (direction === -1) {
            this._reverseCols();
            this._transposeMatrix();
        } else {
            console.error("A ver, a ver, HABER: los unicos valores son"
                + "1 o -1");
            return;
        }
        this._updateBoardPosition();
    }

    /**
     * Moves the piece horizontally.
     * @param {*} direction the direction of the piece: 1 -> right; -1 -> left
     */
    movX(direction) {

        this._deletPosition();
        this.pivote.x += direction;
        this._updateBoardPosition();
    }

    /**
     * Moves the piece vertically (+1 on the Y axis)
     */
    movY() {

        this._deletPosition();
        this.pivote.y++;
        this._updateBoardPosition();
    }

    /**
     * Checks if below there's the botttom of the board
     */
    _checkBottomColision() {
        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[col][row] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(col, row);

                // 19 es el largo de la tabla
                if ((absPos.y + 1) > 19) return true; // ==== hay colisoion ====>>>
            }
        }

        return false;
    }

    /**
     * Checks if in there's any colision on the horizontal axis 
     * @param {*} direction The direccion of the piece
     */
    _checkHorizontalBlockColision(direction) {
        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(col, row);
                if (this.board[absPos.y][absPos.x + direction]) return true; // ==== hay colisoion ====>>>

            }
        }

        return false;
    }

    /**
     * Checks if in there's any colision on the horizontal axis 
     * @param {*} direction The direccion of the piece
     */
    _checkHorizontalBlockColision_(direction) {

        if (direction === 1) {
            return this._rightColision();

        } else if (direction === -1) {
            return this._leftColision();

        } else {
            console.error("Las unicas direcciones son 1 o -1");
        }
    }

    /**
     * Checks colision when the piece goes from left to right 
     */
    _rightColision() {
        for (let row = 0; row < this.length; row++) {
            for (let col = this.length - 1; col >= 0; col--) {

                if (this[row][col] === 0) continue; // sigue con el bucle

                let absPos = this._getAbsolutePosition(col, row);
                let block = this.board[absPos.y][absPos.x + 1];

                if (block) return true; // =====  hay un bloque ======>>

                break;

            }
        }

        return false; // ===== no hay un bucle ======>>
    }

    /**
    * Checks colision when the piece goes from right to left 
    */
    _leftColision() {
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {

                if (this[row][col] === 0) continue; // sigue con el bucle

                let absPos = this._getAbsolutePosition(col, row);
                let block = this.board[absPos.y][absPos.x - 1];

                if (block) return true; // =====  hay un bloque ======>>

                break;

            }
        }

        return false; // ===== no hay un bucle ======>>
    }


    /**
     * Checks if below there's a block
     */
    _checkVerticalBlockColision() {
        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(col, row);
                if (this.board[absPos.y + 1][absPos.x]) return true; // ==== hay colisoion ====>>>
            }
        }

        return false;
    }



    /**
     * Checks if there's any colision with the game's walls
     */
    _checkWallColision(direction) {
        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < 4; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(col, row);

                if (((absPos.x + direction) < 0) || ((absPos.x + direction) > 9)) {
                    console.log("pared: " + absPos.x);
                    return true; // ==== hay colisoion ====>>>
                }
            }
        }

        return false;
    }

    /**
     * Deletes the actual position of the matrix
     */
    _deletPosition() {

        this.forEach((_, rowIndex) => {
            _.forEach((block, colIndex) => {

                if (block === 0) return;

                let absPos = this._getAbsolutePosition(colIndex, rowIndex);

                this.board[absPos.y][absPos.x] = 0;

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
     * Reverses the cols of the matrix
     */
    _reverseCols() {
        this.forEach(arr => {
            arr.reverse();
        });
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

            case 2: // J piece
                return [
                    this[0][1],
                    this[1][1],
                    this[2][1],
                    this[2][0]
                ] = content;

            case 3: // L piece
                return [
                    this[0][0],
                    this[1][0],
                    this[2][0],
                    this[2][1]
                ] = content;

            case 4: // Z piece
                return [
                    this[0][0],
                    this[0][1],
                    this[1][1],
                    this[1][2]
                ] = content;

            case 5: // S piece
                return [
                    this[0][2],
                    this[0][1],
                    this[1][1],
                    this[1][0]
                ] = content;

            case 5: // S piece
                return [
                    this[0][2],
                    this[0][1],
                    this[1][1],
                    this[1][0]
                ] = content;

            case 6: // O piece
                return [
                    this[0][0],
                    this[0][1],
                    this[1][0],
                    this[1][1]
                ] = content;

            case 7: // S piece
                return [
                    this[0][0],
                    this[0][1],
                    this[0][2],
                    this[1][1]
                ] = content;

        }
    }

    /**
     * Modifies the matrix to transpose it
     */
    _transposeMatrix() {

        for (let row = 0; row < 4; row++) {
            for (let col = row; col < 4; col++) {
                [this[row][col], this[col][row]] = [this[col][row], this[row][col]];
            }
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
