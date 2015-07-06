## Bloom Filters

### Background

A [Bloom Filter](https://en.wikipedia.org/wiki/Bloom_filter) is a special-purpose
data structure used to store _sets_ of data and determine if a given element is
present in the set.

There are other data structures we could use for this purpose (Hash Maps or Sets come to mind),
but Bloom Filters are particularly useful due to their space consumption properties.
A Bloom Filter containing a given number of elements will consume much less space
than a HashMap or Set containing the same elements.

This is possible because Bloom Filters are a _probabilistic_ data structure -- they
can tell you that an item is _probably in_ the set or that it is _definitely not in_ the set,
but not that it is _definitely in_ the set. In other words, a Bloom Filter can
sometimes give false positives, but never false negatives.

This may sound silly at first, but in many applications, this type of behavior is actually
perfectly acceptable, and if you can get by with "probable inclusion" in an application,
you can take advantage of the great space savings a bloom filter provides.

### Construction

To see how a Bloom Filter derives these properties, let's look at how one is constructed.

A Bloom Filter is built on 2 main principles:

1. Bit Vector to represent the set of words
2. Collection of 2 or more hash functions for computing attribute presence

Instead of using a more sophisticated storage mechanism like an array, a Bloom Filter
uses a simple "bit vector" -- simply a binary integer which we will treat as a
collection of 0/1 bits rather than as a single composite number.

However to keep things a bit simpler, we can also represent the vector
as a simple array of 8 0's.

Let's imagine a simple 8-element array with no items in the set:

```
set = [0,0,0,0,0,0,0,0]
```

To add an element to the set, we'll use our hashing functions to generate
`n` different hashes for the target string. For simplicity, we'll use MD5,
SHA1, and SHA2:

```
require "digest"
element = "pizza"
d1 = Digest::MD5.hexdigest(element)
d2 = Digest::SHA1.hexdigest(element)
d3 = Digest::SHA2.hexdigest(element)
```

Each of these digests will give us a hexadecimal number representing a hash
value of our input.

Next we need to convert these hexadecimal digests into numbers, and modulo
those numbers by the length of the bit array.

```
index1 = d1.hex % set.length
=> 0
index2 = d2.hex % set.length
=> 7
index3 = d3.hex % set.length
=> 6
```

Now, as a final insertion step, we need to toggle "on" all of the bits
at these positions:

```
set[index1] = 1
set[index2] = 1
set[index3] = 1
```

At this point our "set" will look like:

```
[1, 0, 0, 0, 0, 0, 1, 1]
```

Now, to determine if an element is in the set, we would reverse the process,
computing the hashes and vector indices, and determining whether these indices
are present in the vector (set to "1").

### Challenges

1. Implement a `BloomFilter` class which we can instantiate, `#add` elements to, and check for `#presence?` of an element
2. Implement the `BloomFilter` using a bit vector instead of an array
3. Customize your filter to accept a variable size argument for the size of the bit vector.
4. Implement logic for detecting false positives in the filter. How does the number of false
positives change as we change the size of the storage vector.

### More Reading:

* https://www.jasondavies.com/bloomfilter/
* http://billmill.org/bloomfilter-tutorial/
