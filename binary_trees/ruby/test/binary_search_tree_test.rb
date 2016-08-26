gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'minitest/spec'
require_relative '../lib/binary_search_tree'

describe Node do
  # A Node represents a location in the binary tree
  # It holds data and includes a reference to its left and right nodes

  it "has data" do
    assert_equal 0, Node.new(0).data
  end

  it "has a left node" do
    skip
    assert_equal 1, Node.new(0, Node.new(1)).left.data
  end

  it "has a right node" do
    skip
    assert_equal 2, Node.new(0, nil, Node.new(2)).right.data
  end
end

describe BinarySearchTree do
  before do
    @tree = BinarySearchTree.new
  end
  describe "#root_node" do
    it "is nil for an empty list" do
      skip
      assert_nil BinarySearchTree.new.root_node
    end

    it "adds a new root node when pushed" do
      skip
      @tree.push(1)
      assert_equal 1, @tree.root_node.data
    end
  end

  describe "#push" do
    # push adds a datum to the tree. In order to
    # provide a nicer interface, we will accept raw numbers as inputs to
    # push, and handle wrapping the data in a Node internally
    it "adds data smaller than the root node to the left of the root" do
      skip
      @tree.push(5) #root
      @tree.push(4)
      assert_equal 4, @tree.root_node.left.data
    end

    it "adds data equal to the root node to the left of the root" do
      skip
      @tree.push(5) #root
      @tree.push(5)
      assert_equal 5, @tree.root_node.left.data
    end

    it "adds data larger than the root node to the right of the root" do
      skip
      @tree.push(5) #root
      @tree.push(7)
      assert_equal 7, @tree.root_node.right.data
    end

    it "continues adding smaller data to the left down the tree" do
      skip
      @tree.push(5) #root
      @tree.push(4)
      @tree.push(3)
      assert_equal 3, @tree.root_node.left.left.data
    end

    it "continues adding larger data to the right down the tree" do
      skip
      @tree.push(5) #root
      @tree.push(6)
      @tree.push(7)
      assert_equal 7, @tree.root_node.right.right.data
    end
  end

  describe "#count" do
    # count tells us the number of nodes in the tree
    it "is 0 for an empty tree" do
      skip
      assert_equal 0, @tree.count
    end

    it "is 1 for a tree with a root node" do
      skip
      @tree.push(5)
      assert_equal 1, @tree.count
    end

    it "continues to count elements as they are added" do
      skip
      @tree.push(6)
      @tree.push(4)
      @tree.push(3)
      @tree.push(2)
      assert_equal 4, @tree.count
    end
  end

  describe "#include?" do
    # include? tells us whether a piece of data exists in the tree
    it "is false for an empty tree" do
      skip
      assert_equal false, @tree.include?(5)
    end

    it "is true for the data of the root node" do
      skip
      @tree.push(4)
      assert_equal true, @tree.include?(4)
    end

    it "finds data lower in the tree" do
      skip
      @tree.push(4)
      @tree.push(6)
      @tree.push(3356)
      @tree.push(1)
      assert_equal true, @tree.include?(6)
      assert_equal true, @tree.include?(3356)
      assert_equal false, @tree.include?(11111)
      assert_equal true, @tree.include?(1)
    end
  end

  describe "#to_array" do
    it "is empty for empty tree" do
      skip
      assert_equal [], @tree.to_array
    end

    it "pulls data from the tree into an array, starting with the left branches of the tree" do
      skip
      @tree.push(5)
      @tree.push(4)
      @tree.push(6)
      @tree.push(7)
      @tree.push(3)
      assert_equal [5,4,3,6,7], @tree.to_array
    end
  end

  describe "#sort" do
    it "returns empty array for empty tree" do
      skip
      assert_equal [], @tree.sort
    end

    it "returns a sorted array of the tree elements" do
      skip
      @tree.push(5)
      @tree.push(4)
      @tree.push(6)
      @tree.push(7)
      @tree.push(3)
      @tree.push(2)
      @tree.push(2102)
      assert_equal [2,3,4,5,6,7,2102], @tree.sort
    end
  end

  describe "#min" do
    # note that given the inherent left/right structure of a binary search tree
    # it is possible to find the min or max elements without searching the entire tree
    it "is nil for an empty tree" do
      skip
      assert_nil @tree.min
    end

    it "finds the minimum value in the tree" do
      skip
      @tree.push(5)
      @tree.push(4)
      @tree.push(6)
      @tree.push(7)
      @tree.push(3)
      @tree.push(1)
      assert_equal 1, @tree.min
    end
  end

  describe "#max" do
    # note that given the inherent left/right structure of a binary search tree
    # it is possible to find the min or max elements without searching the entire tree
    it "is nil for an empty tree" do
      skip
      assert_nil @tree.max
    end

    it "finds the maximum value in the tree" do
      skip
      @tree.push(5)
      @tree.push(4)
      @tree.push(6)
      @tree.push(7)
      @tree.push(3)
      @tree.push(1)
      assert_equal 7, @tree.max
    end
  end

  describe "#post_ordered" do
    # post_order should return the elements of the tree from a 'bottom-up' perspective,
    # starting at the bottom-left-most element, then working right, and then progressively
    # up the tree
    # so, for example the tree:
    #        4
    #       / \
    #      2   5
    #     / \
    #    1   3
    # should produce post_ordered output [1,3,2,5,4]

    it "should be empty for empty tree" do
      skip
      assert_equal [], @tree.post_ordered
    end

    it "should give back elements in post-order" do
      skip
      @tree.push(4)
      @tree.push(2)
      @tree.push(5)
      @tree.push(1)
      @tree.push(3)

      assert_equal [1,3,2,5,4], @tree.post_ordered
    end
  end

  describe "#min_height" do
    it "is 0 for empty tree" do
      skip
      assert_equal 0, @tree.min_height
    end

    it "is 1 for tree with root node only" do
      skip
      @tree.push(1)
      assert_equal 1, @tree.min_height
    end

    it "finds shortest path from root node to a leaf" do
      skip
      #        4
      #       / \
      #      2   6
      #     / \
      #    1   3
      @tree.push(4)
      @tree.push(2)
      @tree.push(1)
      @tree.push(3)
      @tree.push(6)
      assert_equal 2, @tree.min_height
    end
  end

  describe "#max_height" do
    it "is 0 for empty tree" do
      skip
      assert_equal 0, @tree.max_height
    end

    it "is 1 for tree with root node only" do
      skip
      @tree.push(1)
      assert_equal 1, @tree.max_height
    end

    it "finds shortest path from root node to a leaf" do
      skip
      #        4
      #       / \
      #      2   6
      #     / \
      #    1   3
      @tree.push(4)
      @tree.push(2)
      @tree.push(1)
      @tree.push(3)
      @tree.push(6)
      assert_equal 3, @tree.max_height
    end
  end

  describe "#balanced?" do
    # A binary tree is balanced if its max depth and min depth are within
    # 1 of each other.
    it "is balanced for an empty tree" do
      skip
      assert @tree.balanced?
    end

    it "is balanced for a nice tidy tree" do
      skip
      #        4
      #       / \
      #      2   6
      #     / \  \ \
      #    1   3  5 7
      @tree.push(4)
      @tree.push(2)
      @tree.push(1)
      @tree.push(3)
      @tree.push(6)
      @tree.push(5)
      @tree.push(7)
      assert_equal 3, @tree.min_height
      assert_equal 3, @tree.max_height
      assert @tree.balanced?
    end

    it "is false for tightly ordered tree" do
      skip
      @tree.push(1)
      @tree.push(2)
      @tree.push(3)
      @tree.push(4)
      refute @tree.balanced?
    end
  end

  describe "#balance!" do
    it "re-balances unbalanced tree" do
      skip
      @tree.push(1)
      @tree.push(2)
      @tree.push(3)
      @tree.push(4)
      refute @tree.balanced?
      @tree.balance!
      assert @tree.balanced?
    end

    it "balances without removing elements from the tree" do
      skip
      @tree.push(1)
      @tree.push(2)
      @tree.push(3)
      @tree.push(4)
      assert_equal [1,2,3,4], @tree.sort
      @tree.balance!
      assert_equal [1,2,3,4], @tree.sort
    end
  end
end
