function generate(key) {
  var out = progress(key);
  print(out, 'output', true);
  return out;
}

function clearChord() {
  print("", "output", false);
}

function progress(key, overrideObj) {
  var startChord, prog, progLength, out;
  if (overrideObj == null) {
    startChord = fChord();
    progLength = getRandomInt(2, 7);
  } else {
    startChord = overrideObj.fChord;
    progLength = overrideObj.int;
  }
  prog = [startChord];
  for (i = 1; i < progLength; i++) {
    j = i-1;
    if (overrideObj == null) {
      prog[i] = mChord(prog[j]);
    } else {
      prog[i] = prog[j];
    }
  }
  var out = fixKey(key, prog, progLength);
  return out;
}

function fChord() {
  var percent = Math.random();
  var chord = "";
  var x;
  for (x in probChord) {
    if (probChord[x].first >= percent) {
      chord = x;
      return chord;
    }
  }
}

function mChord(prevChord) {
  var percent = Math.random();
  var chord = "";
  var p;
  var x;
  for (p in probChord){
    if (p == prevChord) {
      for (x in probChord[p].next) {
        if (probChord[p].next[x] >= percent) {
          chord = x;
          return chord;
        }
      }
    }
  }
}

function fixKey(key, array, length) {
  var progString = "";
  for (i = 0; i < length; i++) {
    progString += probChord[array[i]].key[key] + " ";
  }
  progString += "<br>"
  return progString;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function print(input, getId, addOn) {
  if (addOn != true) {
    document.getElementById(getId).innerHTML = input;
  } else {
    document.getElementById(getId).innerHTML += input;
  }
}
