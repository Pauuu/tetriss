import Game from "./game.js"

// -- FIREBASE --
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

signInBtn.onclick = () => auth.signInWithRedirect(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
  if (user) {
    signedIn.hidden = false;
    signedOut.hidden = true;
    userDetails.innerHTML = `<h3> Hola ${user.displayName}!`;
    start();

  } else {
    signedIn.hidden = true;
    signedOut.hidden = false;
    userDetails.innerHTML = `¿Quien eres?`;
  }
});

// -- FIN FIREBASE --

// ------------------------------------------
// --------------- SEPARADOR ----------------
// ------------------------------------------

// -- GAME --
var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// completed lines
let completedLines = document.getElementById("completedLines");

// boolean value that indicates if the game has ended or not

// tiempo actual 
let currTime = new Date().getTime();

let snapTime;
let avgFps = 0;

function test() {
  alert("pingüino 1");
}

function start() {
  /**
   * Main loop
   */
  ; (function () {

    const time = 1000;

    game.setUp();
    snapTime = new Date().getTime();

    function main() {
      window.requestAnimationFrame(main);

      // myTimer(time, game.update);

      let diffTime = new Date().getTime() - snapTime;

      if (diffTime > time) {

        if (!game.isGameOver) {
          snapTime = new Date().getTime();
          game.update();
        }
      }

      render();
    }
    main(); // Start the cycle
  })();
}

/**
 * Renders all the elements of the game
 */
function render() {
  // showFPSaverage();
  showCompletedLines();
  game.getBoard.drawme();

  // game.getBoard.getPieces.forEach(piece => piece.drawme());
}

// /**
//  * Muestra los fos por la pantalla
//  */
// function showFPSaverage() {

  //  avgFps++;

//   if (new Date().getTime() - currTime >= 1000) {
//     fps.innerHTML = avgFps;
//     currTime = new Date().getTime();
//     avgFps = 0;
//   }
// }

function showCompletedLines() {
  completedLines.innerHTML = game.getBoard.getCompletedLines;
}
