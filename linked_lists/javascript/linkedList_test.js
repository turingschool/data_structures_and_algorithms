describe('ListNode', function() {
  it('should have data', function() {
    var node = new ListNode('pizza');
    expect(node.data).to.eq('pizza');
  });

  it.skip('should have a default empty nextNode', function() {
    var node = new ListNode('pizza');
    expect(node.nextNode).to.eq(null);
  });

  it.skip('should allow setting a nextNode', function() {
    var n1 = new ListNode('pizza');
    var n2 = new ListNode('cats');
    n1.nextNode = n2;
    expect(n1.nextNode.data).to.eq('cats');
    expect(n1.nextNode instanceof ListNode).to.be.true;
  });

  it.skip('should allow a next node argument on creation', function(){
    var node = new ListNode('pizza', new ListNode('cats'));
    expect(node.nextNode.data).to.eq('cats');
    expect(node.nextNode instanceof ListNode).to.be.true;
  });
});

describe('LinkedList', function() {
  var list;

  beforeEach(function(){
    list = new List();
  });

  it.skip('should start with zero elements', function() {
    expect(list._length).to.eq(0);
  });

  it.skip('should set its default head to null', function(){
    expect(list.head).to.eq(null);
  });

  describe('.push', function(){
    context('with a single element', function(){
      it.skip('should allow push of a single element to a list', function(){
        list.push('pizza');
        expect(list.head.data).to.eq('pizza');
      });

      it.skip('should increment the _length of the list', function(){
        list.push('pizza');
        expect(list._length).to.eq(1);
      });
    });

    context('with multiple elements', function(){
      it.skip('should increment the length count', function(){
        list.push('pizza');
        list.push('stromboli');
        list.push('mushroom');
        expect(list._length).to.eq(3);
      });

      it.skip('should assign the head to the first element pushed', function(){
        expect(list.head).to.eq(null);
        list.push('pizza');
        expect(list.head.data).to.eq('pizza');
        list.push('stromboli');
        expect(list.head.data).to.eq('pizza');
      });

      it.skip('should attach the second element to the first element', function(){
        list.push('pizza');
        list.push('stromboli');
        expect(list.head.nextNode.data).to.eq('stromboli');
      });

      it.skip('should attach nextNodes in sequential order', function(){
        list.push('pizza');
        list.push('stromboli');
        list.push('mushroom');
        list.push('peanutbutter');
        expect(list.head.data).to.eq('pizza');
        expect(list.head.nextNode.data).to.eq('stromboli');
        expect(list.head.nextNode.nextNode.data).to.eq('mushroom');
        expect(list.head.nextNode.nextNode.nextNode.data).to.eq('peanutbutter');
      });
    });
  });

  describe('.pop', function(){
    context('with no elements', function(){
      it.skip('should return null', function(){
        expect(list.pop()).to.eq(null);
      });

      it.skip('should not decrement the _length', function(){
        expect(list._length).to.eq(0);
      });
    });

    context('with one element', function(){
      it.skip('should change the _length', function(){
        list.push('hello');
        var result = list.pop();
        expect(list._length).to.eq(0);
      });

      it.skip('should set the list head to null', function(){
        list.push('hello');
        var result = list.pop();
        expect(list.head).to.eq(null);
      });

      it.skip('should return the last element', function(){
        list.push('hello');
        var result = list.pop();
        expect(result.data).to.eq('hello');
      });
    });

    context('with multiple elements', function(){
      it.skip('should return the last element from the list', function(){
        list.push("hello");
        list.push("new");
        list.push("world");
        list.push("today");

        var output = list.pop();
        expect(output.data).to.eq('today');
      });

      it.skip('should remove the last element from the list', function(){
        list.push("hello");
        list.push("world");
        list.push("today");

        var output = list.pop();
        expect(output.data).to.eq('today');
        expect(list._length).to.eq(2);

        var output2 = list.pop();
        expect(output2.data).to.eq('world');
        expect(output2.nextNode).to.eq(null);
        expect(list._length).to.eq(1);

        var output3 = list.pop();
        expect(output3.data).to.eq('hello');
        expect(output3.nextNode).to.eq(null);
        expect(list._length).to.eq(0);
      });
    });
  });

  describe('.delete', function(){
    context('with one node', function(){
      it.skip('deletes a solo node', function(){
        list.push('hello');
        list.delete('hello');
        expect(list._length).to.eq(0);
        expect(list.head).to.eq(null);
      });

      it.skip('does not perform a delete when a node does not match', function(){
        list.push('hello');
        list.delete('goodbye');
        expect(list._length).to.eq(1);
        expect(list.head.data).to.eq('hello');
      });
    });

    context('with multiple nodes', function(){
      beforeEach(function(){
        list.push('hello');
        list.push('darkness');
        list.push('my');
        list.push('old');
        list.push('friend');
      });

      it.skip('changes the list _.length', function(){
        expect(list.head.nextNode.data).to.eq('darkness');
        expect(list._length).to.eq(5);
        list.delete('friend');
        expect(list._length).to.eq(4);
        list.delete('my');
        expect(list._length).to.eq(3);
        list.delete('happy');
        expect(list._length).to.eq(3);
      });

      it.skip('resets the nextNode property on the node before the deleted node', function(){
        expect(list.head.nextNode.data).to.eq('darkness');
        list.delete('darkness');
        expect(list.head.nextNode.data).to.eq('my');
      });

      it.skip('resets the list.head if deleting the first node', function(){
        expect(list.head.data).to.eq('hello');
        list.delete('hello');
        expect(list.head.data).to.eq('darkness');
      });
    });
  });

  describe('.toArray', function(){
    context('when there are no elements', function(){
      it.skip('converts to an array', function(){
        expect(list.toArray()).to.deep.equal([]);
      });
    });

    context('when there are several elements', function(){
      beforeEach(function(){
        list.push('The');
        list.push('rain');
        list.push('in');
        list.push('Spain');
      });

      it.skip('can convert to an array', function(){
        expect(list.toArray()).to.deep.equal(['The', 'rain', 'in', 'spain']);
      });
    });
  });

  describe('.lastNode', function(){
    context('with several nodes', function(){
      beforeEach(function(){
        list.push('The');
        list.push('rain');
        list.push('in');
        list.push('Spain');
      });

      it.skip('finds the last node', function(){
        expect(list.lastNode().data).to.eq('Spain');
      });
    });

    context('with one node', function(){
      beforeEach(function(){
        list.push('Ahoy!');
      });

      it.skip('finds the only node', function(){
        expect(list.lastNode().data).to.eq('Ahoy!');
      });
    });

    context('with no nodes', function(){
      it.skip('returns null', function(){
        expect(list.lastNode()).to.eq(null);
      });
    });
  });

  describe('.include', function(){
    beforeEach(function(){
      list.push('The');
      list.push('rain');
      list.push('in');
      list.push('Spain');
    });

    it.skip('should return true if node is in list', function(){
      expect(list.include("rain")).to.eq(true);
    });

    it.skip('should return false if node is not in list', function(){
      expect(list.include("nope")).to.eq(false);
    });
  });

  describe('.find', function(){
    beforeEach(function(){
      list.push('oh');
      list.push('hello');
      list.push('world');
    });

    it.skip('should return true the node if node in list', function(){
      var result = list.find("hello");
      expect(result.data).to.eq('hello');
      expect(result.nextNode.data).to.eq('world');
    });

    it.skip('should return null if node is missing', function(){
      var result = list.find("nope");
      expect(result).to.eq(null);
    });
  });

  describe('.index', function(){
    beforeEach(function(){
      list.push('oh');
      list.push('hello');
      list.push('world');
    });

    it.skip('should return expected indexes', function(){
      expect(list.index('oh')).to.eq(0);
      expect(list.index('world')).to.eq(2);
      expect(list.index('nope')).to.eq(null);
    });
  });

  describe('.insert', function(){
    beforeEach(function(){
      list.push('dark');
      list.push('stormy');
    });

    it.skip('should insert nodes', function(){
      expect(list._length).to.eq(2);
      list.insert(1, 'and');
      list.insert(3, 'night');
      expect(list._length).to.eq(4);
      expect(list.toArray).to.deep.equal('dark', 'and', 'stormy', 'night');
    });
  });

  describe('.insertAfter', function(){
    beforeEach(function(){
      list.push('dark');
      list.push('stormy');
    });

    it.skip('should insert nodes after other nodes', function(){
      expect(list._length).to.eq(2);
      list.insertArfter('dark', 'and');
      list.insertAfter('stormy', 'night');
      expect(list._length).to.eq(4);
      expect(list.toArray).to.deep.equal('dark', 'and', 'stormy', 'night');
    });
  });

  describe('.distance', function(){
    beforeEach(function(){
      list.push("hello")
      list.push("pizza")
      list.push("world")
      list.push("today")
      list.push("tomorrow")
    });

    it.skip('should calculate distance between nodes', function(){
      expect(list.distance("hello", "today")).to.eq(3);
      expect(list.distance("pizza", "today")).to.eq(2);
      expect(list.distance("hello", "world")).to.eq(2);
      expect(list.distance("hello", "tomorrow")).to.eq(4);
      expect(list.distance("world", "today")).to.eq(1);
    });
  });
});
