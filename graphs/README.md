## Graphs and Graph Algorithms

The term "graph" refers to a large family of data structures that appear
frequently in computer science. At a deeper level a graph is a mathematical
concept that has to do with modeling pieces of data and connections between
them.

Since we often deal with systems that can be modeled in this way (groups of
nodes with various connections between them), graphs can be a useful data
structure with a variety of applications.

### Terminology

There are a lot of general terms that get thrown around when discussing graphs,
so let's run through some of them.

* __Vertices:__ These are the "points" in a graph. We'll often want to treat them as a
  composite data type that wraps some other piece of data, similar to nodes in a binary
  tree or linked list.

* __Edges:__ Edges are the connections between vertices. Mathematically we might say they
  are a "set" unto themselves (in addition to the "set" of vertices which contain the graph's
  data), but in programming we would often represent them as object references.

* __Adjacency:__ 2 vertices are adjacent if there is an edge connecting them.

* __Graph:__ A data structure consisting of a set of Vertices and a set of Edges. Useful for
  modeling data where there are connections between different pieces of data.

* __Loop:__ An edge connecting a vertex to itself

* __Degree:__ The Degree of a vertex is the number of edges connecting to it. A self loop
  counts twice.

### Represeting Graphs

There are a lot of ways to represent a graphs, but they largely fall into 2 categories -- textual/mathematical
and graphical.

When representing a graph graphically, it's common to represent vertices as circles containing identifiers
and edges as lines between them. An unconnected vertex would be floating on the side with no lines to it.

Here's one example:

![Graph](http://web.cecs.pdx.edu/~sheard/course/Cs163/Graphics/graph7.png)

When representing a graph textually, it's common to represent it as a set of vertices:

```
{1,2,3,4,5,6,7,8}
```

And a set of Edges representing connections between pairs of vertices:

```
 {(1,7), (2,6), (3,1), (3,5), (4,6), (5,4), (5,2), (6,8), (7,2), (7,8)}
```

Mathematically, a graph is often represented as 2 _sets_ -- one of edges and one of vertices.

### Graph Types

Within the broader family of "graphs", we'll often categorize individual graphs based on
various properties. Let's run through a few of these:

* __Undirected:__ A graph where edges point in both directions at once. An undirected graph `A <-> B`
  would allow you to traverse A to B _or_ B to A

* __Directed:__ A graph where edges point in only one direction. A directed graph `A -> B` would
  allow you to traverse from A to B but not from B to A.

* __Cyclic:__ A graph where a path exists from a vertex back to itself. This could be done via traversing
  multiple other vertices, or via a self-referential edge which points from the vertex back to itself.
  The opposite of a Cyclic graph would be an __Acyclic Graph__ -- no cycles exist.

* __Weighted:__ A graph where edges are labeled with an additional piece of data representing a "weight".
  This is often used to represent a graph where some edges are more costly to traverse than others
  (pathfinding with variable terrain, for example).

* __Regular:__ A graph where all vertices have the same degree -- i.e. every vertex has the same number
  of connections to other vertices

* __Connected:__ A graph where all vertices can be reached from any other vertex -- i.e. every vertex is
  connected via some sequence of edges. (Opposite would be a __Disconnected Graph__)

* __Strongly Connected:__ A graph where every vertex is reachable from every other vertex.

### Categorizing a Graph

An example graph can often be categorized across several of the types mentioned above.

For example a graph could be Cyclic and Directed, or Undirected and Weighted. Many of
the graphs graphs we interact with in computer science fall into a few common categories.
Let's look at some of them:

* Undirected Weighted Graph (e.g. terrain, map)
* Directed Acyclic Graph (e.g. git history, spreadsheets, resource dependency tracking)
* Directed Acyclic Regular Graph with Degree 1
* Directed Acyclic Regular Graph with Degree 2

### Programming Challenges

In the context of Graph manipulation, there are a number of common programming
challenges we can look at. A few topics include:

* Detecting Cycles -- Can we envision an algorithm for traversing a graph and determining if any
  "cycles" exist?
* Detecting Connectivity -- Given a set of edges and set of vertices, are all vertices connected?
* Minimum "Cuts" to Disconnect -- Given a connected graph, what is the minimum set of cuts we could
  make to disconnect it.
* Shortest/Least Expensive Path -- Find the shortest path between 2 vertices in the graph. Often using
  a search algorithm like Breadth-First-Search. To account for variably expensive moves, add weights
  and use an algorithm like Dijkstra's Algorithm to find the least expensive path.

### More Reading

* [Princeton Intro to Graph Theory](https://www.cs.princeton.edu/courses/archive/fall06/cos341/handouts/graph1.pdf)
* [Project Euler problem 107](https://projecteuler.net/problem=107)
* [Project Euler problem 79](https://projecteuler.net/problem=79)
* [Euler 79 Discussion](http://alexmic.net/password-derivation-project-euler/)
* [Cycle Detection](http://www.geeksforgeeks.org/detect-cycle-in-a-graph/)
* [Shortest Path](http://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/)
