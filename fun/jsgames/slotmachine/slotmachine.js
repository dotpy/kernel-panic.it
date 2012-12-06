/******************************************************************************
 *              Slot Machine - Javascript game by kernel-panic.it             *
 ******************************************************************************/

function draw_table() {
  // Draw the slot machine wheels
  for (var i=0; i<3; i++) {
    document.writeln('<td><table class="wheels">');
    document.writeln('<tr><td><img src="images/up.gif" /></td></tr>');
    document.writeln('<tr><td><img src="images/' + OS[i] + '.gif" /></td></tr>');
    document.writeln('<tr><td><img src="images/down.gif" /></td></tr></table></td>');
  }
}


/****************************************
 * Constants                            *
 ****************************************/
var OS = new Array("openbsd", "freebsd", "linux", "solaris", "aix", "mac", "windows");
var HANDLE = 1;
var HANDLE_UP = "images/handle.gif";
var HANDLE_DOWN = "images/handle_down.gif";
var PUFFY = 0;

/****************************************
 * Sart the game                        *
 ****************************************/
var cur_imgs = new Array(0, 1, 2);
var cash = 100, bet = 5;
var bet_set = false, spinning = false;
var rand_nums = new Array();
var timer;

function pull() {
  // Pull the handle
  document.images[HANDLE].src = HANDLE_DOWN;
}

function set_bet(coins) {
  // Set the bet amount
  if (spinning) return;
  if (bet_set)  cash += bet
  if (coins > cash) {
    alert("You can't bet " + coins + "$! You only have " + cash + "!");
    bet_set = false;
  }
  else {
    bet = coins;
    cash -= bet;
    document.getElementById("bet").innerHTML = bet;
    document.getElementById("cash").innerHTML = cash + "$";
    bet_set = true;
  }
  return bet_set;
}

function play() {
  // Initialize the slot machine
  document.images[HANDLE].src = HANDLE_UP;
  if (spinning) return;
  if ((! bet_set) && (! set_bet(bet))) return;
  spinning = true;
  for (var i = 0; i < 3; i++) {
    rand_nums[i] = Math.ceil(Math.random() * 6);
  }
  timer = setInterval("spin(rand_nums)", 300);
  setTimeout("clearInterval(timer); check_it_out()", 5000);
}

function spin(n) {
  // Spin the wheels!
  for (var i = 0; i < 3; i++) {
    cur_imgs[i] = (cur_imgs[i] + n[i]) % 7;
    document.images[3+i*3].src = "images/" + OS[cur_imgs[i]] + ".gif";
  }
}

function check_it_out() {
  // Check the score
  spinning = false;
  bet_set  = false;
  if ((cur_imgs[0] == cur_imgs[1]) && (cur_imgs[0] == cur_imgs[2])) {
    cash += bet * 10;
  }
  else if ((cur_imgs[0] == cur_imgs[1]) || (cur_imgs[0] == cur_imgs[2]) || (cur_imgs[1] == cur_imgs[2])) {
    cash += bet * 5;
  }
  for (var i = 0; i < 3; i++) {
    if (cur_imgs[i] == PUFFY) cash += 10;
  }
  document.getElementById("cash").innerHTML = cash + "$";
  if (cash == 0)
    alert("Your money is over! ...and I can see the bouncer coming!");
}

