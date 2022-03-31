function letterGenerator(n) {
  var codeA = "a".charCodeAt(0);
  var codeZ = "z".charCodeAt(0);
  var len = codeZ - codeA + 1;

  var s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % len) + codeA) + s;
    n = Math.floor(n / len) - 1;
  }

  return s.toUpperCase();
}

export default letterGenerator;
