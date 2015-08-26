## Tries

A Trie is a type of branching data structure often used for storing
and querying words within a body of text. The name comes from the idea
of "Re__trie__val" -- a Trie is well suited for rapid retrieval of
a provided search string. Additionally, its organization as a tree
structure allows it to efficiently all "children" of a given substring,
making it ideally suited for predictive text applications.

### Visualizing a Trie

A Trie can be implemented as an N-ary tree, where the root node
is empty and all of its children represent the first characters
of the various strings contained in the trie. Consider this
very simple example storing the strings "cat", "dog", and "do":

```
        Root
      c/    \d
    node-()   node-()
      |a     |o
    node()  node-(do)
      |t     |g
  node-(cat)  node-(dog)
```

To search this Trie for cat or dog, we start from the root and
check each character in turn to see if it appears along a path
between the root and the leaves. If we tried to search for "catty"
we would run out of nodes along the "cat" path before we found all
of our characters, and thus could determine that "catty" does not
appear.

Additionally, we can see that some interior "nodes" in the trie serve only as branching or connection
points to valid nodes that exist further down in the structure (such as the "ca")
node.

Alternatively, some interior nodes also represent valid words in and of
themselves (e.g. the "do" node). Your trie implementation will likely
need some way to distinguish these types of interior nodes.

### Branching

A great thing about Tries is the ability to represent branching of
strings that share common prefixes. Let's add "car" and "dot" to our
Trie above:

```
        Root
      c/    \d
     node   node
     a|      |o
     node   node—————
   t/   \      \     \t
node-cat \r     \g   node-dot
       node-car  \
                 node-dog
```

Now, when searching, we would encounter branches at the "c-a" or "d-o"
points. Depending which string we are looking for, we could go left or
right.

### Node/Word Storage

In these diagrams we've been representing nodes as containing the word
that they represent, but in a proper Trie structure, nodes don't
actually contain data. Rather, the data a node represents can be
inferred from the path that was used to reach it (so if we reach a node
by walking d-o-g, we know already that the node represents "dog" without
having to label it as such).

For a node to be a terminating (leaf) node, it must represent the result
of a valid path through the Trie (i.e. a valid word). For intermediate
(interior) nodes that represent valid words (e.g. "d-o" on the way to
"d-o-g"), they will need to be labeled or marked in some way.


### Challenge -- Tries for Text Prediction

A common real-word use-case for tries is doing word prediction,
such as the auto-completion on your smartphone.

See if you can complete a trie data structure that will
allow us to fulfill a basic version of this feature.
We'd like to provide an interface along the lines of:

```
t = Trie.new
input_words.each do |w|
  t.insert(w)
end

t.suggest("piz")
=> ["pizza", "pizzeria", "pizzicato"]
```
