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
        this.pivote = { col: 4, row: 6 };
    }

    /**
    * Checks the colision on the right side
    */
    checkRightColision() {
        let block = false; // booleano que comprueba si hay un bloque en la columna
        let absPos;        // tendra los valores absolutos del bloque

        for (let col = 3; col >= 0; col--) {

            for (let row = 0; row < 4; row++) {

                if (this[row][col] === 0) continue; //==== no hay bloque que comprobar ====>>> 

                block = true;   //==== hay un bloque en la columna ====>>>>
                absPos = this._getAbsolutePosition(row, col);

                if (this.board[absPos.row][++absPos.col] !== 0) return false; //==== un bloque ha chocado con algo ====>>
            }

            if (block) return true; //==== ningun bloque de la columna ha chocado con nada ====>>>>
        }
    }

    /**
     * Devuelve true si la pieza puede rotar sin sobreponerse con ninguna pieza
     * o salirse del tablero.
     * 
     * TODO: optimizar comprobaciones
     * @param {*} direction La direccion a la que la puiza rotará
     */
    checkRotationCollision(direction) {

        // quita la posicion del tablero para comprobar las posiciones
        this._deletPosition();

        // se comprueba si se puede rotar
        let test = this._testRotationColision(direction);

        // deshace la rotacion por si no se puede rotar
        this._revertRotation(direction);

        // vuelve a dejar la ficha en el tablero
        this._setBoardPosition();

        // devuelve true si se puede rotar
        return test;
    }

    /**
     * Checks the colision on the right side
     */
    checkLeftColision() {
        let block = false; // booleano que comprueba si hay un bloque en la columna
        let absPos;        // tendra los valores absolutos del bloque

        for (let col = 0; col < 4; col++) {

            for (let row = 0; row < 4; row++) {

                if (this[row][col] === 0) continue; //==== no hay bloque que comprobar ====>>> 

                block = true;   //==== hay un bloque en la columna ====>>>>
                absPos = this._getAbsolutePosition(row, col);

                if (this.board[absPos.row][absPos.col - 1] !== 0) return false; //==== un bloque ha chocado con algo ====>>
            }

            if (block) return true; //==== todos los bloques han sido testeados y ninguno ha chocado con nada ====>>>>
        }
    }

    /**
     * Checks if there'll be any vertical colision.
     * 
     * Returns true if there's colision; false if there's not
     */
    checkVerticalColision() {

        let block = false;
        let absPos;

        // comprueba si ha tocado el fondo del tablero
        if (this._checkBottomColision()) return false;

        for (let row = 3; row >= 0; row--) {
            if (block) return true; //==== hay algun bloque en la fila ====>>>>

            for (let col = 0; col < 4; col++) {

                if (this[row][col] === 0) continue; //==== no bloque ========>>>

                block = true; //==== ha encontrado un bloque =====>>>>>
                absPos = this._getAbsolutePosition(row, col);

                if (this.board[absPos.row + 1][absPos.col] !== 0) return false; //==== abajo no hay un espacio libre
            }
        }

        return "alguien se ha comido todos los bloques y no ha puesto un mensaje de err descriptivo OwO";   //===== err =======>>>>
    }

    _checkWallKick() {
        let absPos;
        let test = [1, 2, -1, -2];

        loop1:
        for (let i = 0; i < 4; i++) {

            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {

                    if (this[row][col] === 0) continue; //==== no bloque ====>>>

                    // devuelve la posicion absoluta de los bloques
                    absPos = this._getAbsolutePosition(row, col);

                    if (this.board[absPos.row][absPos.col + test[i]] !== 0) continue loop1;
                    // if ((absPos.col + test[i] < 0) || (absPos.col + test[i] > 19)) continue loop1;

                }
            }
            return test[i];

        }
        return 0;
    }

    /**
     * Draws the blocks of the piece
     */
    drawme() {


        this.ctx.fillStyle = 'green';
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

        this.ctx.fillStyle = 'black';

    }

    /**
     * Rotates the piece clockwise
     */
    rotate(movement) {
        this._deletPosition();

        this.pivote.col += movement.wallKickDirection;

        if (movement.rotationDirection === 1) {
            this._transposeMatrix();
            this._reverseCols();

        } else if (movement.rotationDirection === -1) {
            this._reverseCols();
            this._transposeMatrix();
        } else {
            console.error("A ver, a ver, HABER: los unicos valores son"
                + "1 o -1");
            return;
        }
        this._setBoardPosition();
    }

    /**
     * Moves the piece horizontally.
     * @param {*} direction the direction of the piece: 1 -> right; -1 -> left
     */
    movX(direction) {

        this._deletPosition();
        this.pivote.col += direction;
        this._setBoardPosition();
    }

    /**
     * Moves the piece vertically (+1 on the Y axis)
     */
    movY() {

        this._deletPosition();
        this.pivote.row++;
        this._setBoardPosition();
    }

    /**
     * Mueve la pieza hacia un lado para poder hacer un wallkick dependiendo de la direccion.
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
     * Checks if the block is at the bottom of the board.
     * 
     * returns true if there's at the bottom; false if there's not
     */
    _checkBottomColision() {

        let block = false;
        let absPos;

        for (let row = 3; row >= 0; row--) {

            if (block) return false; // ==== se han comprobado todos los bloques de abajo ====>>>
            for (let col = 0; col < 4; col++) {

                if (this[row][col] === 0) continue;

                block = true;
                absPos = this._getAbsolutePosition(row, col);

                if (absPos.row === 19) return true; //==== un bloque esta eb el fondo =====>>
            }
        }
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

    _revertRotation(direction) {
        if ((direction === 1)) {
            this._reverseCols();
            this._transposeMatrix();

        } else if ((direction === -1)) {
            this._transposeMatrix();
            this._reverseCols();

        } else {
            console.error("A ver, a ver, HABER: los unicos valores son"
                + "1 o -1");
            return;
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
     * Comprueba si algun bloque de la pieza choca con alguna otra pieza o queda fuera del tablero.
     * Si la rotacion no es valida, se comprueba si con un wallKick la rotacion es valida.
     * @param {} rDirection 
     */
    _testRotationColision(rDirection) {

        let movement = { rotationDirection: 0, wallKickDirection: 0 };

        if (rDirection === 1) {
            this._transposeMatrix();
            this._reverseCols();

        } else if (rDirection === -1) {
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

                // comprueba si hay una pared o el suelo mismo o comprueba si el espacio esta ocupado
                if ((absPos.col < 0) ||
                    (absPos.col > 9) ||
                    (absPos.row > 19) ||
                    (this.board[absPos.row][absPos.col] !== 0)
                ) {

                    let wkDirection = this._checkWallKick();

                    if (wkDirection) {
                        movement.rotationDirection = rDirection;
                        movement.wallKickDirection = wkDirection;

                        return movement;
                    } else {

                        return movement;
                    }
                }
            }
        }
        movement.rotationDirection = rDirection;
        return movement;
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
    _setBoardPosition() {

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

    /**
     * Returns true if it's the same block or not
     * @param {*} row absolute position of the row
     * @param {*} col aboslute position of the col
     */
    _isSameBlock(bRow, bCol) {

        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this[row].length; col++) {

                // si no hay bloque sigue con el bucle
                if (this[row][col] === 0) continue;

                // posicion absoluta del bloque dado
                let thisAbsPos = this._getAbsolutePosition(row, col);

                // comprueba si la pieza es la misma que la dada por parametro
                if ((bRow === thisAbsPos.row)
                    && (bCol === thisAbsPos.col)) {
                    return true;    // ==== misma pieza =====>>>>>>
                }
            }
        }

        return false; //===== no es la misma pieza ====>>>>
    }
}
