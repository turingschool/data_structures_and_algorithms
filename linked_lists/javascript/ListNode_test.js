describe('ListNode', function() {
  it('should have a data property', function(){
    var node = new ListNode();
    expect(node).to.have.property('data');
  });

  it('should have data', function() {
    var node = new ListNode('info');
    expect(node.data).to.eq('info');
    var pizzaNode = new ListNode('pizza');
    expect(pizzaNode.data).to.eq('pizza');
  });

  it('should have a default empty nextNode', function() {
    var node = new ListNode('pizza');
    expect(node.nextNode).to.eq(null);
  });

  it('should allow setting a nextNode', function() {
    var n1 = new ListNode('pizza');
    var n2 = new ListNode('cats');
    n1.nextNode = n2;
    expect(n1.nextNode.data).to.eq('cats');
    expect(n1.nextNode instanceof ListNode).to.be.true;
  });

  it('should allow a next node argument on creation', function(){
    var node = new ListNode('pizza', new ListNode('cats'));
    expect(node.nextNode.data).to.eq('cats');
    expect(node.nextNode instanceof ListNode).to.be.true;
  });
});
