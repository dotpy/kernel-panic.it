/******************************************************************************
 *                 Puzzle - Javascript game by kernel-panic.it                *
 ******************************************************************************/

function draw_table() {
  // Draw Mona Lisa
  for (var i=0; i<4; i++) {
    document.writeln('<tr>');
    for (var l=0; l<4; l++) {
      document.writeln('<td><img src="images/' + (l+i*4) + '.jpg" onClick="shift(' + (l+i*4) + ')" /></td>');
    }
    document.writeln('</tr>');
  }
}

/*******************************************
 * Constants                               *
 *******************************************/
var PIECES = 16;
var BLACK_IMG = "images/15.jpg";

/*******************************************
 * Start the game                          *
 *******************************************/

function shuffle() {
  // Mix the pieces
  var s = get_sequence(PIECES, PIECES);
  for (var i=0; i<PIECES; i++) {
    document.images[i].src = "images/" + s[i] + ".jpg";
  }
}

function shift(item) {
  // Shift a piece
  var n = get_neighbours(item);
  for (var i in n) {
    var s = document.images[n[i]].src;
    if (s.search(BLACK_IMG) != -1) {
      document.images[n[i]].src = document.images[item].src;
      document.images[item].src = BLACK_IMG;
      break;
    }
  }
}

function get_neighbours(item) {
  // Return the list of the pieces next to the one clicked by the player
  var n = new Array();
  if (item % 4)       n.push(item - 1);
  if ((item + 1) % 4) n.push(item + 1);
  if (item > 3)       n.push(item - 4);
  if (item < 12)      n.push(item + 4);
  return (n);
}

