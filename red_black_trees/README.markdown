### Red/Black Binary Trees

* Subtype of Binary Tree
* Trying to solve the problem of worst-case / guaranteed performance

#### Worst-case Binary Trees

* Inserting ordered data:

```
1
 \
  2
   \
    3
     \
      4
```

* Inserting reverse-ordered Data:

```
      4
     /
    3
   /
  2
 /
1
```

* Inserting ordered data alternating between first / last

```
  1
   \
    6
   /
  2
   \
    5
   /
  3
   \
    4
```

In each of these cases, we can see that the order of the data
causes us to lose the crucial branching factor which makes
binary trees efficient.

In fact, we end up with a "directed graph of order 1"... i.e. a
Linked List.

#### Solving the problem

One solution to the problem is to periodically stop and re-balance
the tree. This is partly why balancing is such an interesting
and important operation for trees.

However doing a lengthy re-balance can sometimes be very costly.
It would be ideal if we could ensure our tree remained balanced
in the first place by doing small, incremental re-balancing
as we go.

This is exactly the problem a [Red-Black Tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree) solves.

#### RB Tree Coloring Conventions

#### RB Tree Insertion

Insertion is one of the crucial operations for an RBT, as this is
when we need to make the appropriate adjustments to keep the tree
balanced.

A rough algorithm for the insertion process is as follows

In fact, we can partly divide the insertion process into 2
steps -- standard insertion, followed by possible rotation
/ rebalancing.

__Node Creation / Insertion__

1. Create a new node `N` to hold the inserted piece of data
2. If the tree is empty, `N` will become the new root node, so
make it black
3. Otherwise, insert `N` into the tree as with a normal BST.

__Tree Rotation / Rebalancing__

Now, we need to check if the tree has remained balanced.
Possibly we will need to do some re-balancing, and there are,
unfortunately, quite a few possible cases that need to be
handled.

For this step, we'll often start out looking at a given
Node's "aunt"/"uncle". As in human geneology, the aunt node
of a given node is the sibling of its parent.

So in this example, we would say 6 is an uncle node of 3:

```
    5
   / \
  4   6
 /
3
```

__Aunt/Uncle Cases__

Now, we need to look at how to adjust the tree based on the various
arrangements of our tree.
Again, we have to subdivide these into 2 sub-groups of cases,
depending on the color of the aunt nodes.

1. Aunt node is Red
2. Aunt node is Black

#### Aunt Node is Black Subcases

In these cases, we need to
consider the tree from a perspective of 3 "generations" at a time:
the newly inserted node, `N`, the Parent / Uncle generation, and the
Grandparent generation.

For this generation configuration, we will see that we actually have
4 possible positions for our new node:

__Case One (aka Left-Left - `N` is left child of left child)__

```
    G
   / \
  P   A
 /
N
```

__Case Two (aka Left-Right - `N` is right child of left child)__

```
    G
   / \
  P   A
   \
    N
```

__Case Three (aka Right-Left - `N` is left child of right child)__

```
    G
   / \
  A   P
     /
    N
```

__Case Four (aka Right-Right - `N` is right child of right child)__

```
    G
   / \
  A   P
       \
        N
```

* 2a -
* 2b -
* 2c -
* 2d -

