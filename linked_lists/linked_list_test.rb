gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require './lib/iterative_linked_list'

class IterativeLinkedListTest < Minitest::Test
  attr_reader :list

  def setup
    @list = IterativeLinkedList.new
  end

  def test_it_starts_with_zero_elements
    assert_equal 0, list.count
  end

  def test_it_pushes_three_elements_onto_a_list
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    assert_equal 3, list.count
  end

  def test_it_pops_the_last_element_from_the_list
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    output = list.pop
    assert_equal "today", output
    assert_equal 2, list.count
  end

  def test_a_popped_element_is_removed
    skip
    list.push("hello")
    output = list.pop
    assert_equal "hello", output
    assert_equal 0, list.count
  end  

  def test_it_pops_nil_when_there_are_no_elements
    skip
    assert_nil list.pop
  end

  def test_it_deletes_a_solo_node
    skip
    list.push("hello")
    list.delete("hello")
    assert_equal 0, list.count
  end

  def test_it_does_not_delete_when_the_data_does_not_match
    skip
    list.push("hello")
    list.push("world")
    list.delete("today")
    assert_equal 2, list.count
  end

  def test_it_deletes_a_last_node
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    list.delete("today")
    assert_equal 2, list.count
  end

  def test_it_deletes_a_middle_node
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    list.delete("world")
    assert_equal 2, list.count
    assert_equal "today", list.pop
    assert_equal "hello", list.pop
  end

  def test_it_deletes_the_head_when_there_are_more_nodes
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    list.delete("hello")
    assert_equal 2, list.count
    assert_equal "today", list.pop
    assert_equal "world", list.pop
  end

  def test_it_converts_to_an_array_when_there_are_no_elements
    skip
    assert_equal [], list.to_a
  end

  def test_it_converts_to_an_array_with_several_elements
    skip
    list.push("hello")
    list.push("world")
    list.push("today")
    assert_equal ["hello", "world", "today"], list.to_a
  end

  def test_it_finds_the_last_node
    skip
    list.push("hello")
    list.push("world")
    node = list.last_node
    assert_equal "world", node.data
  end
end