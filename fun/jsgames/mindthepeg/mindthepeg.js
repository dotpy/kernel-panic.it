/******************************************************************************
 *              Mind the peg - Javascript game by kernel-panic.it             *
 ******************************************************************************/

function build_table() {
  // Draw the gameboard
  var HOLE = '<img src="images/hole.gif" alt="" />';
  var SMALL_HOLE = '<img src="images/hole.gif" class="small-hole" alt="" />';
  var SEP = '<img src="images/sep.gif" alt="" />';
  var SMALL_SEP = '<img src="images/sep.gif" class="small-sep" alt="" />';

  // Draw 10 lines
  for (var i=0; i<10; i++) {
    document.write('<tr>');
    // Draw four holes per line
    for (var l=0; l<4; l++) {
      document.write('<td>' + HOLE + '</td>');
    }
    document.write('<td>' + SMALL_HOLE + SMALL_HOLE + '<br>');
    document.write(SMALL_HOLE + SMALL_HOLE + '</td></tr>');
    document.write('<tr><td colspan="4">' + SEP + '</td>');
    document.write('<td>' + SMALL_SEP + '</td></tr>');
  }
}


/******************************************************************************
 *                                Constants                                   *
 ******************************************************************************/

var SEQ_LEN = 4;
var COLORS  = new Array("red", "green", "yellow", "blue", "white", "purple");

WIN_MSG  = "Congratulations, you win!";
LOSE_MSG = "Sorry! Try again!";


/******************************************************************************
 *                              Start the game                                *
 ******************************************************************************/

var sequence = get_sequence(SEQ_LEN, COLORS.length);
var cur_img  = 0;
var attempt  = new Array();

function select(index) {
  // Select the color number 'index'
  document.images[cur_img++].src = "images/" + COLORS[index] + ".gif";
  attempt.push(index);
  if ((cur_img % 10) == 4)
    check_it_out();
}

function check_it_out() {
  // Check out how many colours the player guessed
  var whites = 0, reds = 0;

  for (var i = 0; i < 4; i++) {
    for (var l = 0; l < 4; l++) {
      if (attempt[i] == sequence[l]) {
        if (i == l) whites ++;
        else reds++;
        break;
      }
    }
  }
  attempt = [];

  for (var i=0; i < whites; i++)
    document.images[cur_img++].src = "images/" + "white.gif";
  for (var i=0; i < reds; i++)
    document.images[cur_img++].src = "images/" + "red.gif";
  cur_img += 6 - (whites + reds);

  if (whites == 4)
    show_sequence(WIN_MSG);
  else if (cur_img == 100)
    show_sequence(LOSE_MSG);
}

function show_sequence(msg) {
  // Show the solution sequence after the player wins
  for (var i = 0; i < 4; i++)
    document.images[100+i].src = "images/" + COLORS[sequence[i]] + ".gif";
  alert(msg);
  window.location.reload();
}

