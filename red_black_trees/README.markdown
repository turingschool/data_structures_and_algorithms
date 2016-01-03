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

So why is a Red-Black tree named as such?

In order for the tree to self balance it needs a general understanding of its nodes. Color coding each as red or black (pink/green if you want to fight the power!) serves this purpose.

#### RB Tree Fundamentals

**Properties**

1. A node is either red or black.
2. The root is black. This rule is sometimes omitted. Since the root can always be changed from red to black, but not necessarily vice versa, this rule has little effect on analysis.
3. All leaves (NIL) are black.
4. If a node is red, then both its children are black.
5. Every path from a given node to any of its descendant NIL nodes contains the same number of black nodes. The uniform number of black nodes in the paths from root to leaves is called the black-height of the red–black tree.

Source: https://en.wikipedia.org/wiki/Red–black_tree

**Property overview**

 1. This is simplistic and can be represented by a bit (0 / 1) with in each node
 2. Simpler to implement if you just assume "Root must be black!!"
 3. In a normal Binary Search Tree leaves are typically nodes with values associated with them. RB trees also have leaves but they have a NIL value associated with them.
 4. This property combined with property 5 will determine the shape of the tree
 5. Unfortunately the definition above is pretty good (even though it is confusing). An example will hopefully give some context:

 ```
x = NIL(B)

            5(B)
           /   \
        4(R)   6(R)
       /  \    /   \
      x    x   x     x   
 ```
In the valid tree above the root would have a black height of 1. The black height is the number of black nodes between the given node (root) and a descendant leaf. So if the left most path is taken the root would encounter 1 black node (which would be the leaf itself). Property 5 asserts on that all of the paths from the said node (our case the root) must have the same number of black node encounters. So for all four paths the root can take to the leaves the black height must be one in order for it to be a valid RB tree

The combination of properties 4 and 5 force the tree to be about balanced on both sides.  

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
3. Otherwise, insert `N` into the tree as with a normal BST and make it red

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
arrangements of our tree when we have inserted a new node.
Again, we have to subdivide these into 2 sub-groups of cases,
depending on the color of the aunt nodes.

1. Aunt/Uncle node is Red
2. Aunt/Uncle node is Black

#### Aunt/Uncle Node is Red Subcase

In this case just recoloring can be implemented (no rotations needed!):

```
    5(B)
   /   \
  4(R) 6(R)
 /
3(R)
```
Property 4 will be violated sometimes a new node is inserted on the tree.
If the Aunt (Uncle) is red we can implement recoloring. Parent, Aunt and
Grandparent should each inverse their colors.

```
    5(R)
   /   \
  4(B) 6(B)
 /
3(R)
```
Depending on whether this is a subtree or the root it could violate property 2!
When it is the root feel free to recolor it to black. This will not violate
property 5.  


#### Aunt/Uncle Node is Black Subcases

In these cases, we need to
consider the tree from a perspective of 3 "generations" at a time:
the newly inserted node, `N`, the Parent / Uncle generation, and the
Grandparent generation.

For this generation configuration, we will see that we actually have
2 possible positions for our new node (also duplicated on the opposite side):

**Case One (aka Left-Left - `N` is left child of left child)**

```
    G(B)
   /    \
  P(R)  NIL(B)
 /
N(R)
```
NIL leaf and a node colored black are the same logic

**Case Two (aka Left-Right - `N` is right child of left child)**

```
    G(B)
   /   \
P(R)   NIL(B)
   \
    N(R)
```
NIL leaf and a node colored black are the same logic


####Solutions

**Solution One (aka Left-Left - `N` is left child of left child)**

```
Initial insertion

    G(B)
   /    \
  P(R)  NIL(B)
 /
N(R)

Rotate G(B) right

    P(R)
   /    \
  N(R)  G(B)
          \
          NIL(B)

Recolor

    P(B)
   /    \
  N(R)  G(R)
          \
          NIL(B)

```

**Solution Two (aka Left-Right - `N` is right child of left child)**

```
Initial insertion

    G(B)
   /    \
  P(R)  NIL(B)
   \
   N(R)

Rotate P(R) left

    G(B)
   /    \
  N(R)  NIL(B)
 /
P(R)


Rotate G(B) right

    N(R)
   /    \
  P(R)  G(B)
          \
          NIL(B)

Recolor

    N(B)
   /    \
  P(R)  G(R)
          \
          NIL(B)

```

__Implementation Tips and Tricks__

1. After case one or case two no properties should be violated
2. Recolor can recurse its way up the tree (to a rotate if needed)
3. BST functionality is useful to build before building RBT functionality


Insertion cases writeup: http://www.geeksforgeeks.org/red-black-tree-set-2-insert/

Insertion cases video: https://www.youtube.com/watch?v=g9SaX0yeneU

Better visual representation of rotations: http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/video-lectures/lecture-10-red-black-trees-rotations-insertions-deletions/lec10.pdf
