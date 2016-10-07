var message = "That's no moon, it's a space station!";

var encoder = new Encoder(message);

describe('compression', function() {

  context('leaf', function() {
    it('has a character and a count', function() {
      var leaf = new Leaf("J", 4);
      assert.ok(leaf.character, 'has a character');
      assert.ok(leaf.count, 'has a count');
    });

    it('returns itself as an object', function() {
      var leaf = new Leaf("J", 4);
      assert.deepEqual(leaf.encoderObject("010"), {J: "010"}, 'has correct object returned');
    });

  });

  context('node', function() {

    it('has a left node and a right node', function() {
      var node = new Node(new Leaf(), new Leaf());
      assert.ok(node.left, 'has a left node');
      assert.ok(node.right, 'has a right node');
    });

    it('has a count equal to the sum of the counts of its leaves', function() {
      var node = new Node(new Leaf("!", 1), new Leaf("@", 2));
      assert.equal(node.count, 3);
    })

    it('returns itself as an object', function() {
      var leftLeaf = new Leaf("J", 1);
      var rightLeaf = new Leaf("K", 1);
      var node = new Node(leftLeaf, rightLeaf);
      assert.deepEqual(node.encoderObject("0"), {J: "00", K: "01"}, 'has correct object returned');
    });

  });

  context('rootNode', function() {
    it('has a count equal to the message length', function() {
      assert.equal(encoder.root.count, message.length)
    });

    it('has children that know about their parents', function() {
      assert.equal(encoder.root, encoder.root.left.parent);
      assert.equal(encoder.root, encoder.root.right.parent);
    });

    it('can unset parents', function() {
      var tempEncoder = new Encoder('Cowabunga');
      tempEncoder.root.unsetParents();
      assert.isUndefined(tempEncoder.root.left.parent);
      assert.isUndefined(tempEncoder.root.right.parent);
    });

  });

  context('encoding', function() {
    it('has an array of leaves', function() {
      var numCharacters = _.uniq(message.split("")).length;
      assert.equal(numCharacters, encoder.leaves.length);
      encoder.leaves.forEach(function(leaf) {
        assert.instanceOf(leaf, Leaf)
      });

    });

    it('can convert characters to binary codes', function() {
      assert.match(encoder.characterToCode("T"), /^[01]+$/);
    });

    it('has shorter codes for characters with more frequency', function() {
      var codeLengths = ["t", "!", "n", " "].map(function(character) {
        return encoder.characterToCode(character);
      });
      assert.deepEqual(codeLengths, codeLengths.sort());
    });

    it('can tell me the compressed bitstring', function() {
      var compressed = "100001000111110000110001110111001011010010010010111010011110011100001100011101111110001101001111101011011011000100011110000111010111010111"
      assert.equal(encoder.compressedBitstring, compressed);
    });

  });

  context("decoding", function() {
    context("challenge 1", function() {
      it.skip('can decode a compressed message', function() {
        var decodedMessage = encoder.decode(encoder.compressedBitstring);
        assert.equal(decodedMessage, message);
      });
    });

    context("challenge 2", function() {
      it.skip('can decode from only a compressed bitstring and a tree', function() {
        var decoder = new Decoder(encoder.compressedBitstring, encoder.root);
        assert.equal(decoder.message(), message);
      });
    });

    context("batman challenge", function() {
      it.skip('can decode from only a compressed bitstring and a tree where the nodes have lost their parents', function() {
        encoder.root.unsetParents();
        var decoder = new Decoder(encoder.compressedBitstring, encoder.root);
        assert.equal(decoder.message(), message);
      });
    });

  });
});
