describe('hexToDecimal', function(){
  it('should convert a single decimal number', function() {
    var subject = '1';
    expect(hexToDecimal(subject)).to.eq(1);
  });

  xit('should convert one letter', function() {
    var subject = 'c';
    expect(hexToDecimal(subject)).to.eq(12);
  });

  xit('should convert 10', function() {
    var subject = '10';
    expect(hexToDecimal(subject)).to.eq(16);
  });

  xit('should convert multiple letters', function() {
    var subject = 'af';
    expect(hexToDecimal(subject)).to.eq(175);
  });

  xit('should convert large numbers', function() {
    var subject = '100';
    expect(hexToDecimal(subject)).to.eq(256);
  });

  xit('should convert large numbers and letters', function() {
    var subject = '19ace';
    expect(hexToDecimal(subject)).to.eq(105166);
  });

  xit('should return null for an invalid hex code', function(){
    var subject = 'bananarama';
    expect(hexToDecimal(subject)).to.eq(null);
  });

  xit('should convert white', function() {
    var subject = 'ffffff';
    expect(hexToDecimal(subject)).to.eq(16777215);
  });

  xit('should convert papayawhip', function() {
    var subject = 'ffefd5';
    expect(hexToDecimal(subject)).to.eq(16773077);
  });
});