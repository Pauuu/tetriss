import Game from "./game.js"

var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// tiempo actual (que sorpresa eh...)
let currTime = new Date().getTime();

let snapTime = 0;
let avgFps = 0;

var __caca__ = 0;
var i = 0;

/**
 * Main loop
 */
; (function () {

    const time = 1000;

    game.setUp();

    function main() {
        window.requestAnimationFrame(main);

        myTimer(time, update);

        render();
    }
    main(); // Start the cycle
})();

/**
 * Updates the elements of the game
 */
function update() {

    let direction = 1;
    let currentPiece = game.getBoard.getPieces[game.getBoard.getCurrentPieceIndex];

   
    // comprueba si se puede girar la pieza como tal, si no se comprueba si se puede hacer un wallkick
    // if (movement.rotationDirection) {
    //     console.log("rotado " + i);

    //     // gira la pieza
    //     currentPiece.rotate(movement.rotationDirection, movement.wallKickDirection);

    // }


    if (__caca__ === 0) {
        __caca__ = 1;

        if (currentPiece.checkRightColision()) {
            currentPiece.movX(direction);
            console.log("movido en x " + i);
        }

    } else {
        __caca__ = 0;

        let movement = currentPiece.checkRotationCollision(direction);
        console.log(movement);

        // comprueb si se puede girar la pieza como tal, si no se comprueba si se puede hacer un wallkick
        if (movement.rotationDirection) {
            console.log("rotado " + i);

            // gira la pieza
            currentPiece.rotate(movement);

        } 
    }

    i++;
}


/**
 * Renders all the elements of the game
 */
function render() {
    showFPSaverage();
    game.getBoard.drawme();
    game.getBoard.getPieces.forEach(piece => piece.drawme());
}


/**
 * Executes a function of this file if specified time has passed between calls
 * @param {*} time time to pass
 * @param {*} func function to execute
 */
function myTimer(time, func) {

    let diffTime = new Date().getTime() - snapTime;

    if (diffTime > time) {
        snapTime = new Date().getTime();
        func();
    }
}


/**
 * Muestra los fos por la pantalla
 */
function showFPSaverage() {

    avgFps++;

    if (new Date().getTime() - currTime >= 1000) {
        fps.innerHTML = avgFps;
        currTime = new Date().getTime();
        avgFps = 0;
    }
}

