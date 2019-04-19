function Crypt(input, key) {
  var k = Number(key);
  if (!(k >=0 && k < 36)) {
    return 'Key should be between 0 and 35';
  }
  var secret = input.toLowerCase();
  var encoded = '';
  var alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  for (var j = 0; j < secret.length; j += 1) {
    var nextchar = secret.charAt(j);
    var index = alphabet.indexOf(nextchar);
    if (index >= 0) {
      var shifted = (index + k) % 36;
      encoded += alphabet.charAt(shifted);
    } else {
      encoded += nextchar;
    }
  }
  return encoded
};

function DeCrypt(input, key) {
  var k = Number(key);
  if (!(k >=0 && k < 36)) {
    $('#output').html('Key should be between 0 and 35');
    return;
  }
  k *= -1
  var secret = input.toLowerCase();
  var encoded = '';
  var alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  for (var j = 0; j < secret.length; j += 1) {
    var nextchar = secret.charAt(j);
    var index = alphabet.indexOf(nextchar);
    if (index >= 0) {
      var shifted = (36 + index + k) % 36;
      encoded += alphabet.charAt(shifted);
    } else {
      encoded += nextchar;
    }
  }
  return encoded
};


function Set_Output(input){
document.getElementById('output').value = input;
};
