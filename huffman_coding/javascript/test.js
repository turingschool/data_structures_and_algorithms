var message = "That's no moon, it's a space station!"

var encoder = new Encoder(message);

describe('compression', function() {
  context('trie', function() {
    it('is tested', function() {
      assert.ok(false, 'You should probably write some unit tests for your trie and nodes');
    });
  });

  context('encoding', function() {
    it.skip('can count all the characters in a message', function() {

      var characterCounts = {"T": 1, "h": 1, "a": 4, "t": 4, "'": 2,
        "s": 4, " ": 6, "n": 3, "o": 4, "m": 1, ",": 1,
        "i": 2, "p": 1, "c": 1, "e": 1, "!": 1};

      assert.deepEqual(encoder.characterCounts, characterCounts);
    });

    it.skip('can convert characters to binary codes', function() {
      assert.match(encoder.characterToCode("T"), /^[01]+$/);
    });

    it.skip('has shorter codes for characters with more frequency', function() {
      var codeLengths = ["t", "!", "n", " "].map(function(character) {
        return encoder.characterToCode(character);
      });
      assert.deepEqual(codeLengths, codeLengths.sort());
    });

  });

  context("compression efficiency", function() {
    it('can tell me the original bitstring', function() {
      var messageBitstring = '101010011010001100001111010010011111100111000001101110110111110000011011011101111110111111011101011001000001101001111010010011111100111000001100001100000111001111100001100001110001111001011000001110011111010011000011110100110100111011111101110100001'
      assert.deepEqual(encoder.originalBitstring, messageBitstring)
    });

    it.skip('can tell me the compressed bitstring', function() {
      assert.match(encoder.compressedBitstring, /^[01]+$/);
    });

    it.skip('can tell me the compression efficiency', function() {
      assert.isNumber(encoder.compressionEfficiency);
      assert.isBelow(encoder.compressionEfficiency, 1);
    });

  });

  context("decoding", function() {
    it.skip('can decode a compressed message', function() {
      var decodedMessage = encoder.decode(encoder.compressedBitstring);
      assert.equal(decodedMessage, message);
    });
  });
});
