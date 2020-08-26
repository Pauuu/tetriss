export default class BlockView {
  constructor(game) {
    this.game = game;
  }

  displayBlocks() {
    let blockPanel = document.getElementById("blockPanel");

    let pieces = 4;
    while (pieces >= 0) {
      blockPanel.innerHTML = this.game.getBag[pieces];
      pieces--;
    }
  }
}