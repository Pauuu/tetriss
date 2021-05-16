import Piece from "./piece.js";

export default class Board extends Array {
  constructor(game) {
    super(20);
    this.game = game;
    this._fillThis();

    // the piece that is currently falling down the board;
    this.fallingPiece;

    // context of the HTML canvas
    this.ctx = document.getElementById('myCanvas')
      .getContext('2d');

    this.completedLines = 0;
  }

  /**
   * Checks if there's any line complete
   */
  checkCompleteLines() {

    // the total blocks on one row
    let empty;

    // the total lines cleared
    let clearedRows = 0;

    let initialRow = null;

    for (let row = 19; row >= 0; row--) {

      empty = false;

      for (let col = 0; col < 10; col++) {

        // breaks if the row has any space
        if (this[row][col] === 0) {

          // add one more block
          empty = true;
          break;
        }
      }

      // if the current row is complete, it clears it
      if (!empty) {

        // sets the initial row if not already setted
        if (initialRow === null) initialRow = row;

        // clears the inital row
        this.clearLine(row);
        clearedRows++;
        this.completedLines++;
      }
    }

    if (initialRow !== null) {

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
    // this.ctx.drawImage(this.img, 10, 10);  
  }

  /**
  * Creates a new piece
  */
  newPiece(pieceType) {

    this.fallingPiece = new Piece(this, pieceType);
    this.fallingPiece.setBoardPosition();
  }

  /**
   * Pulls down the rows starting from below
   * @param {number} initialRow the initial row to pull down
   * @param {number} totalRows total of rows to pull down
   */
  pullDownRows(initialRow, totalRows) {

    for (let row = initialRow; row >= 0; row--) {

      if (row < totalRows) break;
      this[row] = this[row - totalRows].slice();
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

    let width = 40;
    let height = 40;
    let colors;
    let colPosition;
    let rowPosition;
    let color1;
    let color2;

    this.forEach((row, iRow) => {
      row.forEach((block, iCol) => {

        if (block !== 0) {

          colPosition = iCol * 40;
          rowPosition = iRow * 40;
          colors = this._selectPieceColor(block);
          // this.ctx.fillStyle = this._selectPieceColor(block);

          color1 = colors.color1;
          color2 = colors.color2;

          // pq no se pinta con el gradiente
          let grd = this.ctx.createLinearGradient(
            colPosition,
            rowPosition,
            colPosition + 40,
            rowPosition + 40);
          grd.addColorStop(0, color1);
          grd.addColorStop(1, color2);

          this.ctx.fillStyle = grd;
          this.ctx.fillRect(
            colPosition,
            rowPosition,
            width,
            height
          );

          // para el grid
          this.ctx.fillStyle = "black"
        }
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

      for (let newCol = 0; newCol < 10; newCol++) {
        this[row][newCol] = 0;
      }
    }
  }

  _selectPieceColor(pieceType) {
    // let color;
    switch (pieceType) {
      case 1:
        return {
          color1: "red",
          color2: "yellow"
        };

      case 2:
        return {
          color1: "HotPink",
          color2: "Blue"
        };;

      case 3:
        return {
          color1: "Brown",
          color2: "White"
        };;

      case 4:
        return {
          color1: "orange",
          color2: "green"
        };

      case 5:
        return {
          color1: "blue",
          color2: "black"
        };

      case 6:
        return {
          color1: "#FF7F50", // Coral
          color2: "#E7A1B0" // Pink rose
        };

      case 7:
        return {
          color1: "#C12267", //Burnt Pink
          color2: "#C11B17"  // chilly pepper 
        };

      default:
        break;
    }
  }

  _loadImages() {

    this.imgs[0] = this.imgs.push(document.getElementById("amarillo"));
    this.imgs[1] = this.imgs.push(document.getElementById("verde"));
    this.imgs[2] = this.imgs.push(document.getElementById("crema"));
    this.imgs[3] = this.imgs.push(document.getElementById("marron"));
    this.imgs[4] = this.imgs.push(document.getElementById("naranja"));
    this.imgs[5] = this.imgs.push(document.getElementById("polar"));
    this.imgs[6] = this.imgs.push(document.getElementById("rojo"));

  }

  get getPieces() {
    return this.pieces;
  }

  get getCurrentPieceIndex() {
    return this.pieces.length - 1;
  }

  get getFallingPiece() {
    return this.fallingPiece;
  }

  get getCompletedLines() {
    return this.completedLines;
  }
}