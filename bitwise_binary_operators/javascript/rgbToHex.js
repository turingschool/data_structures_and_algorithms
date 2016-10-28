function colorToHex(color){
  if (/#/.test(color)){
    return color;
  }

  var digits = /.*?\((\d+).*?(\d+).*?(\d+)\)/.exec(color);

  var red = parseInt(digits[1]);
  var green = parseInt(digits[2]);
  var blue = parseInt(digits[3]);
    
  var rgb = (red << 16) | (green << 8) | blue;

  return '#' + rgb.toString(16);
}