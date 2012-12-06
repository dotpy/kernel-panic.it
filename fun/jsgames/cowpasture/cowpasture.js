/******************************************************************************
 *               Cow Pasture - Javascript game by kernel-panic.it             *
 ******************************************************************************/

/******************************************************************************
 *                                Constants                                   *
 ******************************************************************************/

var SHIT  = "images/shit.gif";
var BLANK = "images/blank.gif";
var GRASS = "images/grass.gif";
var COW   = "images/cow.gif";

var SHIFT = 16;


/******************************************************************************
 *                             Helper Functions                               *
 ******************************************************************************/

function draw_table() {
  // Draw the gameboard
  for (var i=0; i<9; i++) {
    document.writeln('<tr>');
    for (var l=0; l<9; l++) {
      var item = (i * 9 + l);
      document.writeln('<td><img src="' + GRASS + '" ' + 
                       'onClick="check(' + item + ')" ' + 
                       'onContextMenu="mark(' + item + '); return false;" /></td>');
    }
    document.writeln('</tr>');
  }
}

function in_array(item, array) {
  // Return true if 'array' contains 'item'
  for (var i in array) {
    if (array[i] == item) return true;
  }
  return false;
}

function pop_item(item, array) {
  // Return the array without the first occurrence of 'item'
  if (! in_array(item, array)) return array;
  for (var i in array) {
    if (item == array[i]) {
      array.splice(i, 1);
      return array;
    }
  }
}


/******************************************************************************
 *                              Start the game                                *
 ******************************************************************************/

var seq = get_sequence(10, 81);
var marked  = new Array(), cleared = new Array();
var key_down = false;

function check(item) {
  if (in_array(item, cleared)) return;
  if (key_down) {
    mark(item);
    return;
  }
  if (in_array(item, marked)) return;
  else {
    if (in_array(item, seq)) {
      document.images[item].src = SHIT;
      // Game over!
      show_solution();
      return;
    }
    cleared.push(item);
    var n = get_neighbours(item), mines_next = 0;

    for (var i in n)
      if (in_array(n[i], seq)) mines_next++;

    if (mines_next)
      document.images[item].src = "images/" + mines_next + ".gif";
    else {
      document.images[item].src = BLANK;
      for (var i in n)
        if (! in_array(n[i], marked)) check(n[i]);
    }
  }
  check_solution();
}

function get_neighbours(item) {
  // Return the numbers of the cells next to the one clicked by the player
  var n = new Array();

  if (item % 9) n.push(item - 1);
  if ((item + 1) % 9) n.push(item + 1);

  if (item > 8) {
    n.push(item - 9);
    if (item % 9) n.push(item - 10);
    if ((item + 1) % 9) n.push(item - 8);
  }

  if (item < 72) {
    n.push(item + 9);
    if (item % 9) n.push(item + 8);
    if ((item + 1) % 9) n.push(item + 10);
  }

  for (var i in n) {
    if (in_array(n[i], cleared)) {
      n = pop_item(n[i], n);
      continue;
    }
  }
  return n;
}

function check_solution() {
  // Check if the player has won
  if ((marked.length == 10) && ((marked.length + cleared.length) == 81)) {
    alert("Congratulations! You win!");
    window.location.reload();
  }
}

function show_solution() {
  // Discover the whole gameboard
  for (var i = 0; i < 81; i++) {
    if (in_array(i, seq)) document.images[i].src = SHIT;
    else document.images[i].src = BLANK;
  }
  alert("Oh, shit!");
  window.location.reload();
}

function mark(item) {
  // Draw a cow where the player clicks holding down the SHIFT key
  if (in_array(item, cleared)) {
    return;
  }
  else if (in_array(item, marked)) {
    marked = pop_item(item, marked);
    document.images[item].src = GRASS;
  }
  else {
    marked.push(item);
    document.images[item].src = COW;
  }
  document.getElementById("cows").innerHTML = "<span>" + marked.length + "</span>";
  check_solution();
}

