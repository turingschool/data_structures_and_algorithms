gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'minitest/spec'
require_relative '../lib/landscape'
require_relative '../lib/pathfinder'

describe Landscape do
  it "generates a landscape from a fixture file" do
    matrix = [["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
              ["#", " ", "S", " ", " ", " ", " ", " ", " ", " ", "#"],
              ["#", " ", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
              ["#", " ", " ", " ", "#", " ", " ", " ", "#", " ", "#"],
              ["#", "#", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
              ["#", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#"],
              ["#", " ", "#", " ", "#", "#", "#", " ", "#", "#", "#"],
              ["#", " ", "#", " ", " ", " ", "#", " ", " ", " ", "#"],
              ["#", " ", "#", "#", "#", " ", "#", " ", "#", " ", "#"],
              ["#", " ", " ", " ", " ", " ", "#", " ", "F", " ", "#"],
              ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]]
    loaded = Landscape.load(File.join(__dir__, "fixtures", "landscape1.txt")).matrix
    matrix.each_with_index do |line, index|
      assert_equal line, loaded[index], "line #{index} did not match"
    end
  end

  it "prints itself" do
    landscape = Landscape.load(File.join(__dir__, "fixtures", "landscape1.txt"))
    assert_equal File.read(File.join(__dir__, "fixtures", "landscape1.txt")).chomp, landscape.to_s
  end

  it "finds start and finish" do
    landscape = Landscape.load(File.join(__dir__, "fixtures", "landscape1.txt"))
    assert_equal [2,1], landscape.start
    assert_equal [8,9], landscape.finish
  end
end
