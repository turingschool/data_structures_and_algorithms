describe('colorToHex', function(){
  it('should convert white', function() {
    var white = 'rgb(255, 255, 255)';
    expect(colorToHex(white)).to.eq('#ffffff')
  });

  xit('should convert papayawhip (and be able to handle missing rgb)', function() {
    var papayawhip = '(255, 239, 213)';
    expect(colorToHex(papayawhip)).to.eq('#ffefd5')
  });

  xit('should convert steelblue (and be able to handle missing spaces)', function() {
    var steelblue = '(70,130,180)';
    expect(colorToHex(steelblue)).to.eq('#4682b4')
  });

  xit('should convert magenta', function() {
    var magenta = 'rgb(255, 0, 255)';
    expect(colorToHex(magenta)).to.eq('#ff00ff')
  });

  xit('should convert yellow', function() {
    var yellow = 'rgb(255, 255, 0)';
    expect(colorToHex(yellow)).to.eq('#ffff00')
  });

  xit('should convert green', function() {
    var green = 'rgb(0, 255, 0)';
    expect(colorToHex(green)).to.eq('#00ff00')
  });

  // It starts getting tricky here!

  xit('should convert black', function() {
    var black = 'rgb(0, 0, 0)';
    expect(colorToHex(black)).to.eq('#000000')
  });

  xit('should return the hex value if accidently given a hex', function() {
    expect(colorToHex('#ffffff')).to.eq('#ffffff');
  });
})