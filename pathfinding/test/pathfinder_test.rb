gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'minitest/spec'
require_relative '../lib/landscape'
require_relative '../lib/pathfinder'

def ls(name)
  Landscape.load(File.join(__dir__, "fixtures", "#{name}.txt"))
end

describe Pathfinder do
  before do
    @landscape  = ls("landscape1")
    @landscape2 = ls("landscape2")
  end

  it "knows how to find neighbors of a position" do
    p = Pathfinder.new(ls("open_grid"))
    assert_equal [[2,1], [3,2], [2,3], [1,2]], p.neighbors([2,2])
  end

  it "knows how to enqueue neighbors of a position" do
    p = Pathfinder.new(ls("open_grid"))
    assert p.queue.empty?
    p.enqueue_neighbors([2,2])
    assert_equal [[2,1], [3,2], [2,3], [1,2]], p.queue.map { |pos| pos[:position] }
  end

  it "knows not to enqueue impassable cells" do
    p = Pathfinder.new(ls("open_grid_with_one_wall"))
    refute p.passable?([3,2])
    p.enqueue_neighbors([2,2])
    assert_equal [[2,1], [2,3], [1,2]], p.queue.map { |pos| pos[:position] }
  end

  it "marks a position as searched once it searches it" do
    p = Pathfinder.new(ls("open_grid"))
    p.enqueue_neighbors([2,2])
    p.search_next_position
  end

  it "tracks previous coord for a visited coord when finding top, left..." do
    p = Pathfinder.new(ls("open_grid"))
    p.enqueue_neighbors([2,2])
    p.search_next_position
    assert_equal [2,2], p.searched[p.top([2,2])]
  end

  it "excludes the origin" do
    p = Pathfinder.new(ls("easy"))
    refute p.queueable?(p.landscape.start)
  end

  it "excludes previously queued neighbors when enqueuing neighbors" do
    p = Pathfinder.new(ls("open_grid"))
    p.enqueue_position([2,3],[2,2])
    refute p.queueable?([2,3])
    p.enqueue_neighbors([2,2])
    assert_equal 4, p.queue.length #don't dup 2,3 in the queue
  end

  it "can solve a super easy grid" do
    assert_equal [[1,1],[2,1]], Pathfinder.new(ls("super_easy")).solve
  end

  it "can solve an easy grid" do
    p = Pathfinder.new(ls("easy"))
    sol = p.solve
    assert_equal [[1,1],[2,1],[3,1],[4,1]], sol
  end

  describe "#solve" do
    it "returns a path as an array of coordinates" do
      solution = [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
                  [9,2],[9,3],[9,4],[9,5],[8,5],[7,5],[7,6],
                  [7,7],[7,8],[7,9],[8,9]]
      assert_equal solution, Pathfinder.new(@landscape).solve
    end

    it "Solves with grass" do
      skip
      solution = [[3,4],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],
                  [9,5],[10,5],[11,5],[12,5],[13,5],[14,5],
                  [15,5],[16,5],[16,4]]
      assert_equal solution, Pathfinder.new(@landscape2).solve
    end
  end
end

