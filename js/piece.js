export default class Piece extends Array {
    constructor(piece) {
        super(4);
        this._fillThis();

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
        this.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {

                // si no hay bloque no pinta nada
                if (this[rowIndex][colIndex] === 0) return; //=== no bloque =>>>

                this.ctx.fillRect(
                    (this.pivote.x + colIndex) * 40,
                    (this.pivote.y + rowIndex) * 40,
                    40,
                    40);

            });
        });
    }

    /**
     * Moves the piece vertically (+1 on the Y axis)
     */
    movY(){
        this.pivote.y++;
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

    _selectPiece(piece) {

        const content = [1, 1, 1, 1];

        switch (piece) {
            case 1: // I piece
                return [
                    this[0][0],
                    this[0][1],
                    this[1][1],
                    this[1][2]
                ] = content;
        }

    }
}
