## Hash Array Mapped Trie

A Hash Array Mapped Trie (HAMT) is a specialized type
of trie data structure. It can be used for a variety of
things, but is especially well-suited as an alternative
for traditional Hash-Tables when implementing a Hash-Map.

The data structure was invented by Phil Bagwell, and you
can find the original paper on it [here](http://lampwww.epfl.ch/papers/idealhashtrees.pdf).

### HAMT Structure

To implement this data structure, we'll rely on a few key
tools:

1. A Hashing Algorithm for uniquely differentiating pieces of data.
Many languages already provide this -- in Ruby you can access an
object's hashcode by calling `#hash` on it.
2. A trie with very high branching factor -- this lets us store lots
of data in a very shallow (and speedy) structure.
3. Bitwise operators to "consume" the hash value in small chunks
at a time, allowing us to quickly find a unique place in our trie
for a new piece of data using only a few comparisons

So what does all this look like in practice? Let's look at
an example creating an HAMT of order 32.

To insert a piece of data, we first need to generate its
hash value. Again, in Ruby, you can get this using the
`Object#hash` method.

To insert the data, we'll be gradually consuming this hash-code
in 5-bit chunks as we work our way down the tree. Why 5 bits
at a time? This is determined by the branching factor of the tree
-- with an order-32 trie, we have 32 possible children from each
node in the tree. A 5-bit hash-code chunk allows us to concisely
represent all 32 possible child branches using a single bitmap.

Now, we will work our way down from the top of the tree, looking
for one of 2 things:

* __a)__ - We find an empty spot in the tree, and can insert our
new key/value pair there
* __b)__ - We find a collision between the K/V we are trying to insert
and an existing key/value. In this case, we need to overwrite
the value of the existing node

### TODO - notes and Remaining Q's

* How to determine genuine collisions (overwrite the key) vs. initial collisions
(keep consuming hashcode slices to find appropriate slot) -- compare
literal key equivalence
* Hashcode size -- does it matter? Paper refers to 32-bit hashes but
seems like any size should work
* Extension - structural sharing / immutable copying
* List of operations - set, get, keys?, vals?, get-in

__optional -- shortening hashes__

In ruby, hash-codes are 64-bit, so we'll just use the least-significant
32 bits. You can capture these from a hash code with the bitwise
`&` operator:

```
# Take the bitwise union of our hash code and the largest
# 32-bit number
"pizza".hash & (2**32 - 1)
```

In short, a HAMT uses a high-branch-factor trie (ours will have a
branching factor of 32) to organize a large amount of data in
a shallow trie structure. Additionally, it uses a Hashing algorithm
to differentiate between unique pieces of data.


