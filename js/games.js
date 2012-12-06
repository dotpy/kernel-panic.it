/******************************************************************************
 *               Generic helper functions for JavaScript Games                *
 ******************************************************************************/

function get_sequence(seq_len, range) {
  // Return an array of seq_len different random numbers between 0 and (range-1)

  var sequence = new Array();

  while (sequence.length < seq_len) {
    sequence.push(Math.floor(Math.random() * range));
    var l = sequence.length - 1;
    for (i = 0; i < l; i++) {
      if (sequence[l] == sequence[i]) {
        sequence.pop();
        break;
      }
    }
  }
  return sequence;
}
