describe('TreeNode', function(){
    it('should have data', function() {
      var node = new TreeNode(0);
      expect(node.data).to.eq(0);
    });

    xit('should have a default null value for left and right nodes', function(){
      var node = new TreeNode(0);
      expect(node.left).to.eq(null);
      expect(node.right).to.eq(null);
    });

    xit('can have a left node', function(){
      var node1 = new TreeNode(1);
      var node2 = new TreeNode(0, node1);
      expect(node2.left.data).to.eq(1);
    });

    xit('can assign a right node', function(){
      var node1 = new TreeNode(1);
      var node2 = new TreeNode(0, null, node1);
      expect(node2.right.data).to.eq(1);
    });
});

describe('BST', function() {
  var tree;

  beforeEach(function(){
    tree = new BST();
  });

  context('when list is empty', function(){
    xit('rootNode is null', function(){
      expect(tree.rootNode).to.eq(null);
    });
  });

  describe('.push', function(){
    // push adds a datum to the tree. In order to
    // provide a nicer interface, we will accept raw numbers as inputs to
    // push, and handle wrapping the data in a Node internally
    context('when the tree is empty', function(){
      xit('creates a new root node', function(){
        tree.push(1);
        expect(tree.rootNode instanceof TreeNode).to.be.true;
        expect(tree.rootNode.data).to.eq(1)
      });
    });

    context('when tree has only a rootNode', function(){
      xit('smaller data is added to the left', function(){
        tree.push(5);
        expect(tree.rootNode.data).to.eq(5);
        tree.push(4);
        expect(tree.rootNode.data).to.eq(5);
        expect(tree.rootNode.left instanceof TreeNode).to.eq(true, 'left node not set');
        expect(tree.rootNode.left.data).to.eq(4);
        expect(tree.rootNode.right).to.eq(null);
      });

      xit('larger data is added to the right', function(){
        tree.push(5);
        expect(tree.rootNode.data).to.eq(5);
        tree.push(6);
        expect(tree.rootNode.data).to.eq(5);
        expect(tree.rootNode.right instanceof TreeNode).to.eq(true, 'right node not set');
        expect(tree.rootNode.right.data).to.eq(6);
        expect(tree.rootNode.left).to.eq(null);
      });

      xit('data equal to the rootNode is added to the left', function(){
        tree.push(5);
        expect(tree.rootNode.data).to.eq(5);
        tree.push(5);
        expect(tree.rootNode.left instanceof TreeNode).to.eq(true, 'left node not set');
        expect(tree.rootNode.left.data).to.eq(5);
        expect(tree.rootNode.right).to.eq(null);
      });
    });

    context('when there are multiple nodes', function(){
      xit('continues adding smaller data to the left down the tree', function(){
        tree.push(5);
        tree.push(4);
        tree.push(3);
        expect(tree.rootNode.data).to.eq(5, 'rootNode was not set correctly');
        expect(tree.rootNode.left.data).to.eq(4, 'first node to the left not set correctly');
        expect(tree.rootNode.left.left.data).to.eq(3, 'last node to the left not set correctly');
      });

      xit('continues adding larger data to the left down the tree', function(){
        tree.push(5);
        tree.push(6);
        tree.push(7);
        expect(tree.rootNode.data).to.eq(5, 'rootNode was not set correctly');
        expect(tree.rootNode.right.data).to.eq(6, 'first node to the right not set correctly');
        expect(tree.rootNode.right.right.data).to.eq(7, 'last node to the right not set correctly');
      });

      xit('creates a tree structure with multiple nodes', function(){
//                   Node(1)
//                   /
//               Node(2)
//              /    \
//             /      Node(3)
//        RootNode(4)
//             \      Node(5)
//              \    /
//               Node(6)
//                  \
//                  Node(7)
        tree.push(4);
        tree.push(6);
        tree.push(7);
        tree.push(2);
        tree.push(3);
        tree.push(5);
        tree.push(1);

        expect(tree.rootNode.data).to.eq(4)

        expect(tree.rootNode.left.data).to.eq(2);
        expect(tree.rootNode.right.data).to.eq(6);

        expect(tree.rootNode.left.left.data).to.eq(1);
        expect(tree.rootNode.left.right.data).to.eq(3);

        expect(tree.rootNode.right.left.data).to.eq(5);
        expect(tree.rootNode.right.right.data).to.eq(7);
      });
    });
  });

  describe('.find', function(){
    context('in an empty tree', function(){
      xit('returns null', function(){
        expect(tree.find(6)).to.eq(null);
      });
    });

    context('in a tree with 1 node', function(){
      beforeEach(function(){
        tree.push(5);
      });

      xit('can find a match', function(){
        var result = tree.find(5);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(5);
      });

      xit('returns null if no match', function(){
        var result = tree.find(80);
        expect(result).to.eq(null);
      });
    });

    context('in a complex tree', function(){
      beforeEach(function(){
        //                   Node(1)
        //                   /
        //               Node(2)
        //              /    \
        //             /      Node(3)
        //        RootNode(4)
        //             \      Node(5)
        //              \    /
        //               Node(6)
        //                  \
        //                  Node(7)
                tree.push(4);
                tree.push(6);
                tree.push(7);
                tree.push(2);
                tree.push(3);
                tree.push(5);
                tree.push(1);
      });

      xit('can find the root', function(){
        var result = tree.find(4);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(4);
      });

      xit('can find results to the immediate left', function(){
        var result = tree.find(2);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(2);
      });

      xit('can find results to the far left', function(){
        var result = tree.find(1);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(1);
      });

      xit('can find results to the immediate right', function(){
        var result = tree.find(6);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(6);
      });

      xit('can find nested results', function(){
        var result = tree.find(5);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(5);

        var result = tree.find(3);
        expect(result instanceof TreeNode).to.eq(true, 'is not returning a TreeNode');
        expect(result.data).to.eq(3);
      });

      xit('can return null if none found', function(){
        var result = tree.find(80);
        expect(result).to.eq(null);
      });
    });
  });

  describe('.toArray', function(){
    context('with an empty tree', function(){
      xit('returns an empty array', function(){
        expect(tree.toArray()).to.deep.eq([]);
      });
    });

    context('with nodes', function(){
      xit('pulls data from the tree into an array, starting with the left branches of the tree', function(){
        tree.push(5);
        tree.push(4);
        tree.push(6);
        tree.push(7);
        tree.push(3);
        expect(tree.toArray()).to.deep.eq([5,4,3,6,7]);
      });
    });
  });

  describe('.sort', function(){
    context('with an empty tree', function(){
      xit('returns an empty array', function(){
        expect(tree.sort()).to.deep.eq([]);
      });
    });

    context('with nodes', function(){
      xit('returns a sorted array of tree elements', function(){
        tree.push(5)
        tree.push(4)
        tree.push(6)
        tree.push(7)
        tree.push(3)
        tree.push(2)
        tree.push(2102)
        expect(tree.sort()).to.deep.eq([2,3,4,5,6,7,2102]);
      });
    });
  });

  describe('.min and .max', function(){
    // note that given the inherent left/right structure of a binary search tree
    //it is possible to find the min or max elements without searching the entire tree
    context('with an empty tree', function(){
      xit('min returns null', function(){
        expect(tree.min()).to.eq(null);
      });

      xit('max returns null', function(){
        expect(tree.max()).to.eq(null);
      });
    });

    context('with nodes', function(){
      beforeEach(function(){
        //                   Node(1)
        //                   /
        //               Node(2)
        //              /    \
        //             /      Node(3)
        //        RootNode(4)
        //             \      Node(5)
        //              \    /
        //               Node(6)
        //                  \
        //                  Node(7)
                tree.push(4);
                tree.push(6);
                tree.push(7);
                tree.push(2);
                tree.push(3);
                tree.push(5);
                tree.push(1);
      });

      xit('finds the min value', function(){
        expect(tree.min()).to.eq(1);
      });

      xit('finds the max value', function(){
        expect(tree.max()).to.eq(7);
      });
    });
  });

  describe('.postOrdered', function(){
    context('with an empty tree', function(){
      xit('returns an empty array', function(){
        expect(tree.postOrdered()).to.deep.eq([]);
      });
    });
    context('with a complex tree', function(){
      // post_order should return the elements of the tree from a 'bottom-up' perspective,
      // starting at the bottom-left-most element, then working right, and then progressively
      // up the tree
      // so, for example the tree:
      //       4
      //      / \
      //     2   5
      //   / \
      //  1   3
      // should produce post_ordered output [1,3,2,5,4]
      xit('should give back elements in post-order', function(){
        tree.push(4);
        tree.push(2);
        tree.push(5);
        tree.push(1);
        tree.push(3);
        expect(tree.postOrdered()).to.deep.eq([1,3,2,5,4]);
      });
    });
  });
});
