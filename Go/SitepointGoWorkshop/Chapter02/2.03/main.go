package main

import "fmt"

func main() {
	input := -10
	if input < 0 {
		fmt.Println("input can't be a negative number")
	} else if input%2 == 0 {
		fmt.Println("inoput is even")
	} else {
		fmt.Println("inout is odd")
	}
}