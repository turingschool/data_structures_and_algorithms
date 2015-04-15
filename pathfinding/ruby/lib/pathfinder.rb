class Pathfinder
  attr_reader :landscape
  attr_accessor :solution
  def initialize(landscape)
    @landscape = landscape
    searched[landscape.start] = nil if landscape.start
  end

  def solve
    enqueue_neighbors(landscape.start)
    while solution.nil? && queue.any?
      search_next_position
    end
    solution_path
  end

  def solution_path
    current = solution
    path = [current]
    while current = searched[current]
      path.unshift(current)
    end
    path
  end

  def search_next_position
    current = queue.shift
    if objective?(current[:position])
      searched[current[:position]] = current[:origin]
      self.solution = current[:position]
    else
      searched[current[:position]] = current[:origin]
      enqueue_neighbors(current[:position])
    end
  end

  def searched
    @searched ||= {}
  end

  def queue
    @queue ||= []
  end

  def enqueue_neighbors(origin)
    neighbors(origin).select do |p|
      queueable?(p)
    end.each do |p|
      enqueue_position(p,origin)
    end
  end

  def enqueue_position(p,origin)
    queue << {position: p, origin: origin}
  end

  def queueable?(position)
    passable?(position) && !enqueued?(position) && !searched?(position)
  end

  def enqueued?(position)
    queue.map { |h| h[:position] }.include?(position)
  end

  def passable?(position)
    !landscape.value(position).nil? && landscape.value(position) != "#"
  end

  def searched?(position)
    searched.has_key?(position)
  end

  def objective?(position)
    landscape.value(position) == "F"
  end

  def neighbors(p)
    [top(p), right(p), bottom(p), left(p)]
  end

  def top(p)
    [p[0],p[1]-1]
  end

  def left(p)
    [p[0]-1,p[1]]
  end

  def bottom(p)
    [p[0],p[1]+1]
  end

  def right(p)
    [p[0]+1,p[1]]
  end
end
