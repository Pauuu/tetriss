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
        this._selectPiece(pieceType);

        // pivote: X, Y
        this.pivote = { col: 2, row: 0 };
    }

    checkRotationCollision(direction) {
        this._deletPosition();
        let a = this._cacaRotationColision(direction);
        this._revertRotation(direction);

        return a;
    }

    _revertRotation(direction) {
        if ((direction === 1) || (direction === 2)) {
            this._reverseCols();
            this._transposeMatrix();

        } else if ((direction === -1) || (direction === -2)) {
            this._transposeMatrix();
            this._reverseCols();

        } else {
            console.error("A ver, a ver, HABER: los unicos valores son"
                + "1 o -1");
            return;
        }
    }

    _cacaRotationColision(direction) {
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

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {
                if (this[row][col] === 0) continue;

                let absPos = this._getAbsolutePosition(row, col);

                // comprueba si no esta vacio el espacio
                if (this.board[absPos.row][absPos.col] !== 0) {
                    return true;
                }

                // comprueba si hay o no una pared
                if ((absPos.col < 0) || (absPos.col > 9) || (absPos.row > 19)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks if in the adjaccent horizontal axis there's the border or a block
     * 
     * Returns true if ther's colision
     */
    checkHorizontalColision(direction) {

        if (this._checkWallColision(direction) || this._checkHorizontalBlockColision(direction)) {

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
     * Checks the wallKick.
     * 
     * 1 -> clockwise
     * 
     * -1 -> counter-clockwise
     */
    _checkWallKick(direction) {
        // derecha
        let absPos;
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(row, col);
            }
        }

        this._deletPosition();

        if ((direction === 1) || (direction === 2)) {
            this._transposeMatrix();
            this._reverseCols();



        } else if ((direction === -1) || (direction === -2)) {
            this._reverseCols();
            this._transposeMatrix();

        } else {
            console.error("A ver, a ver, HABER: los unicos valores son"
                + "1 o -1");
            return;
        }

        if ((direction === 1) || (direction === 2)) {

            for (let row = 0; row < this.length; row++) {
                for (let col = 0; col < this[0].length; col++) {

                    if (this[row][col] === 0) continue; //=== no bloque =>>>

                    absPos = this._getAbsolutePosition(row, col);

                    console.log({
                        resutladoResta:
                            this.board[absPos.row][absPos.col - direction]
                    });

                    if ((this.board[absPos.row][absPos.col - direction]) !== 0) {

                        if (direction === 1) {
                            this._revertRotation(direction);
                            return this._checkWallKick(2);
                        }

                        else {
                            this._revertRotation(direction);
                            return 0
                        }
                    }
                }
            }

            this._revertRotation(direction);
            return direction;
        }

        else {

            for (let row = 0; row < this.length; row++) {
                for (let col = 0; col < this[0].length; col++) {

                    if (this[row][col] === 0) continue; //=== no bloque =>>>

                    absPos = this._getAbsolutePosition(row, col);

                    if ((absPos.col + direction) !== 0) {
                        if (direction === -1) {

                            this._revertRotation(direction);
                            return this._checkWallKick(-2);
                        } else {

                            this._revertRotation(direction);
                            return 0
                        }
                    }

                    this._revertRotation(direction);
                    return direction;
                }
            }
        }

        this._revertRotation(direction);
        return 0;
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
                    (this.pivote.col + colIndex) * 40,
                    (this.pivote.row + rowIndex) * 40,
                    40,
                    40);

            });
        });

        this.ctx.fillStyle = "#000000";
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

        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(row, col);
            }
        }


        this._deletPosition();
        this.pivote.col += direction;
        this._updateBoardPosition();
    }

    /**
     * Moves the piece vertically (+1 on the Y axis)
     */
    movY() {

        this._deletPosition();
        this.pivote.row++;
        this._updateBoardPosition();
    }

    /**
     * Mueve la pieza para poder hacer un wallkick.
     * Mira hacia donde ha rotado, y luego mueve la pieza hacia una direccion u
     * otra una o dos posiciones
     * 
     * TODO: OJO con la pieza O
     * @param {int} direccion direccion a donde va la pieza.
     * 
     * direccion = 1,2 -> horario 
     * 
     * direccion = -1,-2 -> contrahorario
     */
    wallKick(direction) {
        // TODO: comprobar si basta con mover una vez a un lado o no.
        this.movX(-direction);
    }

    /**
     * Checks if below there's the botttom of the board
     */
    _checkBottomColision() {
        let absPos;

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[0].length; col++) {

                if (this[row][col] === 0) continue; //=== no bloque =>>>

                absPos = this._getAbsolutePosition(row, col);

                // 19 es el largo de la tabla
                if ((absPos.row + 1) > 19) return true; // ==== hay colisoion ====>>>
            }
        }

        return false;
    }

    /**
     * Checks if in there's any colision on the horizontal axis 
     * @param {*} direction The direction of the piece
     */
    _checkHorizontalBlockColision(direction) {

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

                let absPos = this._getAbsolutePosition(row, col);
                let block = this.board[absPos.row][absPos.col + 1];

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

                let absPos = this._getAbsolutePosition(row, col);
                let block = this.board[absPos.row][absPos.col - 1];

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

                absPos = this._getAbsolutePosition(row, col);
                if (this.board[absPos.row + 1][absPos.col]) return true; // ==== hay colisoion ====>>>
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

                absPos = this._getAbsolutePosition(row, col);

                if (((absPos.col + direction) < 0) || ((absPos.col + direction) > 9)) {

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

                /**
                *  checks if there's a block on the piece, 
                *  because if not cheked, it might delete a block of another piece
                */
                if (block === 0) return;

                let absPos = this._getAbsolutePosition(rowIndex, colIndex);

                this.board[absPos.row][absPos.col] = 0;

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

        for (let row = 0; row < this.length; row++) {
            this[row] = [];

            for (let newCol = 0; newCol < 4; newCol++) {
                this[row][newCol] = 0;
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

                let absPos = this._getAbsolutePosition(rowIndex, colIndex);

                this.board[absPos.row][absPos.col] = this.pieceType;
            });
        });
    }

    // getters & setters

    /**
     * Returns an object with the absolute values of the piece's position
     * @param {*} relativeCol 
     * @param {*} relativeRow 
     */
    _getAbsolutePosition(relativeRow, relativeCol) {
        return {
            row: this.pivote.row + relativeRow,
            col: this.pivote.col + relativeCol
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
