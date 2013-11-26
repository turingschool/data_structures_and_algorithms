filename = "sample_numbers.txt"
file = File.open("./resources/" + filename, "w")
quantity = 1000000
quantity.times do |i|
  if i % 100 == 0
    puts "#{quantity - i} left"
  end
  file.write(rand(quantity/2).to_s + "\n")
end