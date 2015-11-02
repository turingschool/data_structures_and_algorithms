## Hash Array Mapped Trie

A Hash Array Mapped Trie (HAMT) is a data structure for implementing
a traditional Hash-Map on top of a Trie rather than a traditional
Array-based Hash-Table. The structure is more complex than
a simple Hash Table, but provides a few key benefits, including:

* Ability to grow the map indefinitely without re-sizing or chaining
* Ability to share repeated structure between multiple maps to allow
for cheap copying

This last property makes it especially interesting from the perspective
of immutability, which is why Rich Hickey used it as the [foundation](https://github.com/clojure/clojure/blob/master/src/jvm/clojure/lang/PersistentHashMap.java)
for many of the immutable collection data structures in Clojure.

The data structure was invented by Phil Bagwell, and you
can find the original paper on it [here](http://lampwww.epfl.ch/papers/idealhashtrees.pdf).

### HAMT Structure

To implement this data structure, we'll rely on a few key
tools:

1. A Hashing Algorithm for uniquely differentiating pieces of data.
Many languages already provide this -- in Ruby you can access an
object's hashcode by calling `#hash` on it, or you can use a hashing function
like the `SHA1` implementation including in the `digest` library.
2. A trie with very high branching factor -- this lets us store lots
of data in a very shallow (and speedy) structure.
3. Bitwise operations to "consume" the data's hash code in small chunks,
turning a hash code into a "path" to the data's location in the trie.

So what does all this look like in practice? Let's look at
an example creating a HAMT of order 32.

Within the trie, each level can store 3 things:

1. A key
2. An associated value
3. Connections to up to 32 nested child trees

When we want to insert a key-value pair, we'll use the key's
hash code to choose a path through the trie until we find
an empty position to insert it.

For retrieval, we simply do the same thing in reverse -- hash
the key, find the pathway through the trie represented by
this hashcode, and check tree nodes until we either find the
desired key or "bottom out" at the end of the tree.

### Insertion Algorithm

Let's walk through the insertion process in more detail.

To insert a piece of data, we need to find an appropriate path
in the trie in which to place it. As we'll see, this path
is ultimately determined by the key's hash value.

As we walk down the trie, we'll be looking for 3 possible cases:

1. The current trie node is empty, so we can insert our new key
and value here
2. The current trie node is not empty, but its key is equal
to the one we are trying to insert, so we can overwrite its value
3. The current trie node is not empty, and its key value is not
equal to ours, so we need to go deeper in the trie.

#### Insertion Case 1

Consider inserting a new K/V pair into an empty trie.
We'll insert the key "pizza" with the value "yum".
Our trie is empty so far, so the root tree node has no
key and value, so we can insert our pair there.

Pretty easy so far.

#### Insertion Case 2

Let's get the second easy case out of the way -- overwriting
that K/V pair. We can insert the key "pizza" again,
this time with the value of "real yum".

We find that the root node is not empty, but its key is equal to
the one we're trying to insert, so we simply change the value.

Also pretty easy.

#### Insertion Case 3

Here is where things start to get more interesting.

Let's insert the key "calzone" with the value "aw yiss".

We first check the current (root) node -- it does have a
key and value, and the key is *not* the one we're trying
to insert. We need to go deeper into the trie to find
a place for our new pair.

To insert a piece of data, we first need to generate its
hash value. Again, in Ruby, we can use one of the hashing
functions included in the Digest library. This gives us a (large) numeric
value representing a unique digest of that piece of data.

For example:

```
[1] pry(main)> require "digest"
=> true
[2] pry(main)> Digest::SHA1.hexdigest("pizza").to_i(16)
=> 179405067335283640084579532467505022408577155607
```

To walk the trie and an appropriate location for this element,
we'll "consume" this hash-code in 5-bit chunks.

Why 5 bits at a time?

This is determined by the branching factor of the tree
-- with an order-32 trie, we have 32 possible children from each
node in the tree. A 5-bit hash-code chunk allows us to concisely
represent all 32 possible child branches using a single bitmap.
(`2 ** 5 == 32`)

To get the numeric value of the first 5 bits of our hashcode,
we can bitwise AND it with a 5-bit number containing all "on" bits:

```
[13] pry(main)> 31.to_s(2)
=> "11111"
[14] pry(main)> Digest::SHA1.hexdigest("pizza").to_i(16) & 31
=> 23
```

This tells us that the "right-most" 5 bits of the number
179405067335283640084579532467505022408577155607 ("pizza"'s hash code)
are `10111`, or 23.

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


