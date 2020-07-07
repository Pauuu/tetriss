import Game from "./game.js"

var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// tiempo actual (que sorpresa eh...)
let currTime = new Date().getTime();

let snapTime = 0;
let avgFps = 0;

var __indicador__ = 0;

/**
 * Main loop
 */
; (function () {

    const time = 200;

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

    if (__indicador__ === 0) {
        if (!game.getBoard.getPieces[0].checkHorizontalColision(direction)) {
            console.log("no hay horizontal colisoin");
            game.getBoard.getPieces[0].movX(direction);
        }

        // else {
        //     /** mira si puede hacer un wallkick (wk !== 0), 
        //     * y si lo puede hacer mueve toda la puieza todo el valor dado */
        //     let wallKickDir = !game.getBoard.getPieces[0]._checkWallKick(direction);

        //     if (wallKickDir) {

        //         game.getBoard.getPieces[0].wallKick(wallKickDir);
        //         game.getBoard.getPieces[0].rotate(direction);
        //     }
        __indicador__ = 1;
        // }
    }

    else {
        if (!game.getBoard.getPieces[0].checkRotationCollision(direction)) {
            game.getBoard.getPieces[0].rotate(direction);
        }

        else {
            let wallKickDir = game.getBoard.getPieces[0]._checkWallKick(direction);
            console.log("wallkcik " + wallKickDir);

            if (wallKickDir !== 0) {
                game.getBoard.getPieces[0].rotate(direction);
                game.getBoard.getPieces[0].wallKick(wallKickDir);
            }

        }
        __indicador__ = 0;

        // game.getBoard.getPieces[0].movX(1);
        // console.table(game.getBoard);
    }
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

