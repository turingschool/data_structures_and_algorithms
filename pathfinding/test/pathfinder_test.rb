gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'minitest/spec'
require_relative '../lib/landscape'
require_relative '../lib/pathfinder'

describe Pathfinder do
  before do
    @landscape  = Landscape.load(File.join(__dir__, "fixtures", "landscape1.txt"))
    @landscape2 = Landscape.load(File.join(__dir__, "fixtures", "landscape2.txt"))
    @pathfinder = Pathfinder.new
  end

  describe "#solve" do
    it "returns a path as an array of coordinates" do
      solution = [[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
                  [9,2],[9,3],[9,4],[9,5],[8,5],[7,5],[7,6],
                  [7,7],[7,8],[7,9]]
      assert_equal solution, @pathfinder.solve(@landscape)
    end

    it "Solves with grass" do
      solution = [[3,4],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],
                  [9,5],[10,5],[11,5],[12,5],[13,5],[14,5],
                  [15,5],[16,5],[16,4]]
      assert_equal solution, @pathfinder.solve(@landscape2)
    end
  end
end

