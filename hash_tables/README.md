## Hash Tables (aka Hash Maps)

A Hash Map is one of the most fundamental and commonly-used
collection data structures. An implementation appears in most
modern programming languages, and its versatility and performance
characteristics make it something of a "swiss army knife" of
data structures.

So why is a Hash Map (this, by the way, is where Ruby gets the name for its `Hash` class)
so powerful? As we will see, a Hash Map has 2 essential properties:

1. Ability to associate between arbitrary keys and arbitrary values
2. Ability to insert and retrieve values in constant time

### Associativity

So what do we mean by "associate"? We say a data structure
is associative when it allows us to define a relationship
between 2 values and retrieve one in response to the other.

We've actually already worked frequently with one fundamental
associative data structure: the __Array__.

Arrays define associative relationships between numeric indices and values contained in
the array -- if we want to look something up in an array,
we need to either know its numeric index so that we can go
directly to that position in the array, __or__ we have to
iterate through every element in the array and look at
each one to see if it's the element we want.

This is great if our data is ordered and if we are able to
consistently retrieve it by going directly to its numeric
index, but that isn't always the case.

I often want to associate between _arbitrary_ keys
and values (strings, objects, other arrays, etc)? For example, I want
to associate the string "pizza" with the value "awesome",
and I don't want to have to define an explicit ordering
in the process. Additionally, I want to be able to add a whole lot of keys and
values into the map and maintain a speedy lookup time.

This is where a Hash Table comes in.

### Hash Table Structure

To implement this data structure, we'll rely on a few key
tools:

1. A Hashing Algorithm for uniquely differentiating pieces of data.
Many languages already provide this -- in this example we'll look at
using the SHA-1 implementation included with Ruby's Digest library.
2. An internal array which we'll ultimately use to store data
3. An additional abstraction for handling "collisions" between
hashcodes within the data structure.

To some extent, a Hash Table is a bit of Data Structure "sleight of hand"
-- it allows us to translate arbitrary data (i.e. hash keys) into
numeric array indices, and thus take advantage of the speedy
index lookups we get out of the box with an array.

### Hash Function Basics

This ability to translate arbitrary data to numeric array
indices is the fundamental operation of a hash table, and
the Hashing function is what makes it possible.

Hash functions are a special type of algorithm designed
to turn arbitrarily long data into consistent-length
hash "digests" that represent that data.

Importantly, a good hash function will do several things:

1. Be fast (this is important to help us maintain our hash table performance)
2. Be 1-way (given the input you can generate the digest, but with the digest
there is no way to guess the input)
3. Be collision-resistant (it should be highly unlikely to find 2 inputs that
generate the same digest value)
4. Be consistent -- hashing the same value should always yield the same digest

Let's look at a ruby example using SHA-1:

```ruby
[13] pry(main)> require "digest"
=> true
[14] pry(main)> Digest::SHA1.hexdigest("pizza")
=> "1f6ccd2be75f1cc94a22a773eea8f8aeb5c68217"
```

Here I used SHA1 to hash the string "pizza" into a 40-character hexadecimal
digest number. One thing to note is that a SHA1 hash will always be 40 hexadecimal
digits (160 bits) -- this is true whether I hash the string "pizza" or the
entire contents of _War and Peace_.

Additionally keep in mind that the digest produced is actually a _number_. Ruby
happens to represent it for us in this example as a string of hexadecimal
characters, but we can convert it to its actual numeric value like so:

```
[14] pry(main)> Digest::SHA1.hexdigest("pizza")
=> "1f6ccd2be75f1cc94a22a773eea8f8aeb5c68217"
[15] pry(main)> Digest::SHA1.hexdigest("pizza").to_i(16)
=> 975987071262755080377722350727279193143145743181
```

We'll exploit this property of the hash digests in the next step.

### Hash Table Algorithm

So how does it work? In short, when creating a new Hash Table, we'll
allocate an internal array to actually store our data. Later on
we may introduce additional abstractions around Nodes, Elements, or Chains,
but an array will be the fundamental storage and access mechanism.

When asked to insert a Key/Value pair into the array, we need to
map it to a numeric index within our internal array. Here's where
we will leverage the hash function -- it produces a numeric
representation of the data in question (the digest). Our hash
table will use this numeric digest, modulo the length of our
array, to determine which spot the element should be inserted into.

Let's look at a rough example in ruby:

