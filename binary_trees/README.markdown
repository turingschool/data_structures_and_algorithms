## Binary Search Trees

A binary search tree is a fundamental data structure useful for organizing large sets of data.

More on Wikipedia: http://en.wikipedia.org/wiki/Binary_search_tree

### Overview

A binary tree is built from *nodes*. Each node has:

* A) An element of data
* B) A link to the *left*. All nodes to the left have data elements less/lower than this node's data element.
* C) A link to the *right*. All nodes to the right have data elementes more/greater than this node's data element.

### Searching

Your implementation should be able to confirm or deny the presence of a piece of data in the list.

#### Balancing

The worst case binary tree comes from a list that's already sorted before insertion to the tree. How can you avoid that problem?

### Sorting

### Implementation Tips

* Start with modeling a node
* Then attach one node to another
* Then attach multiple nodes together
* Then implement search when there's just a single node
* Then implement search for multiple nodes
* Then implement sorted output for a single node
* Then implement sorted output for multiple nodes
