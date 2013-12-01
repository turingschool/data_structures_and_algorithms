## Pathfinding with A\*

The A\* algorithm is a way of finding a path between two points of a graph or map.

### An Example Application

Imagine you have a character `C` who wants to move to the target `T`. Blank spaces on the map are traversable, but obstructions are marked as `O`:

```plain
     T  |
  OOOOO |
        |
OOOO    |
C       |
```

How can `C` move to `T` in the fewest steps? The A\* algorithm helps find a path.

### The Algorithm

In pseudocode:

```plain
function A*(start,goal)
    closedset := the empty set    // The set of nodes already evaluated.
    openset := {start}    // The set of tentative nodes to be evaluated, initially containing the start node
    came_from := the empty map    // The map of navigated nodes.

    g_score[start] := 0    // Cost from start along best known path.
    // Estimated total cost from start to goal through y.
    f_score[start] := g_score[start] + heuristic_cost_estimate(start, goal)
     
    while openset is not empty
        current := the node in openset having the lowest f_score[] value
        if current = goal
            return reconstruct_path(came_from, goal)
         
        remove current from openset
        add current to closedset
        for each neighbor in neighbor_nodes(current)
            tentative_g_score := g_score[current] + dist_between(current,neighbor)
            tentative_f_score := tentative_g_score + heuristic_cost_estimate(neighbor, goal)
            if neighbor in closedset and tentative_f_score >= f_score[neighbor]
                    continue

            if neighbor not in openset or tentative_f_score < f_score[neighbor] 
                came_from[neighbor] := current
                g_score[neighbor] := tentative_g_score
                f_score[neighbor] := tentative_f_score
                if neighbor not in openset
                    add neighbor to openset

    return failure
```

### References

* [Wikipedia](http://en.wikipedia.org/wiki/A*_search_algorithm)
* [Ruby Quiz #98](http://rubyquiz.com/quiz98.html)
