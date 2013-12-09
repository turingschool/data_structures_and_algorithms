gem 'minitest'
require 'minitest/autorun'
require_relative 'md5'
require 'digest/md5'

class MD5Test < Minitest::Test
  def test_it_hashes_a_string
    expected = Digest::MD5.hexdigest("Hello World\n")
    result = MD5.hexdigest("Hello World\n")
    assert_equal expected, result
  end
end