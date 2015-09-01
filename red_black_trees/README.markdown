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
