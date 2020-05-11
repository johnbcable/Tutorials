package main

import "fmt"

func main() {
	modknt := 0
	
	for i := 1; i < 101; i++ {
		modknt = 0
		if i%3 == 0{
			modknt += 1
		}
		if i%5 == 0 {
			modknt += 2
		}
		if modknt == 0 {
			fmt.Println(i)
		} else if modknt == 1  {
			fmt.Println("Fizz")
		} else if modknt == 2 {
			fmt.Println("Buzz")
		} else if modknt == 3 {
			fmt.Println("FizzBuzz")
		}
	}
}