```ruby
require "digest"

table = Array.new(10) # 10-element hash table to start
key = "pizza"
value = "awesome"

digest = Digest::SHA1.hexdigest(key).to_i(16) # 179405067335283640084579532467505022408577155607
position = digest % table.length # 7

table[position] = value
```

The hashing function produces a numeric digest of our data,
and we use the array indices to map this to a numeric
position in the element list.

When we want to retrieve an element, we will follow the same
process, but simply read from that array index rather
than writing to it.

Congrats! You made a naive but somwewhat functional hash table.

### Handling Collisions

The example above gives us a good overview of the basic
concept of a hash table, but it leaves out an important
ingredient: resolving hash index collisions.

Most Hashing Functions are designed to be *collision resistant* --
that is, it should be relatively impossible to find 2 inputs that
hash to the same output.

However consider what would happen if we wanted to insert
the key "aardwolf" pointing at the value "strange critter".

"aardwolf" hashes to 582992241920298993175351113381634332712414316697,
which comes out to 7, modulo 10 -- the same as the "pizza" key we previously
inserted. With our current implementation, we don't have a way to distinguish
these keys.

The problem is that we aren't actually utilizing
the entire space of possible hash values (1461501637330902918203684832716283019655932542975
possibilities in the case of SHA1). Rather, the number of slots we have available is limited by the size
of the internal array we are using for data storage.

So the enormous
count of possibile values produced by our hash function gets reduced
down to a fairly small amount once we start mod-ing it by the length
of our table.

This illustrates 2 interesting points about a Hash Table:

1. Determining the initial size of the table is a trade-off
between efficient use of space and likelihood of collisions.
Using a very large table will likely end up in lots of unused spaces,
but we'll have a lower chance that 2 inputs hash to the same position.
2. Even with a large hash table collisions are still inevitable, so
a viable implementation needs to be able to handle these cases.

### Chaining

There are many ways to handle the collision problem, but they
generally fall into 2 camps:

1. Use a secondary data structure to allow each hash "bucket"
to contain multiple pairs of keys and values. Then when we retrieve
the bucket index for a given key, we can filter through the secondary
structure to find the specific K/V we're looking for.
2. Dynamically resize the table as it fills to avoid collisions by
creating additional space

In reality, many production implementations use some combination
of these approaches. For now we're going to discuss the first
approach, which is sometimes referred to as "Chaining" the hash
table.

The idea is relatively straightforward: Instead of simply dumping
values into the table indicies indicated by a key's hash value,
we will use each bucket to store a Linked List of table "nodes",
each containing a key, a value, and potential link to the next
node in the chain.

Thus when we insert a K/V pair, we have 2 possible cases:

1. This is the first pair to be inserted into that bucket,
so it becomes the "head" of the chain in that bucket.
2. There is already a chain in that bucket, so we need to
append this new pair to the tail of the existing chain.

Similarly, when retrieving values, we have 3 cases:

1. There is no value in the appropriate bucket (so our
key is not their)
2. There is a value in the appropriate bucket, and its
head node contains the key we are looking for. Thus we
can read the value from that node.
3. There is a value in the appropriate bucket, but the head
node does not contain the key we are looking for. Thus we need
to keep looking through nodes in this chain until we find
the key we're looking for. Reaching the tail without finding it means our
key is not there.

#### Chaining Drawbacks

Let's briefly discuss the pros and cons of this approach.

Pros:

* Flexible
* Can still start our table with relatively small number
of buckets

Cons:

* Additional complexity in insertion / lookup process
* Performance degrades as chain lengths grow

The key with the chaining approach is to make sure none of your
buckets get too big. We could in theory have a chained hash
table with 1 bucket, but obviously it would just become a
linked list with linear lookup time.

However if we can have a balance of a fairly large table
size with short chains of a handful of links each, our overall
lookup time will remain constant. This is why, as we mentioned,
more sophisticated implementations will generally use some combination
of chaining and dynamic resizing.

Another possible optimization includes using a more sophisticated
data structure such as a BST or Red-Black Tree for chaining within the buckets.
This allows the lookup time within each chain to be even faster.

This approach has lots of interesting applications, and starts
to blur the line between a traditional Hash Table and another
related data structure, the [Hash-Array Mapped Trie](https://github.com/turingschool/data_structures_and_algorithms/blob/master/hash_array_mapped_tries/README.markdown).
